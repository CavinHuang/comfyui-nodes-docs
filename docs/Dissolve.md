# Documentation
- Class name: Dissolve
- Category: postprocessing/Blends
- Output node: False
- Repo Ref: https://github.com/EllangoK/ComfyUI-post-processing-nodes

Dissolve节点旨在根据指定的溶解因子将两张图像无缝混合。它通过生成点阵图案并使用它来确定每张图像对最终输出的贡献，从而在两张图像之间创建平滑的过渡。

# Input types
## Required
- image1
    - image1 是要与第二张图像混合的第一张输入图像。它在最终混合图像的初始组合中起着至关重要的作用。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- image2
    - image2 是要与第一张图像混合的第二张输入图像。它的视觉元素将与 image1 的元素结合，以创建最终输出。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- dissolve_factor
    - 溶解因子是一个浮点值，用于确定 image1 和 image2 之间的混合比例。它影响最终结果中每张图像的可见程度，值为 0.0 时仅显示 image1，值为 1.0 时仅显示 image2。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- dissolve_image
    - Dissolve节点的输出是一张单一的图像，代表了使用指定的溶解因子混合 image1 和 image2 的结果。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor

# Usage tips
- Infra type: CPU

# Source code
```
class Dissolve:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'image1': ('IMAGE',), 'image2': ('IMAGE',), 'dissolve_factor': ('FLOAT', {'default': 0.5, 'min': 0.0, 'max': 1.0, 'step': 0.01})}}
    RETURN_TYPES = ('IMAGE',)
    FUNCTION = 'dissolve_images'
    CATEGORY = 'postprocessing/Blends'

    def dissolve_images(self, image1: torch.Tensor, image2: torch.Tensor, dissolve_factor: float):
        dither_pattern = torch.rand_like(image1)
        mask = (dither_pattern < dissolve_factor).float()
        dissolved_image = image1 * mask + image2 * (1 - mask)
        dissolved_image = torch.clamp(dissolved_image, 0, 1)
        return (dissolved_image,)
```