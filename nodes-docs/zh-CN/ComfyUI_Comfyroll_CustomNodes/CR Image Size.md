# Documentation
- Class name: CR_ImageSize
- Category: Comfyroll/Essential/Legacy
- Output node: False
- Repo Ref: https://github.com/RockOfFire/ComfyUI_Comfyroll_CustomNodes

CR_ImageSize 节点旨在调整图像的尺寸。它提供了指定图像宽度和高度的功能，并通过可调节的因子允许进行放大。在需要尺寸调整的图像处理工作流程中，此节点至关重要，确保图像满足进一步处理或显示所需的尺寸。

# Input types
## Required
- width
    - ‘width’参数对于定义图像的期望宽度至关重要。它在确定处理后图像的最终尺寸中起着关键作用。‘width’设置直接影响图像的宽高比和整体外观。
    - Comfy dtype: INT
    - Python dtype: int
- height
    - ‘height’参数用于设置图像的垂直尺寸。它是控制图像输出大小的关键因素，确保其符合特定的要求或限制。‘height’值对于保持图像内容的完整性具有重要意义。
    - Comfy dtype: INT
    - Python dtype: int
## Optional
- upscale_factor
    - ‘upscale_factor’参数是可选的，用于增加图像的大小。它是一个乘数，可以按比例放大原始尺寸，允许更高的分辨率输出。当增强图像细节或为更大的显示器准备图像时，这个因子特别有用。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- Width
    - ‘Width’输出反映了应用节点调整大小功能后图像的处理宽度。对于依赖图像确切尺寸的下游流程来说，它是重要的。
    - Comfy dtype: INT
    - Python dtype: int
- Height
    - ‘Height’输出提供了图像的处理高度，这对于保持预期的宽高比和确保图像适合指定的显示区域至关重要。
    - Comfy dtype: INT
    - Python dtype: int
- upscale_factor
    - ‘upscale_factor’输出是应用于图像的缩放因子。它表明原始尺寸增加了多少，这对于质量评估或进一步的图像操作可能很重要。
    - Comfy dtype: FLOAT
    - Python dtype: float
- show_help
    - ‘show_help’输出是指向节点使用说明页面的 URL 链接。对于寻求如何有效使用节点的更多信息的用户来说，它特别有用。
    - Comfy dtype: STRING
    - Python dtype: str

# Usage tips
- Infra type: CPU

# Source code
```
class CR_ImageSize:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'width': ('INT', {'default': 512, 'min': 64, 'max': 2048}), 'height': ('INT', {'default': 512, 'min': 64, 'max': 2048}), 'upscale_factor': ('FLOAT', {'default': 1, 'min': 1, 'max': 2000})}}
    RETURN_TYPES = ('INT', 'INT', 'FLOAT', 'STRING')
    RETURN_NAMES = ('Width', 'Height', 'upscale_factor', 'show_help')
    FUNCTION = 'ImageSize'
    CATEGORY = icons.get('Comfyroll/Essential/Legacy')

    def ImageSize(self, width, height, upscale_factor):
        show_help = 'https://github.com/Suzie1/ComfyUI_Comfyroll_CustomNodes/wiki/Legacy-Nodes#cr-image-size'
        return (width, height, upscale_factor, show_help)
```