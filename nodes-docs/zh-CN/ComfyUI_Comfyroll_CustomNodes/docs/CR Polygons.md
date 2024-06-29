# Documentation
- Class name: CR_Polygons
- Category: Comfyroll/Graphics/Pattern
- Output node: False
- Repo Ref: https://github.com/RockOfFire/ComfyUI_Comfyroll_CustomNodes

CR_Polygons 是一个用于生成由六边形或三角形组成的几何图案的节点。它允许自定义多边形的颜色、背景和线条属性，以创建视觉上独特的图案。这个节点特别适用于为各种应用创建背景纹理或复杂设计。

# Input types
## Required
- mode
    - 模式参数决定了要绘制的多边形的形状，可以是六边形或三角形。这个选择显著影响节点生成的总体图案，为用户提供了对输出的几何风格的控制。
    - Comfy dtype: COMBO['hexagons', 'triangles']
    - Python dtype: str
- width
    - 宽度参数设置了图案的宽度，以像素为单位。它是决定图案比例的关键因素，直接影响输出图像的最终尺寸。
    - Comfy dtype: INT
    - Python dtype: int
- height
    - 高度参数设置了图案的高度，以像素为单位。它与宽度一起工作，以确定图案的总体大小，这对于将设计适应特定的显示要求至关重要。
    - Comfy dtype: INT
    - Python dtype: int
- rows
    - 行参数指定了要在图案内绘制的多边形行数。它影响多边形的密度和布局，从而影响最终设计的复杂性。
    - Comfy dtype: INT
    - Python dtype: int
- columns
    - 列参数决定了要在图案内绘制的多边形列数。它与行参数一起工作，以定义图案的总体网格结构。
    - Comfy dtype: INT
    - Python dtype: int
- face_color
    - 面颜色参数定义了填充多边形内部的颜色。它在确定图案的视觉吸引力和主题一致性方面起着重要作用。
    - Comfy dtype: COLORS
    - Python dtype: str
- background_color
    - 背景颜色参数设置了多边形背后的背景颜色。它对于提供对比度并确保图案在其背景上突出显示至关重要。
    - Comfy dtype: COLORS
    - Python dtype: str
- line_color
    - 线条颜色参数决定了勾勒多边形的线条颜色。它是定义图案边界和增强整体视觉清晰度的关键方面。
    - Comfy dtype: COLORS
    - Python dtype: str
- line_width
    - 线条宽度参数指定了用于绘制多边形轮廓的线条的粗细。它影响图案边缘的突出程度，并有助于整体设计的审美。
    - Comfy dtype: INT
    - Python dtype: int
## Optional
- face_color_hex
    - 面颜色十六进制参数允许为多边形内部使用自定义的十六进制颜色代码。它为用户提供了微调图案色彩方案的灵活性。
    - Comfy dtype: STRING
    - Python dtype: str
- bg_color_hex
    - 背景颜色十六进制参数允许指定背景的自定义十六进制颜色代码。它确保用户可以自定义背景颜色以匹配他们的设计偏好。
    - Comfy dtype: STRING
    - Python dtype: str
- line_color_hex
    - 线条颜色十六进制参数允许使用自定义的十六进制颜色代码来定义多边形的线条。它为用户提供了调整线条颜色以实现所需视觉效果的能力。
    - Comfy dtype: STRING
    - Python dtype: str

# Output types
- IMAGE
    - IMAGE 输出提供了渲染的几何图案作为图像。这是节点操作的主要结果，可以用于进一步处理或显示。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- show_help
    - show_help 输出提供了一个 URL 链接到文档页面，以获取有关节点使用和功能的进一步帮助和信息。
    - Comfy dtype: STRING
    - Python dtype: str

# Usage tips
- Infra type: CPU

# Source code
```
class CR_Polygons:

    @classmethod
    def INPUT_TYPES(s):
        modes = ['hexagons', 'triangles']
        return {'required': {'mode': (modes,), 'width': ('INT', {'default': 512, 'min': 64, 'max': 4096}), 'height': ('INT', {'default': 512, 'min': 64, 'max': 4096}), 'rows': ('INT', {'default': 5, 'min': 1, 'max': 512}), 'columns': ('INT', {'default': 5, 'min': 1, 'max': 512}), 'face_color': (COLORS,), 'background_color': (COLORS,), 'line_color': (COLORS,), 'line_width': ('INT', {'default': 2, 'min': 0, 'max': 512})}, 'optional': {'face_color_hex': ('STRING', {'multiline': False, 'default': '#000000'}), 'bg_color_hex': ('STRING', {'multiline': False, 'default': '#000000'}), 'line_color_hex': ('STRING', {'multiline': False, 'default': '#000000'})}}
    RETURN_TYPES = ('IMAGE', 'STRING')
    RETURN_NAMES = ('IMAGE', 'show_help')
    FUNCTION = 'draw'
    CATEGORY = icons.get('Comfyroll/Graphics/Pattern')

    def draw(self, mode, width, height, rows, columns, face_color, background_color, line_color, line_width, face_color_hex='#000000', bg_color_hex='#000000', line_color_hex='#000000'):
        if face_color == 'custom':
            face_color = face_color_hex
        if line_color == 'custom':
            line_color = line_color_hex
        if background_color == 'custom':
            background_color = bg_color_hex
        (fig, ax) = plt.subplots(figsize=(width / 100, height / 100))
        fig.set_facecolor(background_color)
        plt.xlim(0, width / 100)
        plt.ylim(0, height / 100)
        plt.axis('off')
        plt.tight_layout(pad=0, w_pad=0, h_pad=0)
        plt.autoscale(False)
        if mode == 'hexagons':
            vertices = 6
        elif mode == 'triangles':
            vertices = 3
        cell_width = width / 100 / columns
        cell_height = width / height * np.sqrt(3) * (height / 100) / (2 * columns)
        for row in range(rows + 2):
            for col in range(columns + 2):
                x = col * cell_width
                y = row * cell_height
                if row % 2 == 1:
                    x += cell_width / 2
                hexagon = RegularPolygon((x, y), numVertices=vertices, radius=cell_width / 1.732, edgecolor=line_color, linewidth=line_width, facecolor=face_color)
                ax.add_patch(hexagon)
        img_buf = io.BytesIO()
        plt.savefig(img_buf, format='png')
        img = Image.open(img_buf)
        image_out = pil2tensor(img.convert('RGB'))
        show_help = 'https://github.com/Suzie1/ComfyUI_Comfyroll_CustomNodes/wiki/Pattern-Nodes#cr-polygons'
        return (image_out, show_help)
```