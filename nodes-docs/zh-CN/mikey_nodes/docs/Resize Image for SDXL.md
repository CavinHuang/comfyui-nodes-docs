# Documentation
- Class name: ResizeImageSDXL
- Category: Mikey/Image
- Output node: False
- Repo Ref: https://github.com/bash-j/mikey_nodes

ResizeImageSDXL 节点旨在使用多种方法调整和放大图像尺寸。它提供调整图像尺寸的功能，同时保持其长宽比并应用不同的放大技术以提高质量。

# Input types
## Required
- image
    - 图像参数对于节点的操作至关重要，因为它是将要被调整尺寸和放大的输入。它直接影响执行过程和最终输出图像的质量和尺寸。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- upscale_method
    - upscale_method 参数决定了用于放大图像的算法。它对于调整尺寸后的图像质量至关重要，并允许使用不同的插值技术。
    - Comfy dtype: COMBO['nearest-exact', 'bilinear', 'area', 'bicubic']
    - Python dtype: str
- crop
    - crop 参数指定了调整尺寸后图像是否以及如何被裁剪。它对于控制输出图像的最终尺寸和长宽比非常重要。
    - Comfy dtype: COMBO['disabled', 'center']
    - Python dtype: str

# Output types
- resized_image
    - resized_image 输出代表了调整尺寸和放大后的处理图像。它是节点操作的主要结果，并反映了所选方法对图像尺寸和质量的影响。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor

# Usage tips
- Infra type: CPU

# Source code
```
class ResizeImageSDXL:
    crop_methods = ['disabled', 'center']
    upscale_methods = ['nearest-exact', 'bilinear', 'area', 'bicubic']

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'image': ('IMAGE',), 'upscale_method': (s.upscale_methods,), 'crop': (s.crop_methods,)}}
    RETURN_TYPES = ('IMAGE',)
    FUNCTION = 'resize'
    CATEGORY = 'Mikey/Image'

    def upscale(self, image, upscale_method, width, height, crop):
        samples = image.movedim(-1, 1)
        s = comfy.utils.common_upscale(samples, width, height, upscale_method, crop)
        s = s.movedim(1, -1)
        return (s,)

    def resize(self, image, upscale_method, crop):
        (w, h) = find_latent_size(image.shape[2], image.shape[1])
        img = self.upscale(image, upscale_method, w, h, crop)[0]
        return (img,)
```