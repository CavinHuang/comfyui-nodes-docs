# Documentation
- Class name: MaskStroke
- Category: 😺dzNodes/LayerMask
- Output node: False
- Repo Ref: https://github.com/chflame163/ComfyUI_LayerStyle

对Mask应用描边效果的节点。

# Input types

## Required

- mask
    - 输入的遮罩。
    - Comfy dtype: MASK
    - Python dtype: torch.Tensor

- invert_mask
    - 反转mask。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool

- stroke_grow
    - 收缩值。
    - Comfy dtype: INT
    - Python dtype: int

- stroke_width
    - 扩张值。
    - Comfy dtype: INT
    - Python dtype: int

- blur
    - 模糊量。
    - Comfy dtype: INT
    - Python dtype: int

# Output types

- mask
    - 输出的掩码。
    - Comfy dtype: MASK
    - Python dtype: torch.Tensor

# Usage tips
- Infra type: CPU

# Source code
```python
class MaskStroke:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(self):

        return {
            "required": {
                "mask": ("MASK", ),  #
                "invert_mask": ("BOOLEAN", {"default": True}),  # 反转mask
                "stroke_grow": ("INT", {"default": 0, "min": -999, "max": 999, "step": 1}),  # 收缩值
                "stroke_width": ("INT", {"default": 20, "min": 0, "max": 999, "step": 1}),  # 扩张值
                "blur": ("INT", {"default": 6, "min": 0, "max": 100, "step": 1}),  # 模糊
            },
            "optional": {
            }
        }

    RETURN_TYPES = ("MASK",)
    RETURN_NAMES = ("mask",)
    FUNCTION = 'mask_stroke'
    CATEGORY = '😺dzNodes/LayerMask'

    def mask_stroke(self, mask, invert_mask, stroke_grow, stroke_width, blur,):

        l_masks = []
        ret_masks = []

        if mask.dim() == 2:
            mask = torch.unsqueeze(mask, 0)

        for m in mask:
            if invert_mask:
                m = 1 - m
            l_masks.append(tensor2pil(torch.unsqueeze(m, 0)).convert('L'))

        for i in range(len(l_masks)):
            _mask = l_masks[i]
            grow_offset = int(stroke_width / 2)
            inner_stroke = stroke_grow - grow_offset
            outer_stroke = inner_stroke + stroke_width
            inner_mask = expand_mask(image2mask(_mask), inner_stroke, blur)
            outer_mask = expand_mask(image2mask(_mask), outer_stroke, blur)
            stroke_mask = subtract_mask(outer_mask, inner_mask)
            ret_masks.append(stroke_mask)

        log(f"{NODE_NAME} Processed {len(ret_masks)} mask(s).", message_type='finish')
        return (torch.cat(ret_masks, dim=0),)
```