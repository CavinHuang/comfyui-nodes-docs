# Documentation
- Class name: CR_AspectRatio
- Category: Comfyroll/Aspect Ratio
- Output node: False
- Repo Ref: https://github.com/RockOfFire/ComfyUI_Comfyroll_CustomNodes

CR_AspectRatio节点旨在操作和定义图像的纵横比。它提供了各种预设的纵横比，并允许自定义尺寸。该节点的功能使用户能够选择一个纵横比，选择是否交换维度，并应用缩放因子以实现所需的输出尺寸。它还支持批量处理以提高效率。

# Input types
## Required
- width
    - “width”参数指定了图像的期望宽度。它在确定图像的纵横比和最终尺寸中起着关键作用。
    - Comfy dtype: INT
    - Python dtype: int
- height
    - “height”参数定义了图像的期望高度。它与“width”参数一起工作，以建立图像的纵横比。
    - Comfy dtype: INT
    - Python dtype: int
- aspect_ratio
    - “aspect_ratio”参数允许用户从预定义的纵横比列表中选择或输入自定义的纵横比。它是节点操作的核心，因为它决定了输出图像的比例。
    - Comfy dtype: STRING
    - Python dtype: str
- swap_dimensions
    - “swap_dimensions”参数提供了一个选项来交换宽度和高度值。这在某些图像操作中非常有用，其中图像的方向很重要。
    - Comfy dtype: STRING
    - Python dtype: str
- upscale_factor
    - “upscale_factor”参数用于增加图像的大小。它将当前尺寸乘以指定的因子，提高分辨率。
    - Comfy dtype: FLOAT
    - Python dtype: float
- prescale_factor
    - “prescale_factor”参数应用于调整任何其他转换之前的初始尺寸。它可以用于优化处理或实现特定的设计要求。
    - Comfy dtype: FLOAT
    - Python dtype: float
- batch_size
    - “batch_size”参数决定了单次操作中处理的图像数量。它对于管理计算资源和提高工作流程效率至关重要。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- width
    - “width”输出提供了应用所有转换后图像的最终宽度。
    - Comfy dtype: INT
    - Python dtype: int
- height
    - “height”输出给出了处理后图像的最终高度。
    - Comfy dtype: INT
    - Python dtype: int
- upscale_factor
    - “upscale_factor”输出反映了用于放大图像的缩放因子。
    - Comfy dtype: FLOAT
    - Python dtype: float
- prescale_factor
    - “prescale_factor”输出指示应用于图像尺寸的初始缩放因子。
    - Comfy dtype: FLOAT
    - Python dtype: float
- batch_size
    - “batch_size”输出表示操作中处理的图像数量。
    - Comfy dtype: INT
    - Python dtype: int
- empty_latent
    - “empty_latent”输出是用于后续图像处理任务中可能使用的潜在表示的占位符。
    - Comfy dtype: LATENT
    - Python dtype: Dict[str, torch.Tensor]
- show_help
    - “show_help”输出提供了一个URL链接到文档，以获得进一步的指导和帮助。
    - Comfy dtype: STRING
    - Python dtype: str

# Usage tips
- Infra type: CPU

# Source code
```
class CR_AspectRatio:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(s):
        aspect_ratios = ['custom', 'SD1.5 - 1:1 square 512x512', 'SD1.5 - 2:3 portrait 512x768', 'SD1.5 - 3:4 portrait 512x682', 'SD1.5 - 3:2 landscape 768x512', 'SD1.5 - 4:3 landscape 682x512', 'SD1.5 - 16:9 cinema 910x512', 'SD1.5 - 1.85:1 cinema 952x512', 'SD1.5 - 2:1 cinema 1024x512', 'SDXL - 1:1 square 1024x1024', 'SDXL - 3:4 portrait 896x1152', 'SDXL - 5:8 portrait 832x1216', 'SDXL - 9:16 portrait 768x1344', 'SDXL - 9:21 portrait 640x1536', 'SDXL - 4:3 landscape 1152x896', 'SDXL - 3:2 landscape 1216x832', 'SDXL - 16:9 landscape 1344x768', 'SDXL - 21:9 landscape 1536x640']
        return {'required': {'width': ('INT', {'default': 1024, 'min': 64, 'max': 8192}), 'height': ('INT', {'default': 1024, 'min': 64, 'max': 8192}), 'aspect_ratio': (aspect_ratios,), 'swap_dimensions': (['Off', 'On'],), 'upscale_factor': ('FLOAT', {'default': 1.0, 'min': 0.1, 'max': 100.0, 'step': 0.1}), 'prescale_factor': ('FLOAT', {'default': 1.0, 'min': 0.1, 'max': 100.0, 'step': 0.1}), 'batch_size': ('INT', {'default': 1, 'min': 1, 'max': 64})}}
    RETURN_TYPES = ('INT', 'INT', 'FLOAT', 'FLOAT', 'INT', 'LATENT', 'STRING')
    RETURN_NAMES = ('width', 'height', 'upscale_factor', 'prescale_factor', 'batch_size', 'empty_latent', 'show_help')
    FUNCTION = 'Aspect_Ratio'
    CATEGORY = icons.get('Comfyroll/Aspect Ratio')

    def Aspect_Ratio(self, width, height, aspect_ratio, swap_dimensions, upscale_factor, prescale_factor, batch_size):
        if aspect_ratio == 'SD1.5 - 1:1 square 512x512':
            (width, height) = (512, 512)
        elif aspect_ratio == 'SD1.5 - 2:3 portrait 512x768':
            (width, height) = (512, 768)
        elif aspect_ratio == 'SD1.5 - 16:9 cinema 910x512':
            (width, height) = (910, 512)
        elif aspect_ratio == 'SD1.5 - 3:4 portrait 512x682':
            (width, height) = (512, 682)
        elif aspect_ratio == 'SD1.5 - 3:2 landscape 768x512':
            (width, height) = (768, 512)
        elif aspect_ratio == 'SD1.5 - 4:3 landscape 682x512':
            (width, height) = (682, 512)
        elif aspect_ratio == 'SD1.5 - 1.85:1 cinema 952x512':
            (width, height) = (952, 512)
        elif aspect_ratio == 'SD1.5 - 2:1 cinema 1024x512':
            (width, height) = (1024, 512)
        elif aspect_ratio == 'SD1.5 - 2.39:1 anamorphic 1224x512':
            (width, height) = (1224, 512)
        if aspect_ratio == 'SDXL - 1:1 square 1024x1024':
            (width, height) = (1024, 1024)
        elif aspect_ratio == 'SDXL - 3:4 portrait 896x1152':
            (width, height) = (896, 1152)
        elif aspect_ratio == 'SDXL - 5:8 portrait 832x1216':
            (width, height) = (832, 1216)
        elif aspect_ratio == 'SDXL - 9:16 portrait 768x1344':
            (width, height) = (768, 1344)
        elif aspect_ratio == 'SDXL - 9:21 portrait 640x1536':
            (width, height) = (640, 1536)
        elif aspect_ratio == 'SDXL - 4:3 landscape 1152x896':
            (width, height) = (1152, 896)
        elif aspect_ratio == 'SDXL - 3:2 landscape 1216x832':
            (width, height) = (1216, 832)
        elif aspect_ratio == 'SDXL - 16:9 landscape 1344x768':
            (width, height) = (1344, 768)
        elif aspect_ratio == 'SDXL - 21:9 landscape 1536x640':
            (width, height) = (1536, 640)
        if swap_dimensions == 'On':
            (width, height) = (height, width)
        width = int(width * prescale_factor)
        height = int(height * prescale_factor)
        latent = torch.zeros([batch_size, 4, height // 8, width // 8])
        show_help = 'https://github.com/Suzie1/ComfyUI_Comfyroll_CustomNodes/wiki/Aspect-Ratio-Nodes#cr-aspect-ratio'
        return (width, height, upscale_factor, prescale_factor, batch_size, {'samples': latent}, show_help)
```