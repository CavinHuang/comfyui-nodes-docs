# Documentation
- Class name: CR_ComicPanelTemplates
- Category: Comfyroll/Graphics/Template
- Output node: False
- Repo Ref: https://github.com/RockOfFire/ComfyUI_Comfyroll_CustomNodes

CR_ComicPanelTemplates 是一个用于从一组图片创建漫画面板布局的节点。它允许自定义面板布局、阅读方向以及边框、轮廓和背景的颜色。该节点能够处理预定义和自定义的面板布局，以创建漫画条效果。

# Input types
## Required
- page_width
    - page_width 参数决定了漫画面板布局的宽度。它对于设置输出的总体尺寸至关重要，并影响布局内面板的间距和排列。
    - Comfy dtype: INT
    - Python dtype: int
- page_height
    - page_height 参数设置漫画面板布局的高度。它与 page_width 一起工作，以确定漫画条的整体画布大小。
    - Comfy dtype: INT
    - Python dtype: int
- template
    - template 参数指定漫画面板的预定义或自定义布局。它是一个关键输入，决定了最终输出的结构。
    - Comfy dtype: STRING
    - Python dtype: str
- reading_direction
    - reading_direction 参数决定了漫画面板的阅读流向，可以是从左到右或从右到左，这对于正确顺序阅读面板至关重要。
    - Comfy dtype: STRING
    - Python dtype: str
- border_thickness
    - border_thickness 参数定义了每个漫画面板周围边框的厚度。它有助于提高各个面板的美观度和清晰度。
    - Comfy dtype: INT
    - Python dtype: int
- outline_thickness
    - outline_thickness 参数设置了每个面板周围轮廓的厚度，增强了面板之间的视觉区分。
    - Comfy dtype: INT
    - Python dtype: int
- outline_color
    - outline_color 参数指定了每个漫画面板周围轮廓的颜色，它在布局的整体视觉风格中扮演着角色。
    - Comfy dtype: STRING
    - Python dtype: str
- panel_color
    - panel_color 参数决定了每个漫画面板的背景颜色，为内部的艺术作品设定了基调。
    - Comfy dtype: STRING
    - Python dtype: str
- background_color
    - background_color 参数设置了整个漫画面板布局的背景颜色，为面板提供了一个背景画布。
    - Comfy dtype: STRING
    - Python dtype: str
## Optional
- images
    - images 参数是一个可选的图像张量列表，将用于填充漫画面板。它允许在布局中进行动态内容填充。
    - Comfy dtype: IMAGE
    - Python dtype: List[torch.Tensor]
- custom_panel_layout
    - custom_panel_layout 参数接受一个字符串，定义了面板的自定义网格布局。当选择 'custom' 模板时使用。
    - Comfy dtype: STRING
    - Python dtype: str
- outline_color_hex
    - outline_color_hex 参数提供了轮廓的十六进制颜色值，提供了指定轮廓颜色的另一种方式。
    - Comfy dtype: STRING
    - Python dtype: str
- panel_color_hex
    - panel_color_hex 参数允许为面板背景指定一个十六进制颜色值，提供了颜色选择上的灵活性。
    - Comfy dtype: STRING
    - Python dtype: str
- bg_color_hex
    - bg_color_hex 参数设置了整个布局背景的十六进制颜色值，提供了输入背景颜色的直接方法。
    - Comfy dtype: STRING
    - Python dtype: str

# Output types
- image
    - image 输出包含渲染后的漫画面板布局作为图像张量，可供进一步处理或展示。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- show_help
    - show_help 输出提供了一个指向文档页面的 URL，以获取有关使用该节点的额外指导。
    - Comfy dtype: STRING
    - Python dtype: str

# Usage tips
- Infra type: CPU

# Source code
```
class CR_ComicPanelTemplates:

    @classmethod
    def INPUT_TYPES(s):
        directions = ['left to right', 'right to left']
        templates = ['custom', 'G22', 'G33', 'H2', 'H3', 'H12', 'H13', 'H21', 'H23', 'H31', 'H32', 'V2', 'V3', 'V12', 'V13', 'V21', 'V23', 'V31', 'V32']
        return {'required': {'page_width': ('INT', {'default': 512, 'min': 8, 'max': 4096}), 'page_height': ('INT', {'default': 512, 'min': 8, 'max': 4096}), 'template': (templates,), 'reading_direction': (directions,), 'border_thickness': ('INT', {'default': 5, 'min': 0, 'max': 1024}), 'outline_thickness': ('INT', {'default': 2, 'min': 0, 'max': 1024}), 'outline_color': (COLORS,), 'panel_color': (COLORS,), 'background_color': (COLORS,)}, 'optional': {'images': ('IMAGE',), 'custom_panel_layout': ('STRING', {'multiline': False, 'default': 'H123'}), 'outline_color_hex': ('STRING', {'multiline': False, 'default': '#000000'}), 'panel_color_hex': ('STRING', {'multiline': False, 'default': '#000000'}), 'bg_color_hex': ('STRING', {'multiline': False, 'default': '#000000'})}}
    RETURN_TYPES = ('IMAGE', 'STRING')
    RETURN_NAMES = ('image', 'show_help')
    FUNCTION = 'layout'
    CATEGORY = icons.get('Comfyroll/Graphics/Template')

    def layout(self, page_width, page_height, template, reading_direction, border_thickness, outline_thickness, outline_color, panel_color, background_color, images=None, custom_panel_layout='G44', outline_color_hex='#000000', panel_color_hex='#000000', bg_color_hex='#000000'):
        panels = []
        k = 0
        len_images = 0
        if images is not None:
            images = [tensor2pil(image) for image in images]
            len_images = len(images)
        outline_color = get_color_values(outline_color, outline_color_hex, color_mapping)
        panel_color = get_color_values(panel_color, panel_color_hex, color_mapping)
        bg_color = get_color_values(background_color, bg_color_hex, color_mapping)
        size = (page_width - 2 * border_thickness, page_height - 2 * border_thickness)
        page = Image.new('RGB', size, bg_color)
        draw = ImageDraw.Draw(page)
        if template == 'custom':
            template = custom_panel_layout
        first_char = template[0]
        if first_char == 'G':
            rows = int(template[1])
            columns = int(template[2])
            panel_width = (page.width - 2 * columns * (border_thickness + outline_thickness)) // columns
            panel_height = (page.height - 2 * rows * (border_thickness + outline_thickness)) // rows
            for i in range(rows):
                for j in range(columns):
                    create_and_paste_panel(page, border_thickness, outline_thickness, panel_width, panel_height, page.width, panel_color, bg_color, outline_color, images, i, j, k, len_images, reading_direction)
                    k += 1
        elif first_char == 'H':
            rows = len(template) - 1
            panel_height = (page.height - 2 * rows * (border_thickness + outline_thickness)) // rows
            for i in range(rows):
                columns = int(template[i + 1])
                panel_width = (page.width - 2 * columns * (border_thickness + outline_thickness)) // columns
                for j in range(columns):
                    create_and_paste_panel(page, border_thickness, outline_thickness, panel_width, panel_height, page.width, panel_color, bg_color, outline_color, images, i, j, k, len_images, reading_direction)
                    k += 1
        elif first_char == 'V':
            columns = len(template) - 1
            panel_width = (page.width - 2 * columns * (border_thickness + outline_thickness)) // columns
            for j in range(columns):
                rows = int(template[j + 1])
                panel_height = (page.height - 2 * rows * (border_thickness + outline_thickness)) // rows
                for i in range(rows):
                    create_and_paste_panel(page, border_thickness, outline_thickness, panel_width, panel_height, page.width, panel_color, bg_color, outline_color, images, i, j, k, len_images, reading_direction)
                    k += 1
        if border_thickness > 0:
            page = ImageOps.expand(page, border_thickness, bg_color)
        show_help = 'https://github.com/Suzie1/ComfyUI_Comfyroll_CustomNodes/wiki/Template-Nodes#cr-comic-panel-templates'
        return (pil2tensor(page), show_help)
```