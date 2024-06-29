# Documentation
- Class name: CR_SimpleTextWatermark
- Category: Comfyroll/Graphics/Text
- Output node: False
- Repo Ref: https://github.com/RockOfFire/ComfyUI_Comfyroll_CustomNodes

CR_SimpleTextWatermark 节点旨在将文本作为水印叠加在图像上。它允许自定义文本属性，如对齐方式、不透明度和字体样式，以使水印与图像内容无缝融合。

# Input types
## Required
- image
    - 图像参数至关重要，因为它定义了将应用水印文本的基础媒体。选择的图像直接影响水印在图像上下文中的最终外观。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- text
    - 文本参数指定了将叠加在图像上的水印内容。文本的信息和样式对于向观众传达预期的信息或品牌至关重要。
    - Comfy dtype: STRING
    - Python dtype: str
- align
    - 对齐参数决定了水印文本相对于图像的位置。这对于确保文本被放置在一个视觉上吸引人且适当的位置至关重要。
    - Comfy dtype: STRING
    - Python dtype: str
- font_name
    - 字体名称参数选择水印文本的字体类型。字体的选择可以显著影响文本在图像中的可读性和视觉吸引力。
    - Comfy dtype: STRING
    - Python dtype: str
- font_size
    - 字体大小参数设置水印文本的大小。这个属性很重要，因为它影响文本在图像上显示时的突出度和易读性。
    - Comfy dtype: INT
    - Python dtype: int
- font_color
    - 字体颜色参数定义了水印文本的颜色。它在确保文本在图像背景中脱颖而出，同时保持一致的视觉主题方面起着关键作用。
    - Comfy dtype: STRING
    - Python dtype: str
- opacity
    - 不透明度参数调整水印文本的透明度级别。它很重要，因为它允许文本可见，而不会压倒底层图像内容。
    - Comfy dtype: FLOAT
    - Python dtype: float
- x_margin
    - x_margin 参数指定了图像边缘到水印文本的水平间距。这对于实现平衡布局并防止文本看起来太靠近图像边缘很重要。
    - Comfy dtype: INT
    - Python dtype: int
- y_margin
    - y_margin 参数指定了图像边缘到水印文本的垂直间距。这对于保持视觉上吸引人的布局并确保文本不会被其他图像元素遮挡至关重要。
    - Comfy dtype: INT
    - Python dtype: int
## Optional
- font_color_hex
    - font_color_hex 参数允许为水印文本使用自定义的十六进制颜色值。这对于与品牌或设计规范进行精确的颜色匹配可能很重要。
    - Comfy dtype: STRING
    - Python dtype: str

# Output types
- IMAGE
    - IMAGE 输出提供了应用了水印的最终图像。它是所有节点参数协同工作以产生所需视觉效果的成果。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- show_help
    - show_help 输出提供了指向节点文档的 URL，以供进一步指导或帮助。对于寻求如何有效使用节点的更多信息的用户来说，这是一个宝贵的资源。
    - Comfy dtype: STRING
    - Python dtype: str

# Usage tips
- Infra type: CPU

# Source code
```
class CR_SimpleTextWatermark:

    @classmethod
    def INPUT_TYPES(s):
        font_dir = os.path.join(os.path.dirname(os.path.dirname(os.path.realpath(__file__))), 'fonts')
        file_list = [f for f in os.listdir(font_dir) if os.path.isfile(os.path.join(font_dir, f)) and f.lower().endswith('.ttf')]
        ALIGN_OPTIONS = ['center', 'top left', 'top center', 'top right', 'bottom left', 'bottom center', 'bottom right']
        return {'required': {'image': ('IMAGE',), 'text': ('STRING', {'multiline': False, 'default': '@ your name'}), 'align': (ALIGN_OPTIONS,), 'opacity': ('FLOAT', {'default': 0.3, 'min': 0.0, 'max': 1.0, 'step': 0.01}), 'font_name': (file_list,), 'font_size': ('INT', {'default': 50, 'min': 1, 'max': 1024}), 'font_color': (COLORS,), 'x_margin': ('INT', {'default': 20, 'min': -1024, 'max': 1024}), 'y_margin': ('INT', {'default': 20, 'min': -1024, 'max': 1024})}, 'optional': {'font_color_hex': ('STRING', {'multiline': False, 'default': '#000000'})}}
    RETURN_TYPES = ('IMAGE', 'STRING')
    RETURN_NAMES = ('IMAGE', 'show_help')
    FUNCTION = 'overlay_text'
    CATEGORY = icons.get('Comfyroll/Graphics/Text')

    def overlay_text(self, image, text, align, font_name, font_size, font_color, opacity, x_margin, y_margin, font_color_hex='#000000'):
        text_color = get_color_values(font_color, font_color_hex, color_mapping)
        total_images = []
        for img in image:
            img = tensor2pil(img)
            textlayer = Image.new('RGBA', img.size)
            draw = ImageDraw.Draw(textlayer)
            font_file = os.path.join('fonts', str(font_name))
            resolved_font_path = os.path.join(os.path.dirname(os.path.dirname(os.path.realpath(__file__))), font_file)
            font = ImageFont.truetype(str(resolved_font_path), size=font_size)
            textsize = get_text_size(draw, text, font)
            if align == 'center':
                textpos = [(img.size[0] - textsize[0]) // 2, (img.size[1] - textsize[1]) // 2]
            elif align == 'top left':
                textpos = [x_margin, y_margin]
            elif align == 'top center':
                textpos = [(img.size[0] - textsize[0]) // 2, y_margin]
            elif align == 'top right':
                textpos = [img.size[0] - textsize[0] - x_margin, y_margin]
            elif align == 'bottom left':
                textpos = [x_margin, img.size[1] - textsize[1] - y_margin]
            elif align == 'bottom center':
                textpos = [(img.size[0] - textsize[0]) // 2, img.size[1] - textsize[1] - y_margin]
            elif align == 'bottom right':
                textpos = [img.size[0] - textsize[0] - x_margin, img.size[1] - textsize[1] - y_margin]
            draw.text(textpos, text, font=font, fill=text_color)
            if opacity != 1:
                textlayer = reduce_opacity(textlayer, opacity)
            out_image = Image.composite(textlayer, img, textlayer)
            out_image = np.array(out_image.convert('RGB')).astype(np.float32) / 255.0
            out_image = torch.from_numpy(out_image).unsqueeze(0)
            total_images.append(out_image)
        images_out = torch.cat(total_images, 0)
        show_help = 'https://github.com/Suzie1/ComfyUI_Comfyroll_CustomNodes/wiki/Text-Nodes#cr-simple-text-watermark'
        return (images_out, show_help)
```