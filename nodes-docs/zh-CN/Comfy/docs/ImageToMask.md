# Documentation
- Class name: ImageToMask
- Category: mask
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

ImageToMask节点旨在从输入图像中提取特定的颜色通道，创建一个掩码，该掩码可用于各种图像处理任务。它在分割和隔离图像中的特定特征中扮演着关键角色，从而实现更有针对性的分析和操作。

# Input types
## Required
- image
    - 图像参数是ImageToMask节点的主要输入。它是提取颜色通道以形成掩码的来源。这个参数至关重要，因为它决定了结果掩码的内容和质量。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- channel
    - 通道参数指定从图像中提取哪种颜色通道。它是一个关键的输入，因为它决定了图像中将被表示在掩码中的特定方面。通道的选择可以显著影响图像的后续处理和分析。
    - Comfy dtype: COMBO['red', 'green', 'blue', 'alpha']
    - Python dtype: str

# Output types
- mask
    - 掩码输出是输入图像中所选颜色通道的单通道表示。它作为进一步图像操作和分析的基础，提供了所选通道信息的专注视图。
    - Comfy dtype: MASK
    - Python dtype: torch.Tensor

# Usage tips
- Infra type: CPU

# Source code
```
class ImageToMask:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'image': ('IMAGE',), 'channel': (['red', 'green', 'blue', 'alpha'],)}}
    CATEGORY = 'mask'
    RETURN_TYPES = ('MASK',)
    FUNCTION = 'image_to_mask'

    def image_to_mask(self, image, channel):
        channels = ['red', 'green', 'blue', 'alpha']
        mask = image[:, :, :, channels.index(channel)]
        return (mask,)
```