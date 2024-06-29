# Documentation
- Class name: CR_ColorBars
- Category: Comfyroll/Graphics/Pattern
- Output node: False
- Repo Ref: https://github.com/RockOfFire/ComfyUI_Comfyroll_CustomNodes

CR_ColorBars 节点旨在生成具有可定制参数的颜色条的可视化表示。它允许用户指定条的朝向、频率和颜色，提供了一个多功能工具，用于创建图案或测试显示设备。此节点通过提供一种简单方法来产生和操作颜色条模式，为整个工作流程做出了贡献。

# Input types
## Required
- mode
    - 模式参数决定了要生成的颜色条的类型。它对于设置图案的初始风格至关重要，并影响输出的整体外观。
    - Comfy dtype: COMBO['2-color']
    - Python dtype: str
- width
    - 宽度参数设置了颜色条图案的宽度。它是节点功能的一个重要方面，因为它直接影响输出图像的尺寸。
    - Comfy dtype: INT
    - Python dtype: int
- height
    - 高度参数定义了颜色条图案的高度。与宽度类似，它是确定生成图像大小和比例的关键因素。
    - Comfy dtype: INT
    - Python dtype: int
- color_1
    - 颜色1参数指定了颜色条中使用的第一颜色。它在图案的视觉结果中扮演着重要角色，允许对颜色方案进行创造性控制。
    - Comfy dtype: COLORS
    - Python dtype: str
- color_2
    - 颜色2参数设置了颜色条的第二种颜色。它与颜色1协同工作，创造出增强图案视觉冲击力的对比度。
    - Comfy dtype: COLORS
    - Python dtype: str
- orientation
    - 方向参数决定了颜色条排列的方向。它是一个基本设置，决定了图案的布局。
    - Comfy dtype: COMBO['vertical', 'horizontal', 'diagonal', 'alt_diagonal']
    - Python dtype: str
- bar_frequency
    - 条频率参数控制颜色条的频率。它是决定图案中条的密度和间距的重要因素。
    - Comfy dtype: INT
    - Python dtype: int
## Optional
- offset
    - 偏移参数调整颜色条的起始位置，允许微调图案的对齐方式。
    - Comfy dtype: FLOAT
    - Python dtype: float
- color1_hex
    - 颜色1十六进制参数允许用户输入第一种颜色的自定义十六进制颜色值，提供更大的灵活性和颜色选择的精确度。
    - Comfy dtype: STRING
    - Python dtype: str
- color2_hex
    - 颜色2十六进制参数使用户能够为第二种颜色指定自定义的十六进制颜色值，增强了节点产生广泛颜色组合的能力。
    - Comfy dtype: STRING
    - Python dtype: str

# Output types
- IMAGE
    - 图像输出提供了作为图像生成的颜色条图案。它是节点执行的主要结果，对节点的目的至关重要。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- show_help
    - show_help 输出提供了一个链接到文档的链接，以获取有关使用节点的进一步帮助和指导。
    - Comfy dtype: STRING
    - Python dtype: str

# Usage tips
- Infra type: CPU

# Source code
```
class CR_ColorBars:

    @classmethod
    def INPUT_TYPES(s):
        modes = ['2-color']
        return {'required': {'mode': (modes,), 'width': ('INT', {'default': 512, 'min': 64, 'max': 4096}), 'height': ('INT', {'default': 512, 'min': 64, 'max': 4096}), 'color_1': (COLORS,), 'color_2': (COLORS,), 'orientation': (['vertical', 'horizontal', 'diagonal', 'alt_diagonal'],), 'bar_frequency': ('INT', {'default': 5, 'min': 1, 'max': 200, 'step': 1}), 'offset': ('FLOAT', {'default': 0, 'min': 0, 'max': 20, 'step': 0.05})}, 'optional': {'color1_hex': ('STRING', {'multiline': False, 'default': '#000000'}), 'color2_hex': ('STRING', {'multiline': False, 'default': '#000000'})}}
    RETURN_TYPES = ('IMAGE', 'STRING')
    RETURN_NAMES = ('IMAGE', 'show_help')
    FUNCTION = 'draw'
    CATEGORY = icons.get('Comfyroll/Graphics/Pattern')

    def draw(self, mode, width, height, color_1, color_2, orientation, bar_frequency, offset=0, color1_hex='#000000', color2_hex='#000000'):
        if color_1 == 'custom':
            color1_rgb = hex_to_rgb(color1_hex)
        else:
            color1_rgb = color_mapping.get(color_1, (255, 255, 255))
        if color_2 == 'custom':
            color2_rgb = hex_to_rgb(color2_hex)
        else:
            color2_rgb = color_mapping.get(color_2, (0, 0, 0))
        canvas = np.zeros((height, width, 3), dtype=np.uint8)
        bar_width = width / bar_frequency
        bar_height = height / bar_frequency
        offset_pixels = int(offset * max(width, height))
        if orientation == 'vertical':
            for j in range(height):
                for i in range(width):
                    if (i + offset_pixels) // bar_width % 2 == 0:
                        canvas[j, i] = color1_rgb
                    else:
                        canvas[j, i] = color2_rgb
        elif orientation == 'horizontal':
            for j in range(height):
                for i in range(width):
                    if (j + offset_pixels) // bar_height % 2 == 0:
                        canvas[j, i] = color1_rgb
                    else:
                        canvas[j, i] = color2_rgb
        elif orientation == 'diagonal':
            bar_width = int(bar_height / np.tan(np.pi / 4)) * 2
            for j in range(height):
                for i in range(width):
                    bar_number = (i + j + offset_pixels) // bar_width
                    if bar_number % 2 == 0:
                        canvas[j, i] = color1_rgb
                    else:
                        canvas[j, i] = color2_rgb
        elif orientation == 'alt_diagonal':
            bar_width = int(bar_height / np.tan(np.pi / 4)) * 2
            for j in range(height):
                for i in range(width):
                    bar_number = (i - j + width + offset_pixels) // bar_width
                    if bar_number % 2 == 0:
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
        show_help = 'https://github.com/Suzie1/ComfyUI_Comfyroll_CustomNodes/wiki/Pattern-Nodes#cr-color-bars'
        return (image_out, show_help)
```