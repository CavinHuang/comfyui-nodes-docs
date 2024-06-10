# Documentation
- Class name: ImageCrop
- Category: image/transform
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

ImageCrop节点旨在通过裁剪来操作图像，将其裁剪到指定的区域。它允许选择由给定的宽度、高度和坐标（x，y）定义的图像的矩形部分。节点的功能对于聚焦图像内的兴趣区域至关重要，这对于对象检测或图像分析等任务非常关键。

# Input types
## Required
- image
    - 图像参数是节点将处理的输入图像。它是节点操作的基础，因为它是裁剪动作的对象。图像的内容和格式显著影响节点的执行和生成的裁剪图像。
    - Comfy dtype: IMAGE
    - Python dtype: PIL.Image.Image or numpy.ndarray
- width
    - 宽度参数指定裁剪区域的宽度，以像素为单位。它是节点功能的一个重要方面，因为它决定了裁剪区域的水平范围。宽度值直接影响输出图像的尺寸。
    - Comfy dtype: INT
    - Python dtype: int
- height
    - 高度参数定义裁剪区域的垂直范围，以像素为单位。它在节点操作中扮演着关键角色，因为它决定了输出图像在垂直方向上的大小。高度值的选择对于裁剪图像的最终外观至关重要。
    - Comfy dtype: INT
    - Python dtype: int
- x
    - x参数表示图像中裁剪操作的水平始点。它至关重要，因为它设置了裁剪区域的左边缘。x值直接影响选定用于裁剪的图像部分。
    - Comfy dtype: INT
    - Python dtype: int
- y
    - y参数确定裁剪操作的垂直起始点。它很重要，因为它设置了要裁剪区域的顶部边缘。y值决定了最终输出中将包含的图像的确切部分。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- cropped_image
    - 裁剪后的图像输出参数代表裁剪操作的结果。它是一个重要的输出，因为它包含了已裁剪到指定尺寸的最终图像。裁剪后的图像的质量和内容直接与提供给节点的输入参数相关。
    - Comfy dtype: IMAGE
    - Python dtype: PIL.Image.Image or numpy.ndarray

# Usage tips
- Infra type: CPU

# Source code
```
class ImageCrop:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'image': ('IMAGE',), 'width': ('INT', {'default': 512, 'min': 1, 'max': MAX_RESOLUTION, 'step': 1}), 'height': ('INT', {'default': 512, 'min': 1, 'max': MAX_RESOLUTION, 'step': 1}), 'x': ('INT', {'default': 0, 'min': 0, 'max': MAX_RESOLUTION, 'step': 1}), 'y': ('INT', {'default': 0, 'min': 0, 'max': MAX_RESOLUTION, 'step': 1})}}
    RETURN_TYPES = ('IMAGE',)
    FUNCTION = 'crop'
    CATEGORY = 'image/transform'

    def crop(self, image, width, height, x, y):
        x = min(x, image.shape[2] - 1)
        y = min(y, image.shape[1] - 1)
        to_x = width + x
        to_y = height + y
        img = image[:, y:to_y, x:to_x, :]
        return (img,)
```