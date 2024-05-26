# Documentation
- Class name: CreateRectMask
- Category: Masquerade Nodes
- Output node: False
- Repo Ref: https://github.com/BadCafeCode/masquerade-nodes-comfyui

CreateRectMask 节点旨在根据指定的参数生成矩形掩码。它计算掩码角落的坐标，考虑到测量模式（百分比或像素）、矩形的原点以及提供的尺寸。该节点非常灵活，允许自定义掩码相对于应用图像的位置和大小。它还提供了一个选项来复制图像大小，以实现动态掩码创建。

# Input types
## Required
- mode
    - mode 参数确定掩码尺寸的测量单位。它可以是 'percent' 表示基于百分比的坐标，或者是 'pixels' 表示绝对像素值。
    - Comfy dtype: str
    - Python dtype: str
- origin
    - origin 参数决定了计算掩码位置的参考点。它可以是 'topleft'、'bottomleft'、'topleft' 或 'bottomright' 中的一个。
    - Comfy dtype: str
    - Python dtype: str
- x
    - x 参数指定掩码起始点的水平位置。它与模式和原点一起使用，以确定掩码的位置。
    - Comfy dtype: float
    - Python dtype: float
- y
    - y 参数指定掩码起始点的垂直位置。它与 x 参数和其他设置一起工作，以建立掩码的坐标。
    - Comfy dtype: float
    - Python dtype: float
- width
    - width 参数设置掩码的宽度。这是一个关键的尺寸，与高度一起定义了掩码的形状和覆盖区域。
    - Comfy dtype: float
    - Python dtype: float
- height
    - height 参数设置掩码的垂直范围。它在确定掩码的总体大小和它所包含的区域方面至关重要。
    - Comfy dtype: float
    - Python dtype: float
- image_width
    - image_width 参数定义了将应用掩码的图像的宽度。如果模式设置为 'percent'，它对于确保掩码尺寸正确缩放非常重要。
    - Comfy dtype: int
    - Python dtype: int
- image_height
    - image_height 参数定义了图像的高度。它与 image_width 类似，在根据图像大小缩放掩码尺寸方面起着类似的作用。
    - Comfy dtype: int
    - Python dtype: int
## Optional
- copy_image_size
    - 可选的 copy_image_size 参数允许掩码采用所提供图像的尺寸。这对于创建基于所应用图像的动态尺寸的掩码非常有用。
    - Comfy dtype: IMAGE
    - Python dtype: PIL.Image or torch.Tensor

# Output types
- mask
    - 输出掩码是一个二进制图像，表示由输入参数定义的矩形区域。它是各种图像处理任务（如对象分割或掩码）的关键组件。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor

# Usage tips
- Infra type: CPU

# Source code
```
class CreateRectMask:
    """
    Creates a rectangle mask. If copy_image_size is provided, the image_width and image_height parameters are ignored and the size of the given images will be used instead.
    """

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'mode': (['percent', 'pixels'],), 'origin': (['topleft', 'bottomleft', 'topright', 'bottomright'],), 'x': ('FLOAT', {'default': 0, 'min': 0, 'max': VERY_BIG_SIZE, 'step': 1}), 'y': ('FLOAT', {'default': 0, 'min': 0, 'max': VERY_BIG_SIZE, 'step': 1}), 'width': ('FLOAT', {'default': 50, 'min': 0, 'max': VERY_BIG_SIZE, 'step': 1}), 'height': ('FLOAT', {'default': 50, 'min': 0, 'max': VERY_BIG_SIZE, 'step': 1}), 'image_width': ('INT', {'default': 512, 'min': 64, 'max': VERY_BIG_SIZE, 'step': 64}), 'image_height': ('INT', {'default': 512, 'min': 64, 'max': VERY_BIG_SIZE, 'step': 64})}, 'optional': {'copy_image_size': ('IMAGE',)}}
    RETURN_TYPES = ('IMAGE',)
    FUNCTION = 'create_mask'
    CATEGORY = 'Masquerade Nodes'

    def create_mask(self, mode, origin, x, y, width, height, image_width, image_height, copy_image_size=None):
        min_x = x
        min_y = y
        max_x = min_x + width
        max_y = min_y + height
        if copy_image_size is not None:
            size = copy_image_size.size()
            image_width = size[2]
            image_height = size[1]
        if mode == 'percent':
            min_x = min_x / 100.0 * image_width
            max_x = max_x / 100.0 * image_width
            min_y = min_y / 100.0 * image_height
            max_y = max_y / 100.0 * image_height
        if origin == 'bottomleft' or origin == 'bottomright':
            (min_y, max_y) = (image_height - max_y, image_height - min_y)
        if origin == 'topright' or origin == 'bottomright':
            (min_x, max_x) = (image_width - max_x, image_width - min_x)
        mask = torch.zeros((image_height, image_width))
        mask[int(min_y):int(max_y) + 1, int(min_x):int(max_x) + 1] = 1
        return (mask.unsqueeze(0),)
```