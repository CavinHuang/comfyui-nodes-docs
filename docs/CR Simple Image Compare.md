# Documentation
- Class name: CR_SimpleImageCompare
- Category: Comfyroll/Graphics/Template
- Output node: False
- Repo Ref: https://github.com/RockOfFire/ComfyUI_Comfyroll_CustomNodes

CR_SimpleImageCompare节点旨在将两张图片并排比较，并在图片上叠加文字。它提供了一种直观的方式来视觉评估图片之间的差异，并包括了文字、字体和布局的定制选项。

# Input types
## Required
- text1
    - 要叠加在第一张图片上的第一段文字。这对于提供被比较图片的上下文或描述至关重要。
    - Comfy dtype: STRING
    - Python dtype: str
- text2
    - 要叠加在第二张图片上的第二段文字。它与'text1'有类似的作用，提供一种方式来注释或描述比较中的第二张图片。
    - Comfy dtype: STRING
    - Python dtype: str
- footer_height
    - 放置文字的页脚高度。此参数对于控制分配给文字叠加的垂直空间至关重要。
    - Comfy dtype: INT
    - Python dtype: int
- font_name
    - 用于文字叠加的字体名称。这影响文字的视觉外观，是样式化输出的关键参数。
    - Comfy dtype: STRING
    - Python dtype: str
- font_size
    - 文字叠加的字体大小。它决定了文字在图片上的显著程度，是调整文字可读性的重要参数。
    - Comfy dtype: INT
    - Python dtype: int
- mode
    - 文字和背景颜色的显示模式。它允许用户在浅色或暗色主题之间选择，以获得更好的对比度和可见性。
    - Comfy dtype: COMBO['normal', 'dark']
    - Python dtype: str
- border_thickness
    - 围绕图片的边框厚度。这是一个重要的参数，用于定义正在比较的图片的分隔和框架。
    - Comfy dtype: INT
    - Python dtype: int
## Optional
- image1
    - 要比较的第一张图片。它是节点功能的核心输入，因为节点旨在比较和展示图片。
    - Comfy dtype: IMAGE
    - Python dtype: PIL.Image.Image
- image2
    - 要比较的第二张图片。它与'image1'一起工作，为用户提供并排比较。
    - Comfy dtype: IMAGE
    - Python dtype: PIL.Image.Image

# Output types
- image
    - 包含两张输入图片并排比较及叠加文字的结果图片。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- show_help
    - 一个URL链接，指向该节点的文档，以获取如何使用该节点的进一步指导。
    - Comfy dtype: STRING
    - Python dtype: str

# Usage tips
- Infra type: CPU

# Source code
```
class CR_SimpleImageCompare:

    @classmethod
    def INPUT_TYPES(s):
        font_dir = os.path.join(os.path.dirname(os.path.dirname(os.path.realpath(__file__))), 'fonts')
        file_list = [f for f in os.listdir(font_dir) if os.path.isfile(os.path.join(font_dir, f)) and f.lower().endswith('.ttf')]
        return {'required': {'text1': ('STRING', {'multiline': True, 'default': 'text'}), 'text2': ('STRING', {'multiline': True, 'default': 'text'}), 'footer_height': ('INT', {'default': 100, 'min': 0, 'max': 1024}), 'font_name': (file_list,), 'font_size': ('INT', {'default': 50, 'min': 0, 'max': 1024}), 'mode': (['normal', 'dark'],), 'border_thickness': ('INT', {'default': 20, 'min': 0, 'max': 1024})}, 'optional': {'image1': ('IMAGE',), 'image2': ('IMAGE',)}}
    RETURN_TYPES = ('IMAGE', 'STRING')
    RETURN_NAMES = ('image', 'show_help')
    FUNCTION = 'layout'
    CATEGORY = icons.get('Comfyroll/Graphics/Template')

    def layout(self, text1, text2, footer_height, font_name, font_size, mode, border_thickness, image1=None, image2=None):
        show_help = 'https://github.com/Suzie1/ComfyUI_Comfyroll_CustomNodes/wiki/Layout-Nodes#cr-simple-image-compare'
        if mode == 'normal':
            font_color = 'black'
            bg_color = 'white'
        else:
            font_color = 'white'
            bg_color = 'black'
        if image1 is not None and image2 is not None:
            img1 = tensor2pil(image1)
            img2 = tensor2pil(image2)
            (image_width, image_height) = (img1.width, img1.height)
            if img2.width != img1.width or img2.height != img1.height:
                img2 = apply_resize_image(img2, image_width, image_height, 8, 'rescale', 'false', 1, 256, 'lanczos')
            margins = 50
            line_spacing = 0
            position_x = 0
            position_y = 0
            align = 'center'
            rotation_angle = 0
            rotation_options = 'image center'
            font_outline_thickness = 0
            font_outline_color = 'black'
            align = 'center'
            footer_align = 'center'
            outline_thickness = border_thickness // 2
            border_thickness = border_thickness // 2
            if footer_height > 0:
                text_panel1 = text_panel(image_width, footer_height, text1, font_name, font_size, font_color, font_outline_thickness, font_outline_color, bg_color, margins, line_spacing, position_x, position_y, align, footer_align, rotation_angle, rotation_options)
            combined_img1 = combine_images([img1, text_panel1], 'vertical')
            if outline_thickness > 0:
                combined_img1 = ImageOps.expand(combined_img1, outline_thickness, fill=bg_color)
            if footer_height > 0:
                text_panel2 = text_panel(image_width, footer_height, text2, font_name, font_size, font_color, font_outline_thickness, font_outline_color, bg_color, margins, line_spacing, position_x, position_y, align, footer_align, rotation_angle, rotation_options)
            combined_img2 = combine_images([img2, text_panel2], 'vertical')
            if outline_thickness > 0:
                combined_img2 = ImageOps.expand(combined_img2, outline_thickness, fill=bg_color)
            result_img = combine_images([combined_img1, combined_img2], 'horizontal')
        else:
            result_img = Image.new('RGB', (512, 512), bg_color)
        if border_thickness > 0:
            result_img = ImageOps.expand(result_img, border_thickness, bg_color)
        return (pil2tensor(result_img), show_help)
```