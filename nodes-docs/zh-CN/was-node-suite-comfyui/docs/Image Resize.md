# Documentation
- Class name: WAS_Image_Rescale
- Category: WAS Suite/Image/Transform
- Output node: False
- Repo Ref: https://github.com/WASasquatch/was-node-suite-comfyui

WAS_Image_Rescale节点旨在通过根据指定的因子缩放图像或将图像调整为设定的宽度和高度来转换图像。它提供了选择缩放模式的灵活性，无论是简单的重新缩放还是带有超采样的调整大小以提高质量。该节点能够处理各种重采样过滤器，以满足不同的图像质量要求。

# Input types
## Required
- image
    - 输入图像是转换过程的核心元素。它决定了缩放或调整大小操作的对象。输入图像的质量和尺寸直接影响节点执行的结果。
    - Comfy dtype: IMAGE
    - Python dtype: PIL.Image.Image
## Optional
- mode
    - 模式参数决定图像将通过因子缩放还是调整到特定尺寸。它对于设置节点将执行的转换类型至关重要。
    - Comfy dtype: STRING
    - Python dtype: str
- supersample
    - 当supersample参数设置为'true'时，它通过先将图像缩放到更大的尺寸，然后再将其调整到目标尺寸，从而启用更高质量的调整大小过程。
    - Comfy dtype: STRING
    - Python dtype: str
- resampling
    - 重采样参数选择用于调整图像大小的过滤器。不同的过滤器在图像质量和清晰度方面可以产生不同的结果。
    - Comfy dtype: STRING
    - Python dtype: str
- rescale_factor
    - rescale_factor定义了图像的缩放因子。它是一个乘数，决定了图像尺寸调整的程度。
    - Comfy dtype: FLOAT
    - Python dtype: float
- resize_width
    - resize_width设置了调整大小后的图像的目标宽度。当模式设置为'resize'时，这是一个重要参数，它决定了图像的新宽度。
    - Comfy dtype: INT
    - Python dtype: int
- resize_height
    - resize_height设置了调整大小后的图像的目标高度。它与resize_width一起工作，以确定在'resize'模式下图像的最终尺寸。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- scaled_image
    - scaled_image是节点的输出，代表应用缩放或调整大小操作后转换的图像。它是重要的，因为它反映了节点预期功能的成果。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor

# Usage tips
- Infra type: CPU

# Source code
```
class WAS_Image_Rescale:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'image': ('IMAGE',), 'mode': (['rescale', 'resize'],), 'supersample': (['true', 'false'],), 'resampling': (['lanczos', 'nearest', 'bilinear', 'bicubic'],), 'rescale_factor': ('FLOAT', {'default': 2, 'min': 0.01, 'max': 16.0, 'step': 0.01}), 'resize_width': ('INT', {'default': 1024, 'min': 1, 'max': 48000, 'step': 1}), 'resize_height': ('INT', {'default': 1536, 'min': 1, 'max': 48000, 'step': 1})}}
    RETURN_TYPES = ('IMAGE',)
    FUNCTION = 'image_rescale'
    CATEGORY = 'WAS Suite/Image/Transform'

    def image_rescale(self, image, mode='rescale', supersample='true', resampling='lanczos', rescale_factor=2, resize_width=1024, resize_height=1024):
        scaled_images = []
        for img in image:
            scaled_images.append(pil2tensor(self.apply_resize_image(tensor2pil(img), mode, supersample, rescale_factor, resize_width, resize_height, resampling)))
        scaled_images = torch.cat(scaled_images, dim=0)
        return (scaled_images,)

    def apply_resize_image(self, image: Image.Image, mode='scale', supersample='true', factor: int=2, width: int=1024, height: int=1024, resample='bicubic'):
        (current_width, current_height) = image.size
        if mode == 'rescale':
            (new_width, new_height) = (int(current_width * factor), int(current_height * factor))
        else:
            new_width = width if width % 8 == 0 else width + (8 - width % 8)
            new_height = height if height % 8 == 0 else height + (8 - height % 8)
        resample_filters = {'nearest': 0, 'bilinear': 2, 'bicubic': 3, 'lanczos': 1}
        if supersample == 'true':
            image = image.resize((new_width * 8, new_height * 8), resample=Image.Resampling(resample_filters[resample]))
        resized_image = image.resize((new_width, new_height), resample=Image.Resampling(resample_filters[resample]))
        return resized_image
```