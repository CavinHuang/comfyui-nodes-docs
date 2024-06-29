# Documentation
- Class name: CR_SimpleMemeTemplate
- Category: Comfyroll/Graphics/Template
- Output node: False
- Repo Ref: https://github.com/RockOfFire/ComfyUI_Comfyroll_CustomNodes

CR_SimpleMemeTemplate 是一个用于生成自定义模因模板的节点。它允许用户输入一张图片，选择模因结构的预设，并在图片的顶部和底部添加文字。该节点还提供了字体、文字颜色以及在文字上方和下方添加装饰性条的定制选项。这个节点的主要目的是使用简单易用的用户界面促进模因图片的创建，使其易于被广泛的用户群体用来进行模因创作。

# Input types
## Required
- image
    - 图片参数是必需的，因为它定义了将要应用模因模板的基础图片。图片的选择直接影响模因的最终外观，使其成为节点操作中的关键元素。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- preset
    - 预设参数决定了模因模板的结构和预定义文本。它通过允许用户从常见的模因格式中选择，从而简化了定制过程。
    - Comfy dtype: COMBO['custom', 'One Does Not Simply ... MEME IN COMFY', 'This is fine.', 'Good Morning ... No Such Thing!']
    - Python dtype: str
- text_top
    - text_top 参数允许用户输入将出现在模因图片顶部的文本。它在传达模因的预期信息或主题中起着重要作用。
    - Comfy dtype: STRING
    - Python dtype: str
- text_bottom
    - text_bottom 参数用于显示在模因图片底部的文本。它补充了顶部文本，并有助于模因的整体构图。
    - Comfy dtype: STRING
    - Python dtype: str
- font_name
    - font_name 参数使用户能够为模因上的文本选择字体样式。字体的选择可以显著影响模因的可读性和视觉吸引力，因此它是一个重要的定制选项。
    - Comfy dtype: COMBO[file_list]
    - Python dtype: str
- max_font_size
    - max_font_size 参数为模因模板中的文本字体设置最大尺寸。它是确定模因布局内文本的可读性和视觉平衡的关键因素。
    - Comfy dtype: INT
    - Python dtype: int
- font_color
    - font_color 参数指定模因模板中文本的颜色。它是节点功能的关键方面，因为它影响文本的可见性以及模因的整体视觉冲击力。
    - Comfy dtype: COMBO[COLORS]
    - Python dtype: str
- font_outline
    - font_outline 参数为文本添加轮廓效果，可以提高模因图片背景上文本的可见性。轮廓样式的选择还可以为模因的设计增添装饰性。
    - Comfy dtype: COMBO['none', 'thin', 'thick', 'extra thick']
    - Python dtype: str
- bar_color
    - bar_color 参数确定模因模板中可能添加在文本上方和下方的装饰性条的颜色。这有助于吸引对文本的注意并提供对比背景。
    - Comfy dtype: COMBO[COLORS]
    - Python dtype: str
- bar_options
    - bar_options 参数决定是否向模因模板添加装饰性条以及它们相对于文本的位置。这可以影响模因的整体设计和对文本的强调。
    - Comfy dtype: COMBO['no bars', 'top', 'bottom', 'top and bottom']
    - Python dtype: str

# Output types
- image
    - 图片输出包含节点生成的最终模因模板。它代表了用户所做的所有输入参数和定制的成果。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- show_help
    - show_help 输出提供了与节点相关联的文档或帮助页面的链接。这对于寻求有关如何使用节点的额外指导或信息的用户可能是有用的。
    - Comfy dtype: STRING
    - Python dtype: str

# Usage tips
- Infra type: CPU

# Source code
```
class CR_SimpleMemeTemplate:

    @classmethod
    def INPUT_TYPES(s):
        font_dir = os.path.join(os.path.dirname(os.path.dirname(os.path.realpath(__file__))), 'fonts')
        file_list = [f for f in os.listdir(font_dir) if os.path.isfile(os.path.join(font_dir, f)) and f.lower().endswith('.ttf')]
        bar_opts = ['no bars', 'top', 'bottom', 'top and bottom']
        simple_meme_presets = ['custom', 'One Does Not Simply ... MEME IN COMFY', 'This is fine.', 'Good Morning ... No Such Thing!']
        return {'required': {'image': ('IMAGE',), 'preset': (simple_meme_presets,), 'text_top': ('STRING', {'multiline': True, 'default': 'text_top'}), 'text_bottom': ('STRING', {'multiline': True, 'default': 'text_bottom'}), 'font_name': (file_list,), 'max_font_size': ('INT', {'default': 150, 'min': 20, 'max': 2048}), 'font_color': (COLORS,), 'font_outline': (['none', 'thin', 'thick', 'extra thick'],), 'bar_color': (COLORS,), 'bar_options': (bar_opts,)}, 'optional': {'font_color_hex': ('STRING', {'multiline': False, 'default': '#000000'}), 'bar_color_hex': ('STRING', {'multiline': False, 'default': '#000000'})}}
    RETURN_TYPES = ('IMAGE', 'STRING')
    RETURN_NAMES = ('image', 'show_help')
    FUNCTION = 'make_meme'
    CATEGORY = icons.get('Comfyroll/Graphics/Template')

    def make_meme(self, image, preset, text_top, text_bottom, font_name, max_font_size, font_color, font_outline, bar_color, bar_options, font_color_hex='#000000', bar_color_hex='#000000'):
        text_color = get_color_values(font_color, font_color_hex, color_mapping)
        bar_color = get_color_values(bar_color, bar_color_hex, color_mapping)
        total_images = []
        for img in image:
            if bar_options == 'top':
                height_factor = 1.2
            elif bar_options == 'bottom':
                height_factor = 1.2
            elif bar_options == 'top and bottom':
                height_factor = 1.4
            else:
                height_factor = 1.0
            if preset == 'One Does Not Simply ... MEME IN COMFY':
                text_top = 'One Does Not Simply'
                text_bottom = 'MEME IN COMFY'
            if preset == 'This is fine.':
                text_top = 'This is fine.'
                text_bottom = ''
            if preset == 'Good Morning ... No Such Thing!':
                text_top = 'Good Morning'
                text_bottom = '"No Such Thing!"'
            back_image = tensor2pil(img)
            size = (back_image.width, int(back_image.height * height_factor))
            result_image = Image.new('RGB', size)
            font_file = os.path.join('fonts', font_name)
            resolved_font_path = os.path.join(os.path.dirname(os.path.dirname(os.path.realpath(__file__))), font_file)
            draw = ImageDraw.Draw(result_image)
            bar_width = back_image.width
            bar_height = back_image.height // 5
            top_bar = Image.new('RGB', (bar_width, bar_height), bar_color)
            bottom_bar = Image.new('RGB', (bar_width, bar_height), bar_color)
            if bar_options == 'top' or bar_options == 'top and bottom':
                image_out = result_image.paste(back_image, (0, bar_height))
            else:
                image_out = result_image.paste(back_image, (0, 0))
            if bar_options == 'top' or bar_options == 'top and bottom':
                result_image.paste(top_bar, (0, 0))
                font_top = get_font_size(draw, text_top, bar_width, bar_height, resolved_font_path, max_font_size)
                draw_text_on_image(draw, 0, bar_width, bar_height, text_top, font_top, text_color, font_outline)
            if bar_options == 'bottom' or bar_options == 'top and bottom':
                result_image.paste(bottom_bar, (0, result_image.height - bar_height))
                font_bottom = get_font_size(draw, text_bottom, bar_width, bar_height, resolved_font_path, max_font_size)
                if bar_options == 'bottom':
                    y_position = back_image.height
                else:
                    y_position = bar_height + back_image.height
                draw_text_on_image(draw, y_position, bar_width, bar_height, text_bottom, font_bottom, text_color, font_outline)
            if bar_options == 'bottom' and text_top > '':
                font_top = get_font_size(draw, text_top, bar_width, bar_height, resolved_font_path, max_font_size)
                draw_text_on_image(draw, 0, bar_width, bar_height, text_top, font_top, text_color, font_outline)
            if (bar_options == 'top' or bar_options == 'none') and text_bottom > '':
                font_bottom = get_font_size(draw, text_bottom, bar_width, bar_height, resolved_font_path, max_font_size)
                y_position = back_image.height
                draw_text_on_image(draw, y_position, bar_width, bar_height, text_bottom, font_bottom, text_color, font_outline)
            if bar_options == 'no bars' and text_bottom > '':
                font_bottom = get_font_size(draw, text_bottom, bar_width, bar_height, resolved_font_path, max_font_size)
                y_position = back_image.height - bar_height
                draw_text_on_image(draw, y_position, bar_width, bar_height, text_bottom, font_bottom, text_color, font_outline)
            if bar_options == 'no bars' and text_top > '':
                font_top = get_font_size(draw, text_top, bar_width, bar_height, resolved_font_path, max_font_size)
                draw_text_on_image(draw, 0, bar_width, bar_height, text_top, font_top, text_color, font_outline)
            out_image = np.array(result_image.convert('RGB')).astype(np.float32) / 255.0
            out_image = torch.from_numpy(out_image).unsqueeze(0)
            total_images.append(out_image)
        images_out = torch.cat(total_images, 0)
        show_help = 'https://github.com/Suzie1/ComfyUI_Comfyroll_CustomNodes/wiki/Template-Nodes#cr-simple-meme-template'
        return (images_out, show_help)
```