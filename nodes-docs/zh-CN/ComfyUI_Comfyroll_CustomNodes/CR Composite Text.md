# Documentation
- Class name: CR_CompositeText
- Category: Graphics/Text
- Output node: False
- Repo Ref: https://github.com/RockOfFire/ComfyUI_Comfyroll_CustomNodes

CR_CompositeText节点旨在将文本叠加到图像背景上。它提供了一套全面的功能来自定义文本的外观，包括字体选择、大小、对齐和旋转。该节点的主要目的是创建视觉上吸引人的带有文本的复合图像，可用于各种用途，如平面设计、品牌推广或社交媒体内容。

# Input types
## Required
- image_text
    - image_text参数是源图像，文本将被合成到此图像上。它在确定输出图像的最终外观中起着关键作用，因为文本将放置在此图像上。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- image_background
    - image_background参数指定了在合成中将使用的背景图像。这对于设置文本出现的上下文至关重要。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- text
    - text参数包含将渲染到图像上的实际文本。它是一个基本输入，因为它直接影响最终合成图像所传达的信息。
    - Comfy dtype: STRING
    - Python dtype: str
- font_name
    - font_name参数用于选择用于文本的字体。它对于控制合成图像中文本的样式和可读性很重要。
    - Comfy dtype: STRING
    - Python dtype: str
## Optional
- font_size
    - font_size参数决定了文本的大小。这是影响文本在合成中的视觉突出度和可读性的关键因素。
    - Comfy dtype: INT
    - Python dtype: int
- margins
    - margins参数指定了文本周围的空间。这对于确保文本不显得拥挤，并保持干净和专业的外观很重要。
    - Comfy dtype: INT
    - Python dtype: int
- line_spacing
    - line_spacing参数控制文本行之间的垂直空间。它影响多行文本的整体布局和可读性。
    - Comfy dtype: INT
    - Python dtype: int
- position_x
    - position_x参数设置文本在图像上的水平位置。这对于在合成中对齐文本以实现所需的美学效果至关重要。
    - Comfy dtype: INT
    - Python dtype: int
- position_y
    - position_y参数设置文本在图像上的垂直位置。它与position_x一起工作，以准确地在合成中放置文本。
    - Comfy dtype: INT
    - Python dtype: int
- align
    - align参数决定文本的水平对齐方式。这对于整体构图和图像中文本的视觉平衡至关重要。
    - Comfy dtype: STRING
    - Python dtype: str
- justify
    - justify参数控制文本在图像内的分布，影响文本如何跨越可用宽度进行展开。
    - Comfy dtype: STRING
    - Python dtype: str
- rotation_angle
    - rotation_angle参数指定文本将旋转的角度。这是一个重要特性，用于为合成图像中的文本添加动态外观。
    - Comfy dtype: FLOAT
    - Python dtype: float
- rotation_options
    - rotation_options参数确定文本旋转的参考点，可以是文本中心或图像中心。
    - Comfy dtype: STRING
    - Python dtype: str

# Output types
- IMAGE
    - IMAGE输出提供了带有文本覆盖的最终合成图像。它是节点操作的主要结果，代表了所有输入参数和设置的综合成果。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- show_help
    - show_help输出提供了一个URL，链接到文档页面以获得进一步的帮助或有关节点使用详情。
    - Comfy dtype: STRING
    - Python dtype: str

# Usage tips
- Infra type: CPU

# Source code
```
class CR_CompositeText:

    @classmethod
    def INPUT_TYPES(s):
        font_dir = os.path.join(os.path.dirname(os.path.dirname(os.path.realpath(__file__))), 'fonts')
        file_list = [f for f in os.listdir(font_dir) if os.path.isfile(os.path.join(font_dir, f)) and f.lower().endswith('.ttf')]
        return {'required': {'image_text': ('IMAGE',), 'image_background': ('IMAGE',), 'text': ('STRING', {'multiline': True, 'default': 'text'}), 'font_name': (file_list,), 'font_size': ('INT', {'default': 50, 'min': 1, 'max': 1024}), 'align': (ALIGN_OPTIONS,), 'justify': (JUSTIFY_OPTIONS,), 'margins': ('INT', {'default': 0, 'min': -1024, 'max': 1024}), 'line_spacing': ('INT', {'default': 0, 'min': -1024, 'max': 1024}), 'position_x': ('INT', {'default': 0, 'min': -4096, 'max': 4096}), 'position_y': ('INT', {'default': 0, 'min': -4096, 'max': 4096}), 'rotation_angle': ('FLOAT', {'default': 0.0, 'min': -360.0, 'max': 360.0, 'step': 0.1}), 'rotation_options': (ROTATE_OPTIONS,)}}
    RETURN_TYPES = ('IMAGE', 'STRING')
    RETURN_NAMES = ('IMAGE', 'show_help')
    FUNCTION = 'composite_text'
    CATEGORY = icons.get('Comfyroll/Graphics/Text')

    def composite_text(self, image_text, image_background, text, font_name, font_size, margins, line_spacing, position_x, position_y, align, justify, rotation_angle, rotation_options):
        image_text_3d = image_text[0, :, :, :]
        image_back_3d = image_background[0, :, :, :]
        text_image = tensor2pil(image_text_3d)
        back_image = tensor2pil(image_back_3d)
        text_mask = Image.new('L', back_image.size)
        rotated_text_mask = draw_masked_text(text_mask, text, font_name, font_size, margins, line_spacing, position_x, position_y, align, justify, rotation_angle, rotation_options)
        image_out = Image.composite(text_image, back_image, rotated_text_mask)
        show_help = 'https://github.com/Suzie1/ComfyUI_Comfyroll_CustomNodes/wiki/Text-Nodes#cr-composite-text'
        return (pil2tensor(image_out), show_help)
```