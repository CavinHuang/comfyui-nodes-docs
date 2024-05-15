# Documentation
- Class name: Blend
- Category: image/postprocessing
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

Blend节点旨在使用指定的混合因子和混合模式将两张图像无缝地结合在一起，从而产生视觉上连贯的输出。它调整不透明度并应用各种混合技术以实现所需的美学效果。

# Input types
## Required
- image1
    - image1是将与第二张图像混合的第一张输入图像。它在确定最终混合图像的外观中起着至关重要的作用。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- image2
    - image2是将与第一张图像混合的第二张输入图像。它对最终图像的贡献受混合因子和混合模式的影响。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- blend_factor
    - 混合因子决定了第二张图像与第一张图像混合的程度。这是一个关键参数，用于控制两张图像之间的平衡。
    - Comfy dtype: FLOAT
    - Python dtype: float
- blend_mode
    - 混合模式决定了用于混合图像的算法。它显著影响混合操作的最终视觉效果。
    - Comfy dtype: COMBO['normal', 'multiply', 'screen', 'overlay', 'soft_light', 'difference']
    - Python dtype: str

# Output types
- blended_image
    - 混合后的图像是blend_images函数的输出，代表了两张输入图像在应用了混合因子和混合模式后的组合结果。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor

# Usage tips
- Infra type: CPU

# Source code
```
class Blend:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'image1': ('IMAGE',), 'image2': ('IMAGE',), 'blend_factor': ('FLOAT', {'default': 0.5, 'min': 0.0, 'max': 1.0, 'step': 0.01}), 'blend_mode': (['normal', 'multiply', 'screen', 'overlay', 'soft_light', 'difference'],)}}
    RETURN_TYPES = ('IMAGE',)
    FUNCTION = 'blend_images'
    CATEGORY = 'image/postprocessing'

    def blend_images(self, image1: torch.Tensor, image2: torch.Tensor, blend_factor: float, blend_mode: str):
        image2 = image2.to(image1.device)
        if image1.shape != image2.shape:
            image2 = image2.permute(0, 3, 1, 2)
            image2 = comfy.utils.common_upscale(image2, image1.shape[2], image1.shape[1], upscale_method='bicubic', crop='center')
            image2 = image2.permute(0, 2, 3, 1)
        blended_image = self.blend_mode(image1, image2, blend_mode)
        blended_image = image1 * (1 - blend_factor) + blended_image * blend_factor
        blended_image = torch.clamp(blended_image, 0, 1)
        return (blended_image,)

    def blend_mode(self, img1, img2, mode):
        if mode == 'normal':
            return img2
        elif mode == 'multiply':
            return img1 * img2
        elif mode == 'screen':
            return 1 - (1 - img1) * (1 - img2)
        elif mode == 'overlay':
            return torch.where(img1 <= 0.5, 2 * img1 * img2, 1 - 2 * (1 - img1) * (1 - img2))
        elif mode == 'soft_light':
            return torch.where(img2 <= 0.5, img1 - (1 - 2 * img2) * img1 * (1 - img1), img1 + (2 * img2 - 1) * (self.g(img1) - img1))
        elif mode == 'difference':
            return img1 - img2
        else:
            raise ValueError(f'Unsupported blend mode: {mode}')

    def g(self, x):
        return torch.where(x <= 0.25, ((16 * x - 12) * x + 4) * x, torch.sqrt(x))
```