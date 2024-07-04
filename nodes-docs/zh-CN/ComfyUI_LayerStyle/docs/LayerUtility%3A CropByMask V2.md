# Documentation
- Class name: CropByMaskV2
- Category: 😺dzNodes/LayerMask
- Output node: False
- Repo Ref: https://github.com/chflame163/ComfyUI_LayerStyle

CropByMask的V2升级版。支持crop_box输入，方便裁切相同尺寸的图层。

mask_for_crop更名为mask。
增加crop_box可选输入，如果这里有输入将忽略遮罩探测，直接使用此数据裁切。

# Input types
## Required

- image
    - 输入图片。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor

- mask
    - image的遮罩，将自动按照遮罩范围进行裁切。
    - Comfy dtype: MASK
    - Python dtype: torch.Tensor

- invert_mask
    - 是否反转mask。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool

- detect
    - 探测方法，min_bounding_rect是大块形状最小外接矩形, max_inscribed_rect是大块形状最大内接矩形, mask_area是遮罩像素有效区域。
    - Comfy dtype: STRING
    - Python dtype: str

- top_reserve
    - 裁切顶端保留大小。
    - Comfy dtype: INT
    - Python dtype: int

- bottom_reserve
    - 裁切底端保留大小。
    - Comfy dtype: INT
    - Python dtype: int

- left_reserve
    - 裁切左侧保留大小。
    - Comfy dtype: INT
    - Python dtype: int

- right_reserve
    - 裁切右侧保留大小。
    - Comfy dtype: INT
    - Python dtype: int

## Optional

- crop_box
    - 裁切box数据，如果这里有输入将忽略遮罩探测，直接使用此数据裁切。
    - Comfy dtype: BOX
    - Python dtype: list

# Output types

- croped_image
    - 裁切后的图片。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor

- croped_mask
    - 裁切后的mask。
    - Comfy dtype: MASK
    - Python dtype: torch.Tensor

- crop_box
    - 裁切box数据，在RestoreCropBox节点恢复时使用。
    - Comfy dtype: BOX
    - Python dtype: list

- box_preview
    - 裁切位置预览图，红色是探测到的范围，绿色是加上保留边框后裁切的范围。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor

# Usage tips
- Infra type: GPU

# Source code
```
class CropByMaskV2:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(self):
        detect_mode = ['min_bounding_rect', 'max_inscribed_rect', 'mask_area']
        return {
            "required": {
                "image": ("IMAGE", ),  #
                "mask": ("MASK",),
                "invert_mask": ("BOOLEAN", {"default": False}),  # 反转mask#
                "detect": (detect_mode,),
                "top_reserve": ("INT", {"default": 20, "min": -9999, "max": 9999, "step": 1}),
                "bottom_reserve": ("INT", {"default": 20, "min": -9999, "max": 9999, "step": 1}),
                "left_reserve": ("INT", {"default": 20, "min": -9999, "max": 9999, "step": 1}),
                "right_reserve": ("INT", {"default": 20, "min": -9999, "max": 9999, "step": 1}),
            },
            "optional": {
                "crop_box": ("BOX",),
            }
        }

    RETURN_TYPES = ("IMAGE", "MASK", "BOX", "IMAGE",)
    RETURN_NAMES = ("croped_image", "croped_mask", "crop_box", "box_preview")
    FUNCTION = 'crop_by_mask_v2'
    CATEGORY = '😺dzNodes/LayerUtility'

    def crop_by_mask_v2(self, image, mask, invert_mask, detect,
                     top_reserve, bottom_reserve,
                     left_reserve, right_reserve,
                     crop_box=None
                     ):

        ret_images = []
        ret_masks = []
        l_images = []
        l_masks = []

        for l in image:
            l_images.append(torch.unsqueeze(l, 0))
        if mask.dim() == 2:
            mask = torch.unsqueeze(mask, 0)
        # 如果有多张mask输入，使用第一张
        if mask.shape[0] > 1:
            log(f"Warning: Multiple mask inputs, using the first.", message_type='warning')
            mask = torch.unsqueeze(mask[0], 0)
        if invert_mask:
            mask = 1 - mask
        l_masks.append(tensor2pil(torch.unsqueeze(mask, 0)).convert('L'))

        _mask = mask2image(mask)
        preview_image = tensor2pil(mask).convert('RGB')
        if crop_box is None:
            bluredmask = gaussian_blur(_mask, 20).convert('L')
            x = 0
            y = 0
            width = 0
            height = 0
            if detect == "min_bounding_rect":
                (x, y, width, height) = min_bounding_rect(bluredmask)
            elif detect == "max_inscribed_rect":
                (x, y, width, height) = max_inscribed_rect(bluredmask)
            else:
                (x, y, width, height) = mask_area(_mask)

            width = num_round_to_multiple(width, 8)
            height = num_round_to_multiple(height, 8)

            log(f"{NODE_NAME}: Box detected. x={x},y={y},width={width},height={height}")
            canvas_width, canvas_height = tensor2pil(torch.unsqueeze(image[0], 0)).convert('RGB').size
            x1 = x - left_reserve if x - left_reserve > 0 else 0
            y1 = y - top_reserve if y - top_reserve > 0 else 0
            x2 = x + width + right_reserve if x + width + right_reserve < canvas_width else canvas_width
            y2 = y + height + bottom_reserve if y + height + bottom_reserve < canvas_height else canvas_height
            crop_box = (x1, y1, x2, y2)
            preview_image = draw_rect(preview_image, x, y, width, height, line_color="#F00000",
                                      line_width=(width + height) // 100)
        preview_image = draw_rect(preview_image, crop_box[0], crop_box[1],
                                  crop_box[2] - crop_box[0], crop_box[3] - crop_box[1],
                                  line_color="#00F000",
                                  line_width=(crop_box[2] - crop_box[0] + crop_box[3] - crop_box[1]) // 200)
        for i in range(len(l_images)):
            _canvas = tensor2pil(l_images[i]).convert('RGB')
            _mask = l_masks[0]
            ret_images.append(pil2tensor(_canvas.crop(crop_box)))
            ret_masks.append(image2mask(_mask.crop(crop_box)))

        log(f"{NODE_NAME} Processed {len(ret_images)} image(s).", message_type='finish')
        return (torch.cat(ret_images, dim=0), torch.cat(ret_masks, dim=0), list(crop_box), pil2tensor(preview_image),)

```