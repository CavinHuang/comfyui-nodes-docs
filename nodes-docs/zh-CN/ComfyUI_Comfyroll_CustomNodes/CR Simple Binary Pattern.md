# Documentation
- Class name: CR_BinaryPatternSimple
- Category: Comfyroll/Graphics/Pattern
- Output node: False
- Repo Ref: https://github.com/RockOfFire/ComfyUI_Comfyroll_CustomNodes

CR_BinaryPatternSimple 节点旨在解析二进制模式并将其渲染为可视网格。它接受一个二进制数字的字符串，并将其转换为图像，其中每个位点代表网格中一个方块的颜色，从而创建二进制数据的可视化表示。

# Input types
## Required
- binary_pattern
    - 二进制模式是一个由二进制数字（0和1）组成的字符串，定义了要绘制的模式。位的每一行对应输出图像中的一行。
    - Comfy dtype: STRING
    - Python dtype: str
## Optional
- width
    - 宽度决定了输出图像的宽度，以像素为单位。它应该是一个正整数，并会影响网格中每个方块的大小。
    - Comfy dtype: INT
    - Python dtype: int
- height
    - 高度决定了输出图像的高度，以像素为单位。与宽度类似，它应该是一个正整数，并定义了网格的垂直尺寸。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- IMAGE
    - 输出图像是输入的二进制模式的可视化表示。它由一个方格网格组成，每个方格对应模式中的一个位。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- show_help
    - 提供文档的URL链接，以获取有关使用该节点的更多信息和帮助。
    - Comfy dtype: STRING
    - Python dtype: str

# Usage tips
- Infra type: CPU

# Source code
```
class CR_BinaryPatternSimple:

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'binary_pattern': ('STRING', {'multiline': True, 'default': '10101'}), 'width': ('INT', {'default': 512, 'min': 64, 'max': 4096}), 'height': ('INT', {'default': 512, 'min': 64, 'max': 4096})}}
    RETURN_TYPES = ('IMAGE', 'STRING')
    RETURN_NAMES = ('IMAGE', 'show_help')
    FUNCTION = 'draw_pattern'
    CATEGORY = icons.get('Comfyroll/Graphics/Pattern')

    def draw_pattern(self, binary_pattern, width, height):
        rows = binary_pattern.strip().split('\n')
        grid = [[int(bit) for bit in row.strip()] for row in rows]
        square_width = width // len(rows[0])
        square_height = height // len(rows)
        image = Image.new('RGB', (width, height), color='black')
        draw = ImageDraw.Draw(image)
        for (row_index, row) in enumerate(grid):
            for (col_index, bit) in enumerate(row):
                x1 = col_index * square_width
                y1 = row_index * square_height
                x2 = x1 + square_width
                y2 = y1 + square_height
                color = 'black' if bit == 1 else 'white'
                draw.rectangle([x1, y1, x2, y2], fill=color, outline='black')
        image_out = pil2tensor(image)
        show_help = 'https://github.com/Suzie1/ComfyUI_Comfyroll_CustomNodes/wiki/Pattern-Nodes-2#cr-simple-binary-pattern'
        return (image_out, show_help)
```