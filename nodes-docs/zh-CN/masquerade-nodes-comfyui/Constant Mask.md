# Documentation
- Class name: ConstantMask
- Category: Masquerade Nodes
- Output node: False
- Repo Ref: https://github.com/BadCafeCode/masquerade-nodes-comfyui

ConstantMask节点旨在生成一个在其维度上具有统一值的掩码。它在定义掩码大小时提供了灵活性，可以显式定义，也可以通过复制现有图像的尺寸，从而确保数据预处理流程中的一致性。

# Input types
## Required
- value
    - 参数'value'指定了填充掩码的常数值。它在确定输出掩码的均匀性中起着关键作用，影响图像的后续处理。
    - Comfy dtype: FLOAT
    - Python dtype: float
- explicit_height
    - 参数'explicit_height'在不从图像复制时设置掩码的高度。它对于定义掩码的垂直维度很重要。
    - Comfy dtype: INT
    - Python dtype: int
- explicit_width
    - 参数'explicit_width'在不从图像复制时设置掩码的宽度。它对于定义掩码的水平维度至关重要。
    - Comfy dtype: INT
    - Python dtype: int
## Optional
- copy_image_size
    - 参数'copy_image_size'允许掩码采用所提供图像的尺寸，避免了需要指定显式尺寸的需要。
    - Comfy dtype: IMAGE
    - Python dtype: PIL.Image or torch.Tensor

# Output types
- result
    - 'result'输出是填充了指定常数值的生成掩码。它对于需要统一掩码进行进一步图像操作的应用来说非常重要。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor

# Usage tips
- Infra type: CPU

# Source code
```
class ConstantMask:
    """
    Creates a mask filled with a constant value. If copy_image_size is provided, the explicit_height and explicit_width parameters are ignored and the size of the given images will be used instead.
    """

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'value': ('FLOAT', {'default': 0.0, 'min': -8.0, 'max': 8.0, 'step': 0.01}), 'explicit_height': ('INT', {'default': 0, 'min': 0, 'max': VERY_BIG_SIZE, 'step': 1}), 'explicit_width': ('INT', {'default': 0, 'min': 0, 'max': VERY_BIG_SIZE, 'step': 1})}, 'optional': {'copy_image_size': ('IMAGE',)}}
    RETURN_TYPES = ('IMAGE',)
    FUNCTION = 'constant_mask'
    CATEGORY = 'Masquerade Nodes'

    def constant_mask(self, value, explicit_height, explicit_width, copy_image_size=None):
        height = explicit_height
        width = explicit_width
        if copy_image_size is not None:
            size = copy_image_size.size()
            height = size[1]
            width = size[2]
        elif explicit_height == 0 or explicit_width == 0:
            height = 16
            width = 16
        result = torch.zeros([1, height, width])
        result[:, :, :] = value
        return (result,)
```