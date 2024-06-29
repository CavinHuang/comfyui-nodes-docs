# Documentation
- Class name: FeatherMask
- Category: mask
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

FeatherMask 节点旨在平滑地将给定掩码的边缘与其周围区域混合。它通过逐渐调整掩码的像素不透明度来实现这一点，从而在掩码的边界处创建一个柔和的过渡，这通常用于图像处理和编辑中。当在视觉上不希望掩码和背景之间有硬边时，此节点特别有用。

# Input types
## Required
- mask
    - ‘mask’参数是一个定义图像中感兴趣区域的二进制张量。它对节点至关重要，因为它决定了图像的哪些部分将被羽化。掩码的维度及其二进制特性直接影响羽化过程和最终输出。
    - Comfy dtype: torch.Tensor
    - Python dtype: torch.Tensor
## Optional
- left
    - ‘left’参数指定从掩码的左边开始羽化效果的像素数。它在确定掩码左侧羽化区域的宽度方面起着重要作用，因此影响整体视觉结果。
    - Comfy dtype: int
    - Python dtype: int
- top
    - ‘top’参数规定了从掩码的顶部边缘开始羽化的像素数。它对于控制掩码顶部的羽化区域的高度至关重要，影响节点的输出。
    - Comfy dtype: int
    - Python dtype: int
- right
    - ‘right’参数设置从掩码的右边开始羽化的像素数。它是建立掩码右侧羽化区域宽度的关键因素，影响节点的执行和最终外观。
    - Comfy dtype: int
    - Python dtype: int
- bottom
    - ‘bottom’参数指示从掩码的底部边缘开始羽化的像素数。它对于确定掩码底部的羽化区域的高度至关重要，这显著影响节点的结果。
    - Comfy dtype: int
    - Python dtype: int

# Output types
- feathered_mask
    - ‘feathered_mask’输出是一个表示原始掩码并带有羽化边缘的张量。它是节点操作的主要结果，为图像中掩码区域和未掩码区域之间提供了视觉上平滑的过渡。
    - Comfy dtype: torch.Tensor
    - Python dtype: torch.Tensor

# Usage tips
- Infra type: CPU

# Source code
```
class FeatherMask:

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'mask': ('MASK',), 'left': ('INT', {'default': 0, 'min': 0, 'max': MAX_RESOLUTION, 'step': 1}), 'top': ('INT', {'default': 0, 'min': 0, 'max': MAX_RESOLUTION, 'step': 1}), 'right': ('INT', {'default': 0, 'min': 0, 'max': MAX_RESOLUTION, 'step': 1}), 'bottom': ('INT', {'default': 0, 'min': 0, 'max': MAX_RESOLUTION, 'step': 1})}}
    CATEGORY = 'mask'
    RETURN_TYPES = ('MASK',)
    FUNCTION = 'feather'

    def feather(self, mask, left, top, right, bottom):
        output = mask.reshape((-1, mask.shape[-2], mask.shape[-1])).clone()
        left = min(left, output.shape[-1])
        right = min(right, output.shape[-1])
        top = min(top, output.shape[-2])
        bottom = min(bottom, output.shape[-2])
        for x in range(left):
            feather_rate = (x + 1.0) / left
            output[:, :, x] *= feather_rate
        for x in range(right):
            feather_rate = (x + 1) / right
            output[:, :, -x] *= feather_rate
        for y in range(top):
            feather_rate = (y + 1) / top
            output[:, y, :] *= feather_rate
        for y in range(bottom):
            feather_rate = (y + 1) / bottom
            output[:, -y, :] *= feather_rate
        return (output,)
```