# Documentation
- Class name: CR_DrawPie
- Category: Comfyroll/Graphics/Shape
- Output node: False
- Repo Ref: https://github.com/RockOfFire/ComfyUI_Comfyroll_CustomNodes

CR_DrawPie是一个设计用来生成饼图视觉表示的节点。它允许定制饼图的外观，包括其尺寸、起始和结束角度、颜色和旋转。该节点的功能集中在创建数据段的图形表示上，使其成为可视化比例和分布的多功能工具。

# Input types
## Required
- width
    - 宽度决定了饼图的宽度，是设置输出图像整体尺寸的关键参数。它直接影响饼图可视化的比例和宽高比。
    - Comfy dtype: INT
    - Python dtype: int
- height
    - 高度设置了饼图的垂直范围，与宽度一起确定图表的比例。它在饼图的最终外观中扮演重要角色，确保视觉表示平衡。
    - Comfy dtype: INT
    - Python dtype: int
- pie_start
    - 饼图起始是饼图分段开始的初始角度。它对于定义分段的起始位置至关重要，并有助于整体饼图的构图。
    - Comfy dtype: FLOAT
    - Python dtype: float
- pie_stop
    - 饼图结束是饼图分段结束的角度。它与饼图起始一起工作，以确定饼图中分段的大小和范围。
    - Comfy dtype: FLOAT
    - Python dtype: float
- shape_color
    - 形状颜色定义了饼图分段的颜色，允许用户自定义数据表示的外观。这是视觉设计的关键方面，可以传达不同的含义或类别。
    - Comfy dtype: COLORS
    - Python dtype: str
- back_color
    - 背景颜色设置了饼图的背景颜色，为形状颜色提供对比或互补的色调。它是增强图表视觉吸引力和清晰度的重要参数。
    - Comfy dtype: COLORS
    - Python dtype: str
## Optional
- x_offset
    - X偏移用于调整画布内饼图的水平位置。它可以用于对齐多个图表或为了美观目的定位图表。
    - Comfy dtype: INT
    - Python dtype: int
- y_offset
    - Y偏移用于调整画布内饼图的垂直位置。与X偏移类似，它有助于为最佳视觉展示定位图表。
    - Comfy dtype: INT
    - Python dtype: int
- zoom
    - 缩放是一个调整饼图相对于其原始尺寸大小的比例因子。它可以用来强调图表或将其适应于特定空间。
    - Comfy dtype: FLOAT
    - Python dtype: float
- rotation
    - 旋转允许围绕饼图的中心旋转。这可以用来将图表定向到特定方向或创建动态视觉效果。
    - Comfy dtype: FLOAT
    - Python dtype: float
- shape_color_hex
    - 形状颜色十六进制提供了饼图分段的十六进制颜色代码，提供了对使用颜色的精确控制。它是形状颜色参数的替代方案，适用于需要特定颜色值的用户。
    - Comfy dtype: STRING
    - Python dtype: str
- bg_color_hex
    - 背景颜色十六进制为饼图的背景指定了十六进制颜色代码，允许微调背景颜色以满足特定的设计要求。
    - Comfy dtype: STRING
    - Python dtype: str

# Output types
- IMAGE
    - IMAGE输出提供了生成的饼图作为图像文件。这是节点操作的主结果，包含了数据输入的视觉表示。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- show_help
    - show_help输出提供了一个URL链接到文档页面，以获取有关节点使用和功能的进一步帮助或信息。
    - Comfy dtype: STRING
    - Python dtype: str

# Usage tips
- Infra type: CPU

# Source code
```
class CR_DrawPie:

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'width': ('INT', {'default': 512, 'min': 64, 'max': 4096}), 'height': ('INT', {'default': 512, 'min': 64, 'max': 4096}), 'pie_start': ('FLOAT', {'default': 30.0, 'min': 0.0, 'max': 9999.0, 'step': 0.1}), 'pie_stop': ('FLOAT', {'default': 330.0, 'min': 0.0, 'max': 9999.0, 'step': 0.1}), 'shape_color': (COLORS,), 'back_color': (COLORS,), 'x_offset': ('INT', {'default': 0, 'min': -2048, 'max': 2048}), 'y_offset': ('INT', {'default': 0, 'min': -2048, 'max': 2048}), 'zoom': ('FLOAT', {'default': 1.0, 'min': 0.0, 'max': 10.0, 'step': 0.05}), 'rotation': ('FLOAT', {'default': 0.0, 'min': 0.0, 'max': 3600.0, 'step': 0.1})}, 'optional': {'shape_color_hex': ('STRING', {'multiline': False, 'default': '#000000'}), 'bg_color_hex': ('STRING', {'multiline': False, 'default': '#000000'})}}
    RETURN_TYPES = ('IMAGE', 'STRING')
    RETURN_NAMES = ('IMAGE', 'show_help')
    FUNCTION = 'make_shape'
    CATEGORY = icons.get('Comfyroll/Graphics/Shape')

    def make_shape(self, width, height, rotation, pie_start, pie_stop, shape_color, back_color, x_offset=0, y_offset=0, zoom=1.0, shape_color_hex='#000000', bg_color_hex='#000000'):
        bg_color = get_color_values(back_color, bg_color_hex, color_mapping)
        shape_color = get_color_values(shape_color, shape_color_hex, color_mapping)
        back_img = Image.new('RGB', (width, height), color=bg_color)
        shape_img = Image.new('RGBA', (width, height), color=(0, 0, 0, 0))
        draw = ImageDraw.Draw(shape_img, 'RGBA')
        center_x = width // 2 + x_offset
        center_y = height // 2 + y_offset
        size = min(width - x_offset, height - y_offset) * zoom
        aspect_ratio = width / height
        num_rays = 16
        color = 'white'
        draw.pieslice([(center_x - size / 2, center_y - size / 2), (center_x + size / 2, center_y + size / 2)], start=pie_start, end=pie_stop, fill=color, outline=None)
        shape_img = shape_img.rotate(rotation, center=(center_x, center_y))
        result_image = Image.alpha_composite(back_img.convert('RGBA'), shape_img)
        image_out = pil2tensor(result_image.convert('RGB'))
        show_help = 'https://github.com/Suzie1/ComfyUI_Comfyroll_CustomNodes/wiki/Pattern-Nodes-2#cr-draw-pie'
        return (image_out, show_help)
```