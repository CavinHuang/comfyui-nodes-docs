# Documentation
- Class name: CR_HalftoneGrid
- Category: Comfyroll/Graphics/Pattern
- Output node: False
- Repo Ref: https://github.com/RockOfFire/ComfyUI_Comfyroll_CustomNodes

CR_HalftoneGrid 是一个用于创建半色调网格图案的节点，具有可定制的参数。它允许用户设置网格的宽度、高度、点样式、频率和位置，为图形设计目的提供了一种多功能的方式来生成视觉上吸引人的图案。节点的功能集中在产生半色调效果上，这是一种使用大小和间距不同的点来模拟不同灰度阴影的图像渲染方法。

# Input types
## Required
- width
    - 宽度决定了半色调网格的水平范围。这是一个关键参数，因为它直接影响生成的图案的整体尺寸和比例。
    - Comfy dtype: INT
    - Python dtype: int
- height
    - 高度设置了网格的垂直大小，这对于控制图案的垂直尺寸并确保其适应所需的布局至关重要。
    - Comfy dtype: INT
    - Python dtype: int
- dot_style
    - 点样式定义了网格内点的视觉外观，允许定制图案的美学特性。
    - Comfy dtype: STYLES
    - Python dtype: str
- reverse_dot_style
    - 反转点样式提供了一个选项来反转点图案，创建一个镜像效果，可以增强网格的视觉兴趣。
    - Comfy dtype: COMBO['No', 'Yes']
    - Python dtype: str
- dot_frequency
    - 点频率控制网格内点的数量，影响半色调图案的粒度和细节水平。
    - Comfy dtype: INT
    - Python dtype: int
- background_color
    - 背景颜色设置了网格的背景颜色，可以自定义或设置为默认颜色以补充图案。
    - Comfy dtype: COLORS
    - Python dtype: str
- x_pos
    - X位置决定了网格内点图案的水平位置，允许精确控制图案的对齐方式。
    - Comfy dtype: FLOAT
    - Python dtype: float
- y_pos
    - Y位置设置了点图案的垂直位置，这对于在网格的垂直空间内对齐图案非常重要。
    - Comfy dtype: FLOAT
    - Python dtype: float
## Optional
- bg_color_hex
    - 背景颜色十六进制允许为网格的背景使用自定义的十六进制颜色，提供了在颜色选择上的额外灵活性。
    - Comfy dtype: STRING
    - Python dtype: str

# Output types
- IMAGE
    - IMAGE输出提供了生成的半色调网格图案作为图像，可供进一步处理或展示。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- show_help
    - show_help输出提供了一个URL链接到文档页面，以获取有关使用CR_HalftoneGrid节点的进一步帮助和指导。
    - Comfy dtype: STRING
    - Python dtype: str

# Usage tips
- Infra type: CPU

# Source code
```
class CR_HalftoneGrid:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'width': ('INT', {'default': 512, 'min': 64, 'max': 4096}), 'height': ('INT', {'default': 512, 'min': 64, 'max': 4096}), 'dot_style': (STYLES,), 'reverse_dot_style': (['No', 'Yes'],), 'dot_frequency': ('INT', {'default': 50, 'min': 1, 'max': 200, 'step': 1}), 'background_color': (COLORS,), 'x_pos': ('FLOAT', {'default': 0.5, 'min': 0, 'max': 1, 'step': 0.01}), 'y_pos': ('FLOAT', {'default': 0.5, 'min': 0, 'max': 1, 'step': 0.01})}, 'optional': {'bg_color_hex': ('STRING', {'multiline': False, 'default': '#000000'})}}
    RETURN_TYPES = ('IMAGE', 'STRING')
    RETURN_NAMES = ('IMAGE', 'show_help')
    FUNCTION = 'halftone'
    CATEGORY = icons.get('Comfyroll/Graphics/Pattern')

    def halftone(self, width, height, dot_style, reverse_dot_style, dot_frequency, background_color, x_pos, y_pos, bg_color_hex='#000000'):
        if background_color == 'custom':
            bgc = bg_color_hex
        else:
            bgc = background_color
        reverse = ''
        if reverse_dot_style == 'Yes':
            reverse = '_r'
        (fig, ax) = plt.subplots(figsize=(width / 100, height / 100))
        dotsx = np.linspace(0, 1, dot_frequency)
        dotsy = np.linspace(0, 1, dot_frequency)
        (X, Y) = np.meshgrid(dotsx, dotsy)
        dist = np.sqrt((X - x_pos) ** 2 + (Y - y_pos) ** 2)
        fig.patch.set_facecolor(bgc)
        ax.scatter(X, Y, c=dist, cmap=dot_style + reverse)
        plt.axis('off')
        plt.tight_layout(pad=0, w_pad=0, h_pad=0)
        plt.autoscale(tight=True)
        img_buf = io.BytesIO()
        plt.savefig(img_buf, format='png')
        img = Image.open(img_buf)
        image_out = pil2tensor(img.convert('RGB'))
        show_help = 'https://github.com/Suzie1/ComfyUI_Comfyroll_CustomNodes/wiki/Pattern-Nodes#cr-halftone-grid'
        return (image_out, show_help)
```