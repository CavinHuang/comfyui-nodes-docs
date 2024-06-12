# Documentation
- Class name: CR_AspectRatioBanners
- Category: Comfyroll/Aspect Ratio
- Output node: False
- Repo Ref: https://github.com/RockOfFire/ComfyUI_Comfyroll_CustomNodes

CR_AspectRatioBanners 节点旨在方便创建和操作符合各种宽高比的图像横幅。它允许用户输入自定义尺寸或从预定义的横幅大小列表中选择。该节点还提供了交换尺寸和应用缩放因子的选项，以满足特定要求。其主要目标是简化生成视觉上一致且适用于多样化显示目的的横幅的过程。

# Input types
## Required
- width
    - 宽度参数指定横幅所需的宽度。它在确定输出图像的整体尺寸中起着关键作用，确保横幅适应所需的约束条件。
    - Comfy dtype: INT
    - Python dtype: int
- height
    - 高度参数定义横幅的垂直范围。它对于保持宽高比和实现横幅所需的外观至关重要。
    - Comfy dtype: INT
    - Python dtype: int
- aspect_ratio
    - 宽高比确定了横幅宽度和高度之间的比例关系。它是确保横幅尺寸在视觉上吸引人且适合预期用途的关键因素。
    - Comfy dtype: STRING
    - Python dtype: str
- swap_dimensions
    - swap_dimensions 参数允许宽度和高度值的可交换性，提供了在解释和使用横幅尺寸方面的灵活性。
    - Comfy dtype: STRING
    - Python dtype: str
- upscale_factor
    - upscale_factor 参数用于增加横幅的尺寸，而不改变其宽高比，从而提高横幅在较大显示设备上的视觉质量。
    - Comfy dtype: FLOAT
    - Python dtype: float
- prescale_factor
    - prescale_factor 参数允许在进一步处理之前调整横幅的尺寸，从而优化图像的大小和性能。
    - Comfy dtype: FLOAT
    - Python dtype: float
- batch_size
    - batch_size 参数定义了同时处理的横幅数量，这在处理多个横幅创建任务时可以显著提高效率。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- width
    - 宽度输出提供了应用所选宽高比和缩放因子后横幅的最终宽度。
    - Comfy dtype: INT
    - Python dtype: int
- height
    - 高度输出给出了考虑到宽高比和缩放调整后的横幅的最终高度。
    - Comfy dtype: INT
    - Python dtype: int
- upscale_factor
    - upscale_factor 输出反映了用于放大横幅尺寸的缩放因子。
    - Comfy dtype: FLOAT
    - Python dtype: float
- prescale_factor
    - prescale_factor 输出表明在处理之前应用于横幅尺寸的初始缩放因子。
    - Comfy dtype: FLOAT
    - Python dtype: float
- batch_size
    - batch_size 输出表示当前操作中处理的横幅数量。
    - Comfy dtype: INT
    - Python dtype: int
- empty_latent
    - empty_latent 输出是用于进一步处理或分析横幅的潜在表示的占位符。
    - Comfy dtype: LATENT
    - Python dtype: Dict[str, torch.Tensor]
- show_help
    - show_help 输出提供了一个链接到文档的链接，以获得有关使用该节点的进一步指导。
    - Comfy dtype: STRING
    - Python dtype: str

# Usage tips
- Infra type: CPU

# Source code
```
class CR_AspectRatioBanners:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(s):
        aspect_ratios = ['custom', 'Large Rectangle - 336x280', 'Medium Rectangle - 300x250', 'Small Rectangle - 180x150', 'Square - 250x250', 'Small Square - 200x200', 'Button - 125x125', 'Half Page - 300x600', 'Vertical Banner - 120x240', 'Wide Skyscraper - 160x600', 'Skyscraper - 120x600', 'Billboard - 970x250', 'Portrait - 300x1050', 'Banner - 468x60', 'Leaderboard - 728x90']
        return {'required': {'width': ('INT', {'default': 1024, 'min': 64, 'max': 8192}), 'height': ('INT', {'default': 1024, 'min': 64, 'max': 8192}), 'aspect_ratio': (aspect_ratios,), 'swap_dimensions': (['Off', 'On'],), 'upscale_factor': ('FLOAT', {'default': 1.0, 'min': 0.1, 'max': 100.0, 'step': 0.1}), 'prescale_factor': ('FLOAT', {'default': 1.0, 'min': 0.1, 'max': 100.0, 'step': 0.1}), 'batch_size': ('INT', {'default': 1, 'min': 1, 'max': 64})}}
    RETURN_TYPES = ('INT', 'INT', 'FLOAT', 'FLOAT', 'INT', 'LATENT', 'STRING')
    RETURN_NAMES = ('width', 'height', 'upscale_factor', 'prescale_factor', 'batch_size', 'empty_latent', 'show_help')
    FUNCTION = 'Aspect_Ratio'
    CATEGORY = icons.get('Comfyroll/Aspect Ratio')

    def Aspect_Ratio(self, width, height, aspect_ratio, swap_dimensions, upscale_factor, prescale_factor, batch_size):
        if aspect_ratio == 'Large Rectangle - 336x280':
            (width, height) = (336, 280)
        elif aspect_ratio == 'Medium Rectangle - 300x250':
            (width, height) = (300, 250)
        elif aspect_ratio == 'Small Rectangle - 180x150':
            (width, height) = (180, 150)
        elif aspect_ratio == 'Square - 250x250':
            (width, height) = (250, 250)
        elif aspect_ratio == 'Small Square - 200x200':
            (width, height) = (200, 200)
        elif aspect_ratio == 'Button - 125x125':
            (width, height) = (125, 125)
        elif aspect_ratio == 'Half Page - 300x600':
            (width, height) = (300, 600)
        elif aspect_ratio == 'Vertical Banner - 120x240':
            (width, height) = (120, 240)
        elif aspect_ratio == 'Wide Skyscraper - 160x600':
            (width, height) = (160, 600)
        elif aspect_ratio == 'Skyscraper - 120x600':
            (width, height) = (120, 600)
        elif aspect_ratio == 'Billboard - 970x250':
            (width, height) = (970, 250)
        elif aspect_ratio == 'Portrait - 300x1050':
            (width, height) = (300, 1050)
        elif aspect_ratio == 'Banner - 468x60':
            (width, height) = (168, 60)
        elif aspect_ratio == 'Leaderboard - 728x90':
            (width, height) = (728, 90)
        if swap_dimensions == 'On':
            (width, height) = (height, width)
        width = int(width * prescale_factor)
        height = int(height * prescale_factor)
        latent = torch.zeros([batch_size, 4, height // 8, width // 8])
        show_help = 'https://github.com/Suzie1/ComfyUI_Comfyroll_CustomNodes/wiki/Aspect-Ratio-Nodes#cr-aspect-ratio-banners'
        return (width, height, upscale_factor, prescale_factor, batch_size, {'samples': latent}, show_help)
```