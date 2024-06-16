# Documentation
- Class name: SegmentAnythingUltra
- Category: 😺dzNodes/LayerMask
- Output node: False
- Repo Ref: https://github.com/chflame163/ComfyUI_LayerStyle

对[ComfyUI Segment Anything](https://github.com/storyicon/comfyui_segment_anything)的改进，结合了spacepxl的[ComfyUI-Image-Filters](https://github.com/spacepxl/ComfyUI-Image-Filters)的Alpha Matte节点，使遮罩有更具细节的边缘，感谢原作者。

*请参照ComfyUI Segment Anything的安装方法安装模型。如果已经正确安装了ComfyUI Segment Anything，可跳过此步骤。
* 从 [这里](https://huggingface.co/bert-base-uncased/tree/main) 下载 config.json，model.safetensors，tokenizer_config.json，tokenizer.json 和 vocab.txt 5个文件到 ```ComfyUI/models/bert-base-uncased```文件夹。
* 下载 [GroundingDINO_SwinT_OGC config file](https://huggingface.co/ShilongLiu/GroundingDINO/resolve/main/GroundingDINO_SwinT_OGC.cfg.py), [GroundingDINO_SwinT_OGC model](https://huggingface.co/ShilongLiu/GroundingDINO/resolve/main/groundingdino_swint_ogc.pth),
[GroundingDINO_SwinB config file](https://huggingface.co/ShilongLiu/GroundingDINO/resolve/main/GroundingDINO_SwinB.cfg.py), [GroundingDINO_SwinB model](https://huggingface.co/ShilongLiu/GroundingDINO/resolve/main/groundingdino_swinb_cogcoor.pth) 到 ```ComfyUI/models/grounding-dino```文件夹。
* 下载 [sam_vit_h](https://dl.fbaipublicfiles.com/segment_anything/sam_vit_h_4b8939.pth)，[sam_vit_l](https://dl.fbaipublicfiles.com/segment_anything/sam_vit_l_0b3195.pth),
[sam_vit_b](https://dl.fbaipublicfiles.com/segment_anything/sam_vit_b_01ec64.pth), [sam_hq_vit_h](https://huggingface.co/lkeab/hq-sam/resolve/main/sam_hq_vit_h.pth),
[sam_hq_vit_l](https://huggingface.co/lkeab/hq-sam/resolve/main/sam_hq_vit_l.pth), [sam_hq_vit_b](https://huggingface.co/lkeab/hq-sam/resolve/main/sam_hq_vit_b.pth),
[mobile_sam](https://github.com/ChaoningZhang/MobileSAM/blob/master/weights/mobile_sam.pt) 这几个文件到```ComfyUI/models/sams```文件夹。

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
    - SAM阈值。
    - Comfy dtype: FLOAT
    - Python dtype: float

- detail_range
    - 边缘细节范围。
    - Comfy dtype: INT
    - Python dtype: int

- black_point
    - 边缘黑色采样阈值。
    - Comfy dtype: FLOAT
    - Python dtype: float

- white_point
    - 边缘白色采样阈值。
    - Comfy dtype: FLOAT
    - Python dtype: float

- process_detail
    - 此处设为False将跳过边缘处理以节省运行时间。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool

- prompt
    - SAM的prompt输入。
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
class SegmentAnythingUltra:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):

        return {
            "required": {
                "image": ("IMAGE",),
                "sam_model": (list_sam_model(), ),
                "grounding_dino_model": (list_groundingdino_model(),),
                "threshold": ("FLOAT", {"default": 0.3, "min": 0, "max": 1.0, "step": 0.01}),
                "detail_range": ("INT", {"default": 16, "min": 1, "max": 256, "step": 1}),
                "black_point": ("FLOAT", {"default": 0.15, "min": 0.01, "max": 0.98, "step": 0.01}),
                "white_point": ("FLOAT", {"default": 0.99, "min": 0.02, "max": 0.99, "step": 0.01}),
                "process_detail": ("BOOLEAN", {"default": True}),
                "prompt": ("STRING", {"default": "subject"}),
            },
            "optional": {
            }
        }

    RETURN_TYPES = ("IMAGE", "MASK", )
    RETURN_NAMES = ("image", "mask", )
    FUNCTION = "segment_anything_ultra"
    CATEGORY = '😺dzNodes/LayerMask'

    def segment_anything_ultra(self, image, sam_model, grounding_dino_model, threshold,
                               detail_range, black_point, white_point, process_detail,
                               prompt, ):
        global SAM_MODEL
        global DINO_MODEL
        if SAM_MODEL is None: SAM_MODEL = load_sam_model(sam_model)
        if DINO_MODEL is None: DINO_MODEL = load_groundingdino_model(grounding_dino_model)
        ret_images = []
        ret_masks = []

        for i in image:
            i = torch.unsqueeze(i, 0)
            i = pil2tensor(tensor2pil(i).convert('RGB'))
            item = tensor2pil(i).convert('RGBA')
            boxes = groundingdino_predict(DINO_MODEL, item, prompt, threshold)
            if boxes.shape[0] == 0:
                break
            (_, _mask) = sam_segment(SAM_MODEL, item, boxes)
            _mask = _mask[0]
            if process_detail:
                _mask = tensor2pil(mask_edge_detail(i, _mask, detail_range, black_point, white_point))
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