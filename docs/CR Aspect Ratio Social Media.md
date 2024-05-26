# Documentation
- Class name: CR_AspectRatioSocialMedia
- Category: icons.get('Comfyroll/Aspect Ratio')
- Output node: False
- Repo Ref: https://github.com/RockOfFire/ComfyUI_Comfyroll_CustomNodes

该节点旨在根据特定社交媒体平台的要求处理和调整图像尺寸，确保最佳展示效果和用户参与度。

# Input types
## Required
- width
    - 宽度是决定图像水平维度的基本参数，影响其在不同社交媒体平台上的长宽比和整体外观。
    - Comfy dtype: INT
    - Python dtype: int
- height
    - 高度是定义图像垂直维度的关键参数，与宽度一起工作，以满足社交媒体平台的长宽比要求。
    - Comfy dtype: INT
    - Python dtype: int
## Optional
- aspect_ratio
    - 长宽比预设允许快速选择针对各种社交媒体平台优化的尺寸，简化图像准备过程。
    - Comfy dtype: COMBO
    - Python dtype: str
- swap_dimensions
    - 交换维度选项使得宽度和高度可以互换，提供了满足某些社交媒体平台特定要求的灵活性。
    - Comfy dtype: COMBO
    - Python dtype: str
- upscale_factor
    - 放大因子用于扩大图像尺寸，可以提高在社交媒体平台上展示时的图像质量和可见度。
    - Comfy dtype: FLOAT
    - Python dtype: float
- prescale_factor
    - 预缩放因子用于在进一步处理之前调整初始图像大小，影响最终输出的分辨率和在社交媒体上的性能。
    - Comfy dtype: FLOAT
    - Python dtype: float
- batch_size
    - 批处理大小决定了同时处理的图像数量，可以提高在处理多个社交媒体图像调整时的效率和吞吐量。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- width
    - 调整后的图像宽度，针对所选社交媒体平台进行优化，确保正确的显示和参与度。
    - Comfy dtype: INT
    - Python dtype: int
- height
    - 调整后的图像高度，为满足所选社交媒体平台的要求而定制，以实现最佳展示效果。
    - Comfy dtype: INT
    - Python dtype: int
- upscale_factor
    - 用于图像的原始放大因子，指示应用于尺寸的放大程度，以实现社交媒体的最佳显示。
    - Comfy dtype: FLOAT
    - Python dtype: float
- prescale_factor
    - 用于图像的原始预缩放因子，表示在进一步处理之前进行的初始大小调整，以实现社交媒体优化。
    - Comfy dtype: FLOAT
    - Python dtype: float
- batch_size
    - 批处理中处理的图像数量，反映了处理多个社交媒体平台图像调整的效率。
    - Comfy dtype: INT
    - Python dtype: int
- empty_latent
    - 图像的占位潜在表示，用于在社交媒体优化工作流程中进行潜在的进一步处理或分析。
    - Comfy dtype: LATENT
    - Python dtype: torch.Tensor
- show_help
    - 一个链接到文档的链接，用于进一步指导和了解如何使用节点进行社交媒体长宽比优化。
    - Comfy dtype: STRING
    - Python dtype: str

# Usage tips
- Infra type: CPU

# Source code
```
class CR_AspectRatioSocialMedia:

    @classmethod
    def INPUT_TYPES(s):
        aspect_ratios = ['custom', 'Instagram Portrait - 1080x1350', 'Instagram Square - 1080x1080', 'Instagram Landscape - 1080x608', 'Instagram Stories/Reels - 1080x1920', 'Facebook Landscape - 1080x1350', 'Facebook Marketplace - 1200x1200', 'Facebook Stories - 1080x1920', 'TikTok - 1080x1920', 'YouTube Banner - 2560×1440', 'LinkedIn Profile Banner - 1584x396', 'LinkedIn Page Cover - 1128x191', 'LinkedIn Post - 1200x627', 'Pinterest Pin Image - 1000x1500', 'CivitAI Cover - 1600x400', 'OpenArt App - 1500x1000']
        return {'required': {'width': ('INT', {'default': 1024, 'min': 64, 'max': 8192}), 'height': ('INT', {'default': 1024, 'min': 64, 'max': 8192}), 'aspect_ratio': (aspect_ratios,), 'swap_dimensions': (['Off', 'On'],), 'upscale_factor': ('FLOAT', {'default': 1.0, 'min': 0.1, 'max': 100.0, 'step': 0.1}), 'prescale_factor': ('FLOAT', {'default': 1.0, 'min': 0.1, 'max': 100.0, 'step': 0.1}), 'batch_size': ('INT', {'default': 1, 'min': 1, 'max': 64})}}
    RETURN_TYPES = ('INT', 'INT', 'FLOAT', 'FLOAT', 'INT', 'LATENT', 'STRING')
    RETURN_NAMES = ('width', 'height', 'upscale_factor', 'prescale_factor', 'batch_size', 'empty_latent', 'show_help')
    FUNCTION = 'Aspect_Ratio'
    CATEGORY = icons.get('Comfyroll/Aspect Ratio')

    def Aspect_Ratio(self, width, height, aspect_ratio, swap_dimensions, upscale_factor, prescale_factor, batch_size):
        if aspect_ratio == 'Instagram Portrait - 1080x1350':
            (width, height) = (1080, 1350)
        elif aspect_ratio == 'Instagram Square - 1080x1080':
            (width, height) = (1080, 1080)
        elif aspect_ratio == 'Instagram Landscape - 1080x608':
            (width, height) = (1080, 608)
        elif aspect_ratio == 'Instagram Stories/Reels - 1080x1920':
            (width, height) = (1080, 1920)
        elif aspect_ratio == 'Facebook Landscape - 1080x1350':
            (width, height) = (1080, 1350)
        elif aspect_ratio == 'Facebook Marketplace - 1200x1200':
            (width, height) = (1200, 1200)
        elif aspect_ratio == 'Facebook Stories - 1080x1920':
            (width, height) = (1080, 1920)
        elif aspect_ratio == 'TikTok - 1080x1920':
            (width, height) = (1080, 1920)
        elif aspect_ratio == 'YouTube Banner - 2560×1440':
            (width, height) = (2560, 1440)
        elif aspect_ratio == 'LinkedIn Profile Banner - 1584x396':
            (width, height) = (1584, 396)
        elif aspect_ratio == 'LinkedIn Page Cover - 1128x191':
            (width, height) = (1584, 396)
        elif aspect_ratio == 'LinkedIn Post - 1200x627':
            (width, height) = (1200, 627)
        elif aspect_ratio == 'Pinterest Pin Image - 1000x1500':
            (width, height) = (1000, 1500)
        elif aspect_ratio == 'Pinterest Cover Image - 1920x1080':
            (width, height) = (1920, 1080)
        elif aspect_ratio == 'CivitAI Cover - 1600x400':
            (width, height) = (1600, 400)
        elif aspect_ratio == 'OpenArt App - 1500x1000':
            (width, height) = (1500, 1000)
        if swap_dimensions == 'On':
            (width, height) = (height, width)
        width = int(width * prescale_factor)
        height = int(height * prescale_factor)
        latent = torch.zeros([batch_size, 4, height // 8, width // 8])
        show_help = 'https://github.com/Suzie1/ComfyUI_Comfyroll_CustomNodes/wiki/Aspect-Ratio-Nodes#cr-aspect-ratio-scial-media'
        return (width, height, upscale_factor, prescale_factor, batch_size, {'samples': latent}, show_help)
```