# Documentation
- Class name: InvertMask
- Category: mask
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

InvertMask 节点的 `invert` 方法旨在执行图像处理中一个简单但至关重要的操作。它反转输入的掩码，有效地将像素值从 0 反转到 1，反之亦然，这通常对于某些类型的图像操作或增强任务是必要的。这个节点在改变掩码的视觉表示中发挥关键作用，从而为后续的分析或转换提供了不同的视角或方法。

# Input types
## Required
- mask
    - 参数 'mask' 是 `invert` 方法的输入，对于节点的操作至关重要。它表示需要被反转的原始掩码。反转过程是基础性的，因为它可以显著改变掩码在下游任务中的上下文和应用。
    - Comfy dtype: MASK
    - Python dtype: torch.Tensor

# Output types
- out
    - invert 方法的输出是一个新的掩码，它是输入掩码的反转。这个输出很重要，因为它代表了原始掩码的转换状态，准备用于后续的图像处理步骤。
    - Comfy dtype: MASK
    - Python dtype: torch.Tensor

# Usage tips
- Infra type: CPU

# Source code
```
class InvertMask:

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'mask': ('MASK',)}}
    CATEGORY = 'mask'
    RETURN_TYPES = ('MASK',)
    FUNCTION = 'invert'

    def invert(self, mask):
        out = 1.0 - mask
        return (out,)
```