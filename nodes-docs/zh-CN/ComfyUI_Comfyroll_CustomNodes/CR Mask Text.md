# Documentation
- Class name: CR_MaskText
- Category: Graphics/Text
- Output node: False
- Repo Ref: https://github.com/RockOfFire/ComfyUI_Comfyroll_CustomNodes

CR_MaskText节点旨在以风格化的方式将文本叠加到图像上。它允许自定义字体、大小、颜色和位置，以创建视觉上吸引人的文本覆盖。该节点强调将文本集成在图形元素中，旨在增强图像的整体美感。

# Input types
## Required
- image
    - 将被遮罩文本的图像。它作为整个操作的基础，文本将直接应用在它上面。图像的选择对最终视觉效果有重要影响。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- text
    - 要被遮罩到图像上的文本内容。文本的内容和结构可以极大地改变最终图像传达的信息，使其成为节点功能的关键参数。
    - Comfy dtype: STRING
    - Python dtype: str
- font_name
    - 用于渲染文本的特定字体文件。不同的字体可以极大地改变文本的风格和可读性，因此在节点执行中扮演着重要角色。
    - Comfy dtype: STRING
    - Python dtype: str
- font_size
    - 用于文本的字体大小。字体大小直接影响图像中文本的可读性和显著性。
    - Comfy dtype: INT
    - Python dtype: int
- background_color
    - 文本背后背景的颜色。这可以是预定义的颜色或自定义的十六进制颜色，影响文本覆盖的对比度和视觉吸引力。
    - Comfy dtype: STRING
    - Python dtype: str
- align
    - 文本的水平对齐方式。它决定了文本在图像宽度内的定位，影响整体布局。
    - Comfy dtype: STRING
    - Python dtype: str
- justify
    - 文本的对齐方式。它控制单词之间的间距，影响文本块外观的均匀性。
    - Comfy dtype: STRING
    - Python dtype: str
- margins
    - 文本周围的空间，即边距。它在文本周围增加了一个缓冲区域，这对于文本的可见性和图像的构图可能很重要。
    - Comfy dtype: INT
    - Python dtype: int
- line_spacing
    - 文本行之间的垂直空间。它影响多行文本的可读性和整体紧凑性。
    - Comfy dtype: INT
    - Python dtype: int
- position_x
    - 文本从图像左边缘的水平位置。对于在图像内精确放置文本至关重要。
    - Comfy dtype: INT
    - Python dtype: int
- position_y
    - 文本从图像顶部边缘的垂直位置。它与水平位置结合使用，以精确放置文本。
    - Comfy dtype: INT
    - Python dtype: int
- rotation_angle
    - 文本旋转的角度。它提供了以各种方向定位文本的方法，为图像增添了动态元素。
    - Comfy dtype: FLOAT
    - Python dtype: float
- rotation_options
    - 确定旋转支点的位置，可以是文本中心或图像中心。这影响文本的方向如何相对于图像被感知。
    - Comfy dtype: STRING
    - Python dtype: str
## Optional
- bg_color_hex
    - 背景的自定义十六进制颜色。它允许进一步自定义文本的背景，增强了节点功能的灵活性。
    - Comfy dtype: STRING
    - Python dtype: str

# Output types
- IMAGE
    - 应用了遮罩文本的输出图像。它是节点处理的结果，代表了最终的视觉产品。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- show_help
    - 指向文档的URL链接，用于进一步帮助。它为用户提供了额外的资源，以理解和排除节点功能的故障。
    - Comfy dtype: STRING
    - Python dtype: str

# Usage tips
- Infra type: CPU

# Source code
```
class CR_MaskText:

    @classmethod
    def INPUT_TYPES(s):
        font_dir = os.path.join(os.path.dirname(os.path.dirname(os.path.realpath(__file__))), 'fonts')
        file_list = [f for f in os.listdir(font_dir) if os.path.isfile(os.path.join(font_dir, f)) and f.lower().endswith('.ttf')]
        return {'required': {'image': ('IMAGE',), 'text': ('STRING', {'multiline': True, 'default': 'text'}), 'font_name': (file_list,), 'font_size': ('INT', {'default': 50, 'min': 1, 'max': 1024}), 'background_color': (COLORS,), 'align': (ALIGN_OPTIONS,), 'justify': (JUSTIFY_OPTIONS,), 'margins': ('INT', {'default': 0, 'min': -1024, 'max': 1024}), 'line_spacing': ('INT', {'default': 0, 'min': -1024, 'max': 1024}), 'position_x': ('INT', {'default': 0, 'min': -4096, 'max': 4096}), 'position_y': ('INT', {'default': 0, 'min': -4096, 'max': 4096}), 'rotation_angle': ('FLOAT', {'default': 0.0, 'min': -360.0, 'max': 360.0, 'step': 0.1}), 'rotation_options': (ROTATE_OPTIONS,)}, 'optional': {'bg_color_hex': ('STRING', {'multiline': False, 'default': '#000000'})}}
    RETURN_TYPES = ('IMAGE', 'STRING')
    RETURN_NAMES = ('IMAGE', 'show_help')
    FUNCTION = 'mask_text'
    CATEGORY = icons.get('Comfyroll/Graphics/Text')

    def mask_text(self, image, text, font_name, font_size, margins, line_spacing, position_x, position_y, background_color, align, justify, rotation_angle, rotation_options, bg_color_hex='#000000'):
        bg_color = get_color_values(background_color, bg_color_hex, color_mapping)
        image_3d = image[0, :, :, :]
        text_image = tensor2pil(image_3d)
        text_mask = Image.new('L', text_image.size)
        background_image = Image.new('RGB', text_mask.size, bg_color)
        rotated_text_mask = draw_masked_text(text_mask, text, font_name, font_size, margins, line_spacing, position_x, position_y, align, justify, rotation_angle, rotation_options)
        text_mask = ImageOps.invert(rotated_text_mask)
        image_out = Image.composite(background_image, text_image, text_mask)
        show_help = 'https://github.com/Suzie1/ComfyUI_Comfyroll_CustomNodes/wiki/Text-Nodes#cr-mask-text'
        return (pil2tensor(image_out), show_help)
```