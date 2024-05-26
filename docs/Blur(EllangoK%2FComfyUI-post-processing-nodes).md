# Documentation
- Class name: Blur
- Category: postprocessing/Filters
- Output node: False
- Repo Ref: https://github.com/EllangoK/ComfyUI-post-processing-nodes

模糊节点对图像应用高斯模糊，有效地减少噪声并平滑边缘，这在图像分析和增强的后处理步骤中非常有用。

# Input types
## Required
- image
    - 图像参数是必需的，因为它是模糊操作的主要输入。它决定了将由节点处理的源数据。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- blur_radius
    - 模糊半径决定了模糊效果的程度。较大的半径会导致更明显的模糊，这对整体视觉效果可能很重要。
    - Comfy dtype: INT
    - Python dtype: int
- sigma
    - sigma参数影响高斯核的标准差，直接影响模糊的平滑度。这是实现所需美学效果的关键因素。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- blurred_image
    - 输出是模糊后的图像，这是应用高斯模糊后输入图像的处理结果。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor

# Usage tips
- Infra type: CPU

# Source code
```
class Blur:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'image': ('IMAGE',), 'blur_radius': ('INT', {'default': 1, 'min': 1, 'max': 15, 'step': 1}), 'sigma': ('FLOAT', {'default': 1.0, 'min': 0.1, 'max': 10.0, 'step': 0.1})}}
    RETURN_TYPES = ('IMAGE',)
    FUNCTION = 'blur'
    CATEGORY = 'postprocessing/Filters'

    def blur(self, image: torch.Tensor, blur_radius: int, sigma: float):
        if blur_radius == 0:
            return (image,)
        (batch_size, height, width, channels) = image.shape
        kernel_size = blur_radius * 2 + 1
        kernel = gaussian_kernel(kernel_size, sigma).repeat(channels, 1, 1).unsqueeze(1)
        image = image.permute(0, 3, 1, 2)
        blurred = F.conv2d(image, kernel, padding=kernel_size // 2, groups=channels)
        blurred = blurred.permute(0, 2, 3, 1)
        return (blurred,)
```