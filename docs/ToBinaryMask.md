# Documentation
- Class name: ToBinaryMask
- Category: ImpactPack/Operation
- Output node: False
- Repo Ref: https://github.com/ltdrdata/ComfyUI-Impact-Pack.git

ToBinaryMask节点旨在通过将输入掩码转换为二进制格式来处理输入掩码。它通过将阈值应用于掩码值来实现这一点，从而将每个像素分类为背景或前景。此操作对于需要在图像中清晰区分不同区域的任务至关重要，例如在图像分割或目标检测中。

# Input types
## Required
- mask
    - 掩码参数是ToBinaryMask节点的关键输入。它代表了将从中派生二进制掩码的初始掩码。这个掩码的质量和准确性直接影响节点的输出，决定了分割或目标检测任务的精度。
    - Comfy dtype: MASK
    - Python dtype: torch.Tensor
## Optional
- threshold
    - 阈值参数是一个可选输入，用于确定将掩码值转换为二进制格式的截止点。它在节点的操作中起着重要作用，通过控制二进制分类的敏感性来影响结果。较高的阈值会导致更保守的转换，而较低的阈值则会导致更激进的转换。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- binary_mask
    - 二进制掩码输出是ToBinaryMask节点操作的结果。它是输入掩码的二进制表示，其中每个像素被分配0或1的值，表示感兴趣特征的存在或缺失。这个输出对于各种计算机视觉应用的进一步分析或处理至关重要。
    - Comfy dtype: MASK
    - Python dtype: torch.Tensor

# Usage tips
- Infra type: CPU

# Source code
```
class ToBinaryMask:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'mask': ('MASK',), 'threshold': ('INT', {'default': 20, 'min': 1, 'max': 255})}}
    RETURN_TYPES = ('MASK',)
    FUNCTION = 'doit'
    CATEGORY = 'ImpactPack/Operation'

    def doit(self, mask, threshold):
        mask = to_binary_mask(mask, threshold / 255.0)
        return (mask,)
```