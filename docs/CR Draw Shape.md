# Documentation
- Class name: CR_DrawShape
- Category: Comfyroll/Graphics/Shape
- Output node: False
- Repo Ref: https://github.com/RockOfFire/ComfyUI_Comfyroll_CustomNodes

CR_DrawShape 是一个多功能节点，旨在生成多种几何形状，并允许自定义属性。它强调在形状创建中的灵活性，使用户能够定义形状的尺寸、颜色和方向。该节点的功能扩展到修改背景，并应用旋转和缩放等转换，以实现定制化的视觉输出。

# Input types
## Required
- width
    - 宽度决定了形状画布的水平范围，影响输出图像的整体规模。
    - Comfy dtype: INT
    - Python dtype: int
- height
    - 高度设置了画布的垂直尺寸，与宽度一起确定画布的大小。
    - Comfy dtype: INT
    - Python dtype: int
- shape
    - 形状定义了要绘制的几何形状，提供了多种标准形状供选择。
    - Comfy dtype: STRING
    - Python dtype: str
- shape_color
    - 形状颜色决定了形状本身的色调，使其具有视觉区分度和美学吸引力。
    - Comfy dtype: STRING
    - Python dtype: str
- back_color
    - 背景颜色为画布设定基调，为形状提供对比或补充的背景。
    - Comfy dtype: STRING
    - Python dtype: str
## Optional
- x_offset
    - X偏移调整形状的水平位置，允许在画布上精确放置。
    - Comfy dtype: INT
    - Python dtype: int
- y_offset
    - Y偏移修改垂直位置，提供对形状在画布上位置的控制。
    - Comfy dtype: INT
    - Python dtype: int
- zoom
    - 缩放控制形状的比例因子，影响其在画布上的大小，而不影响画布的尺寸。
    - Comfy dtype: FLOAT
    - Python dtype: float
- rotation
    - 旋转为形状应用一定程度的旋转，增强其视觉动态效果。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- IMAGE
    - IMAGE输出提供渲染的形状作为图像，可供进一步处理或展示。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- show_help
    - show_help输出提供了指向节点文档的URL，以获取更多指导和信息。
    - Comfy dtype: STRING
    - Python dtype: str

# Usage tips
- Infra type: CPU

# Source code
```
class CR_DrawShape:

    @classmethod
    def INPUT_TYPES(cls):
        shapes = ['circle', 'oval', 'square', 'diamond', 'triangle', 'hexagon', 'octagon', 'quarter circle', 'half circle', 'quarter circle', 'starburst', 'star', 'cross', 'diagonal regions']
        return {'required': {'width': ('INT', {'default': 512, 'min': 64, 'max': 4096}), 'height': ('INT', {'default': 512, 'min': 64, 'max': 4096}), 'shape': (shapes,), 'shape_color': (COLORS,), 'back_color': (COLORS,), 'x_offset': ('INT', {'default': 0, 'min': -2048, 'max': 2048}), 'y_offset': ('INT', {'default': 0, 'min': -2048, 'max': 2048}), 'zoom': ('FLOAT', {'default': 1.0, 'min': 0.0, 'max': 10.0, 'step': 0.05}), 'rotation': ('FLOAT', {'default': 0.0, 'min': 0.0, 'max': 3600.0, 'step': 0.1})}, 'optional': {'shape_color_hex': ('STRING', {'multiline': False, 'default': '#000000'}), 'bg_color_hex': ('STRING', {'multiline': False, 'default': '#000000'})}}
    RETURN_TYPES = ('IMAGE', 'STRING')
    RETURN_NAMES = ('IMAGE', 'show_help')
    FUNCTION = 'make_shape'
    CATEGORY = icons.get('Comfyroll/Graphics/Shape')

    def make_shape(self, width, height, rotation, shape, shape_color, back_color, x_offset=0, y_offset=0, zoom=1.0, shape_color_hex='#000000', bg_color_hex='#000000'):
        bg_color = get_color_values(back_color, bg_color_hex, color_mapping)
        shape_color = get_color_values(shape_color, shape_color_hex, color_mapping)
        back_img = Image.new('RGB', (width, height), color=bg_color)
        shape_img = Image.new('RGB', (width, height), color=shape_color)
        shape_mask = Image.new('L', (width, height))
        draw = ImageDraw.Draw(shape_mask)
        center_x = width // 2 + x_offset
        center_y = height // 2 + y_offset
        size = min(width - x_offset, height - y_offset) * zoom
        aspect_ratio = width / height
        color = 'white'
        shape_functions = {'circle': draw_circle, 'oval': draw_oval, 'diamond': draw_diamond, 'square': draw_square, 'triangle': draw_triangle, 'hexagon': draw_hexagon, 'octagon': draw_octagon, 'quarter circle': draw_quarter_circle, 'half circle': draw_half_circle, 'starburst': draw_starburst, 'star': draw_star, 'cross': draw_cross}
        if shape in shape_functions:
            shape_function = shape_functions.get(shape)
            shape_function(draw, center_x, center_y, size, aspect_ratio, color)
        if shape == 'diagonal regions':
            draw.polygon([(width, 0), (width, height), (0, height)], fill=color)
        shape_mask = shape_mask.rotate(rotation, center=(center_x, center_y))
        result_image = Image.composite(shape_img, back_img, shape_mask)
        image_out = pil2tensor(result_image)
        show_help = 'https://github.com/Suzie1/ComfyUI_Comfyroll_CustomNodes/wiki/Pattern-Nodes-2#cr-draw-shape'
        return (image_out, show_help)
```