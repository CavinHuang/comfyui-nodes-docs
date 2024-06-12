# Documentation
- Class name: CR_FeatheredBorder
- Category: Comfyroll/Graphics/Layout
- Output node: False
- Repo Ref: https://github.com/RockOfFire/ComfyUI_Comfyroll_CustomNodes

CR_FeatheredBorder节点旨在为图像添加羽化边框，提供图像与其周围环境之间的柔和且视觉吸引力强的过渡。它允许自定义边框的厚度和颜色，为用户提供对图像最终外观的高度控制。

# Input types
## Required
- image
    - 图像参数是节点的核心输入，表示将应用羽化边框的图像。它对节点的执行至关重要，因为它决定了要添加边框效果的基础内容。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- top_thickness
    - top_thickness参数指定应用于图像顶部边缘的边框厚度。它在定义带有边框的最终图像的整体尺寸方面起着重要作用。
    - Comfy dtype: INT
    - Python dtype: int
- bottom_thickness
    - bottom_thickness参数设置图像底部边缘的边框厚度，有助于整体边框外观和图像的最终大小。
    - Comfy dtype: INT
    - Python dtype: int
- left_thickness
    - left_thickness参数确定图像左侧边框的厚度，影响带有边框的图像的最终展示。
    - Comfy dtype: INT
    - Python dtype: int
- right_thickness
    - right_thickness参数控制图像右侧边框的厚度，影响包括边框在内的图像的总宽度。
    - Comfy dtype: INT
    - Python dtype: int
- border_color
    - border_color参数对于定义将应用于图像的边框颜色至关重要。它显著影响最终输出的视觉美感。
    - Comfy dtype: COLOR
    - Python dtype: str
- feather_amount
    - feather_amount参数决定边框边缘的柔和度，在图像和边框之间创建平滑过渡。它是实现专业和精致外观的关键。
    - Comfy dtype: INT
    - Python dtype: int
## Optional
- border_color_hex
    - border_color_hex参数允许使用自定义的十六进制颜色值用于边框，为用户提供了实现特定颜色方案的额外灵活性。
    - Comfy dtype: STRING
    - Python dtype: str

# Output types
- image
    - 图像输出参数代表应用了羽化边框的最终图像。它是节点执行的主要结果，也是节点目的的核心。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- show_help
    - show_help输出提供指向节点文档页面的URL，为用户提供了如何有效使用该节点的额外信息和指导。
    - Comfy dtype: STRING
    - Python dtype: str

# Usage tips
- Infra type: CPU

# Source code
```
class CR_FeatheredBorder:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'image': ('IMAGE',), 'top_thickness': ('INT', {'default': 0, 'min': 0, 'max': 4096}), 'bottom_thickness': ('INT', {'default': 0, 'min': 0, 'max': 4096}), 'left_thickness': ('INT', {'default': 0, 'min': 0, 'max': 4096}), 'right_thickness': ('INT', {'default': 0, 'min': 0, 'max': 4096}), 'border_color': (COLORS,), 'feather_amount': ('INT', {'default': 0, 'min': 0, 'max': 1024})}, 'optional': {'border_color_hex': ('STRING', {'multiline': False, 'default': '#000000'})}}
    RETURN_TYPES = ('IMAGE', 'STRING')
    RETURN_NAMES = ('image', 'show_help')
    FUNCTION = 'make_border'
    CATEGORY = icons.get('Comfyroll/Graphics/Layout')

    def make_border(self, image, top_thickness, bottom_thickness, left_thickness, right_thickness, border_color, feather_amount, border_color_hex='#000000'):
        show_help = 'https://github.com/Suzie1/ComfyUI_Comfyroll_CustomNodes/wiki/Layout-Nodes#cr-feathered-border'
        images = []
        border_color = get_color_values(border_color, border_color_hex, color_mapping)
        for img in image:
            im = tensor2pil(img)
            RADIUS = feather_amount
            diam = 2 * RADIUS
            back = Image.new('RGB', (im.size[0] + diam, im.size[1] + diam), border_color)
            back.paste(im, (RADIUS, RADIUS))
            mask = Image.new('L', back.size, 0)
            draw = ImageDraw.Draw(mask)
            (x0, y0) = (0, 0)
            (x1, y1) = back.size
            for d in range(diam + RADIUS):
                (x1, y1) = (x1 - 1, y1 - 1)
                alpha = 255 if d < RADIUS else int(255 * (diam + RADIUS - d) / diam)
                draw.rectangle([x0, y0, x1, y1], outline=alpha)
                (x0, y0) = (x0 + 1, y0 + 1)
            blur = back.filter(ImageFilter.GaussianBlur(RADIUS / 2))
            back.paste(blur, mask=mask)
            if left_thickness > 0 or right_thickness > 0 or top_thickness > 0 or (bottom_thickness > 0):
                img = ImageOps.expand(back, (left_thickness, top_thickness, right_thickness, bottom_thickness), fill=border_color)
            else:
                img = back
            images.append(pil2tensor(img))
        images = torch.cat(images, dim=0)
        return (images, show_help)
```