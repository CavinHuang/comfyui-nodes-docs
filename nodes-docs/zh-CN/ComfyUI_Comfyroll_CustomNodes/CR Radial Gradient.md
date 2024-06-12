# Documentation
- Class name: CR_RadialGradient
- Category: Comfyroll/Graphics/Pattern
- Output node: False
- Repo Ref: https://github.com/RockOfFire/ComfyUI_Comfyroll_CustomNodes

CR_RadialGradient 节点旨在生成径向渐变图像。它提供了一种无缝的方式，可以在指定的宽度和高度上从起始颜色渐变到结束颜色，同时可以自定义径向中心和渐变距离。

# Input types
## Required
- width
    - 宽度参数定义了输出图像的宽度。它至关重要，因为它决定了渐变图案的水平范围。
    - Comfy dtype: INT
    - Python dtype: int
- height
    - 高度参数设置输出图像的高度。它很关键，因为它决定了渐变图案的垂直范围。
    - Comfy dtype: INT
    - Python dtype: int
- start_color
    - 起始颜色参数指定径向渐变的初始颜色。它在确定渐变效果的整体外观中起着重要作用。
    - Comfy dtype: COLORS
    - Python dtype: str
- end_color
    - 结束颜色参数确定径向渐变的最终颜色。它在设置渐变过渡中的目的地颜色时很重要。
    - Comfy dtype: COLORS
    - Python dtype: str
## Optional
- radial_center_x
    - 径向中心 x 参数调整径向渐变中心的水平位置。它影响图像上颜色的分布。
    - Comfy dtype: FLOAT
    - Python dtype: float
- radial_center_y
    - 径向中心 y 参数设置径向渐变中心的垂直位置。它影响渐变颜色在图像上的扩散方式。
    - Comfy dtype: FLOAT
    - Python dtype: float
- gradient_distance
    - 渐变距离参数控制渐变的扩散，决定颜色从起始颜色到结束颜色的过渡速度。
    - Comfy dtype: FLOAT
    - Python dtype: float
- start_color_hex
    - 起始颜色十六进制参数允许设置自定义的十六进制颜色作为起始颜色，为精确的颜色规格提供灵活性。
    - Comfy dtype: STRING
    - Python dtype: str
- end_color_hex
    - 结束颜色十六进制参数允许指定结束颜色的自定义十六进制颜色，提供对渐变端点使用的确切颜色的控制。
    - Comfy dtype: STRING
    - Python dtype: str

# Output types
- IMAGE
    - IMAGE 输出提供生成的径向渐变图像，这是节点执行的主要结果。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- show_Help
    - show_Help 输出提供了一个链接到文档的链接，以获取有关使用该节点的进一步指导。
    - Comfy dtype: STRING
    - Python dtype: str

# Usage tips
- Infra type: CPU

# Source code
```
class CR_RadialGradient:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'width': ('INT', {'default': 512, 'min': 64, 'max': 4096}), 'height': ('INT', {'default': 512, 'min': 64, 'max': 4096}), 'start_color': (COLORS,), 'end_color': (COLORS,), 'gradient_distance': ('FLOAT', {'default': 1, 'min': 0, 'max': 2, 'step': 0.05}), 'radial_center_x': ('FLOAT', {'default': 0.5, 'min': 0, 'max': 1, 'step': 0.05}), 'radial_center_y': ('FLOAT', {'default': 0.5, 'min': 0, 'max': 1, 'step': 0.05})}, 'optional': {'start_color_hex': ('STRING', {'multiline': False, 'default': '#000000'}), 'end_color_hex': ('STRING', {'multiline': False, 'default': '#000000'})}}
    RETURN_TYPES = ('IMAGE', 'STRING')
    RETURN_NAMES = ('IMAGE', 'show_Help')
    FUNCTION = 'draw'
    CATEGORY = icons.get('Comfyroll/Graphics/Pattern')

    def draw(self, width, height, start_color, end_color, radial_center_x=0.5, radial_center_y=0.5, gradient_distance=1, start_color_hex='#000000', end_color_hex='#000000'):
        if start_color == 'custom':
            color1_rgb = hex_to_rgb(start_color_hex)
        else:
            color1_rgb = color_mapping.get(start_color, (255, 255, 255))
        if end_color == 'custom':
            color2_rgb = hex_to_rgb(end_color_hex)
        else:
            color2_rgb = color_mapping.get(end_color, (0, 0, 0))
        canvas = np.zeros((height, width, 3), dtype=np.uint8)
        center_x = int(radial_center_x * width)
        center_y = int(radial_center_y * height)
        max_distance = np.sqrt(max(center_x, width - center_x) ** 2 + max(center_y, height - center_y) ** 2) * gradient_distance
        for i in range(width):
            for j in range(height):
                distance_to_center = np.sqrt((i - center_x) ** 2 + (j - center_y) ** 2)
                t = distance_to_center / max_distance
                t = max(0, min(t, 1))
                interpolated_color = [int(c1 * (1 - t) + c2 * t) for (c1, c2) in zip(color1_rgb, color2_rgb)]
                canvas[j, i] = interpolated_color
        (fig, ax) = plt.subplots(figsize=(width / 100, height / 100))
        ax.imshow(canvas)
        plt.axis('off')
        plt.tight_layout(pad=0, w_pad=0, h_pad=0)
        plt.autoscale(tight=True)
        img_buf = io.BytesIO()
        plt.savefig(img_buf, format='png')
        img = Image.open(img_buf)
        image_out = pil2tensor(img.convert('RGB'))
        show_help = 'https://github.com/Suzie1/ComfyUI_Comfyroll_CustomNodes/wiki/Pattern-Nodes#cr-radial-gradiant'
        return (image_out, show_help)
```