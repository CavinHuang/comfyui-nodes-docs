# Documentation
- Class name: CR_PageLayout
- Category: Comfyroll/Graphics/Layout
- Output node: False
- Repo Ref: https://github.com/RockOfFire/ComfyUI_Comfyroll_CustomNodes

CR_PageLayout 节点旨在通过添加自定义的标题和页脚文本来生成图像的结构化布局。它允许操作字体属性、颜色，并添加边框，以创建视觉上吸引人的组合。

# Input types
## Required
- layout_options
    - 布局选项定义了最终图像中将包含哪些部分的布局。这个选择影响输出的整体结构和组成。
    - Comfy dtype: COMBO['header', 'footer', 'header and footer', 'no header or footer']
    - Python dtype: str
- image_panel
    - 主要的图像面板，作为布局的中心组件。它是将要添加标题和页脚的图像。
    - Comfy dtype: IMAGE
    - Python dtype: PIL.Image.Image
- header_height
    - 指定标题部分的高度。这个参数对于确定标题在布局中的间距和大小至关重要。
    - Comfy dtype: INT
    - Python dtype: int
- header_text
    - 标题部分的文本内容。它影响标题的视觉展示和它所传达的信息。
    - Comfy dtype: STRING
    - Python dtype: str
- header_align
    - 确定标题的文本对齐方式。它影响标题文本在标题部分内的位置。
    - Comfy dtype: JUSTIFY_OPTIONS
    - Python dtype: str
- footer_height
    - 指定页脚部分的高度。它是设置布局中页脚间距和大小的重要参数。
    - Comfy dtype: INT
    - Python dtype: int
- footer_text
    - 页脚部分的文本内容。它决定了页脚的信息和视觉风格。
    - Comfy dtype: STRING
    - Python dtype: str
- footer_align
    - 定义页脚的文本对齐方式。它控制页脚文本在页脚部分内的位置。
    - Comfy dtype: JUSTIFY_OPTIONS
    - Python dtype: str
- font_name
    - 选择用于标题和页脚文本的字体。字体的选择可以显著影响布局的整体美感。
    - Comfy dtype: FONT_LIST
    - Python dtype: str
- font_color
    - 设置标题和页脚文本的字体颜色。它在文本的可读性和视觉吸引力中起着关键作用。
    - Comfy dtype: COLORS
    - Python dtype: str
- header_font_size
    - 定义标题文本的字体大小。它影响标题在布局中的突出度和可读性。
    - Comfy dtype: INT
    - Python dtype: int
- footer_font_size
    - 指定页脚文本的字体大小。它对于页脚在布局中的可见性和突出性很重要。
    - Comfy dtype: INT
    - Python dtype: int
- border_thickness
    - 确定布局周围边框的厚度。它有助于整体框架和布局边缘的定义。
    - Comfy dtype: INT
    - Python dtype: int
- border_color
    - 设置布局周围边框的颜色。它在布局的视觉边界和风格中起着重要作用。
    - Comfy dtype: COLORS
    - Python dtype: str
- background_color
    - 定义布局的背景颜色。它为所有其他元素提供了基本的视觉背景。
    - Comfy dtype: COLORS
    - Python dtype: str

# Output types
- image
    - 最终组合的图像，包括根据输入参数指定的任何标题、页脚和边框。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- show_help
    - 提供文档链接，以获得进一步的帮助和关于节点功能的详细信息。
    - Comfy dtype: STRING
    - Python dtype: str

# Usage tips
- Infra type: CPU

# Source code
```
class CR_PageLayout:

    @classmethod
    def INPUT_TYPES(s):
        font_dir = os.path.join(os.path.dirname(os.path.dirname(os.path.realpath(__file__))), 'fonts')
        file_list = [f for f in os.listdir(font_dir) if os.path.isfile(os.path.join(font_dir, f)) and f.lower().endswith('.ttf')]
        layout_options = ['header', 'footer', 'header and footer', 'no header or footer']
        return {'required': {'layout_options': (layout_options,), 'image_panel': ('IMAGE',), 'header_height': ('INT', {'default': 0, 'min': 0, 'max': 1024}), 'header_text': ('STRING', {'multiline': True, 'default': 'text'}), 'header_align': (JUSTIFY_OPTIONS,), 'footer_height': ('INT', {'default': 0, 'min': 0, 'max': 1024}), 'footer_text': ('STRING', {'multiline': True, 'default': 'text'}), 'footer_align': (JUSTIFY_OPTIONS,), 'font_name': (file_list,), 'font_color': (COLORS,), 'header_font_size': ('INT', {'default': 150, 'min': 0, 'max': 1024}), 'footer_font_size': ('INT', {'default': 50, 'min': 0, 'max': 1024}), 'border_thickness': ('INT', {'default': 0, 'min': 0, 'max': 1024}), 'border_color': (COLORS,), 'background_color': (COLORS,)}, 'optional': {'font_color_hex': ('STRING', {'multiline': False, 'default': '#000000'}), 'border_color_hex': ('STRING', {'multiline': False, 'default': '#000000'}), 'bg_color_hex': ('STRING', {'multiline': False, 'default': '#000000'})}}
    RETURN_TYPES = ('IMAGE', 'STRING')
    RETURN_NAMES = ('image', 'show_help')
    FUNCTION = 'layout'
    CATEGORY = icons.get('Comfyroll/Graphics/Layout')

    def layout(self, layout_options, image_panel, border_thickness, border_color, background_color, header_height, header_text, header_align, footer_height, footer_text, footer_align, font_name, font_color, header_font_size, footer_font_size, font_color_hex='#000000', border_color_hex='#000000', bg_color_hex='#000000'):
        font_color = get_color_values(font_color, font_color_hex, color_mapping)
        border_color = get_color_values(border_color, border_color_hex, color_mapping)
        bg_color = get_color_values(background_color, bg_color_hex, color_mapping)
        main_panel = tensor2pil(image_panel)
        image_width = main_panel.width
        image_height = main_panel.height
        margins = 50
        line_spacing = 0
        position_x = 0
        position_y = 0
        align = 'center'
        rotation_angle = 0
        rotation_options = 'image center'
        font_outline_thickness = 0
        font_outline_color = 'black'
        images = []
        if layout_options == 'header' or layout_options == 'header and footer':
            header_panel = text_panel(image_width, header_height, header_text, font_name, header_font_size, font_color, font_outline_thickness, font_outline_color, bg_color, margins, line_spacing, position_x, position_y, align, header_align, rotation_angle, rotation_options)
            images.append(header_panel)
        images.append(main_panel)
        if layout_options == 'footer' or layout_options == 'header and footer':
            footer_panel = text_panel(image_width, footer_height, footer_text, font_name, footer_font_size, font_color, font_outline_thickness, font_outline_color, bg_color, margins, line_spacing, position_x, position_y, align, footer_align, rotation_angle, rotation_options)
            images.append(footer_panel)
        combined_image = combine_images(images, 'vertical')
        if border_thickness > 0:
            combined_image = ImageOps.expand(combined_image, border_thickness, border_color)
        show_help = 'https://github.com/Suzie1/ComfyUI_Comfyroll_CustomNodes/wiki/Layout-Nodes#cr-page-layout'
        return (pil2tensor(combined_image), show_help)
```