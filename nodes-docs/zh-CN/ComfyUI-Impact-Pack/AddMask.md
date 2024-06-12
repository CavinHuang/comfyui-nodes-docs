# Documentation
- Class name: AddMask
- Category: ImpactPack/Operation
- Output node: False
- Repo Ref: https://github.com/ltdrdata/ComfyUI-Impact-Pack.git

AddMask节点旨在对两个二进制掩码执行逐像素加法。它用于以保留原始掩码完整性的方式组合掩码图像，同时创建一个新的掩码，代表它们的联合。

# Input types
## Required
- mask1
    - 第一个要添加的掩码。它是一个关键组件，因为它有助于形成结果掩码，决定了将包含在最终组合掩码中的区域。
    - Comfy dtype: MASK
    - Python dtype: torch.Tensor
- mask2
    - 第二个要添加的掩码。像第一个掩码一样，它在定义输出掩码方面起着重要作用，通过贡献包含在组合结果中的区域。
    - Comfy dtype: MASK
    - Python dtype: torch.Tensor

# Output types
- mask
    - 输出是一个新的二进制掩码，由输入掩码相加得到。它表示两个输入掩码的联合，指示两个掩码重叠的区域。
    - Comfy dtype: MASK
    - Python dtype: torch.Tensor

# Usage tips
- Infra type: CPU

# Source code
```
class AddMask:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'mask1': ('MASK',), 'mask2': ('MASK',)}}
    RETURN_TYPES = ('MASK',)
    FUNCTION = 'doit'
    CATEGORY = 'ImpactPack/Operation'

    def doit(self, mask1, mask2):
        mask = add_masks(mask1, mask2)
        return (mask,)
```