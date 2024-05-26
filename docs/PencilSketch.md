# Documentation
- Class name: PencilSketch
- Category: postprocessing/Effects
- Output node: False
- Repo Ref: https://github.com/EllangoK/ComfyUI-post-processing-nodes

PencilSketch节点旨在将图像转换为铅笔素描风格。它应用一系列图像处理技术来实现一种模仿手绘素描外观的风格化表示。

# Input types
## Required
- image
    - 图像参数对于PencilSketch节点至关重要，因为它是将被转换成铅笔素描的输入。它通过确定输出素描的内容和质量来影响节点的执行。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- blur_radius
    - 模糊半径参数控制应用素描效果之前对图像应用的模糊量。它在确定最终素描的平滑度方面起着重要作用。
    - Comfy dtype: INT
    - Python dtype: int
- sharpen_alpha
    - sharpen_alpha参数调整应用于最终图像的锐化效果的强度。它对于微调铅笔素描的对比度和清晰度很重要。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- output_image
    - output_image是将铅笔素描效果应用于输入图像的结果。它代表了以铅笔素描形式的最终风格化图像。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor

# Usage tips
- Infra type: CPU

# Source code
```
class PencilSketch:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'image': ('IMAGE',), 'blur_radius': ('INT', {'default': 5, 'min': 1, 'max': 31, 'step': 1}), 'sharpen_alpha': ('FLOAT', {'default': 1.0, 'min': 0.0, 'max': 10.0, 'step': 0.1})}}
    RETURN_TYPES = ('IMAGE',)
    FUNCTION = 'apply_sketch'
    CATEGORY = 'postprocessing/Effects'

    def apply_sketch(self, image: torch.Tensor, blur_radius: int=5, sharpen_alpha: float=1):
        image = image.permute(0, 3, 1, 2)
        grayscale = image.mean(dim=1, keepdim=True)
        grayscale = grayscale.repeat(1, 3, 1, 1)
        inverted = 1 - grayscale
        blur_sigma = blur_radius / 3
        blurred = self.gaussian_blur(inverted, blur_radius, blur_sigma)
        final_image = self.dodge(blurred, grayscale)
        if sharpen_alpha != 0.0:
            final_image = self.sharpen(final_image, 1, sharpen_alpha)
        final_image = final_image.permute(0, 2, 3, 1)
        return (final_image,)

    def dodge(self, front: torch.Tensor, back: torch.Tensor) -> torch.Tensor:
        result = back / (1 - front + 1e-07)
        result = torch.clamp(result, 0, 1)
        return result

    def gaussian_blur(self, image: torch.Tensor, blur_radius: int, sigma: float):
        if blur_radius == 0:
            return image
        (batch_size, channels, height, width) = image.shape
        kernel_size = blur_radius * 2 + 1
        kernel = gaussian_kernel(kernel_size, sigma).repeat(channels, 1, 1).unsqueeze(1)
        blurred = F.conv2d(image, kernel, padding=kernel_size // 2, groups=channels)
        return blurred

    def sharpen(self, image: torch.Tensor, blur_radius: int, alpha: float):
        if blur_radius == 0:
            return image
        (batch_size, channels, height, width) = image.shape
        kernel_size = blur_radius * 2 + 1
        kernel = torch.ones((kernel_size, kernel_size), dtype=torch.float32) * -1
        center = kernel_size // 2
        kernel[center, center] = kernel_size ** 2
        kernel *= alpha
        kernel = kernel.repeat(channels, 1, 1).unsqueeze(1)
        sharpened = F.conv2d(image, kernel, padding=center, groups=channels)
        result = torch.clamp(sharpened, 0, 1)
        return result
```