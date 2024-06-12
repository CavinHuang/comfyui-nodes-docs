# Documentation
- Class name: ImageScaleToTotalPixels
- Category: image/upscaling
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

ImageScaleToTotalPixels节点旨在将图像调整到指定的总像素数。它提供了多种放大方法，以确保在缩放过程中保持图像质量。该节点的主要目标是为各种应用提供一种简单高效的图像缩放方式，同时不影响视觉保真度。

# Input types
## Required
- image
    - 图像参数对于节点的操作至关重要，因为它是节点将处理的输入。它是将被放大到所需总像素的原始数据，其质量直接影响最终输出。
    - Comfy dtype: IMAGE
    - Python dtype: PIL.Image.Image or torch.Tensor
- upscale_method
    - upscale_method参数决定了图像将如何被调整大小。它对于控制放大图像的质量至关重要，允许用户在不同的算法之间进行选择，这些算法可能会根据图像内容产生不同的结果。
    - Comfy dtype: STRING
    - Python dtype: str
- megapixels
    - megapixels参数定义了放大图像的目标总像素数。它是缩放过程中的一个关键因素，决定了图像的最终尺寸，即其宽度和高度。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- upscaled_image
    - upscaled_image输出代表了缩放过程的结果。它是节点的主要输出，包含了调整到指定总像素大小的图像，遵循所选择的放大方法以保持质量。
    - Comfy dtype: IMAGE
    - Python dtype: PIL.Image.Image or torch.Tensor

# Usage tips
- Infra type: CPU

# Source code
```
class ImageScaleToTotalPixels:
    upscale_methods = ['nearest-exact', 'bilinear', 'area', 'bicubic', 'lanczos']
    crop_methods = ['disabled', 'center']

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'image': ('IMAGE',), 'upscale_method': (s.upscale_methods,), 'megapixels': ('FLOAT', {'default': 1.0, 'min': 0.01, 'max': 16.0, 'step': 0.01})}}
    RETURN_TYPES = ('IMAGE',)
    FUNCTION = 'upscale'
    CATEGORY = 'image/upscaling'

    def upscale(self, image, upscale_method, megapixels):
        samples = image.movedim(-1, 1)
        total = int(megapixels * 1024 * 1024)
        scale_by = math.sqrt(total / (samples.shape[3] * samples.shape[2]))
        width = round(samples.shape[3] * scale_by)
        height = round(samples.shape[2] * scale_by)
        s = comfy.utils.common_upscale(samples, width, height, upscale_method, 'disabled')
        s = s.movedim(1, -1)
        return (s,)
```