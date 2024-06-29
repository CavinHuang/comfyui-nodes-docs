# Documentation
- Class name: CR_OverlayText
- Category: Comfyroll/Graphics/Text
- Output node: False
- Repo Ref: https://github.com/RockOfFire/ComfyUI_Comfyroll_CustomNodes

CR_OverlayText 节点旨在将文本叠加到图片上，提供了一系列定制选项，如字体大小、颜色和旋转。它通过以用户定义的方式整合文本元素，增强了图片的视觉效果和信息密度。

# Input types
## Required
- image
    - 将要叠加文本的基础图片。它作为文本可视化的画布。
    - Comfy dtype: IMAGE
    - Python dtype: PIL.Image.Image
- text
    - 要叠加在图片上的文本内容。它可以包含多行文本，是节点功能的核心。
    - Comfy dtype: STRING
    - Python dtype: str
- font_name
    - 指定用于文本叠加的字体。字体的选择影响文本的风格和可读性。
    - Comfy dtype: STRING
    - Python dtype: str
- font_size
    - 确定文本的字体大小。较大的尺寸可以使文本更加突出，而较小的尺寸可以创造一种微妙的效果。
    - Comfy dtype: INT
    - Python dtype: int
- font_color
    - 设置用于文本叠加的字体颜色。颜色的选择可以影响文本在图片上的对比度和视觉冲击力。
    - Comfy dtype: STRING
    - Python dtype: str
- align
    - 控制文本在图片上的水平对齐方式。这对于以审美方式定位文本至关重要。
    - Comfy dtype: STRING
    - Python dtype: str
- justify
    - 决定文本在指定边距内的对齐方式。它影响每行单词之间的间距。
    - Comfy dtype: STRING
    - Python dtype: str
- margins
    - 设置文本周围的边距。适当的边距可以防止文本显得拥挤，提高可读性。
    - Comfy dtype: INT
    - Python dtype: int
- line_spacing
    - 控制文本行之间的间距。适当的行间距可以提高文本的可读性。
    - Comfy dtype: INT
    - Python dtype: int
- position_x
    - 指定文本在图片上开始的水平位置（x坐标）。
    - Comfy dtype: INT
    - Python dtype: int
- position_y
    - 指定文本在图片上开始的垂直位置（y坐标）。
    - Comfy dtype: INT
    - Python dtype: int
- rotation_angle
    - 定义文本的旋转角度。这可以用来以各种角度定位文本，以创造创意效果。
    - Comfy dtype: FLOAT
    - Python dtype: float
- rotation_options
    - 确定文本的旋转点。它可以是文本的中心或图片的中心。
    - Comfy dtype: STRING
    - Python dtype: str
## Optional
- font_color_hex
    - 为字体提供十六进制颜色代码。这允许使用预定义颜色选项中没有的自定义颜色。
    - Comfy dtype: STRING
    - Python dtype: str

# Output types
- IMAGE
    - 应用了文本叠加的结果图片。它代表了节点操作的最终视觉输出。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- show_help
    - 提供文档链接，以便进一步指导如何使用该节点。
    - Comfy dtype: STRING
    - Python dtype: str

# Usage tips
- Infra type: CPU

# Source code
```
class CR_OverlayText:

    @classmethod
    def INPUT_TYPES(s):
        font_dir = os.path.join(os.path.dirname(os.path.dirname(os.path.realpath(__file__))), 'fonts')
        file_list = [f for f in os.listdir(font_dir) if os.path.isfile(os.path.join(font_dir, f)) and f.lower().endswith('.ttf')]
        return {'required': {'image': ('IMAGE',), 'text': ('STRING', {'multiline': True, 'default': 'text'}), 'font_name': (file_list,), 'font_size': ('INT', {'default': 50, 'min': 1, 'max': 1024}), 'font_color': (COLORS,), 'align': (ALIGN_OPTIONS,), 'justify': (JUSTIFY_OPTIONS,), 'margins': ('INT', {'default': 0, 'min': -1024, 'max': 1024}), 'line_spacing': ('INT', {'default': 0, 'min': -1024, 'max': 1024}), 'position_x': ('INT', {'default': 0, 'min': -4096, 'max': 4096}), 'position_y': ('INT', {'default': 0, 'min': -4096, 'max': 4096}), 'rotation_angle': ('FLOAT', {'default': 0.0, 'min': -360.0, 'max': 360.0, 'step': 0.1}), 'rotation_options': (ROTATE_OPTIONS,)}, 'optional': {'font_color_hex': ('STRING', {'multiline': False, 'default': '#000000'})}}
    RETURN_TYPES = ('IMAGE', 'STRING')
    RETURN_NAMES = ('IMAGE', 'show_help')
    FUNCTION = 'overlay_text'
    CATEGORY = icons.get('Comfyroll/Graphics/Text')

    def overlay_text(self, image, text, font_name, font_size, font_color, margins, line_spacing, position_x, position_y, align, justify, rotation_angle, rotation_options, font_color_hex='#000000'):
        text_color = get_color_values(font_color, font_color_hex, color_mapping)
        image_3d = image[0, :, :, :]
        back_image = tensor2pil(image_3d)
        text_image = Image.new('RGB', back_image.size, text_color)
        text_mask = Image.new('L', back_image.size)
        rotated_text_mask = draw_masked_text(text_mask, text, font_name, font_size, margins, line_spacing, position_x, position_y, align, justify, rotation_angle, rotation_options)
        image_out = Image.composite(text_image, back_image, rotated_text_mask)
        show_help = 'https://github.com/Suzie1/ComfyUI_Comfyroll_CustomNodes/wiki/Text-Nodes#cr-overlay-text'
        return (pil2tensor(image_out), show_help)
```