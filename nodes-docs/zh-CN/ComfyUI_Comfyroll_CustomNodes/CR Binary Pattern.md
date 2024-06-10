# Documentation
- Class name: CR_BinaryPattern
- Category: Comfyroll/Graphics/Pattern
- Output node: False
- Repo Ref: https://github.com/RockOfFire/ComfyUI_Comfyroll_CustomNodes

CR_BinaryPattern 节点旨在从二进制字符串生成视觉图案。它接受二进制模式输入，将其渲染为彩色方块的网格，提供了一种将二进制数据以图形格式可视化的方法。这个节点特别适用于基于二进制序列创建复杂的设计和图案，提供了一种独特的数据可视化方式。

# Input types
## Required
- binary_pattern
    - 二进制模式输入是节点的关键参数，因为它直接决定了视觉输出。这是一个表示用于构建模式的一系列二进制数字的多行字符串。最终模式的复杂性和设计在很大程度上受此输入的影响。
    - Comfy dtype: STRING
    - Python dtype: str
- width
    - 宽度参数决定了输出图像的宽度，以像素为单位，这对于设置图案的整体尺寸至关重要。它与高度参数协同工作，以确保图案被适当缩放以适应所需的长宽比。
    - Comfy dtype: INT
    - Python dtype: int
- height
    - 高度参数设置输出图像的垂直尺寸，与宽度参数一起确定图案的大小。它是控制图案整体外观和可缩放性的关键因素。
    - Comfy dtype: INT
    - Python dtype: int
## Optional
- background_color
    - 背景颜色参数允许自定义图案的背景，影响渲染图案的整体视觉吸引力和对比度。它可以设置为各种预定义颜色或自定义的十六进制颜色值。
    - Comfy dtype: COLORS
    - Python dtype: str
- outline_color
    - 轮廓颜色参数定义了方块轮廓的颜色，增加了一层细节，并增强了图案与背景的可见性。它可以调整以匹配或与图案的颜色形成对比，以实现风格化的目的。
    - Comfy dtype: COLORS
    - Python dtype: str

# Output types
- IMAGE
    - IMAGE 输出提供了渲染后的二进制模式作为图像，可以用于进一步处理或显示。它代表了节点功能的顶点，展示了输入二进制模式的视觉表示。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- show_help
    - show_help 输出提供了指向节点文档页面的 URL，为用户提供了关于如何有效使用节点的额外信息和指导。它是了解节点能力和潜在用例的有用资源。
    - Comfy dtype: STRING
    - Python dtype: str

# Usage tips
- Infra type: CPU

# Source code
```
class CR_BinaryPattern:

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'binary_pattern': ('STRING', {'multiline': True, 'default': '10101'}), 'width': ('INT', {'default': 512, 'min': 64, 'max': 4096}), 'height': ('INT', {'default': 512, 'min': 64, 'max': 4096}), 'background_color': (COLORS,), 'color_0': (COLORS,), 'color_1': (COLORS,), 'outline_thickness': ('INT', {'default': 0, 'min': 0, 'max': 1024}), 'outline_color': (COLORS,), 'jitter_distance': ('INT', {'default': 0, 'min': 0, 'max': 1024}), 'bias': ('FLOAT', {'default': 0.5, 'min': 0.0, 'max': 1.0, 'step': 0.05})}, 'optional': {'bg_color_hex': ('STRING', {'multiline': False, 'default': '#000000'}), 'color0_hex': ('STRING', {'multiline': False, 'default': '#000000'}), 'color1_hex': ('STRING', {'multiline': False, 'default': '#000000'}), 'outline_color_hex': ('STRING', {'multiline': False, 'default': '#000000'})}}
    RETURN_TYPES = ('IMAGE', 'STRING')
    RETURN_NAMES = ('IMAGE', 'show_help')
    FUNCTION = 'draw_pattern'
    CATEGORY = icons.get('Comfyroll/Graphics/Pattern')

    def draw_pattern(self, binary_pattern, width, height, background_color, outline_color, color_0='white', color_1='black', outline_thickness=0, color0_hex='#000000', color1_hex='#000000', bg_color_hex='#000000', outline_color_hex='#000000', jitter_distance=0, bias=0.5):
        color0 = get_color_values(color_0, color0_hex, color_mapping)
        color1 = get_color_values(color_1, color1_hex, color_mapping)
        bg_color = get_color_values(background_color, bg_color_hex, color_mapping)
        outline_color = get_color_values(outline_color, outline_color_hex, color_mapping)
        rows = binary_pattern.strip().split('\n')
        grid = [[int(bit) for bit in row.strip()] for row in rows]
        square_width = width / len(rows[0])
        square_height = height / len(rows)
        image = Image.new('RGB', (width, height), color=bg_color)
        draw = ImageDraw.Draw(image)
        x_jitter = 0
        y_jitter = 0
        for (row_index, row) in enumerate(grid):
            for (col_index, bit) in enumerate(row):
                if jitter_distance != 0:
                    x_jitter = random.uniform(0, jitter_distance)
                    y_jitter = random.uniform(0, jitter_distance)
                x1 = col_index * square_width + x_jitter
                y1 = row_index * square_height + y_jitter
                x2 = x1 + square_width + x_jitter
                y2 = y1 + square_height + y_jitter
                if random.uniform(0, 1) < abs(bias):
                    color = color1
                else:
                    color = color0
                draw.rectangle([x1, y1, x2, y2], fill=color, outline=outline_color, width=outline_thickness)
        image_out = pil2tensor(image)
        show_help = 'https://github.com/Suzie1/ComfyUI_Comfyroll_CustomNodes/wiki/Pattern-Nodes-2#cr-binary-pattern'
        return (image_out, show_help)
```