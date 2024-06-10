# Documentation
- Class name: CR_ColorPanel
- Category: Comfyroll/Graphics/Layout
- Output node: False
- Repo Ref: https://github.com/RockOfFire/ComfyUI_Comfyroll_CustomNodes

CR_ColorPanel 是一个用于生成纯色面板的节点。它允许用户指定面板的尺寸和颜色，然后可以将其用作图像输出。这个节点非常多功能，可以作为更复杂的图像组合的基础，或者作为一个独立的视觉效果元素。

# Input types
## Required
- panel_width
    - panel_width 参数定义了颜色面板的宽度。它对于设置输出图像的水平尺寸至关重要，并在与其他视觉元素结合使用时影响整体构图。
    - Comfy dtype: INT
    - Python dtype: int
- panel_height
    - panel_height 参数决定了颜色面板的高度。与 panel_width 一起，它确定了图像的整体大小，这对于创建视觉上平衡的布局至关重要。
    - Comfy dtype: INT
    - Python dtype: int
- fill_color
    - fill_color 参数决定了填充面板的颜色。它是节点功能的关键方面，允许定制面板的外观以满足特定的设计要求。
    - Comfy dtype: STRING
    - Python dtype: str
## Optional
- fill_color_hex
    - fill_color_hex 参数提供了使用十六进制值指定填充颜色的另一种方式。这允许精确控制颜色，特别是当需要一种特定色调时，这种色调可能在预定义的颜色选项中并不直接可用。
    - Comfy dtype: STRING
    - Python dtype: str

# Output types
- image
    - 图像输出是作为张量渲染的颜色面板。它代表了节点操作的视觉结果，可以用作进一步图像处理的输入或直接显示。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- show_help
    - show_help 输出提供了指向节点文档的 URL 链接。这对于寻求如何有效使用节点的额外指导或信息的用户来说非常有用。
    - Comfy dtype: STRING
    - Python dtype: str

# Usage tips
- Infra type: CPU

# Source code
```
class CR_ColorPanel:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'panel_width': ('INT', {'default': 512, 'min': 8, 'max': 4096}), 'panel_height': ('INT', {'default': 512, 'min': 8, 'max': 4096}), 'fill_color': (COLORS,)}, 'optional': {'fill_color_hex': ('STRING', {'multiline': False, 'default': '#000000'})}}
    RETURN_TYPES = ('IMAGE', 'STRING')
    RETURN_NAMES = ('image', 'show_help')
    FUNCTION = 'make_panel'
    CATEGORY = icons.get('Comfyroll/Graphics/Layout')

    def make_panel(self, panel_width, panel_height, fill_color, fill_color_hex='#000000'):
        fill_color = get_color_values(fill_color, fill_color_hex, color_mapping)
        size = (panel_width, panel_height)
        panel = Image.new('RGB', size, fill_color)
        show_help = 'https://github.com/Suzie1/ComfyUI_Comfyroll_CustomNodes/wiki/Layout-Nodes#cr-color-panel'
        return (pil2tensor(panel), show_help)
```