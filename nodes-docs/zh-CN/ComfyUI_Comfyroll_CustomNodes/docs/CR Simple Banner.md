# Documentation
- Class name: CR_SimpleBanner
- Category: Comfyroll/Graphics/Template
- Output node: False
- Repo Ref: https://github.com/RockOfFire/ComfyUI_Comfyroll_CustomNodes

CR_SimpleBanner 节点旨在从提供的图像和文本创建视觉吸引力强的横幅。它智能地调整文本的大小和位置，确保横幅既易读又美观，提供字体、颜色和轮廓的定制选项以满足不同的设计需求。

# Input types
## Required
- image
    - 图像参数对于横幅创建过程至关重要，因为它构成了输出的视觉基础。它决定了文本将被渲染的画布。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- banner_text
    - 横幅文本是一个关键输入，它传达了旨在传达给观众的信息或消息。这是将被样式化并在横幅上显示的主要内容。
    - Comfy dtype: STRING
    - Python dtype: str
- font_name
    - 字体名称参数决定了横幅上文本的风格，影响最终输出的整体感觉。它是为横幅消息设定基调的关键因素。
    - Comfy dtype: STRING
    - Python dtype: str
- max_font_size
    - 最大字体大小参数确保文本在保持易读性的同时适合横幅的尺寸。这是布局和设计横幅文本的一个关键因素。
    - Comfy dtype: INT
    - Python dtype: int
- font_color
    - 字体颜色参数允许定制文本的外观，确保它在横幅背景上突出显示，以实现最大的视觉冲击力。
    - Comfy dtype: STRING
    - Python dtype: str
## Optional
- outline_thickness
    - 轮廓厚度参数在文本周围添加边框，增强其可见性并赋予其更明确的外观。这是一个可选特性，可以根据设计偏好进行调整。
    - Comfy dtype: INT
    - Python dtype: int
- outline_color
    - 轮廓颜色参数通过定义文本边框的颜色来补充文本，有助于横幅的整体美学吸引力。
    - Comfy dtype: STRING
    - Python dtype: str
- margin_size
    - 边距大小参数调整文本周围的间距，提供平衡的外观，并确保文本在横幅上看起来既不显得过于拥挤也不过于稀疏。
    - Comfy dtype: INT
    - Python dtype: int
- font_color_hex
    - 字体颜色十六进制参数允许使用十六进制值对文本进行精确的颜色定制，为横幅的文本提供了广泛的颜色选择。
    - Comfy dtype: STRING
    - Python dtype: str
- outline_color_hex
    - 轮廓颜色十六进制参数指定了文本轮廓的十六进制颜色值，允许进行详细的颜色调整，并增强了横幅的视觉设计。
    - Comfy dtype: STRING
    - Python dtype: str

# Output types
- image
    - 输出图像是最终的横幅，它结合了风格化的文本和设计元素。它代表了所有输入参数和对横幅所做的定制的成果。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- show_help
    - 显示帮助参数提供了一个链接到文档的链接，以获得有关如何有效使用该节点的进一步指导和帮助。
    - Comfy dtype: STRING
    - Python dtype: str

# Usage tips
- Infra type: CPU

# Source code
```
class CR_SimpleBanner:

    @classmethod
    def INPUT_TYPES(s):
        font_dir = os.path.join(os.path.dirname(os.path.dirname(os.path.realpath(__file__))), 'fonts')
        file_list = [f for f in os.listdir(font_dir) if os.path.isfile(os.path.join(font_dir, f)) and f.lower().endswith('.ttf')]
        return {'required': {'image': ('IMAGE',), 'banner_text': ('STRING', {'multiline': True, 'default': 'text'}), 'font_name': (file_list,), 'max_font_size': ('INT', {'default': 150, 'min': 20, 'max': 2048}), 'font_color': (COLORS,), 'outline_thickness': ('INT', {'default': 0, 'min': 0, 'max': 500}), 'outline_color': (COLORS,), 'margin_size': ('INT', {'default': 0, 'min': 0, 'max': 500})}, 'optional': {'font_color_hex': ('STRING', {'multiline': False, 'default': '#000000'}), 'outline_color_hex': ('STRING', {'multiline': False, 'default': '#000000'})}}
    RETURN_TYPES = ('IMAGE', 'STRING')
    RETURN_NAMES = ('image', 'show_help')
    FUNCTION = 'make_banner'
    CATEGORY = icons.get('Comfyroll/Graphics/Template')

    def make_banner(self, image, banner_text, font_name, max_font_size, font_color, outline_thickness, outline_color, margin_size, font_color_hex='#000000', outline_color_hex='#000000'):
        text_color = get_color_values(font_color, font_color_hex, color_mapping)
        outline_color = get_color_values(outline_color, outline_color_hex, color_mapping)
        total_images = []
        for img in image:
            back_image = tensor2pil(img).convert('RGBA')
            size = (back_image.width, back_image.height)
            font_file = os.path.join('fonts', font_name)
            resolved_font_path = os.path.join(os.path.dirname(os.path.dirname(os.path.realpath(__file__))), font_file)
            draw = ImageDraw.Draw(back_image)
            area_width = back_image.width - margin_size * 2
            area_height = back_image.width - margin_size * 2
            font = get_font_size(draw, banner_text, area_width, area_height, resolved_font_path, max_font_size)
            x = back_image.width // 2
            y = back_image.height // 2
            if outline_thickness > 0:
                draw.text((x, y), banner_text, fill=text_color, font=font, anchor='mm', stroke_width=outline_thickness, stroke_fill=outline_color)
            else:
                draw.text((x, y), banner_text, fill=text_color, font=font, anchor='mm')
            out_image = np.array(back_image.convert('RGB')).astype(np.float32) / 255.0
            out_image = torch.from_numpy(out_image).unsqueeze(0)
            total_images.append(out_image)
        images_out = torch.cat(total_images, 0)
        show_help = 'https://github.com/Suzie1/ComfyUI_Comfyroll_CustomNodes/wiki/Template-Nodes#cr-simple-banner'
        return (images_out, show_help)
```