# Documentation
- Class name: CR_ColorTint
- Category: Comfyroll/Graphics/Filter
- Output node: False
- Repo Ref: https://github.com/RockOfFire/ComfyUI_Comfyroll_CustomNodes

CR_ColorTint节点旨在为图像应用颜色色调，通过叠加所选颜色增强其视觉吸引力。该节点提供了一种多功能的颜色操作方法，允许用户从预定义的颜色集中选择或输入自定义颜色十六进制值。它针对自定义颜色应用和批量处理进行了优化，确保了多张图像的效率和一致性。

# Input types
## Required
- image
    - 图像参数是必需的，因为它是节点将处理的输入。它是应用颜色色调效果的基础，是节点操作的关键组成部分。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
## Optional
- strength
    - 强度参数控制应用于图像的颜色色调的强度。它允许微调效果以实现所需的视觉结果，是节点功能的重要方面。
    - Comfy dtype: FLOAT
    - Python dtype: float
- mode
    - 模式参数确定要应用的颜色色调类型。它提供了一系列的预设选项，使用户可以选择适合他们创意视野的特定颜色音调。
    - Comfy dtype: COMBO['custom', 'white', 'black', 'sepia', 'red', 'green', 'blue', 'cyan', 'magenta', 'yellow', 'purple', 'orange', 'warm', 'cool', 'lime', 'navy', 'vintage', 'rose', 'teal', 'maroon', 'peach', 'lavender', 'olive']
    - Python dtype: str
- tint_color_hex
    - 当选择自定义颜色时，使用tint_color_hex参数。它允许用户指定用于色调的确切颜色十六进制值，为节点的操作提供了高度的定制性。
    - Comfy dtype: STRING
    - Python dtype: str

# Output types
- IMAGE
    - IMAGE输出是应用了颜色色调的处理后的图像。它代表了节点操作的最终结果，是进一步使用或展示的主要输出。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- show_help
    - show_help输出提供了指向节点文档的URL。它是寻求有效使用节点的用户的有用资源。
    - Comfy dtype: STRING
    - Python dtype: str

# Usage tips
- Infra type: CPU

# Source code
```
class CR_ColorTint:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(s):
        tints = ['custom', 'white', 'black', 'sepia', 'red', 'green', 'blue', 'cyan', 'magenta', 'yellow', 'purple', 'orange', 'warm', 'cool', 'lime', 'navy', 'vintage', 'rose', 'teal', 'maroon', 'peach', 'lavender', 'olive']
        return {'required': {'image': ('IMAGE',), 'strength': ('FLOAT', {'default': 1.0, 'min': 0.1, 'max': 1.0, 'step': 0.1}), 'mode': (tints,)}, 'optional': {'tint_color_hex': ('STRING', {'multiline': False, 'default': '#000000'})}}
    RETURN_TYPES = ('IMAGE', 'STRING')
    RETURN_NAMES = ('IMAGE', 'show_help')
    FUNCTION = 'color_tint'
    CATEGORY = icons.get('Comfyroll/Graphics/Filter')

    def color_tint(self, image: torch.Tensor, strength, mode: str='sepia', tint_color_hex='#000000'):
        if strength == 0:
            return (image,)
        tint_color = get_color_values(mode, tint_color_hex, color_mapping)
        color_rgb = tuple([value / 255 for value in tint_color])
        sepia_weights = torch.tensor([0.2989, 0.587, 0.114]).view(1, 1, 1, 3).to(image.device)
        mode_filters = {'custom': torch.tensor([color_rgb[0], color_rgb[1], color_rgb[2]]), 'white': torch.tensor([1, 1, 1]), 'black': torch.tensor([0, 0, 0]), 'sepia': torch.tensor([1.0, 0.8, 0.6]), 'red': torch.tensor([1.0, 0.6, 0.6]), 'green': torch.tensor([0.6, 1.0, 0.6]), 'blue': torch.tensor([0.6, 0.8, 1.0]), 'cyan': torch.tensor([0.6, 1.0, 1.0]), 'magenta': torch.tensor([1.0, 0.6, 1.0]), 'yellow': torch.tensor([1.0, 1.0, 0.6]), 'purple': torch.tensor([0.8, 0.6, 1.0]), 'orange': torch.tensor([1.0, 0.7, 0.3]), 'warm': torch.tensor([1.0, 0.9, 0.7]), 'cool': torch.tensor([0.7, 0.9, 1.0]), 'lime': torch.tensor([0.7, 1.0, 0.3]), 'navy': torch.tensor([0.3, 0.4, 0.7]), 'vintage': torch.tensor([0.9, 0.85, 0.7]), 'rose': torch.tensor([1.0, 0.8, 0.9]), 'teal': torch.tensor([0.3, 0.8, 0.8]), 'maroon': torch.tensor([0.7, 0.3, 0.5]), 'peach': torch.tensor([1.0, 0.8, 0.6]), 'lavender': torch.tensor([0.8, 0.6, 1.0]), 'olive': torch.tensor([0.6, 0.7, 0.4])}
        scale_filter = mode_filters[mode].view(1, 1, 1, 3).to(image.device)
        grayscale = torch.sum(image * sepia_weights, dim=-1, keepdim=True)
        tinted = grayscale * scale_filter
        result = tinted * strength + image * (1 - strength)
        show_help = 'https://github.com/Suzie1/ComfyUI_Comfyroll_CustomNodes/wiki/Filter-Nodes#cr-color-tint'
        return (result, show_help)
```