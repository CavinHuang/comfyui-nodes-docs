# Documentation
- Class name: CR_CheckerPattern
- Category: Comfyroll/Graphics/Pattern
- Output node: False
- Repo Ref: https://github.com/RockOfFire/ComfyUI_Comfyroll_CustomNodes

CR_CheckerPattern 是一个用于生成可定制参数的棋盘格模式的节点。它允许用户定义图案的模式、输出图像的尺寸以及图案中使用的颜色。该节点的功能集中在创建具有交替颜色的视觉网格图案表示，为图形设计和可视化提供了一个多功能工具。

# Input types
## Required
- mode
    - 模式参数决定了图案的布局，可以是'regular'标准的棋盘格或'stepped'错位模式。这个选择显著影响节点的视觉输出，允许不同的设计选项。
    - Comfy dtype: MODE
    - Python dtype: str
- width
    - 宽度参数设置了生成图像的宽度，以像素为单位。它是决定图案整体大小和分辨率的关键因素，影响图案在各种应用中的显示和使用。
    - Comfy dtype: INT
    - Python dtype: int
- height
    - 高度参数设置了生成图像的高度，以像素为单位。它与宽度一起定义了画布的尺寸，这对于图案的比例和长宽比至关重要。
    - Comfy dtype: INT
    - Python dtype: int
- color_1
    - Color_1 用于定义棋盘格图案的第一种颜色。它在图案的整体外观中起着重要作用，允许对设计的美学进行创造性控制。
    - Comfy dtype: COLOR
    - Python dtype: str
- color_2
    - Color_2 用于定义棋盘格图案的第二种颜色。它与 Color_1 配合使用，创造出棋盘格设计特有的对比色块。
    - Comfy dtype: COLOR
    - Python dtype: str
- grid_frequency
    - grid_frequency 参数指示棋盘格图案中每行/每列的方格数。它是图案密度和单个方格大小的关键决定因素。
    - Comfy dtype: INT
    - Python dtype: int
- step
    - 步长参数在 'stepped' 模式中使用，用于控制方格的错位。它影响图案的复杂性和棋盘格的视觉节奏。
    - Comfy dtype: INT
    - Python dtype: int
## Optional
- color1_hex
    - color1_hex 参数允许为 Color_1 使用自定义的十六进制颜色值。这为需要使用预定义颜色选项中没有的具体颜色阴影的用户提供了额外的灵活性。
    - Comfy dtype: STRING
    - Python dtype: str
- color2_hex
    - color2_hex 参数允许为 Color_2 使用自定义十六进制颜色值。它为用户提供了微调图案的次要颜色以满足其设计要求的能力。
    - Comfy dtype: STRING
    - Python dtype: str

# Output types
- IMAGE
    - IMAGE 输出提供了生成分的棋盘格图案作为图像文件。这是节点操作的主要结果，也是节点创建视觉图案目的的心。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- show_help
    - show_help 输出提供了指向节点文档页面的 URL 链接，以获取更多指导和信息。对于寻求有关节点功能和使用详细信息的用户来说，这是一个有用的资源。
    - Comfy dtype: STRING
    - Python dtype: str

# Usage tips
- Infra type: CPU

# Source code
```
class CR_CheckerPattern:

    @classmethod
    def INPUT_TYPES(s):
        modes = ['regular', 'stepped']
        return {'required': {'mode': (modes,), 'width': ('INT', {'default': 512, 'min': 64, 'max': 4096}), 'height': ('INT', {'default': 512, 'min': 64, 'max': 4096}), 'color_1': (COLORS,), 'color_2': (COLORS,), 'grid_frequency': ('INT', {'default': 8, 'min': 1, 'max': 200, 'step': 1}), 'step': ('INT', {'default': 2, 'min': 2, 'max': 200, 'step': 1})}, 'optional': {'color1_hex': ('STRING', {'multiline': False, 'default': '#000000'}), 'color2_hex': ('STRING', {'multiline': False, 'default': '#000000'})}}
    RETURN_TYPES = ('IMAGE', 'STRING')
    RETURN_NAMES = ('IMAGE', 'show_help')
    FUNCTION = 'draw'
    CATEGORY = icons.get('Comfyroll/Graphics/Pattern')

    def draw(self, mode, width, height, color_1, color_2, grid_frequency, step, color1_hex='#000000', color2_hex='#000000'):
        if color_1 == 'custom':
            color1_rgb = hex_to_rgb(color1_hex)
        else:
            color1_rgb = color_mapping.get(color_1, (255, 255, 255))
        if color_2 == 'custom':
            color2_rgb = hex_to_rgb(color2_hex)
        else:
            color2_rgb = color_mapping.get(color_2, (0, 0, 0))
        canvas = np.zeros((height, width, 3), dtype=np.uint8)
        grid_size = width / grid_frequency
        for i in range(width):
            for j in range(height):
                if mode == 'regular':
                    if i // grid_size % 2 == j // grid_size % 2:
                        canvas[j, i] = color1_rgb
                    else:
                        canvas[j, i] = color2_rgb
                elif mode == 'stepped':
                    if i // grid_size % step != j // grid_size % step:
                        canvas[j, i] = color1_rgb
                    else:
                        canvas[j, i] = color2_rgb
        (fig, ax) = plt.subplots(figsize=(width / 100, height / 100))
        ax.imshow(canvas)
        plt.axis('off')
        plt.tight_layout(pad=0, w_pad=0, h_pad=0)
        plt.autoscale(tight=True)
        img_buf = io.BytesIO()
        plt.savefig(img_buf, format='png')
        img = Image.open(img_buf)
        image_out = pil2tensor(img.convert('RGB'))
        show_help = 'https://github.com/Suzie1/ComfyUI_Comfyroll_CustomNodes/wiki/Pattern-Nodes#cr-checker-pattern'
        return (image_out, show_help)
```