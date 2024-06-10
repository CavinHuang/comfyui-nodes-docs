# Documentation
- Class name: BitwiseAndMask
- Category: ImpactPack/Operation
- Output node: False
- Repo Ref: https://github.com/ltdrdata/ComfyUI-Impact-Pack.git

BitwiseAndMask节点的'doit'方法旨在对两个输入掩码执行按位与操作。它对于需要组合掩码层的应用至关重要，例如在图像分割或数据过滤过程中。此方法确保在输出中仅保留两个掩码的共同元素，有助于获得更精细和精确的结果。

# Input types
## Required
- mask1
    - 参数'mask1'是按位与操作的第一个输入掩码。它通过贡献其结构和内容，在确定最终掩码中起着关键作用。节点的执行直接受到'mask1'属性的影响，它必须与'mask2'在形状上对齐才能进行有效的按位操作。
    - Comfy dtype: MASK
    - Python dtype: torch.Tensor
- mask2
    - 参数'mask2'是与'mask1'一起用于按位与操作的第二个输入掩码。它的重要性等同于'mask1'，因为它也定义了结果掩码中将出现的共同区域。节点的功能依赖于'mask1'和'mask2'之间的形状兼容性。
    - Comfy dtype: MASK
    - Python dtype: torch.Tensor

# Output types
- mask
    - 'mask'输出是'mask1'和'mask2'之间按位与操作的结果。它表示两个输入掩码中都存在的共同区域，对于需要单一组合掩码表示的进一步处理或分析至关重要。
    - Comfy dtype: MASK
    - Python dtype: torch.Tensor

# Usage tips
- Infra type: CPU

# Source code
```
class BitwiseAndMask:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'mask1': ('MASK',), 'mask2': ('MASK',)}}
    RETURN_TYPES = ('MASK',)
    FUNCTION = 'doit'
    CATEGORY = 'ImpactPack/Operation'

    def doit(self, mask1, mask2):
        mask = bitwise_and_masks(mask1, mask2)
        return (mask,)
```