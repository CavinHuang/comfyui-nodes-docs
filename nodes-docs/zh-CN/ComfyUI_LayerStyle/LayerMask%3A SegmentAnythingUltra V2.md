# Documentation
- Class name: SegmentAnythingUltraV2
- Category: 😺dzNodes/LayerMask
- Output node: False
- Repo Ref: https://github.com/chflame163/ComfyUI_LayerStyle

SegmentAnythingUltra的V2升级版，增加了VITMatte边缘处理方法。(注意:超过2K尺寸的图片使用此方法将占用大量内存)

# Input types

## Required

- image
    - 图片。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor

- sam_model
    - SAM模型。
    - Comfy dtype: list_sam_model()
    - Python dtype: str

- grounding_dino_model
    - GroundingDINO模型。
    - Comfy dtype: list_groundingdino_model()
    - Python dtype: str

- threshold
    - 阈值。
    - Comfy dtype: FLOAT
    - Python dtype: float

- detail_method
    - 边缘处理方法。提供了VITMatte, VITMatte(local), PyMatting, GuidedFilter。如果首次使用VITMatte后模型已经下载，之后可以使用VITMatte(local)。
    - Comfy dtype: ['VITMatte', 'VITMatte(local)', 'PyMatting', 'GuidedFilter']
    - Python dtype: str

- detail_erode
    - 遮罩边缘向内侵蚀范围。数值越大，向内修复的范围越大。
    - Comfy dtype: INT
    - Python dtype: int

- detail_dilate
    - 遮罩边缘向外扩张范围。数值越大，向外修复的范围越大。
    - Comfy dtype: INT
    - Python dtype: int

- black_point
    - 黑点。
    - Comfy dtype: FLOAT
    - Python dtype: float

- white_point
    - 白点。
    - Comfy dtype: FLOAT
    - Python dtype: float

- process_detail
    - 处理细节。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool

- prompt
    - 提示词。
    - Comfy dtype: STRING
    - Python dtype: str

# Output types

- image
    - 图片。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor

- mask
    - 掩码。
    - Comfy dtype: MASK
    - Python dtype: torch.Tensor

# Usage tips
- Infra type: CPU

# Source code
```python
class SegmentAnythingUltraV2:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):

        method_list = ['VITMatte', 'VITMatte(local)', 'PyMatting', 'GuidedFilter', ]

        return {
            "required": {
                "image": ("IMAGE",),
                "sam_model": (list_sam_model(), ),
                "grounding_dino_model": (list_groundingdino_model(),),
                "threshold": ("FLOAT", {"default": 0.3, "min": 0, "max": 1.0, "step": 0.01}),
                "detail_method": (method_list,),
                "detail_erode": ("INT", {"default": 6, "min": 1, "max": 255, "step": 1}),
                "detail_dilate": ("INT", {"default": 6, "min": 1, "max": 255, "step": 1}),
                "black_point": ("FLOAT", {"default": 0.15, "min": 0.01, "max": 0.98, "step": 0.01, "display": "slider"}),
                "white_point": ("FLOAT", {"default": 0.99, "min": 0.02, "max": 0.99, "step": 0.01, "display": "slider"}),
                "process_detail": ("BOOLEAN", {"default": True}),
                "prompt": ("STRING", {"default": "subject"}),
            },
            "optional": {
            }
        }

    RETURN_TYPES = ("IMAGE", "MASK", )
    RETURN_NAMES = ("image", "mask", )
    FUNCTION = "segment_anything_ultra_v2"
    CATEGORY = '😺dzNodes/LayerMask'

    def segment_anything_ultra_v2(self, image, sam_model, grounding_dino_model, threshold,
                                  detail_method, detail_erode, detail_dilate,
                                  black_point, white_point, process_detail,
                                  prompt, ):
        global SAM_MODEL
        global DINO_MODEL
        global previous_sam_model
        global previous_dino_model

        if detail_method == 'VITMatte(local)':
            local_files_only = True
        else:
            local_files_only = False

        if previous_sam_model != sam_model:
            SAM_MODEL = load_sam_model(sam_model)
            previous_sam_model = sam_model
        if previous_dino_model != grounding_dino_model:
            DINO_MODEL = load_groundingdino_model(grounding_dino_model)
            previous_dino_model = grounding_dino_model
        ret_images = []
        ret_masks = []

        for i in image:
            i = torch.unsqueeze(i, 0)
            i = pil2tensor(tensor2pil(i).convert('RGB'))
            _image = tensor2pil(i).convert('RGBA')
            boxes = groundingdino_predict(DINO_MODEL, _image, prompt, threshold)
            if boxes.shape[0] == 0:
                break
            (_, _mask) = sam_segment(SAM_MODEL, _image, boxes)
            _mask = _mask[0]
            detail_range = detail_erode + detail_dilate
            if process_detail:
                if detail_method == 'GuidedFilter':
                    _mask = guided_filter_alpha(i, _mask, detail_range // 6 + 1)
                    _mask = tensor2pil(histogram_remap(_mask, black_point, white_point))
                elif detail_method == 'PyMatting':
                    _mask = tensor2pil(mask_edge_detail(i, _mask, detail_range // 8 + 1, black_point, white_point))
                else:
                    _trimap = generate_VITMatte_trimap(_mask, detail_erode, detail_dilate)
                    _mask = generate_VITMatte(_image, _trimap, local_files_only=local_files_only)
                    _mask = tensor2pil(histogram_remap(pil2tensor(_mask), black_point, white_point))
            else:
                _mask = mask2image(_mask)
            _image = RGB2RGBA(tensor2pil(i).convert('RGB'), _mask.convert('L'))

            ret_images.append(pil2tensor(_image))
            ret_masks.append(image2mask(_mask))
        if len(ret_masks) == 0:
            _, height, width, _ = image.size()
            empty_mask = torch.zeros((1, height, width), dtype=torch.uint8, device="cpu")
            return (empty_mask, empty_mask)

        log(f"{NODE_NAME} Processed {len(ret_masks)} image(s).", message_type='finish')
        return (torch.cat(ret_images, dim=0), torch.cat(ret_masks, dim=0),)
```