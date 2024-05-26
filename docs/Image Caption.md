# Documentation
- Class name: ImageCaption
- Category: Mikey/Image
- Output node: False
- Repo Ref: https://github.com/bash-j/mikey_nodes

ImageCaption节点旨在生成并叠加图像上的标题。它接受一个图像、一个字体和一个标题字符串作为输入，并输出一个在原始图像下方带有包装标题文本的图像。这个节点特别适用于创建带有描述性标题的注释图像或社交媒体帖子。

# Input types
## Required
- image
    - 图像参数是将要添加标题的基础图像。这是一个关键组件，因为整个标题过程在视觉上是锚定在这张图像上的。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- font
    - 字体参数指定用于标题文本的字体类型。它影响文本的风格和可读性，这对于标题在传达信息方面的有效性至关重要。
    - Comfy dtype: STRING
    - Python dtype: str
- caption
    - 标题参数是将要放置在图像上的文本。它是一个核心元素，因为它提供了伴随图像的描述性或解释性内容。
    - Comfy dtype: STRING
    - Python dtype: str
## Optional
- extra_pnginfo
    - extra_pnginfo参数用于提供某些操作可能需要的额外信息，例如元数据或标题过程的特定指令。
    - Comfy dtype: EXTRA_PNGINFO
    - Python dtype: dict
- prompt
    - 提示参数用于指导标题过程，可能通过提供上下文或节点在生成标题时应遵循的特定指令。
    - Comfy dtype: PROMPT
    - Python dtype: dict

# Output types
- image
    - 输出图像是标题过程的结果，其中包括添加了标题文本的原始图像。这是最终产品，可以用于展示或进一步处理。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor

# Usage tips
- Infra type: CPU

# Source code
```
class ImageCaption:

    @classmethod
    def INPUT_TYPES(cls):
        if os.path.exists(os.path.join(folder_paths.base_path, 'fonts')):
            cls.font_dir = os.path.join(folder_paths.base_path, 'fonts')
            cls.font_files = [os.path.join(cls.font_dir, f) for f in os.listdir(cls.font_dir) if os.path.isfile(os.path.join(cls.font_dir, f))]
            cls.font_file_names = [os.path.basename(f) for f in cls.font_files]
            return {'required': {'image': ('IMAGE',), 'font': (cls.font_file_names, {'default': cls.font_file_names[0]}), 'caption': ('STRING', {'multiline': True, 'default': 'Caption'})}, 'hidden': {'extra_pnginfo': 'EXTRA_PNGINFO', 'prompt': 'PROMPT'}}
        else:
            cls.font_dir = None
            cls.font_files = None
            cls.font_file_names = None
            return {'required': {'image': ('IMAGE',), 'font': ('STRING', {'default': 'Path to font file'}), 'caption': ('STRING', {'multiline': True, 'default': 'Caption'})}, 'hidden': {'extra_pnginfo': 'EXTRA_PNGINFO', 'prompt': 'PROMPT'}}
    RETURN_TYPES = ('IMAGE',)
    RETURN_NAMES = ('image',)
    FUNCTION = 'caption'
    CATEGORY = 'Mikey/Image'

    def get_text_size(self, font, text):
        """
        Get width and height of a text string with given font.

        Parameters:
            font (ImageFont.FreeTypeFont): A font object.
            text (str): Text to measure.

        Returns:
            (int, int): Width and height of the text.
        """
        (left, top, right, bottom) = font.getbbox(text)
        width = right - left
        height = bottom - top
        return (width, height)

    def wrap_text(self, text, font, max_width):
        """Wrap text to fit inside a specified width when rendered."""
        wrapped_lines = []
        for line in text.split('\n'):
            words = line.split(' ')
            new_line = words[0]
            for word in words[1:]:
                if int(font.getlength(new_line + ' ' + word)) <= max_width:
                    new_line += ' ' + word
                else:
                    wrapped_lines.append(new_line)
                    new_line = word
            wrapped_lines.append(new_line)
        return wrapped_lines

    @apply_to_batch
    def caption(self, image, font, caption, extra_pnginfo=None, prompt=None):
        if extra_pnginfo is None:
            extra_pnginfo = {}
        caption = search_and_replace(caption, extra_pnginfo, prompt)
        orig_image = tensor2pil(image)
        (width, height) = orig_image.size
        if self.font_dir is None:
            font_file = font
            if not os.path.isfile(font_file):
                raise Exception('Font file does not exist: ' + font_file)
        else:
            font_file = os.path.join(self.font_dir, font)
        font = ImageFont.truetype(font_file, 32)
        max_width = width
        wrapped_lines = self.wrap_text(caption, font, max_width)
        (_, text_height) = self.get_text_size(font, 'Hg')
        wrapped_text_height = len(wrapped_lines) * text_height
        padding = 15
        caption_height = wrapped_text_height + padding * 2
        text_image = Image.new('RGB', (width, caption_height), (0, 0, 0))
        draw = ImageDraw.Draw(text_image)
        line_spacing = 5
        y_position = padding
        for line in wrapped_lines:
            text_width = font.getlength(line)
            x_position = (width - int(text_width)) // 2
            draw.text((x_position, y_position), line, (255, 255, 255), font=font)
            (_, text_height) = self.get_text_size(font, line)
            y_position += text_height + line_spacing
        combined_image = Image.new('RGB', (width, height + caption_height + line_spacing), (0, 0, 0))
        combined_image.paste(text_image, (0, height))
        combined_image.paste(orig_image, (0, 0))
        return pil2tensor(combined_image)
```