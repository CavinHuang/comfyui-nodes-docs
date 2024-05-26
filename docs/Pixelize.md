# Documentation
- Class name: Pixelize
- Category: postprocessing/Effects
- Output node: False
- Repo Ref: https://github.com/EllangoK/ComfyUI-post-processing-nodes

Pixelize节点旨在对输入图像应用像素化效果，将其转换为风格化、块状的表现形式。它通过平均指定像素大小定义的网格内的颜色值来实现这一点，从而将图像的分辨率降低到更抽象的形式。这个节点特别适用于创建复古或艺术性的外观，也可以用于保护隐私的图像处理。

# Input types
## Required
- image
    - 图像参数是Pixelize节点将要处理的输入。它至关重要，因为它决定了将要进行像素化处理的视觉内容。节点的操作直接受到图像尺寸和像素数据的影响，这对于像素化效果至关重要。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- pixel_size
    - pixel_size参数决定了像素化效果的粒度。它指定了输出图像中每个像素块的大小。较大的pixel_size值会导致更明显的像素化，而较小的值则保留了更多的细节。这个参数在控制节点处理的风格化结果中起着关键作用。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- pixelized_image
    - pixelized_image输出代表了像素化处理过程的最终结果。它是一张每个像素块都被平均化以创建风格化、像素化外观的图像。这个输出很重要，因为它体现了节点的主要功能和像素化效果背后的创意意图。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor

# Usage tips
- Infra type: CPU

# Source code
```
class Pixelize:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'image': ('IMAGE',), 'pixel_size': ('INT', {'default': 8, 'min': 2, 'max': 128, 'step': 1})}}
    RETURN_TYPES = ('IMAGE',)
    FUNCTION = 'apply_pixelize'
    CATEGORY = 'postprocessing/Effects'

    def apply_pixelize(self, image: torch.Tensor, pixel_size: int):
        pixelized_image = self.pixelize_image(image, pixel_size)
        pixelized_image = torch.clamp(pixelized_image, 0, 1)
        return (pixelized_image,)

    def pixelize_image(self, image: torch.Tensor, pixel_size: int):
        (batch_size, height, width, channels) = image.shape
        new_height = height // pixel_size
        new_width = width // pixel_size
        image = image.permute(0, 3, 1, 2)
        image = F.avg_pool2d(image, kernel_size=pixel_size, stride=pixel_size)
        image = F.interpolate(image, size=(height, width), mode='nearest')
        image = image.permute(0, 2, 3, 1)
        return image
```