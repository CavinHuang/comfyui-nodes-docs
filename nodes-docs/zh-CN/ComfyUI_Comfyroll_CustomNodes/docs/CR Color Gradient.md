# Documentation
- Class name: CR_ColorGradient
- Category: Comfyroll/Graphics/Pattern
- Output node: False
- Repo Ref: https://github.com/RockOfFire/ComfyUI_Comfyroll_CustomNodes

CR_ColorGradient 节点旨在在两个指定颜色之间生成平滑的颜色渐变，可以水平或垂直地跨越画布。它允许自定义渐变的过渡和距离，为用户提供了一个多功能的工具，用于为各种应用创建视觉上吸引人的渐变。

# Input types
## Required
- width
    - 宽度参数决定了渐变画布的宽度。它是设置输出图像尺寸的关键因素，影响渐变图案的整体规模。
    - Comfy dtype: INT
    - Python dtype: int
- height
    - 高度参数设置了画布的垂直尺寸，与宽度一起定义了画布的大小，并直接影响渐变的展示。
    - Comfy dtype: INT
    - Python dtype: int
- start_color
    - 开始颜色参数指定了渐变的初始颜色。它是一个基本输入，为颜色过渡的开始设定了基调。
    - Comfy dtype: COLORS
    - Python dtype: str
- end_color
    - 结束颜色参数决定了渐变的最终颜色。它与开始颜色一起工作，以在两种颜色之间创建一个无缝的过渡。
    - Comfy dtype: COLORS
    - Python dtype: str
- orientation
    - 方向参数决定了渐变是水平还是垂直渲染。这个选择显著改变了画布上颜色过渡的方向。
    - Comfy dtype: COMBO['vertical', 'horizontal']
    - Python dtype: str
## Optional
- linear_transition
    - 线性过渡参数控制渐变过渡的中点，允许微调渐变在画布上的扩散。
    - Comfy dtype: FLOAT
    - Python dtype: float
- gradient_distance
    - 渐变距离参数调整渐变过渡发生的长度，影响颜色混合的平滑度和范围。
    - Comfy dtype: FLOAT
    - Python dtype: float
- start_color_hex
    - 开始颜色十六进制参数允许使用自定义的十六进制颜色值作为渐变的起始颜色，为颜色选择提供了更大的灵活性。
    - Comfy dtype: STRING
    - Python dtype: str
- end_color_hex
    - 结束颜色十六进制参数允许指定渐变结束颜色的自定义十六进制颜色值，增强了用户定义颜色范围的能力。
    - Comfy dtype: STRING
    - Python dtype: str

# Output types
- IMAGE
    - 图像输出提供了生成的颜色渐变作为图像，可以用于进一步的处理或展示目的。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- show_help
    - 帮助输出提供了一个链接到文档，以获得有关如何使用节点和理解其功能的进一步指导。
    - Comfy dtype: STRING
    - Python dtype: str

# Usage tips
- Infra type: CPU

# Source code
```
class CR_ColorGradient:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'width': ('INT', {'default': 512, 'min': 64, 'max': 4096}), 'height': ('INT', {'default': 512, 'min': 64, 'max': 4096}), 'start_color': (COLORS,), 'end_color': (COLORS,), 'gradient_distance': ('FLOAT', {'default': 1, 'min': 0, 'max': 2, 'step': 0.05}), 'linear_transition': ('FLOAT', {'default': 0.5, 'min': 0, 'max': 1, 'step': 0.05}), 'orientation': (['vertical', 'horizontal'],)}, 'optional': {'start_color_hex': ('STRING', {'multiline': False, 'default': '#000000'}), 'end_color_hex': ('STRING', {'multiline': False, 'default': '#000000'})}}
    RETURN_TYPES = ('IMAGE', 'STRING')
    RETURN_NAMES = ('IMAGE', 'show_help')
    FUNCTION = 'draw'
    CATEGORY = icons.get('Comfyroll/Graphics/Pattern')

    def draw(self, width, height, start_color, end_color, orientation, linear_transition=0.5, gradient_distance=1, start_color_hex='#000000', end_color_hex='#000000'):
        if start_color == 'custom':
            color1_rgb = hex_to_rgb(start_color_hex)
        else:
            color1_rgb = color_mapping.get(start_color, (255, 255, 255))
        if end_color == 'custom':
            color2_rgb = hex_to_rgb(end_color_hex)
        else:
            color2_rgb = color_mapping.get(end_color, (0, 0, 0))
        canvas = np.zeros((height, width, 3), dtype=np.uint8)
        transition_pixel = int(linear_transition * (width if orientation == 'horizontal' else height))

        def get_gradient_value(pos, length, linear_transition, gradient_distance):
            transition_length = length * gradient_distance
            transition_start = linear_transition * length - transition_length / 2
            transition_end = linear_transition * length + transition_length / 2
            if pos < transition_start:
                return 0
            elif pos > transition_end:
                return 1
            else:
                return (pos - transition_start) / transition_length
        if orientation == 'horizontal':
            x = [0, width * linear_transition - 0.5 * width * gradient_distance, width * linear_transition + 0.5 * width * gradient_distance, width]
            y = [0, 0, 1, 1]
            t_values = np.interp(np.arange(width), x, y)
            for (i, t) in enumerate(t_values):
                interpolated_color = [int(c1 * (1 - t) + c2 * t) for (c1, c2) in zip(color1_rgb, color2_rgb)]
                canvas[:, i] = interpolated_color
        elif orientation == 'vertical':
            x = [0, height * linear_transition - 0.5 * height * gradient_distance, height * linear_transition + 0.5 * height * gradient_distance, height]
            y = [0, 0, 1, 1]
            t_values = np.interp(np.arange(height), x, y)
            for (j, t) in enumerate(t_values):
                interpolated_color = [int(c1 * (1 - t) + c2 * t) for (c1, c2) in zip(color1_rgb, color2_rgb)]
                canvas[j, :] = interpolated_color
        (fig, ax) = plt.subplots(figsize=(width / 100, height / 100))
        ax.imshow(canvas)
        plt.axis('off')
        plt.tight_layout(pad=0, w_pad=0, h_pad=0)
        plt.autoscale(tight=True)
        img_buf = io.BytesIO()
        plt.savefig(img_buf, format='png')
        img = Image.open(img_buf)
        image_out = pil2tensor(img.convert('RGB'))
        show_help = 'https://github.com/Suzie1/ComfyUI_Comfyroll_CustomNodes/wiki/Pattern-Nodes#cr-color-gradient'
        return (image_out, show_help)
```