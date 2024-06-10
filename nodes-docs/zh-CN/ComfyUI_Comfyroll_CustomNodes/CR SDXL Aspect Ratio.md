# Documentation
- Class name: CR_SDXLAspectRatio
- Category: Comfyroll/Aspect Ratio
- Output node: False
- Repo Ref: https://github.com/RockOfFire/ComfyUI_Comfyroll_CustomNodes

CR_SDXLAspectRatio节点旨在根据指定的纵横比调整图像尺寸。它允许用户从预定义的纵横比列表中选择或输入自定义尺寸。该节点还提供选项来交换维度并应用放大因子到结果图像大小。其主要功能是确保输出符合所需的纵横比，从而促进需要特定尺寸的图像处理任务。

# Input types
## Required
- width
    - ‘width’参数设置图像的宽度，以像素为单位。这是一个关键组件，因为它直接影响图像的纵横比和最终尺寸。在图像处理工作流程中，此参数对于实现所需的视觉输出至关重要。
    - Comfy dtype: INT
    - Python dtype: int
- height
    - ‘height’参数定义图像的高度，以像素为单位。与‘width’参数一起，它决定了图像的整体纵横比。‘height’对于使图像尺寸与特定要求或标准保持一致至关重要。
    - Comfy dtype: INT
    - Python dtype: int
- aspect_ratio
    - ‘aspect_ratio’参数允许用户选择一个预定义的纵横比或输入一个自定义的纵横比。它在根据所需格式塑造图像尺寸方面起着重要作用，这对于各种图像处理和显示目的至关重要。
    - Comfy dtype: STRING
    - Python dtype: str
- swap_dimensions
    - ‘swap_dimensions’参数提供了一个交换宽度和高度值的选项。当输入的纵横比与图像的预期方向不一致时，此功能可以很有用，允许在尺寸操作中具有灵活性。
    - Comfy dtype: STRING
    - Python dtype: str
- upscale_factor
    - ‘upscale_factor’参数用于通过指定因子增加图像的大小。这是一个重要的特性，可以在不改变纵横比的情况下增强图像分辨率，这对于高质量的图像输出非常有益。
    - Comfy dtype: FLOAT
    - Python dtype: float
- batch_size
    - ‘batch_size’参数决定了单次操作中处理的图像数量。它对于优化计算资源和提高图像处理任务的效率至关重要，尤其是在处理大量图像时。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- width
    - ‘width’输出提供了应用所选纵横比以及任何维度交换或放大因子后图像的最终宽度。它是节点操作的关键结果，对于后续的图像处理步骤至关重要。
    - Comfy dtype: INT
    - Python dtype: int
- height
    - ‘height’输出提供了节点设置后处理的图像的最终高度。它是确保图像满足显示或进一步处理所需尺寸的关键信息。
    - Comfy dtype: INT
    - Python dtype: int
- upscale_factor
    - ‘upscale_factor’输出反映了应用于图像的缩放因子。它有助于跟踪图像的原始大小和当前大小之间的关系。
    - Comfy dtype: FLOAT
    - Python dtype: float
- batch_size
    - ‘batch_size’输出表明了被处理的图像数量。对于需要了解批量大小以进行适当对齐或进一步计算的下游任务来说，这可能很重要。
    - Comfy dtype: INT
    - Python dtype: int
- empty_latent
    - ‘empty_latent’输出是用于更高级图像处理应用程序中可能使用的潜在表示的占位符。它标志着节点与复杂工作流程集成的能力，尽管在此上下文中，它被返回为一个空结构。
    - Comfy dtype: LATENT
    - Python dtype: Dict[str, torch.Tensor]
- show_help
    - ‘show_help’输出提供了指向节点文档页面的URL链接。它是寻求如何有效使用节点的更多信息或帮助的用户的一个有用资源。
    - Comfy dtype: STRING
    - Python dtype: str

# Usage tips
- Infra type: CPU

# Source code
```
class CR_SDXLAspectRatio:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(s):
        aspect_ratios = ['custom', '1:1 square 1024x1024', '3:4 portrait 896x1152', '5:8 portrait 832x1216', '9:16 portrait 768x1344', '9:21 portrait 640x1536', '4:3 landscape 1152x896', '3:2 landscape 1216x832', '16:9 landscape 1344x768', '21:9 landscape 1536x640']
        return {'required': {'width': ('INT', {'default': 1024, 'min': 64, 'max': 8192}), 'height': ('INT', {'default': 1024, 'min': 64, 'max': 8192}), 'aspect_ratio': (aspect_ratios,), 'swap_dimensions': (['Off', 'On'],), 'upscale_factor': ('FLOAT', {'default': 1.0, 'min': 0.1, 'max': 100.0, 'step': 0.1}), 'batch_size': ('INT', {'default': 1, 'min': 1, 'max': 64})}}
    RETURN_TYPES = ('INT', 'INT', 'FLOAT', 'INT', 'LATENT', 'STRING')
    RETURN_NAMES = ('width', 'height', 'upscale_factor', 'batch_size', 'empty_latent', 'show_help')
    FUNCTION = 'Aspect_Ratio'
    CATEGORY = icons.get('Comfyroll/Aspect Ratio')

    def Aspect_Ratio(self, width, height, aspect_ratio, swap_dimensions, upscale_factor, batch_size):
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
            (width, height) = (height, width)
        latent = torch.zeros([batch_size, 4, height // 8, width // 8])
        show_help = 'https://github.com/Suzie1/ComfyUI_Comfyroll_CustomNodes/wiki/Aspect-Ratio-Nodes#cr-sdxl-aspect-ratio'
        return (width, height, upscale_factor, batch_size, {'samples': latent}, show_help)
```