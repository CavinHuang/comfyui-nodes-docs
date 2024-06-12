# Documentation
- Class name: MaskToImage
- Category: mask
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

MaskToImage节点旨在将二进制掩码数据转换为彩色图像格式。它在将掩码数据可视化方面发挥着关键作用，通过将其转换为更易于解释和理解的图像。该节点抽象了转换过程的复杂性，专注于生成用户友好的视觉表示这一最终目标。

# Input types
## Required
- mask
    - ‘mask’参数对于MaskToImage节点至关重要，因为它代表了需要转换为图像的二进制掩码数据。正确输入此参数对于节点有效地执行其转换功能至关重要，直接影响生成的图像的质量和准确性。
    - Comfy dtype: MASK
    - Python dtype: torch.Tensor

# Output types
- result
    - MaskToImage节点的‘result’输出是由输入掩码派生出的彩色图像。它标志着二进制掩码数据成功转换为可用于进一步分析或展示的视觉格式。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor

# Usage tips
- Infra type: CPU

# Source code
```
class MaskToImage:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'mask': ('MASK',)}}
    CATEGORY = 'mask'
    RETURN_TYPES = ('IMAGE',)
    FUNCTION = 'mask_to_image'

    def mask_to_image(self, mask):
        result = mask.reshape((-1, 1, mask.shape[-2], mask.shape[-1])).movedim(1, -1).expand(-1, -1, -1, 3)
        return (result,)
```