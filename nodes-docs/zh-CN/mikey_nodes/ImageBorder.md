# Documentation
- Class name: ImageBorder
- Category: Mikey/Image
- Output node: False
- Repo Ref: https://github.com/bash-j/mikey_nodes

ImageBorder节点旨在为图像添加装饰性边框，增强其视觉吸引力。它支持各种边框样式，如棋盘格、模糊或纯色，允许定制以适应不同的设计需求。

# Input types
## Required
- image
    - 图像参数是必需的，因为它是将应用边框的基础输入。它直接影响最终输出的外观。
    - Comfy dtype: IMAGE
    - Python dtype: PIL.Image.Image or torch.Tensor
- border_width
    - border_width参数定义了要添加在图像周围的边框的厚度，这显著影响带边框图像的整体美学。
    - Comfy dtype: INT
    - Python dtype: int
- border_color
    - border_color参数允许用户指定边框的颜色，可以是纯色、棋盘格图案或模糊效果，以获得更精致的外观。
    - Comfy dtype: STRING
    - Python dtype: str

# Output types
- image
    - 输出图像包括带有新应用边框的原始图像，可供进一步处理或展示。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor

# Usage tips
- Infra type: CPU

# Source code
```
class ImageBorder:

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'image': ('IMAGE',), 'border_width': ('INT', {'default': 10, 'min': 0, 'max': 1000}), 'border_color': ('STRING', {'default': 'black'})}}
    RETURN_TYPES = ('IMAGE',)
    RETURN_NAMES = ('image',)
    FUNCTION = 'border'
    CATEGORY = 'Mikey/Image'

    def blur_border(self, image, border_width):
        scale_factor = (image.width + border_width * 2) / image.width
        border_image = image.resize((int(image.width * scale_factor), int(image.height * scale_factor)))
        border_image = border_image.filter(ImageFilter.GaussianBlur(radius=border_width * 0.5))
        border_image.paste(image, (border_width, border_width))
        return pil2tensor(border_image)[None, :, :, :]

    @apply_to_batch
    def border(self, image, border_width, border_color):
        orig_image = tensor2pil(image)
        (width, height) = orig_image.size
        if border_color == 'checkerboard':
            return checkerboard_border(image, border_width, 'black')
        if border_color == 'blur':
            return self.blur_border(orig_image, border_width)
        if border_color.startswith('(') and border_color.endswith(')'):
            border_color = border_color[1:-1]
            border_color = tuple(map(int, border_color.split(',')))
        border_image = Image.new('RGB', (width + border_width * 2, height + border_width * 2), border_color)
        border_image.paste(orig_image, (border_width, border_width))
        return pil2tensor(border_image)
```