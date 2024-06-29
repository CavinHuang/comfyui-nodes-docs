# Documentation
- Class name: CR_SimpleTextPanel
- Category: Comfyroll/Graphics/Layout
- Output node: False
- Repo Ref: https://github.com/RockOfFire/ComfyUI_Comfyroll_CustomNodes

CR_SimpleTextPanel 旨在创建具有可定制字体、颜色和布局选项的视觉上吸引人的文本面板。它允许将文本渲染到图像背景上，并具有各种样式功能，如字体轮廓和对齐方式，以增强文本信息的展示效果。

# Input types
## Required
- panel_width
    - 文本面板的宽度决定了输出图像的水平范围。这是一个关键参数，因为它决定了文本内容可用的空间，影响整体布局和外观。
    - Comfy dtype: INT
    - Python dtype: int
- panel_height
    - 文本面板的高度设置了面板的垂直尺寸，这对于控制文本的垂直空间并确保文本适应图像边界至关重要。
    - Comfy dtype: INT
    - Python dtype: int
- text
    - 文本参数是面板上要显示的实际内容。它可以包含多行文本，这对于更长的段落或当需要更复杂的布局时特别有用。
    - Comfy dtype: STRING
    - Python dtype: str
- font_name
    - 字体名称参数指定用于文本的字体类型。字体的选择可以显著影响面板内文本的风格和可读性。
    - Comfy dtype: STRING
    - Python dtype: str
- font_color
    - 字体颜色决定了文本的颜色，允许用户将文本与背景或特定设计主题相匹配。它在确保文本可读性和视觉对比度方面起着至关重要的作用。
    - Comfy dtype: STRING
    - Python dtype: str
- font_size
    - 字体大小控制文本的规模，这对于可读性和调整文本以适应指定的面板尺寸是一个重要因素。
    - Comfy dtype: INT
    - Python dtype: int
- font_outline_thickness
    - 字体轮廓的厚度增加了文本的强调效果，并可以提高其在复杂背景上的可见性。这是一个可选的风格选择，可以增强文本的外观。
    - Comfy dtype: INT
    - Python dtype: int
- font_outline_color
    - 字体轮廓颜色提供了一个对比边界，可以增强文本的定义，并在背景中脱颖而出，特别是当字体颜色和背景相似时。
    - Comfy dtype: STRING
    - Python dtype: str
- background_color
    - 背景颜色为文本面板设置了基本色调，可以影响设计的总体氛围和美感。它是创建和谐视觉组合的关键要素。
    - Comfy dtype: STRING
    - Python dtype: str
- align
    - 对齐参数决定了文本在面板内的水平对齐方式，这可以影响设计的对称性和平衡。
    - Comfy dtype: STRING
    - Python dtype: str
- justify
    - 对齐选项控制单词和字符之间的间距，确保文本沿左右边距均匀对齐。
    - Comfy dtype: STRING
    - Python dtype: str

# Output types
- image
    - 结果图像是 CR_SimpleTextPanel 节点的主要输出，包含在指定背景上布局的样式化文本。它代表了节点功能最终的视觉产品。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- show_help
    - show_help 输出提供了一个 URL 链接到文档页面，以获取关于节点使用和功能的进一步帮助或信息。
    - Comfy dtype: STRING
    - Python dtype: str

# Usage tips
- Infra type: CPU

# Source code
```
class CR_SimpleTextPanel:

    @classmethod
    def INPUT_TYPES(s):
        font_dir = os.path.join(os.path.dirname(os.path.dirname(os.path.realpath(__file__))), 'fonts')
        file_list = [f for f in os.listdir(font_dir) if os.path.isfile(os.path.join(font_dir, f)) and f.lower().endswith('.ttf')]
        return {'required': {'panel_width': ('INT', {'default': 512, 'min': 8, 'max': 4096}), 'panel_height': ('INT', {'default': 512, 'min': 8, 'max': 4096}), 'text': ('STRING', {'multiline': True, 'default': 'text'}), 'font_name': (file_list,), 'font_color': (COLORS,), 'font_size': ('INT', {'default': 100, 'min': 0, 'max': 1024}), 'font_outline_thickness': ('INT', {'default': 0, 'min': 0, 'max': 50}), 'font_outline_color': (COLORS,), 'background_color': (COLORS,), 'align': (ALIGN_OPTIONS,), 'justify': (JUSTIFY_OPTIONS,)}, 'optional': {'font_color_hex': ('STRING', {'multiline': False, 'default': '#000000'}), 'bg_color_hex': ('STRING', {'multiline': False, 'default': '#000000'})}}
    RETURN_TYPES = ('IMAGE', 'STRING')
    RETURN_NAMES = ('image', 'show_help')
    FUNCTION = 'layout'
    CATEGORY = icons.get('Comfyroll/Graphics/Layout')

    def layout(self, panel_width, panel_height, text, align, justify, font_name, font_color, font_size, font_outline_thickness, font_outline_color, background_color, font_color_hex='#000000', font_outline_color_hex='#000000', bg_color_hex='#000000'):
        font_color = get_color_values(font_color, font_color_hex, color_mapping)
        outline_color = get_color_values(font_outline_color, font_outline_color_hex, color_mapping)
        bg_color = get_color_values(background_color, bg_color_hex, color_mapping)
        margins = 50
        line_spacing = 0
        position_x = 0
        position_y = 0
        rotation_angle = 0
        rotation_options = 'image center'
        panel = text_panel(panel_width, panel_height, text, font_name, font_size, font_color, font_outline_thickness, outline_color, bg_color, margins, line_spacing, position_x, position_y, align, justify, rotation_angle, rotation_options)
        show_help = 'https://github.com/Suzie1/ComfyUI_Comfyroll_CustomNodes/wiki/Layout-Nodes#cr-simple-text-panel'
        return (pil2tensor(panel), show_help)
```