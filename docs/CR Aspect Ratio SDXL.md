# Documentation
- Class name: CR_AspectRatio_SDXL
- Category: Comfyroll/Essential/Legacy
- Output node: False
- Repo Ref: https://github.com/RockOfFire/ComfyUI_Comfyroll_CustomNodes

CR_AspectRatio_SDXL 节点旨在根据指定的纵横比管理和调整图像尺寸。它允许选择预定义的纵横比或自定义输入，并提供交换维度和放大图像的选项。该节点确保图像正确格式化，以适应各种显示目的，增强了媒体处理任务的工作流程。

# Input types
## Required
- width
    - 宽度参数定义了图像的水平尺寸。它对于设置初始尺寸和计算正确的纵横比至关重要。
    - Comfy dtype: INT
    - Python dtype: int
- height
    - 高度参数设置图像的垂直尺寸，与宽度一起工作以确定整个图像的大小。
    - Comfy dtype: INT
    - Python dtype: int
- aspect_ratio
    - aspect_ratio 参数确定图像尺寸之间的关系。它允许选择常见比例或自定义输入以满足特定要求。
    - Comfy dtype: COMBO['custom', '1:1 square 1024x1024', '3:4 portrait 896x1152', '5:8 portrait 832x1216', '9:16 portrait 768x1344', '9:21 portrait 640x1536', '4:3 landscape 1152x896', '3:2 landscape 1216x832', '16:9 landscape 1344x768', '21:9 landscape 1536x640']
    - Python dtype: str
## Optional
- swap_dimensions
    - swap_dimensions 参数提供了交换宽度和高度值的选项，适用于需要反转图像方向的场景。
    - Comfy dtype: COMBO['Off', 'On']
    - Python dtype: str
- upscale_factor1
    - upscale_factor1 参数控制图像的第一级放大，允许在不改变纵横比的情况下调整图像大小。
    - Comfy dtype: FLOAT
    - Python dtype: float
- upscale_factor2
    - upscale_factor2 参数管理图像的第二级放大，提供对图像最终尺寸的进一步控制。
    - Comfy dtype: FLOAT
    - Python dtype: float
- batch_size
    - batch_size 参数指定同时处理多少张图像，这可以优化批量图像处理任务的性能。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- width
    - 宽度输出反映了应用选定的纵横比和任何放大因子后图像调整后的水平尺寸。
    - Comfy dtype: INT
    - Python dtype: int
- height
    - 高度输出对应于考虑到纵横比和放大设置后图像调整的垂直尺寸。
    - Comfy dtype: INT
    - Python dtype: int
- upscale_factor1
    - upscale_factor1 输出提供了应用于图像宽度的放大因子，影响最终分辨率。
    - Comfy dtype: FLOAT
    - Python dtype: float
- upscale_factor2
    - upscale_factor2 输出指示应用于图像高度的次级放大因子，进一步细化分辨率。
    - Comfy dtype: FLOAT
    - Python dtype: float
- batch_size
    - batch_size 输出表示每个周期内处理的图像数量，影响大规模图像处理的效率。
    - Comfy dtype: INT
    - Python dtype: int
- show_help
    - show_help 输出提供了一个 URL 链接到文档，以获取有关节点功能的进一步帮助和信息。
    - Comfy dtype: STRING
    - Python dtype: str

# Usage tips
- Infra type: CPU

# Source code
```
class CR_AspectRatio_SDXL:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'width': ('INT', {'default': 1024, 'min': 64, 'max': 2048}), 'height': ('INT', {'default': 1024, 'min': 64, 'max': 2048}), 'aspect_ratio': (['custom', '1:1 square 1024x1024', '3:4 portrait 896x1152', '5:8 portrait 832x1216', '9:16 portrait 768x1344', '9:21 portrait 640x1536', '4:3 landscape 1152x896', '3:2 landscape 1216x832', '16:9 landscape 1344x768', '21:9 landscape 1536x640'],), 'swap_dimensions': (['Off', 'On'],), 'upscale_factor1': ('FLOAT', {'default': 1, 'min': 1, 'max': 2000}), 'upscale_factor2': ('FLOAT', {'default': 1, 'min': 1, 'max': 2000}), 'batch_size': ('INT', {'default': 1, 'min': 1, 'max': 64})}}
    RETURN_TYPES = ('INT', 'INT', 'FLOAT', 'FLOAT', 'INT', 'STRING')
    RETURN_NAMES = ('INT', 'INT', 'FLOAT', 'FLOAT', 'INT', 'show_help')
    FUNCTION = 'Aspect_Ratio'
    CATEGORY = icons.get('Comfyroll/Essential/Legacy')

    def Aspect_Ratio(self, width, height, aspect_ratio, swap_dimensions, upscale_factor1, upscale_factor2, batch_size):
        show_help = 'https://github.com/Suzie1/ComfyUI_Comfyroll_CustomNodes/wiki/Legacy-Nodes#cr-aspect-ratio-sdxl'
        if aspect_ratio == '1:1 square 1024x1024':
            (width, height) = (1024, 1024)
        elif aspect_ratio == '3:4 portrait 896x1152':
            (width, height) = (896, 1152)
        elif aspect_ratio == '5:8 portrait 832x1216':
            (width, height) = (832, 1216)
        elif aspect_ratio == '9:16 portrait 768x1344':
            (width, height) = (768, 1344)
        elif aspect_ratio == '9:21 portrait 640x1536':
            (width, height) = (640, 1536)
        elif aspect_ratio == '4:3 landscape 1152x896':
            (width, height) = (1152, 896)
        elif aspect_ratio == '3:2 landscape 1216x832':
            (width, height) = (1216, 832)
        elif aspect_ratio == '16:9 landscape 1344x768':
            (width, height) = (1344, 768)
        elif aspect_ratio == '21:9 landscape 1536x640':
            (width, height) = (1536, 640)
        if swap_dimensions == 'On':
            return (height, width, upscale_factor1, upscale_factor2, batch_size, show_help)
        else:
            return (width, height, upscale_factor1, upscale_factor2, batch_size, show_help)
```