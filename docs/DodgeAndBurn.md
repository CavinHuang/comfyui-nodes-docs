# Documentation
- Class name: DodgeAndBurn
- Category: postprocessing/Blends
- Output node: False
- Repo Ref: https://github.com/EllangoK/ComfyUI-post-processing-nodes

DodgeAndBurn节点旨在通过应用 dodge 和 burn 技术来增强图像，这些技术可以操纵图像中特定区域的亮度和对比度。通过使用遮罩和调整强度，此节点可以选择性地变亮或变暗区域，创建深度并吸引人们对特定区域的注意。

# Input types
## Required
- image
    - 图像参数是 DodgeAndBurn 节点的主要输入，它将成为通过 dodging 和 burning 技术修改的基础层。其质量和内容直接影响最终输出。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- mask
    - 遮罩参数决定了图像中哪些区域将受到 dodge 和 burn 过程的影响。它在控制对图像进行的调整的精确性方面起着至关重要的作用。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- intensity
    - 强度是一个关键参数，它控制应用于图像的变亮或变暗的程度。调整此值会影响 dodge 和 burn 技术的整体影响。
    - Comfy dtype: FLOAT
    - Python dtype: float
- mode
    - 模式参数决定了要应用的特定 dodge 和 burn 技术。它影响图像调整的方式，满足不同的创意或风格偏好。
    - Comfy dtype: COMBO[ ['dodge', 'burn', 'dodge_and_burn', 'burn_and_dodge', 'color_dodge', 'color_burn', 'linear_dodge', 'linear_burn'],]
    - Python dtype: str

# Output types
- output_image
    - 输出图像代表 dodge 和 burn 过程的最终结果，反映了基于输入参数对原始图像所做的调整。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor

# Usage tips
- Infra type: CPU

# Source code
```
class DodgeAndBurn:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'image': ('IMAGE',), 'mask': ('IMAGE',), 'intensity': ('FLOAT', {'default': 0.5, 'min': 0.0, 'max': 1.0, 'step': 0.01}), 'mode': (['dodge', 'burn', 'dodge_and_burn', 'burn_and_dodge', 'color_dodge', 'color_burn', 'linear_dodge', 'linear_burn'],)}}
    RETURN_TYPES = ('IMAGE',)
    FUNCTION = 'dodge_and_burn'
    CATEGORY = 'postprocessing/Blends'

    def dodge_and_burn(self, image: torch.Tensor, mask: torch.Tensor, intensity: float, mode: str):
        if mode in ['dodge', 'color_dodge', 'linear_dodge']:
            dodged_image = self.dodge(image, mask, intensity, mode)
            return (dodged_image,)
        elif mode in ['burn', 'color_burn', 'linear_burn']:
            burned_image = self.burn(image, mask, intensity, mode)
            return (burned_image,)
        elif mode == 'dodge_and_burn':
            dodged_image = self.dodge(image, mask, intensity, 'dodge')
            burned_image = self.burn(dodged_image, mask, intensity, 'burn')
            return (burned_image,)
        elif mode == 'burn_and_dodge':
            burned_image = self.burn(image, mask, intensity, 'burn')
            dodged_image = self.dodge(burned_image, mask, intensity, 'dodge')
            return (dodged_image,)
        else:
            raise ValueError(f'Unsupported dodge and burn mode: {mode}')

    def dodge(self, img, mask, intensity, mode):
        if mode == 'dodge':
            return img / (1 - mask * intensity + 1e-07)
        elif mode == 'color_dodge':
            return torch.where(mask < 1, img / (1 - mask * intensity), img)
        elif mode == 'linear_dodge':
            return torch.clamp(img + mask * intensity, 0, 1)
        else:
            raise ValueError(f'Unsupported dodge mode: {mode}')

    def burn(self, img, mask, intensity, mode):
        if mode == 'burn':
            return 1 - (1 - img) / (mask * intensity + 1e-07)
        elif mode == 'color_burn':
            return torch.where(mask > 0, 1 - (1 - img) / (mask * intensity), img)
        elif mode == 'linear_burn':
            return torch.clamp(img - mask * intensity, 0, 1)
        else:
            raise ValueError(f'Unsupported burn mode: {mode}')
```