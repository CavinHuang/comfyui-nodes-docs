# Documentation
- Class name: ArithmeticBlend
- Category: postprocessing/Blends
- Output node: False
- Repo Ref: https://github.com/EllangoK/ComfyUI-post-processing-nodes

该节点通过算术运算实现两幅图像的合成，通过选择的混合模式（blend_mode）来创建视觉效果，实现对image1和image2的融合。

# Input types
## Required
- image1
    - 要混合的第一幅图像，对于算术运算的发生至关重要，并影响最终输出结果。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- image2
    - 参与混合过程的第二幅图像，与image1相互作用，决定了生成的混合图像的特征。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- blend_mode
    - 算术运算的模式，决定了如何组合image1和image2，显著影响最终的视觉结果。
    - Comfy dtype: COMBO['add', 'subtract', 'difference']
    - Python dtype: str

# Output types
- blended_image
    - 算术混合过程后的生成图像，包含了所选混合模式的视觉效应。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor

# Usage tips
- Infra type: CPU

# Source code
```
class ArithmeticBlend:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'image1': ('IMAGE',), 'image2': ('IMAGE',), 'blend_mode': (['add', 'subtract', 'difference'],)}}
    RETURN_TYPES = ('IMAGE',)
    FUNCTION = 'arithmetic_blend_images'
    CATEGORY = 'postprocessing/Blends'

    def arithmetic_blend_images(self, image1: torch.Tensor, image2: torch.Tensor, blend_mode: str):
        if blend_mode == 'add':
            blended_image = self.add(image1, image2)
        elif blend_mode == 'subtract':
            blended_image = self.subtract(image1, image2)
        elif blend_mode == 'difference':
            blended_image = self.difference(image1, image2)
        else:
            raise ValueError(f'Unsupported arithmetic blend mode: {blend_mode}')
        blended_image = torch.clamp(blended_image, 0, 1)
        return (blended_image,)

    def add(self, img1, img2):
        return img1 + img2

    def subtract(self, img1, img2):
        return img1 - img2

    def difference(self, img1, img2):
        return torch.abs(img1 - img2)
```