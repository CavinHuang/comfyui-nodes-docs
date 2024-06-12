# Documentation
- Class name: ImageColorToMask
- Category: mask
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

ImageColorToMask节点旨在将彩色图像根据指定的颜色转换为二进制掩码。它通过识别图像中与给定颜色匹配的像素，并将这些像素转换为掩码，从而突出显示感兴趣的区域。该节点在需要基于颜色的掩码的应用中发挥着关键作用，例如在目标检测和分割中。

# Input types
## Required
- image
    - 'image'参数是节点将处理的输入彩色图像。它是节点操作的基本，因为这是派生掩码的来源。图像的内容直接影响掩码的准确性和最终输出。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
## Optional
- color
    - 'color'参数定义了图像中应转换为掩码的特定颜色。它是一个关键参数，因为它决定了哪些像素将包含在最终掩码中。颜色以数值格式指定，允许精确定位所需的色调。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- mask
    - 'mask'输出是输入图像的二进制表示，其中指定的颜色已被转换为掩码。它很重要，因为它为感兴趣的区域与图像的其余部分提供了清晰的划分，可以用于进一步的分析或处理。
    - Comfy dtype: MASK
    - Python dtype: torch.Tensor

# Usage tips
- Infra type: GPU

# Source code
```
class ImageColorToMask:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'image': ('IMAGE',), 'color': ('INT', {'default': 0, 'min': 0, 'max': 16777215, 'step': 1, 'display': 'color'})}}
    CATEGORY = 'mask'
    RETURN_TYPES = ('MASK',)
    FUNCTION = 'image_to_mask'

    def image_to_mask(self, image, color):
        temp = (torch.clamp(image, 0, 1.0) * 255.0).round().to(torch.int)
        temp = torch.bitwise_left_shift(temp[:, :, :, 0], 16) + torch.bitwise_left_shift(temp[:, :, :, 1], 8) + temp[:, :, :, 2]
        mask = torch.where(temp == color, 255, 0).float()
        return (mask,)
```