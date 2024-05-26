# Documentation
- Class name: CR_AspectRatioForPrint
- Category: Comfyroll/Aspect Ratio
- Output node: False
- Repo Ref: https://github.com/RockOfFire/ComfyUI_Comfyroll_CustomNodes

CR_AspectRatioForPrint节点旨在根据指定的宽高比计算和调整图像或打印的尺寸。它允许交换维度并应用缩放因子以实现所需的输出大小，满足各种打印需求。

# Input types
## Required
- width
    - 宽度参数决定了图像或打印的水平尺寸。对于保持宽高比和正确缩放图像至关重要。
    - Comfy dtype: INT
    - Python dtype: int
- height
    - 高度参数设置图像或打印的垂直尺寸。它与宽度一起工作，以确保保持宽高比。
    - Comfy dtype: INT
    - Python dtype: int
- aspect_ratio
    - 宽高比定义了宽度和高度之间的比例关系。它是计算最终尺寸的关键因素。
    - Comfy dtype: STRING
    - Python dtype: str
- swap_dimensions
    - swap_dimensions参数允许用户在需要时交换宽度和高度值，提供尺寸调整的灵活性。
    - Comfy dtype: STRING
    - Python dtype: str
- upscale_factor
    - upscale_factor用于放大图像尺寸。对于高分辨率打印或数字放大，这是一个重要参数。
    - Comfy dtype: FLOAT
    - Python dtype: float
- prescale_factor
    - prescale_factor参数应用于宽高比调整之前，允许对图像尺寸进行初步缩放。
    - Comfy dtype: FLOAT
    - Python dtype: float
- batch_size
    - batch_size参数指定一次处理的图像数量。对于高效处理大量图像至关重要。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- width
    - 输出宽度是在应用宽高比和缩放因子后图像或打印的水平尺寸。
    - Comfy dtype: INT
    - Python dtype: int
- height
    - 输出高度是在应用宽高比和缩放因子后图像或打印的垂直尺寸。
    - Comfy dtype: INT
    - Python dtype: int
- upscale_factor
    - upscale_factor输出反映了用于放大图像尺寸的缩放因子。
    - Comfy dtype: FLOAT
    - Python dtype: float
- prescale_factor
    - prescale_factor输出表明在宽高比调整之前应用的初始缩放因子。
    - Comfy dtype: FLOAT
    - Python dtype: float
- batch_size
    - batch_size输出显示当前操作中处理的图像数量。
    - Comfy dtype: INT
    - Python dtype: int
- empty_latent
    - empty_latent输出为处理后的图像提供空的潜在表示，可用于进一步的图像处理任务。
    - Comfy dtype: LATENT
    - Python dtype: Dict[str, torch.Tensor]
- show_help
    - show_help输出提供了一个链接到文档，以获得关于使用该节点的进一步帮助和指导。
    - Comfy dtype: STRING
    - Python dtype: str

# Usage tips
- Infra type: CPU

# Source code
```
class CR_AspectRatioForPrint:

    @classmethod
    def INPUT_TYPES(cls):
        aspect_ratios = list(PRINT_SIZES.keys())
        return {'required': {'width': ('INT', {'default': 1024, 'min': 64, 'max': 8192}), 'height': ('INT', {'default': 1024, 'min': 64, 'max': 8192}), 'aspect_ratio': (aspect_ratios,), 'swap_dimensions': (['Off', 'On'],), 'upscale_factor': ('FLOAT', {'default': 1.0, 'min': 0.1, 'max': 100.0, 'step': 0.1}), 'prescale_factor': ('FLOAT', {'default': 1.0, 'min': 0.1, 'max': 100.0, 'step': 0.1}), 'batch_size': ('INT', {'default': 1, 'min': 1, 'max': 64})}}
    RETURN_TYPES = ('INT', 'INT', 'FLOAT', 'FLOAT', 'INT', 'LATENT', 'STRING')
    RETURN_NAMES = ('width', 'height', 'upscale_factor', 'prescale_factor', 'batch_size', 'empty_latent', 'show_help')
    FUNCTION = 'Aspect_Ratio'
    CATEGORY = icons.get('Comfyroll/Aspect Ratio')

    def Aspect_Ratio(self, width, height, aspect_ratio, swap_dimensions, upscale_factor, prescale_factor, batch_size):
        if aspect_ratio in PRINT_SIZES:
            (width, height) = PRINT_SIZES[aspect_ratio]
        if swap_dimensions == 'On':
            (width, height) = (height, width)
        width = int(width * prescale_factor)
        height = int(height * prescale_factor)
        print(f'Width: {width}, Height: {height}')
        latent = torch.zeros([batch_size, 4, height // 8, width // 8])
        show_help = 'https://github.com/Suzie1/ComfyUI_Comfyroll_CustomNodes/wiki/Aspect-Ratio-Nodes#cr-aspect-ratio-scial-media'
        return (width, height, upscale_factor, prescale_factor, batch_size, {'samples': latent}, show_help)
```