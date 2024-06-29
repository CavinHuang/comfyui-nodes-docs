# Documentation
- Class name: WAS_Mask_Subtract
- Category: WAS Suite/Image/Masking
- Output node: False
- Repo Ref: https://github.com/WASasquatch/was-node-suite-comfyui

WAS_Mask_Subtract 节点的 subtract_masks 方法对两组掩码进行逐元素相减，确保结果落在有效的像素值范围内。它旨在促进需要从一个掩码中移除另一个掩码的操作，例如在图像处理或掩码应用中。

# Input types
## Required
- masks_a
    - 用于减法操作的第一组掩码。此参数至关重要，因为它定义了将从中减去第二组掩码的基础。
    - Comfy dtype: MASK
    - Python dtype: torch.Tensor
- masks_b
    - 将从第一组中减去的第二组掩码。此参数显著影响操作的结果。
    - Comfy dtype: MASK
    - Python dtype: torch.Tensor

# Output types
- MASKS
    - 两组掩码相减操作的结果，经过限制以确保有效的像素值。
    - Comfy dtype: MASK
    - Python dtype: torch.Tensor

# Usage tips
- Infra type: CPU

# Source code
```
class WAS_Mask_Subtract:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'masks_a': ('MASK',), 'masks_b': ('MASK',)}}
    CATEGORY = 'WAS Suite/Image/Masking'
    RETURN_TYPES = ('MASK',)
    RETURN_NAMES = ('MASKS',)
    FUNCTION = 'subtract_masks'

    def subtract_masks(self, masks_a, masks_b):
        subtracted_masks = torch.clamp(masks_a - masks_b, 0, 255)
        return (subtracted_masks,)
```