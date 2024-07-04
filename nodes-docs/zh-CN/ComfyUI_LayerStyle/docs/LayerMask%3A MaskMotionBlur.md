# Documentation
- Class name: MaskMotionBlur
- Category: 😺dzNodes/LayerMask
- Output node: False
- Repo Ref: https://github.com/chflame163/ComfyUI_LayerStyle

对Mask应用运动模糊效果的节点。

# Input types

## Required

- mask
    - 输入的遮罩
    - Comfy dtype: MASK
    - Python dtype: torch.Tensor

- invert_mask
    - 反转mask。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool

- blur
    - 模糊量。
    - Comfy dtype: INT
    - Python dtype: int

- angle
    - 模糊角度。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types

- mask
    - 输出的掩码。
    - Comfy dtype: MASK
    - Python dtype: torch.Tensor

# Usage tips
- Infra type: CPU

# Source code
```python
class MaskMotionBlur:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(self):

        return {
            "required": {
                "mask": ("MASK",),
                "invert_mask": ("BOOLEAN", {"default": True}),  # 反转mask
                "blur": ("INT", {"default": 20, "min": 1, "max": 9999, "step": 1}),
                "angle": ("FLOAT", {"default": 0, "min": -360, "max": 360, "step": 0.1}),
            },
            "optional": {
            }
        }

    RETURN_TYPES = ("MASK",)
    RETURN_NAMES = ("mask",)
    FUNCTION = 'mask_motion_blur'
    CATEGORY = '😺dzNodes/LayerMask'

    def mask_motion_blur(self, mask, invert_mask, blur, angle,):

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
            _blurimage = motion_blur(_mask, angle, blur)
            ret_masks.append(image2mask(_blurimage))

        log(f"{NODE_NAME} Processed {len(ret_masks)} mask(s).", message_type='finish')
        return (torch.cat(ret_masks, dim=0),)
```