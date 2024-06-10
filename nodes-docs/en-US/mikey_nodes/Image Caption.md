# Image Caption (Mikey)
## Documentation
- Class name: `Image Caption`
- Category: `Mikey/Image`
- Output node: `False`

The Image Caption node is designed to add textual captions to images. It processes an image tensor, formats and wraps the provided text to fit the image dimensions, and then overlays the caption onto the image, optionally incorporating additional metadata into the image's PNG info.
## Input types
### Required
- **`image`**
    - The image tensor to which the caption will be added. It serves as the visual base for the caption overlay.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`font`**
    - Specifies the font to be used for the caption text, influencing the aesthetic presentation of the caption.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`caption`**
    - The text content of the caption to be added to the image, which will be formatted and wrapped to fit within the image's dimensions.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The modified image with the caption overlayed, potentially including additional PNG metadata.
    - Python dtype: `PIL.Image`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class ImageCaption:

    @classmethod
    def INPUT_TYPES(cls):
        # check if path exists
        if os.path.exists(os.path.join(folder_paths.base_path, 'fonts')):
            cls.font_dir = os.path.join(folder_paths.base_path, 'fonts')
            cls.font_files = [os.path.join(cls.font_dir, f) for f in os.listdir(cls.font_dir) if os.path.isfile(os.path.join(cls.font_dir, f))]
            cls.font_file_names = [os.path.basename(f) for f in cls.font_files]
            return {'required': {'image': ('IMAGE',),
                        'font': (cls.font_file_names, {'default': cls.font_file_names[0]}),
                        'caption': ('STRING', {'multiline': True, 'default': 'Caption'})},
                    "hidden": {"extra_pnginfo": "EXTRA_PNGINFO", "prompt": "PROMPT"}}
        else:
            cls.font_dir = None
            cls.font_files = None
            cls.font_file_names = None
            return {'required': {'image': ('IMAGE',),
                        'font': ('STRING', {'default': 'Path to font file'}),
                        'caption': ('STRING', {'multiline': True, 'default': 'Caption'})},
                    "hidden": {"extra_pnginfo": "EXTRA_PNGINFO", "prompt": "PROMPT"}}


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
        # Get the bounding box of the text
        left, top, right, bottom = font.getbbox(text)

        # Calculate width and height of the bounding box
        width = right - left
        height = bottom - top

        return width, height

    def wrap_text(self, text, font, max_width):
        """Wrap text to fit inside a specified width when rendered."""
        wrapped_lines = []
        for line in text.split('\n'):
            words = line.split(' ')
            new_line = words[0]
            for word in words[1:]:
                # Ensure that the width value is an integer
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
        # search and replace
        caption = search_and_replace(caption, extra_pnginfo, prompt)
        # Convert tensor to PIL image
        orig_image = tensor2pil(image)
        width, height = orig_image.size

        # Set up the font
        if self.font_dir is None:
            font_file = font
            if not os.path.isfile(font_file):
                raise Exception('Font file does not exist: ' + font_file)
        else:
            font_file = os.path.join(self.font_dir, font)
        font = ImageFont.truetype(font_file, 32)

        # Wrap the text
        max_width = width
        wrapped_lines = self.wrap_text(caption, font, max_width)

        # Calculate height needed for wrapped text
        _, text_height = self.get_text_size(font, "Hg")  # Height of a tall character
        wrapped_text_height = len(wrapped_lines) * text_height
        padding = 15  # Adequate padding considering ascenders and descenders
        caption_height = wrapped_text_height + padding * 2  # Additional space above and below text

        # Create the caption bar
        text_image = Image.new('RGB', (width, caption_height), (0, 0, 0))
        draw = ImageDraw.Draw(text_image)

        line_spacing = 5  # Adjust to desired spacing

        # Start y_position a bit higher
        #y_position = (caption_height - wrapped_text_height - (line_spacing * (len(wrapped_lines) - 1))) // 2
        y_position = padding

        for line in wrapped_lines:
            # try/except block is removed since getsize() is not used anymore
            text_width = font.getlength(line)  # It should return a float, so ensure that x_position is an integer.
            x_position = (width - int(text_width)) // 2
            draw.text((x_position, y_position), line, (255, 255, 255), font=font)

            _, text_height = self.get_text_size(font, line)  # Calculate text height
            y_position += text_height + line_spacing # Increment y position by text height and line spacing

        # Combine the images
        combined_image = Image.new('RGB', (width, height + caption_height + line_spacing), (0, 0, 0))
        combined_image.paste(text_image, (0, height))
        combined_image.paste(orig_image, (0, 0))

        #return (pil2tensor(combined_image),)
        return pil2tensor(combined_image)

```
