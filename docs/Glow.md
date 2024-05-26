# Documentation
- Class name: Glow
- Category: postprocessing/Effects
- Output node: False
- Repo Ref: https://github.com/EllangoK/ComfyUI-post-processing-nodes

该节点为图像应用发光效果，通过增加可调节强度的模糊图像版本来增强其视觉吸引力。它旨在改善后处理阶段图像的美观性，提供一种主题性的光芒，可以吸引人们对某些特征的注意或创造梦幻般的氛围。

# Input types
## Required
- image
    - 图像参数至关重要，因为它是应用发光效果的基础输入。它决定了最终输出的内容和结构，发光效果直接受到图像特征和质量的影响。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- intensity
    - 强度参数控制发光效果的显著程度，数值越高，发光越明显。它在调整效果的视觉影响力方面至关重要，允许微调发光的强度以达到所需的美学效果。
    - Comfy dtype: FLOAT
    - Python dtype: float
- blur_radius
    - 模糊半径参数规定了为发光效果应用到图像的模糊程度。它影响发光的扩散和平滑度，较大的半径会导致更分散和广泛的亮度。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- glowing_image
    - 生成的发光图像是该节点的主要输出，代表增强了发光效果的原始图像。它包含了输入参数的综合视觉修改，提供了输入图像视觉上引人入胜的呈现。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor

# Usage tips
- Infra type: GPU

# Source code
```
class Glow:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'image': ('IMAGE',), 'intensity': ('FLOAT', {'default': 1.0, 'min': 0.0, 'max': 5.0, 'step': 0.01}), 'blur_radius': ('INT', {'default': 5, 'min': 1, 'max': 50, 'step': 1})}}
    RETURN_TYPES = ('IMAGE',)
    FUNCTION = 'apply_glow'
    CATEGORY = 'postprocessing/Effects'

    def apply_glow(self, image: torch.Tensor, intensity: float, blur_radius: int):
        blurred_image = self.gaussian_blur(image, 2 * blur_radius + 1)
        glowing_image = self.add_glow(image, blurred_image, intensity)
        glowing_image = torch.clamp(glowing_image, 0, 1)
        return (glowing_image,)

    def gaussian_blur(self, image: torch.Tensor, kernel_size: int):
        (batch_size, height, width, channels) = image.shape
        sigma = (kernel_size - 1) / 6
        kernel = gaussian_kernel(kernel_size, sigma).repeat(channels, 1, 1).unsqueeze(1)
        image = image.permute(0, 3, 1, 2)
        blurred = F.conv2d(image, kernel, padding=kernel_size // 2, groups=channels)
        blurred = blurred.permute(0, 2, 3, 1)
        return blurred

    def add_glow(self, img, blurred_img, intensity):
        return img + blurred_img * intensity
```