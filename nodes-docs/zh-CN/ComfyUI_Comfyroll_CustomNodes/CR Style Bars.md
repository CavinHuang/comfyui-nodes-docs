# Documentation
- Class name: CR_StyleBars
- Category: Comfyroll/Graphics/Pattern
- Output node: False
- Repo Ref: https://github.com/RockOfFire/ComfyUI_Comfyroll_CustomNodes

CR_StyleBars 是一个用于生成条形视觉图案的节点，这些图案可以用于各种图形应用。它提供了一种创建条形样式和方向范围的方法，通过模式、宽度、高度、条形样式和频率等参数提供定制化。该节点的功能主要集中在创建一个风格化的图像输出，可以用于图案设计或作为其他上下文中的视觉辅助工具。

# Input types
## Required
- mode
    - 模式参数决定了节点将生成的视觉图案类型。它可以设置为'color bars'（彩色条）、'sin wave'（正弦波）或'gradient bars'（渐变条），每种都产生不同的视觉效果。这个参数至关重要，因为它决定了输出图像的基本外观。
    - Comfy dtype: COMBO['color bars', 'sin wave', 'gradient bars']
    - Python dtype: str
- width
    - 宽度参数指定生成图像的宽度，以像素为单位。它是节点功能的一个重要方面，因为它直接影响输出图像的尺寸，影响其视觉呈现。
    - Comfy dtype: INT
    - Python dtype: int
- height
    - 高度参数设置生成图像的高度，以像素为单位。像宽度一样，它是图像尺寸的关键决定因素，在最终图案的显示方式中起着重要作用。
    - Comfy dtype: INT
    - Python dtype: int
- bar_style
    - 条形样式参数定义了应用于生成图像中条形的颜色映射。它影响条形的视觉美感，允许表示各种风格。
    - Comfy dtype: STYLES
    - Python dtype: str
- orientation
    - 方向参数决定生成图像中的条形是垂直排列还是水平排列。这个选择影响图像中图案的布局和流向。
    - Comfy dtype: COMBO['vertical', 'horizontal']
    - Python dtype: str
- bar_frequency
    - 条形频率参数控制生成图像中条形出现的频率。它是决定条形密度和间距的重要因素，有助于形成整体视觉纹理。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- IMAGE
    - 图像输出提供了作为图像的生成图案。它是节点操作的主要结果，对于图案在图形设计或其他应用中的后续使用至关重要。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- show_help
    - show_help 输出提供了一个 URL 链接到文档，以获得进一步的帮助或指导如何有效地使用该节点。
    - Comfy dtype: STRING
    - Python dtype: str

# Usage tips
- Infra type: CPU

# Source code
```
class CR_StyleBars:

    @classmethod
    def INPUT_TYPES(s):
        modes = ['color bars', 'sin wave', 'gradient bars']
        return {'required': {'mode': (modes,), 'width': ('INT', {'default': 512, 'min': 64, 'max': 4096}), 'height': ('INT', {'default': 512, 'min': 64, 'max': 4096}), 'bar_style': (STYLES,), 'orientation': (['vertical', 'horizontal'],), 'bar_frequency': ('INT', {'default': 5, 'min': 1, 'max': 200, 'step': 1})}}
    RETURN_TYPES = ('IMAGE', 'STRING')
    RETURN_NAMES = ('IMAGE', 'show_help')
    FUNCTION = 'draw'
    CATEGORY = icons.get('Comfyroll/Graphics/Pattern')

    def draw(self, mode, width, height, bar_style, orientation, bar_frequency):
        if orientation == 'vertical':
            x = np.linspace(0, 1, width)
            y = np.zeros((height, width))
        elif orientation == 'horizontal':
            x = np.zeros((height, width))
            y = np.linspace(0, 1, height)
        (X, Y) = np.meshgrid(x, y)
        if mode == 'color bars':
            bar_width = 1 / bar_frequency
            if orientation == 'vertical':
                colors = X // bar_width % 2
            elif orientation == 'horizontal':
                colors = Y // bar_width % 2
        elif mode == 'sin wave':
            if orientation == 'vertical':
                colors = np.sin(2 * np.pi * bar_frequency * X)
            elif orientation == 'horizontal':
                colors = np.sin(2 * np.pi * bar_frequency * Y)
        elif mode == 'gradient bars':
            if orientation == 'vertical':
                colors = X * bar_frequency * 2 % 2
            elif orientation == 'horizontal':
                colors = Y * bar_frequency * 2 % 2
        (fig, ax) = plt.subplots(figsize=(width / 100, height / 100))
        ax.imshow(colors, cmap=bar_style, aspect='auto')
        plt.axis('off')
        plt.tight_layout(pad=0, w_pad=0, h_pad=0)
        plt.autoscale(tight=True)
        img_buf = io.BytesIO()
        plt.savefig(img_buf, format='png')
        img = Image.open(img_buf)
        image_out = pil2tensor(img.convert('RGB'))
        show_help = 'https://github.com/Suzie1/ComfyUI_Comfyroll_CustomNodes/wiki/Pattern-Nodes#cr-style-bars'
        return (image_out, show_help)
```