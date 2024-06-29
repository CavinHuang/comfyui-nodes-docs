# Documentation
- Class name: ImageScale
- Category: image/upscaling
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

ImageScale节点旨在通过各种上采样方法提高数字图像的分辨率。它为用户提供了一个简单的接口，可以通过指定新的尺寸或保持纵横比来缩放图像。该节点支持一系列上采样算法，适用于不同的用例，以实现高质量的图像放大。

# Input types
## Required
- image
    - 图像参数是节点将处理的输入数字图像。这是基础，因为节点的所有操作都围绕着提高这张图像的分辨率进行。
    - Comfy dtype: IMAGE
    - Python dtype: PIL.Image.Image or torch.Tensor
- upscale_method
    - upscale_method参数决定了用于放大图像的算法。它至关重要，因为它直接影响上采样的质量和风格。
    - Comfy dtype: STRING
    - Python dtype: str
- crop
    - crop参数定义了上采样后是否以及如何裁剪图像。它对于控制图像的最终构图至关重要。
    - Comfy dtype: STRING
    - Python dtype: str
## Optional
- width
    - width参数指定了缩放图像的新宽度。它很重要，因为它决定了图像将调整大小的其中一个维度。
    - Comfy dtype: INT
    - Python dtype: int
- height
    - height参数指定了缩放图像的新高度。它的重要性在于控制输出图像的垂直维度。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- upscaled_image
    - upscaled_image是节点的输出，代表使用指定方法放大后的图像。它是节点处理的结果，也是上采样操作的直接结果。
    - Comfy dtype: IMAGE
    - Python dtype: PIL.Image.Image or torch.Tensor

# Usage tips
- Infra type: CPU

# Source code
```
class ImageScale:
    upscale_methods = ['nearest-exact', 'bilinear', 'area', 'bicubic', 'lanczos']
    crop_methods = ['disabled', 'center']

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'image': ('IMAGE',), 'upscale_method': (s.upscale_methods,), 'width': ('INT', {'default': 512, 'min': 0, 'max': MAX_RESOLUTION, 'step': 1}), 'height': ('INT', {'default': 512, 'min': 0, 'max': MAX_RESOLUTION, 'step': 1}), 'crop': (s.crop_methods,)}}
    RETURN_TYPES = ('IMAGE',)
    FUNCTION = 'upscale'
    CATEGORY = 'image/upscaling'

    def upscale(self, image, upscale_method, width, height, crop):
        if width == 0 and height == 0:
            s = image
        else:
            samples = image.movedim(-1, 1)
            if width == 0:
                width = max(1, round(samples.shape[3] * height / samples.shape[2]))
            elif height == 0:
                height = max(1, round(samples.shape[2] * width / samples.shape[3]))
            s = comfy.utils.common_upscale(samples, width, height, upscale_method, crop)
            s = s.movedim(1, -1)
        return (s,)
```