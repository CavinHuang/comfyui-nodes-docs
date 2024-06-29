# Documentation
- Class name: CR_DrawText
- Category: Comfyroll/Graphics/Text
- Output node: False
- Repo Ref: https://github.com/RockOfFire/ComfyUI_Comfyroll_CustomNodes

CR_DrawText 节点旨在将文本渲染到图像上。它允许自定义字体、颜色和位置，以创建视觉上吸引人的文本覆盖。这个节点功能多样，可以在需要将文本动态添加到图像的各种应用中使用。

# Input types
## Required
- image_width
    - 文本将被绘制在其上的图像的宽度。这是一个关键参数，决定了输出图像的整体大小。
    - Comfy dtype: INT
    - Python dtype: int
- image_height
    - 图像的高度。它与宽度一起工作，设置文本将被渲染的画布的尺寸。
    - Comfy dtype: INT
    - Python dtype: int
- text
    - 要绘制到图像上的实际文本内容。它可以包含多行文本以适应段落或列表。
    - Comfy dtype: STRING
    - Python dtype: str
- font_name
    - 用于文本的字体名称。它必须是指定字体目录中可用的有效.ttf字体文件。
    - Comfy dtype: STRING
    - Python dtype: str
- font_size
    - 字体的大小，以点为单位。它影响文本在图像中的可读性和视觉突出度。
    - Comfy dtype: INT
    - Python dtype: int
- font_color
    - 字体的颜色。它由一个名称指定，该名称对应于预定义颜色映射中的一种颜色。
    - Comfy dtype: STRING
    - Python dtype: str
- background_color
    - 文本区域的背景颜色。它用于创建与文本形成对比的背景，使文本更加突出。
    - Comfy dtype: STRING
    - Python dtype: str
- align
    - 文本的水平对齐方式。它决定了文本如何分布在图像的宽度上。
    - Comfy dtype: STRING
    - Python dtype: str
- justify
    - 文本的对齐方式。它控制文本中单词和字符之间的间距。
    - Comfy dtype: STRING
    - Python dtype: str
- margins
    - 文本周围的空间，以像素为单位。它在文本和图像边缘之间添加了一个缓冲区。
    - Comfy dtype: INT
    - Python dtype: int
- line_spacing
    - 文本行之间的空间，它影响多行文本的整体可读性和布局。
    - Comfy dtype: INT
    - Python dtype: int
- position_x
    - 文本将开始的水平位置。它以像素为单位，从图像的左侧边缘开始计算。
    - Comfy dtype: INT
    - Python dtype: int
- position_y
    - 文本将开始的垂直位置。它以像素为单位，从图像的顶部边缘开始计算。
    - Comfy dtype: INT
    - Python dtype: int
- rotation_angle
    - 文本将被旋转的角度。它可以用来通过倾斜文本来创建风格化的效果。
    - Comfy dtype: FLOAT
    - Python dtype: float
- rotation_options
    - 确定文本旋转的支点。它可以是文本的中心或图像的中心。
    - Comfy dtype: STRING
    - Python dtype: str

# Output types
- IMAGE
    - 绘制了文本的结果图像。它是节点的主要输出，代表了最终的视觉产品。
    - Comfy dtype: IMAGE
    - Python dtype: PIL.Image.Image
- show_help
    - 指向节点文档的URL链接。它提供了关于如何有效使用节点的额外信息和指导。
    - Comfy dtype: STRING
    - Python dtype: str

# Usage tips
- Infra type: CPU

# Source code
```
class CR_DrawText:

    @classmethod
    def INPUT_TYPES(s):
        font_dir = os.path.join(os.path.dirname(os.path.dirname(os.path.realpath(__file__))), 'fonts')
        file_list = [f for f in os.listdir(font_dir) if os.path.isfile(os.path.join(font_dir, f)) and f.lower().endswith('.ttf')]
        return {'required': {'image_width': ('INT', {'default': 512, 'min': 64, 'max': 2048}), 'image_height': ('INT', {'default': 512, 'min': 64, 'max': 2048}), 'text': ('STRING', {'multiline': True, 'default': 'text'}), 'font_name': (file_list,), 'font_size': ('INT', {'default': 50, 'min': 1, 'max': 1024}), 'font_color': (COLORS,), 'background_color': (COLORS,), 'align': (ALIGN_OPTIONS,), 'justify': (JUSTIFY_OPTIONS,), 'margins': ('INT', {'default': 0, 'min': -1024, 'max': 1024}), 'line_spacing': ('INT', {'default': 0, 'min': -1024, 'max': 1024}), 'position_x': ('INT', {'default': 0, 'min': -4096, 'max': 4096}), 'position_y': ('INT', {'default': 0, 'min': -4096, 'max': 4096}), 'rotation_angle': ('FLOAT', {'default': 0.0, 'min': -360.0, 'max': 360.0, 'step': 0.1}), 'rotation_options': (ROTATE_OPTIONS,)}, 'optional': {'font_color_hex': ('STRING', {'multiline': False, 'default': '#000000'}), 'bg_color_hex': ('STRING', {'multiline': False, 'default': '#000000'})}}
    RETURN_TYPES = ('IMAGE', 'STRING')
    RETURN_NAMES = ('IMAGE', 'show_help')
    FUNCTION = 'draw_text'
    CATEGORY = icons.get('Comfyroll/Graphics/Text')

    def draw_text(self, image_width, image_height, text, font_name, font_size, font_color, background_color, margins, line_spacing, position_x, position_y, align, justify, rotation_angle, rotation_options, font_color_hex='#000000', bg_color_hex='#000000'):
        text_color = get_color_values(font_color, font_color_hex, color_mapping)
        bg_color = get_color_values(background_color, bg_color_hex, color_mapping)
        size = (image_width, image_height)
        text_image = Image.new('RGB', size, text_color)
        back_image = Image.new('RGB', size, bg_color)
        text_mask = Image.new('L', back_image.size)
        rotated_text_mask = draw_masked_text(text_mask, text, font_name, font_size, margins, line_spacing, position_x, position_y, align, justify, rotation_angle, rotation_options)
        image_out = Image.composite(text_image, back_image, rotated_text_mask)
        show_help = 'https://github.com/Suzie1/ComfyUI_Comfyroll_CustomNodes/wiki/Text-Nodes#cr-draw-text'
        return (pil2tensor(image_out), show_help)
```