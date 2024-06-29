# Documentation
- Class name: CR_StarburstColors
- Category: Comfyroll/Graphics/Pattern
- Output node: False
- Repo Ref: https://github.com/RockOfFire/ComfyUI_Comfyroll_CustomNodes

CR_StarburstColors 节点旨在生成具有可定制颜色和几何属性的视觉效果吸引人的星暴图案。它提供了一种创造性的方法来制作可以用于各种图形应用的复杂设计。

# Input types
## Required
- width
    - 宽度参数决定了生成图像的宽度，这对于设置星暴图案的整体尺寸至关重要。
    - Comfy dtype: INT
    - Python dtype: int
- height
    - 高度参数设置了图像的垂直范围，与宽度一起工作，以建立星暴图案的画布大小。
    - Comfy dtype: INT
    - Python dtype: int
- num_triangles
    - 三角形的数量决定了星暴图案的复杂性和细节，影响整体视觉效果。
    - Comfy dtype: INT
    - Python dtype: int
- color_1
    - 第一种颜色参数允许用户选择星暴的主要颜色，这显著影响图案的最终美感。
    - Comfy dtype: COLORS
    - Python dtype: str
- color_2
    - 第二种颜色参数用于定义星暴中的次要颜色，为设计提供对比元素。
    - Comfy dtype: COLORS
    - Python dtype: str
- center_x
    - center_x 确定了星暴中心的 x 坐标，这对于在图像内定位图案至关重要。
    - Comfy dtype: INT
    - Python dtype: int
- center_y
    - center_y 设置星暴中心的 y 坐标，确保图案在画布上垂直对齐。
    - Comfy dtype: INT
    - Python dtype: int
- bbox_factor
    - 边界框因子决定了星暴图案的缩放，影响图像内三角形的大小。
    - Comfy dtype: FLOAT
    - Python dtype: float
## Optional
- rotation
    - 旋转为星暴图案添加了旋转效果，允许设计中出现动态变化。
    - Comfy dtype: FLOAT
    - Python dtype: float
- color1_hex
    - color1_hex 是一个可选参数，允许为星暴的第一个颜色输入自定义的十六进制颜色，提供高级颜色定制。
    - Comfy dtype: STRING
    - Python dtype: str
- color2_hex
    - color2_hex 是一个可选参数，用于为星暴的第二种颜色指定自定义的十六进制颜色，增强设计灵活性。
    - Comfy dtype: STRING
    - Python dtype: str

# Output types
- IMAGE
    - IMAGE 输出提供了渲染后的星暴图案作为图像，可以进一步处理或展示。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- show_help
    - show_help 输出提供了一个 URL 链接到文档，以便进一步指导如何使用该节点。
    - Comfy dtype: STRING
    - Python dtype: str

# Usage tips
- Infra type: CPU

# Source code
```
class CR_StarburstColors:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'width': ('INT', {'default': 512, 'min': 64, 'max': 4096}), 'height': ('INT', {'default': 512, 'min': 64, 'max': 4096}), 'num_triangles': ('INT', {'default': 6, 'min': 1, 'max': 512}), 'color_1': (COLORS,), 'color_2': (COLORS,), 'center_x': ('INT', {'default': 0, 'min': 0, 'max': 512}), 'center_y': ('INT', {'default': 0, 'min': 0, 'max': 512}), 'rotation': ('FLOAT', {'default': 0, 'min': 0, 'max': 720}), 'bbox_factor': ('FLOAT', {'default': 2, 'min': 0, 'max': 2, 'step': 0.01})}, 'optional': {'color1_hex': ('STRING', {'multiline': False, 'default': '#000000'}), 'color2_hex': ('STRING', {'multiline': False, 'default': '#000000'})}}
    RETURN_TYPES = ('IMAGE', 'STRING')
    RETURN_NAMES = ('IMAGE', 'show_help')
    FUNCTION = 'draw'
    CATEGORY = icons.get('Comfyroll/Graphics/Pattern')

    def draw(self, width, height, num_triangles, color_1, color_2, center_x, center_y, bbox_factor, rotation=0, color1_hex='#000000', color2_hex='#000000'):
        if color_1 == 'custom':
            color_1 = color1_hex
        else:
            color_1 = color_1
        if color_2 == 'custom':
            color_2 = color2_hex
        else:
            color_2 = color_2
        (fig, ax) = plt.subplots()
        x = width / 100
        y = height / 100
        (fig, ax) = plt.subplots(figsize=(x, y))
        plt.xlim(-x / 2, x / 2)
        plt.ylim(-y / 2, y / 2)
        plt.axis('off')
        plt.tight_layout(pad=0, w_pad=0, h_pad=0)
        plt.autoscale(False)
        box_width = bbox_factor * x
        box_height = bbox_factor * y
        colors = [color_1, color_2]
        tri = num_triangles
        for i in range(tri):
            x1 = center_x / 100
            y1 = center_y / 100
            x2_unrotated = box_width / 2 * np.cos(np.radians(i * 360 / tri))
            y2_unrotated = box_height / 2 * np.sin(np.radians(i * 360 / tri))
            x3_unrotated = box_width / 2 * np.cos(np.radians((i + 1) * 360 / tri))
            y3_unrotated = box_height / 2 * np.sin(np.radians((i + 1) * 360 / tri))
            x2 = x2_unrotated * np.cos(np.radians(rotation)) - y2_unrotated * np.sin(np.radians(rotation))
            y2 = x2_unrotated * np.sin(np.radians(rotation)) + y2_unrotated * np.cos(np.radians(rotation))
            x3 = x3_unrotated * np.cos(np.radians(rotation)) - y3_unrotated * np.sin(np.radians(rotation))
            y3 = x3_unrotated * np.sin(np.radians(rotation)) + y3_unrotated * np.cos(np.radians(rotation))
            ax.fill([x1, x2, x3, x1], [y1, y2, y3, y1], color=colors[i % 2])
        img_buf = io.BytesIO()
        plt.savefig(img_buf, format='png')
        img = Image.open(img_buf)
        image_out = pil2tensor(img.convert('RGB'))
        show_help = 'https://github.com/Suzie1/ComfyUI_Comfyroll_CustomNodes/wiki/Pattern-Nodes#cr-starburst-colors'
        return (image_out, show_help)
```