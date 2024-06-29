---
tags:
- Image
---

# Image Border (Mikey)
## Documentation
- Class name: `ImageBorder`
- Category: `Mikey/Image`
- Output node: `False`

The ImageBorder node is designed to add a decorative or functional border around an image. It supports various border styles, including checkerboard patterns, blurred edges, and solid colors, allowing for a wide range of visual effects to enhance the image's appearance.
## Input types
### Required
- **`image`**
    - The input image to which the border will be applied. This parameter is crucial as it defines the base image that will be modified by adding a border.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`border_width`**
    - Specifies the width of the border to be added around the image. This parameter directly influences the thickness of the border, affecting the overall visual impact of the border on the image.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`border_color`**
    - Determines the color or style of the border. It can be a solid color, a checkerboard pattern, or a blurred effect, offering flexibility in the border's appearance.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The output image with the applied border. This image includes the original content with the added border, enhancing its visual appeal.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class ImageBorder:
    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'image': ('IMAGE',),
                    'border_width': ('INT', {'default': 10, 'min': 0, 'max': 1000}),
                    'border_color': ('STRING', {'default': 'black'})}}

    RETURN_TYPES = ('IMAGE',)
    RETURN_NAMES = ('image',)
    FUNCTION = 'border'
    CATEGORY = 'Mikey/Image'

    def blur_border(self, image, border_width):
        # enlarge image and blur to create a border
        # that has similar colors to the image edges
        # scale factor is image with border added
        scale_factor = (image.width + border_width * 2) / image.width
        border_image = image.resize((int(image.width * scale_factor), int(image.height * scale_factor)))
        border_image = border_image.filter(ImageFilter.GaussianBlur(radius=border_width * 0.5))
        # paste image
        border_image.paste(image, (border_width, border_width))
        return pil2tensor(border_image)[None, :, :, :]

    @apply_to_batch
    def border(self, image, border_width, border_color):
        # Convert tensor to PIL image
        orig_image = tensor2pil(image)
        width, height = orig_image.size
        # Create the border
        if border_color == 'checkerboard':
            return checkerboard_border(image, border_width, 'black')
        if border_color == 'blur':
            return self.blur_border(orig_image, border_width)
        # check for string containing a tuple
        if border_color.startswith('(') and border_color.endswith(')'):
            border_color = border_color[1:-1]
            border_color = tuple(map(int, border_color.split(',')))
        border_image = Image.new('RGB', (width + border_width * 2, height + border_width * 2), border_color)
        border_image.paste(orig_image, (border_width, border_width))

        #return (pil2tensor(border_image),)
        return pil2tensor(border_image)

```
