# Documentation
- Class name: CR_RandomShapePattern
- Category: Comfyroll/Graphics/Shape
- Output node: False
- Repo Ref: https://github.com/RockOfFire/ComfyUI_Comfyroll_CustomNodes

CR_RandomShapePattern 是一个用于生成由随机放置的形状组成的图案图像的节点。它提供了一种创造性的方法来制作视觉上多样化和结构化的图案，适用于艺术表达或数据可视化目的。该节点利用随机性来选择形状、颜色和位置，确保每个输出都是独一无二的。

# Input types
## Required
- width
    - 宽度决定了输出图像的水平范围。这是一个关键参数，因为它决定了图案的整体规模以及图案中单个形状的大小。
    - Comfy dtype: INT
    - Python dtype: int
- height
    - 高度设置了生成图像的垂直尺寸，影响图案内形状的垂直间距和排列。
    - Comfy dtype: INT
    - Python dtype: int
- num_rows
    - 行数决定了图案网格的垂直结构，影响形状沿图像高度的分布。
    - Comfy dtype: INT
    - Python dtype: int
- num_cols
    - 列数指定了图案网格的水平结构，决定了形状在图像宽度上的分布。
    - Comfy dtype: INT
    - Python dtype: int
- color1
    - 颜色1是用于随机填充图案内形状的两种颜色之一。它有助于整体配色方案和生成图像的视觉对比度。
    - Comfy dtype: COLORS
    - Python dtype: str
- color2
    - 颜色2是用于填充图案中形状的第二种颜色选项。它与颜色1一起使用，以创建多样化且视觉上吸引人的颜色组合。
    - Comfy dtype: COLORS
    - Python dtype: str
## Optional
- color1_hex
    - 颜色1十六进制允许为颜色1使用自定义的十六进制颜色值，为形状的颜色选择提供更大的灵活性。
    - Comfy dtype: STRING
    - Python dtype: str
- color2_hex
    - 颜色2十六进制提供了一种为颜色2指定自定义十六进制颜色值的方法，增强了节点产生各种颜色组合的能力。
    - Comfy dtype: STRING
    - Python dtype: str

# Output types
- IMAGE
    - 图像输出是节点的主要结果，展示了由不同颜色和大小的随机放置形状组成的图案图像。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- show_help
    - show_help 输出提供了一个 URL 链接到文档页面，以获取有关节点使用和功能的更多帮助和信息。
    - Comfy dtype: STRING
    - Python dtype: str

# Usage tips
- Infra type: CPU

# Source code
```
class CR_RandomShapePattern:

    @classmethod
    def INPUT_TYPES(cls):
        shapes = ['circle', 'oval', 'square', 'diamond', 'triangle', 'hexagon', 'octagon', 'half circle', 'quarter circle', 'starburst', 'star', 'cross']
        return {'required': {'width': ('INT', {'default': 512, 'min': 64, 'max': 4096}), 'height': ('INT', {'default': 512, 'min': 64, 'max': 4096}), 'num_rows': ('INT', {'default': 5, 'min': 1, 'max': 128}), 'num_cols': ('INT', {'default': 5, 'min': 1, 'max': 128}), 'color1': (COLORS,), 'color2': (COLORS,)}, 'optional': {'color1_hex': ('STRING', {'multiline': False, 'default': '#000000'}), 'color2_hex': ('STRING', {'multiline': False, 'default': '#000000'})}}
    RETURN_TYPES = ('IMAGE', 'STRING')
    RETURN_NAMES = ('IMAGE', 'show_help')
    FUNCTION = 'plot_random_shapes'
    CATEGORY = icons.get('Comfyroll/Graphics/Shape')

    def plot_random_shapes(self, num_rows, num_cols, width, height, color1, color2, color1_hex='#000000', color2_hex='#000000'):
        color1 = get_color_values(color1, color1_hex, color_mapping)
        color2 = get_color_values(color2, color2_hex, color_mapping)
        image = Image.new('RGB', (width, height), color='white')
        draw = ImageDraw.Draw(image)
        shape_functions = [draw_circle, draw_oval, draw_diamond, draw_square, draw_triangle, draw_hexagon, draw_octagon, draw_half_circle, draw_quarter_circle, draw_starburst, draw_star, draw_cross]
        for row in range(num_rows):
            for col in range(num_cols):
                shape_function = random.choice(shape_functions)
                color = random.choice([color1, color2])
                size = random.uniform(20, min(width, height) / 2)
                aspect_ratio = random.uniform(0.5, 2.0)
                center_x = col * (width / num_cols) + width / num_cols / 2
                center_y = row * (height / num_rows) + height / num_rows / 2
                shape_function(draw, center_x, center_y, size, aspect_ratio, color)
        image_out = pil2tensor(image)
        show_help = 'https://github.com/Suzie1/ComfyUI_Comfyroll_CustomNodes/wiki/Pattern-Nodes-2#cr-random-shape-pattern'
        return (image_out, show_help)
```