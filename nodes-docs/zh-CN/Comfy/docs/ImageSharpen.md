# Documentation
- Class name: Sharpen
- Category: image/postprocessing
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

Sharpen节点旨在通过应用锐化滤波器来增强图像的细节。它使用高斯核生成一个锐化掩模，以突出图像中的边缘和细节。在图像清晰度和定义至关重要的后处理任务中，该节点的功能至关重要。

# Input types
## Required
- image
    - 输入图像是Sharpen节点处理的主要数据。它是应用锐化效果的基础，其质量直接影响最终输出。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
## Optional
- sharpen_radius
    - sharpen_radius参数决定了锐化效果的范围。较大的半径会导致更明显的锐化效果，而较小的半径则提供更微妙的增强。
    - Comfy dtype: INT
    - Python dtype: int
- sigma
    - sigma参数控制用于锐化的高斯核的标准差。它影响锐化过渡的平滑度和核影响的扩散。
    - Comfy dtype: FLOAT
    - Python dtype: float
- alpha
    - alpha参数调整锐化效果的强度。alpha的值越高，锐化效果越强烈，而值越低，效果越温和。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- sharpened_image
    - sharpened_image输出是将锐化过程应用于输入图像的结果。它展示了增强的细节和边缘，提供了更清晰和更明确的视觉表现。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor

# Usage tips
- Infra type: CPU

# Source code
```
class Sharpen:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'image': ('IMAGE',), 'sharpen_radius': ('INT', {'default': 1, 'min': 1, 'max': 31, 'step': 1}), 'sigma': ('FLOAT', {'default': 1.0, 'min': 0.1, 'max': 10.0, 'step': 0.01}), 'alpha': ('FLOAT', {'default': 1.0, 'min': 0.0, 'max': 5.0, 'step': 0.01})}}
    RETURN_TYPES = ('IMAGE',)
    FUNCTION = 'sharpen'
    CATEGORY = 'image/postprocessing'

    def sharpen(self, image: torch.Tensor, sharpen_radius: int, sigma: float, alpha: float):
        if sharpen_radius == 0:
            return (image,)
        (batch_size, height, width, channels) = image.shape
        kernel_size = sharpen_radius * 2 + 1
        kernel = gaussian_kernel(kernel_size, sigma, device=image.device) * -(alpha * 10)
        center = kernel_size // 2
        kernel[center, center] = kernel[center, center] - kernel.sum() + 1.0
        kernel = kernel.repeat(channels, 1, 1).unsqueeze(1)
        tensor_image = image.permute(0, 3, 1, 2)
        tensor_image = F.pad(tensor_image, (sharpen_radius, sharpen_radius, sharpen_radius, sharpen_radius), 'reflect')
        sharpened = F.conv2d(tensor_image, kernel, padding=center, groups=channels)[:, :, sharpen_radius:-sharpen_radius, sharpen_radius:-sharpen_radius]
        sharpened = sharpened.permute(0, 2, 3, 1)
        result = torch.clamp(sharpened, 0, 1)
        return (result,)
```