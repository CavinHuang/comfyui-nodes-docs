# Documentation
- Class name: SubtractMask
- Category: ImpactPack/Operation
- Output node: False
- Repo Ref: https://github.com/ltdrdata/ComfyUI-Impact-Pack.git

SubtractMask节点的'doit'方法对两张掩码图像执行减法操作，提供代表输入之间差异的结果掩码。它旨在成为图像处理工作流中的基本操作，其中需要移除或添加图像中的某些区域。

# Input types
## Required
- mask1
    - 用于减法操作的第一个掩码。它在确定结果掩码的结果中起着至关重要的作用，因为它定义了第二个掩码将从中减去的掩码的初始状态。
    - Comfy dtype: MASK
    - Python dtype: torch.Tensor
- mask2
    - 要从第一个掩码中减去的第二个掩码。它的重要性在于修改第一个掩码的内容，从而产生反映减法效果的最终掩码。
    - Comfy dtype: MASK
    - Python dtype: torch.Tensor

# Output types
- mask
    - 输出掩码是两个输入掩码之间减法操作的结果。它表示在从第一个掩码减去第二个掩码后剩余的区域。
    - Comfy dtype: MASK
    - Python dtype: torch.Tensor

# Usage tips
- Infra type: CPU

# Source code
```
class SubtractMask:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'mask1': ('MASK',), 'mask2': ('MASK',)}}
    RETURN_TYPES = ('MASK',)
    FUNCTION = 'doit'
    CATEGORY = 'ImpactPack/Operation'

    def doit(self, mask1, mask2):
        mask = subtract_masks(mask1, mask2)
        return (mask,)
```