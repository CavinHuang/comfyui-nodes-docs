# Documentation
- Class name: WLSH_SDXL_Resolutions
- Category: WLSH Nodes/number
- Output node: False
- Repo Ref: https://github.com/wallish77/wlsh_nodes

WLSH_SDXL_Resolutions节点的'get_resolutions'方法旨在处理图像分辨率和方向数据。它接受一个表示分辨率的字符串和一个方向指示器作为输入，将分辨率转换为宽度和高度的整数值，并根据提供的方向调整这些值，确保保持肖像或风景方向的正确宽高比。

# Input types
## Required
- resolution
    - “resolution”参数是一个字符串，它以'widthxheight'格式指定图像的尺寸。它对于确定图像的像素尺寸至关重要，并用于计算宽度和高度值。
    - Comfy dtype: str
    - Python dtype: str
- direction
    - “direction”参数指示图像的方向，可以是'landscape'（风景）或'portrait'（肖像）。此参数对于调整宽度和高度值以匹配指定的方向至关重要。
    - Comfy dtype: str
    - Python dtype: str

# Output types
- width
    - 'width'输出代表了考虑了'direction'输入指定的方向后的图像宽度。它是一个整数值，反映了图像水平轴上的像素数。
    - Comfy dtype: INT
    - Python dtype: int
- height
    - 'height'输出对应于方向调整后的图像高度。它是一个整数，表示图像垂直轴上的像素数。
    - Comfy dtype: INT
    - Python dtype: int

# Usage tips
- Infra type: CPU

# Source code
```
class WLSH_SDXL_Resolutions:
    resolution = ['1024x1024', '1152x896', '1216x832', '1344x768', '1536x640']
    direction = ['landscape', 'portrait']

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'resolution': (s.resolution,), 'direction': (s.direction,)}}
    RETURN_TYPES = ('INT', 'INT')
    RETURN_NAMES = ('width', 'height')
    FUNCTION = 'get_resolutions'
    CATEGORY = 'WLSH Nodes/number'

    def get_resolutions(self, resolution, direction):
        (width, height) = resolution.split('x')
        width = int(width)
        height = int(height)
        if direction == 'portrait':
            (width, height) = (height, width)
        return (width, height)
```