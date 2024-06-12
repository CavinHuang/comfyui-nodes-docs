# Documentation
- Class name: ImageScaleBy
- Category: image/upscaling
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

ImageScaleBy节点旨在通过应用各种上采样方法来提高输入图像的分辨率。它允许用户从一系列缩放技术中选择以实现期望的结果，专注于整体提高图像质量，而不改变原始内容。

# Input types
## Required
- image
    - 图像参数对于节点的操作至关重要，因为它是将要上采样的输入。它直接影响执行过程和最终上采样图像的质量。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- upscale_method
    - upscale_method参数决定了用于图像上采样的算法。对于实现期望的视觉效果和性能至关重要。
    - Comfy dtype: STRING
    - Python dtype: str
- scale_by
    - scale_by参数定义了图像的缩放因子，是最终图像大小的关键决定因素。它显著影响节点的执行和结果。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- upscaled_image
    - upscaled_image输出代表节点的处理结果，展示了使用所选方法上采样后的输入图像版本。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor

# Usage tips
- Infra type: CPU

# Source code
```
class ImageScaleBy:
    upscale_methods = ['nearest-exact', 'bilinear', 'area', 'bicubic', 'lanczos']

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'image': ('IMAGE',), 'upscale_method': (s.upscale_methods,), 'scale_by': ('FLOAT', {'default': 1.0, 'min': 0.01, 'max': 8.0, 'step': 0.01})}}
    RETURN_TYPES = ('IMAGE',)
    FUNCTION = 'upscale'
    CATEGORY = 'image/upscaling'

    def upscale(self, image, upscale_method, scale_by):
        samples = image.movedim(-1, 1)
        width = round(samples.shape[3] * scale_by)
        height = round(samples.shape[2] * scale_by)
        s = comfy.utils.common_upscale(samples, width, height, upscale_method, 'disabled')
        s = s.movedim(1, -1)
        return (s,)
```