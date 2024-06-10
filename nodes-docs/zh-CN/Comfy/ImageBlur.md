# Documentation
- Class name: Blur
- Category: image/postprocessing
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

模糊节点旨在对图像应用高斯模糊，增强其平滑度并减少噪声。它通过将图像与基于提供的模糊半径和σ值生成的高斯核进行卷积来实现这一点。当图像清晰度不太关键或需要柔和效果时，此节点特别适用于后处理任务。

# Input types
## Required
- image
    - 图像参数是模糊节点将处理的输入图像。它是节点操作的基本，因为整个转换都围绕这个输入进行。图像的质量和分辨率直接影响模糊效果应用后输出的外观。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
## Optional
- blur_radius
    - 模糊半径参数决定了应用于图像的模糊效果的程度。较大的值会导致更明显的模糊，而较小的值则产生更微妙的效果。它在控制节点操作的视觉结果中起着关键作用。
    - Comfy dtype: INT
    - Python dtype: int
- sigma
    - σ参数定义了用于模糊的高斯核的标准差。它控制图像中模糊和非模糊区域之间过渡的锐利度。较高的σ值导致更广泛的模糊，而较低的值则产生更局部化的效果。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- blurred_image
    - 模糊图像输出是将高斯模糊应用于输入图像的结果。它代表了模糊节点的主要结果，对于后续的图像处理步骤或可视化至关重要。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor

# Usage tips
- Infra type: GPU

# Source code
```
class Blur:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'image': ('IMAGE',), 'blur_radius': ('INT', {'default': 1, 'min': 1, 'max': 31, 'step': 1}), 'sigma': ('FLOAT', {'default': 1.0, 'min': 0.1, 'max': 10.0, 'step': 0.1})}}
    RETURN_TYPES = ('IMAGE',)
    FUNCTION = 'blur'
    CATEGORY = 'image/postprocessing'

    def blur(self, image: torch.Tensor, blur_radius: int, sigma: float):
        if blur_radius == 0:
            return (image,)
        (batch_size, height, width, channels) = image.shape
        kernel_size = blur_radius * 2 + 1
        kernel = gaussian_kernel(kernel_size, sigma, device=image.device).repeat(channels, 1, 1).unsqueeze(1)
        image = image.permute(0, 3, 1, 2)
        padded_image = F.pad(image, (blur_radius, blur_radius, blur_radius, blur_radius), 'reflect')
        blurred = F.conv2d(padded_image, kernel, padding=kernel_size // 2, groups=channels)[:, :, blur_radius:-blur_radius, blur_radius:-blur_radius]
        blurred = blurred.permute(0, 2, 3, 1)
        return (blurred,)
```