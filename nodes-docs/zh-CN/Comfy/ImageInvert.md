# Documentation
- Class name: ImageInvert
- Category: image
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

ImageInvert 节点旨在执行一种基础的图像处理操作，即图像反色。它接收一张图像作为输入，并输出其反色的对应图像，其中像素强度被反转，从而颠倒了图像的明暗区域。该节点在各种图像分析和增强任务中扮演着关键角色，提供了一种简单而有效的视觉对比度改变方法。

# Input types
## Required
- image
    - 图像参数对于 ImageInvert 节点至关重要，因为它是决定操作对象的主要输入。节点处理这张图像以产生一个反色的版本，使图像参数成为节点功能和结果的核心。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor

# Output types
- inverted_image
    - 反色图像输出参数代表了图像反色处理的结果。它很重要，因为它是节点主要功能的直接输出，展示了具有反转像素强度的转换后的图像。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor

# Usage tips
- Infra type: CPU

# Source code
```
class ImageInvert:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'image': ('IMAGE',)}}
    RETURN_TYPES = ('IMAGE',)
    FUNCTION = 'invert'
    CATEGORY = 'image'

    def invert(self, image):
        s = 1.0 - image
        return (s,)
```