# Documentation
- Class name: CR_StarburstLines
- Category: Comfyroll/Graphics/Pattern
- Output node: False
- Repo Ref: https://github.com/RockOfFire/ComfyUI_Comfyroll_CustomNodes

CR_StarburstLines节点旨在生成一个视觉上吸引人的星暴图案，由从中心点均匀分布的线组成。它允许自定义各种参数，如线条数量、线长和颜色，以创建一个独特且对称的设计。

# Input types
## Required
- width
    - 宽度参数决定了生成图像的宽度。它对于设置星暴图案的整体尺寸并确保其适应所需的画布大小至关重要。
    - Comfy dtype: INT
    - Python dtype: int
- height
    - 高度参数设置图像的高度，与宽度一起确定星暴图案的完整画布大小。
    - Comfy dtype: INT
    - Python dtype: int
- num_lines
    - 线条数量决定了将形成星暴的线条数量，影响最终图案的复杂性和视觉对称性。
    - Comfy dtype: INT
    - Python dtype: int
- line_length
    - 线条长度指定了每条线从中心延伸的长度，有助于星暴的整体视觉冲击力和径向分布。
    - Comfy dtype: FLOAT
    - Python dtype: float
- line_width
    - 线条宽度参数控制星暴中每条线的粗细，影响图案外观的显著性和细节。
    - Comfy dtype: INT
    - Python dtype: int
- line_color
    - 线条颜色定义了星暴中线条的颜色，允许在设计中进行创意表达和视觉对比。
    - Comfy dtype: COLORS
    - Python dtype: str
- background_color
    - 背景颜色设置了星暴背后画布的颜色，提供了一个补充图案并增强其可见性的背景。
    - Comfy dtype: COLORS
    - Python dtype: str
- center_x
    - 中心x指定了星暴线条发出的中心点的x坐标，影响图案在画布上的对齐。
    - Comfy dtype: INT
    - Python dtype: int
- center_y
    - 中心y决定了星暴中心的y坐标，影响图案的垂直位置。
    - Comfy dtype: INT
    - Python dtype: int
## Optional
- rotation
    - 旋转允许通过指定的度数调整星暴图案的方向，提供对图案方向的控制。
    - Comfy dtype: FLOAT
    - Python dtype: float
- line_color_hex
    - 线条颜色十六进制提供了自定义线条颜色的十六进制颜色代码，使得星暴线条的颜色选择更加精确。
    - Comfy dtype: STRING
    - Python dtype: str
- bg_color_hex
    - 背景颜色十六进制提供了自定义背景颜色的十六进制颜色代码，允许个性化画布背景。
    - Comfy dtype: STRING
    - Python dtype: str

# Output types
- IMAGE
    - IMAGE输出包含渲染后的星暴图案作为图像文件，可供进一步使用或展示。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- show_help
    - show_help输出提供了一个链接到文档的链接，以获取有关使用CR_StarburstLines节点的额外信息和指导。
    - Comfy dtype: STRING
    - Python dtype: str

# Usage tips
- Infra type: CPU

# Source code
```
class CR_StarburstLines:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'width': ('INT', {'default': 512, 'min': 64, 'max': 4096}), 'height': ('INT', {'default': 512, 'min': 64, 'max': 4096}), 'num_lines': ('INT', {'default': 6, 'min': 1, 'max': 500}), 'line_length': ('FLOAT', {'default': 5, 'min': 0, 'max': 100, 'step': 0.1}), 'line_width': ('INT', {'default': 5, 'min': 1, 'max': 512}), 'line_color': (COLORS,), 'background_color': (COLORS,), 'center_x': ('INT', {'default': 0, 'min': 0, 'max': 1024}), 'center_y': ('INT', {'default': 0, 'min': 0, 'max': 1024}), 'rotation': ('FLOAT', {'default': 0, 'min': 0, 'max': 720})}, 'optional': {'line_color_hex': ('STRING', {'multiline': False, 'default': '#000000'}), 'bg_color_hex': ('STRING', {'multiline': False, 'default': '#000000'})}}
    RETURN_TYPES = ('IMAGE', 'STRING')
    RETURN_NAMES = ('IMAGE', 'show_help')
    FUNCTION = 'draw'
    CATEGORY = icons.get('Comfyroll/Graphics/Pattern')

    def draw(self, width, height, num_lines, line_length, line_width, line_color, background_color, center_x, center_y, rotation=0, line_color_hex='#000000', bg_color_hex='#000000'):
        if line_color == 'custom':
            line_color = line_color_hex
        else:
            line_color = line_color
        if background_color == 'custom':
            bgc = bg_color_hex
        else:
            bgc = background_color
        angle = 360 / num_lines
        (fig, ax) = plt.subplots(figsize=(width / 100, height / 100))
        plt.xlim(-width / 100, width / 100)
        plt.ylim(-height / 100, height / 100)
        plt.axis('off')
        plt.tight_layout(pad=0, w_pad=0, h_pad=0)
        plt.autoscale(False)
        center_x = center_x / 100
        center_y = center_y / 100
        for i in range(num_lines):
            x_unrotated = center_x + line_length * np.cos(np.radians(i * angle))
            y_unrotated = center_y + line_length * np.sin(np.radians(i * angle))
            x = center_x + x_unrotated * np.cos(np.radians(rotation)) - y_unrotated * np.sin(np.radians(rotation))
            y = center_y + x_unrotated * np.sin(np.radians(rotation)) + y_unrotated * np.cos(np.radians(rotation))
            fig.patch.set_facecolor(bgc)
            ax.plot([center_x, x], [center_y, y], color=line_color, linewidth=line_width)
        img_buf = io.BytesIO()
        plt.savefig(img_buf, format='png')
        img = Image.open(img_buf)
        image_out = pil2tensor(img.convert('RGB'))
        show_help = 'https://github.com/Suzie1/ComfyUI_Comfyroll_CustomNodes/wiki/Pattern-Nodes#cr-starburst-lines'
        return (image_out, show_help)
```