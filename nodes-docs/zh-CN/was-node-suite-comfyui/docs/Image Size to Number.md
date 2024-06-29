# Documentation
- Class name: WAS_Image_Size_To_Number
- Category: WAS Suite/Number/Operations
- Output node: False
- Repo Ref: https://github.com/WASasquatch/was-node-suite-comfyui

WAS_Image_Size_To_Number 节点旨在提取图像的尺寸并将其转换为数值。它提供了一种直接的方法来获取图像的宽度和高度，以不同的格式，便于进一步的处理或分析，这需要数值化的尺寸信息。

# Input types
## Required
- image
    - 图像参数对于节点的操作至关重要，因为它是提取尺寸的来源。它直接影响节点的输出，通过确定返回的数值。
    - Comfy dtype: IMAGE
    - Python dtype: PIL.Image.Image or numpy.ndarray

# Output types
- width_num
    - width_num 表示图像宽度的整数值。它很重要，因为它提供了图像宽度的数值度量，可以用于各种目的，如调整大小或布局计算。
    - Comfy dtype: NUMBER
    - Python dtype: int
- height_num
    - height_num 表示图像高度的整数值。对于需要知道图像垂直范围的应用来说，它是至关重要的，例如打印或显示调整。
    - Comfy dtype: NUMBER
    - Python dtype: int
- width_float
    - width_float 提供了图像宽度的浮点数值，允许在必要时进行更精确的测量和计算。
    - Comfy dtype: FLOAT
    - Python dtype: float
- height_float
    - height_float 提供了图像高度的浮点数值，对于需要在垂直测量中具有高度精确度的应用非常有用。
    - Comfy dtype: FLOAT
    - Python dtype: float
- width_int
    - width_int 是图像宽度的另一种整数值表示，提供了可以与width_num用于不同应用的可互换的数值。
    - Comfy dtype: INT
    - Python dtype: int
- height_int
    - height_int 是图像高度的另一种整数值表示，为可能更喜欢或需要这种特定格式的应用提供了另一种数值。
    - Comfy dtype: INT
    - Python dtype: int

# Usage tips
- Infra type: CPU

# Source code
```
class WAS_Image_Size_To_Number:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'image': ('IMAGE',)}}
    RETURN_TYPES = ('NUMBER', 'NUMBER', 'FLOAT', 'FLOAT', 'INT', 'INT')
    RETURN_NAMES = ('width_num', 'height_num', 'width_float', 'height_float', 'width_int', 'height_int')
    FUNCTION = 'image_width_height'
    CATEGORY = 'WAS Suite/Number/Operations'

    def image_width_height(self, image):
        image = tensor2pil(image)
        if image.size:
            return (image.size[0], image.size[1], float(image.size[0]), float(image.size[1]), image.size[0], image.size[1])
        return (0, 0, 0, 0, 0, 0)
```