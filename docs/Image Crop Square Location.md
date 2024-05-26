# Documentation
- Class name: WAS_Image_Crop_Square_Location
- Category: WAS Suite/Image/Process
- Output node: False
- Repo Ref: https://github.com/WASasquatch/was-node-suite-comfyui

WAS_Image_Crop_Square_Location节点旨在通过基于指定位置坐标裁剪图像来处理图像，将其裁剪成正方形。它智能地调整裁剪区域，以确保结果图像是正方形的，即使指定的区域不是完全正方形。这个节点特别适用于需要统一图像尺寸的应用，例如社交媒体帖子或机器学习模型的数据输入。

# Input types
## Required
- image
    - 图像参数是节点将处理的输入图像。它对节点的操作至关重要，因为它是裁剪操作的对象。图像的内容和尺寸将直接影响裁剪过程的结果。
    - Comfy dtype: IMAGE
    - Python dtype: PIL.Image.Image or torch.Tensor
## Optional
- x
    - x参数指定了裁剪操作将从中心开始的水平坐标。它在确定图像中裁剪区域的位置方面起着关键作用。如果没有提供特定值，则默认值设置为确保中心裁剪。
    - Comfy dtype: INT
    - Python dtype: int
- y
    - y参数定义了裁剪操作将从中心开始的垂直坐标。与x参数类似，它对于精确定位图像中的裁剪位置至关重要。如果没有用户指定的值，则默认值确保中心裁剪。
    - Comfy dtype: INT
    - Python dtype: int
- size
    - size参数决定了裁剪图像的正方形边长。它是实现所需输出尺寸的关键决定因素。节点确保裁剪尽可能接近此尺寸，同时不超过图像边界。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- cropped_image
    - 裁剪后的图像输出是裁剪过程的结果。它是从输入图像派生出的正方形图像，以指定的位置坐标为中心。这个输出对于需要标准化图像格式的应用来说非常重要。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- crop_data
    - crop_data输出提供了有关裁剪过程的元数据，包括裁剪图像的大小和裁剪区域的坐标。这些信息对于进一步的图像处理或分析可能很有用。
    - Comfy dtype: CROP_DATA
    - Python dtype: Tuple[int, Tuple[int, int, int, int]]

# Usage tips
- Infra type: CPU

# Source code
```
class WAS_Image_Crop_Square_Location:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'image': ('IMAGE',), 'x': ('INT', {'default': 0, 'max': 24576, 'min': 0, 'step': 1}), 'y': ('INT', {'default': 0, 'max': 24576, 'min': 0, 'step': 1}), 'size': ('INT', {'default': 256, 'max': 4096, 'min': 5, 'step': 1})}}
    RETURN_TYPES = ('IMAGE', 'CROP_DATA')
    FUNCTION = 'image_crop_location'
    CATEGORY = 'WAS Suite/Image/Process'

    def image_crop_location(self, image, x=256, y=256, size=512):
        image = tensor2pil(image)
        (img_width, img_height) = image.size
        exp_size = size // 2
        left = max(x - exp_size, 0)
        top = max(y - exp_size, 0)
        right = min(x + exp_size, img_width)
        bottom = min(y + exp_size, img_height)
        if right - left < size:
            if right < img_width:
                right = min(right + size - (right - left), img_width)
            elif left > 0:
                left = max(left - (size - (right - left)), 0)
        if bottom - top < size:
            if bottom < img_height:
                bottom = min(bottom + size - (bottom - top), img_height)
            elif top > 0:
                top = max(top - (size - (bottom - top)), 0)
        crop = image.crop((left, top, right, bottom))
        crop_data = (crop.size, (left, top, right, bottom))
        crop = crop.resize((crop.size[0] // 8 * 8, crop.size[1] // 8 * 8))
        return (pil2tensor(crop), crop_data)
```