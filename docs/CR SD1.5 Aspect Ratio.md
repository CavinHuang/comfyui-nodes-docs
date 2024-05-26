# Documentation
- Class name: CR_AspectRatioSD15
- Category: Comfyroll/Aspect Ratio
- Output node: False
- Repo Ref: https://github.com/RockOfFire/ComfyUI_Comfyroll_CustomNodes

CR_AspectRatioSD15 是一个用于管理和调整图像宽高比的节点。它允许用户选择预定义的宽高比或输入自定义尺寸，并提供交换尺寸和放大图像的选项。该节点的主要功能是确保图像被正确缩放和定向，以满足各种显示或打印需求。

# Input types
## Required
- width
    - 宽度是一个关键参数，它定义了图像的水平尺寸。它与高度参数一起工作，以确定图像的宽高比。节点使用这个值来计算输出的正确缩放和尺寸。
    - Comfy dtype: INT
    - Python dtype: int
- height
    - 高度是一个关键参数，它设置了图像的垂直尺寸。当与宽度参数配对时，它对于保持所需的宽高比至关重要。节点利用这个参数确保图像的垂直缩放是准确的。
    - Comfy dtype: INT
    - Python dtype: int
- aspect_ratio
    - 宽高比参数至关重要，因为它决定了图像宽度和高度之间的比例关系。它提供了预定义比率的选择或自定义输入的选项，允许在图像格式设置中具有灵活性。
    - Comfy dtype: STRING
    - Python dtype: str
- swap_dimensions
    - swap_dimensions 参数允许用户在宽度和高度值之间切换。当宽高比需要不同的方向或用户需要手动切换尺寸时，此功能非常有用。
    - Comfy dtype: STRING
    - Python dtype: str
- upscale_factor
    - upscale_factor 参数对于控制图像的放大倍数很重要。它将原始尺寸相乘以实现更大的图像尺寸，同时不影响宽高比。
    - Comfy dtype: FLOAT
    - Python dtype: float
- batch_size
    - 批量大小是一个重要的参数，它决定了同时处理的图像数量。当处理大量图像时，它对于优化性能特别有用。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- width
    - 宽度输出参数表示在应用所选宽高比和任何缩放因子后图像的最终水平尺寸。
    - Comfy dtype: INT
    - Python dtype: int
- height
    - 高度输出参数表示在考虑宽高比和缩放调整后图像的最终垂直尺寸。
    - Comfy dtype: INT
    - Python dtype: int
- upscale_factor
    - upscale_factor 输出反映了应用于图像的放大级别，以增加其大小。
    - Comfy dtype: FLOAT
    - Python dtype: float
- batch_size
    - 批量大小输出参数表明在单个批次中处理的图像数量，这对于了解节点的吞吐量至关重要。
    - Comfy dtype: INT
    - Python dtype: int
- empty_latent
    - empty_latent 输出参数为图像批次提供了一个空的潜在空间表示，它可以用于下游任务中的进一步处理或分析。
    - Comfy dtype: LATENT
    - Python dtype: Dict[str, torch.Tensor]
- show_help
    - show_help 输出参数提供了一个链接到文档页面的 URL，以获取有关使用该节点的额外指导和信息。
    - Comfy dtype: STRING
    - Python dtype: str

# Usage tips
- Infra type: CPU

# Source code
```
class CR_AspectRatioSD15:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(s):
        aspect_ratios = ['custom', '1:1 square 512x512', '1:1 square 1024x1024', '2:3 portrait 512x768', '3:4 portrait 512x682', '3:2 landscape 768x512', '4:3 landscape 682x512', '16:9 cinema 910x512', '1.85:1 cinema 952x512', '2:1 cinema 1024x512', '2.39:1 anamorphic 1224x512']
        return {'required': {'width': ('INT', {'default': 512, 'min': 64, 'max': 8192}), 'height': ('INT', {'default': 512, 'min': 64, 'max': 8192}), 'aspect_ratio': (aspect_ratios,), 'swap_dimensions': (['Off', 'On'],), 'upscale_factor': ('FLOAT', {'default': 1.0, 'min': 0.1, 'max': 100.0, 'step': 0.1}), 'batch_size': ('INT', {'default': 1, 'min': 1, 'max': 64})}}
    RETURN_TYPES = ('INT', 'INT', 'FLOAT', 'INT', 'LATENT', 'STRING')
    RETURN_NAMES = ('width', 'height', 'upscale_factor', 'batch_size', 'empty_latent', 'show_help')
    FUNCTION = 'Aspect_Ratio'
    CATEGORY = icons.get('Comfyroll/Aspect Ratio')

    def Aspect_Ratio(self, width, height, aspect_ratio, swap_dimensions, upscale_factor, batch_size):
        if aspect_ratio == '2:3 portrait 512x768':
            (width, height) = (512, 768)
        elif aspect_ratio == '3:2 landscape 768x512':
            (width, height) = (768, 512)
        elif aspect_ratio == '1:1 square 512x512':
            (width, height) = (512, 512)
        elif aspect_ratio == '1:1 square 1024x1024':
            (width, height) = (1024, 1024)
        elif aspect_ratio == '16:9 cinema 910x512':
            (width, height) = (910, 512)
        elif aspect_ratio == '3:4 portrait 512x682':
            (width, height) = (512, 682)
        elif aspect_ratio == '4:3 landscape 682x512':
            (width, height) = (682, 512)
        elif aspect_ratio == '1.85:1 cinema 952x512':
            (width, height) = (952, 512)
        elif aspect_ratio == '2:1 cinema 1024x512':
            (width, height) = (1024, 512)
        elif aspect_ratio == '2.39:1 anamorphic 1224x512':
            (width, height) = (1224, 512)
        if swap_dimensions == 'On':
            (width, height) = (height, width)
        latent = torch.zeros([batch_size, 4, height // 8, width // 8])
        show_help = 'https://github.com/Suzie1/ComfyUI_Comfyroll_CustomNodes/wiki/Aspect-Ratio-Nodes#cr-sd15-aspect-ratio'
        return (width, height, upscale_factor, batch_size, {'samples': latent}, show_help)
```