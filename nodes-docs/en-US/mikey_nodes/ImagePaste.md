---
tags:
- Image
- ImageComposite
---

# Image Paste (Mikey)
## Documentation
- Class name: `ImagePaste`
- Category: `Mikey/Image`
- Output node: `False`

The ImagePaste node is designed to overlay a foreground image with transparency onto a background image, effectively merging them into a single composite image. This process allows for the creation of complex images by combining multiple layers.
## Input types
### Required
- **`background_image`**
    - The background image over which the foreground image will be pasted. It serves as the base layer for the composite image.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`foreground_image`**
    - The foreground image to be pasted over the background image. This image should have transparency areas to blend seamlessly with the background.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`x_position`**
    - The horizontal position (x-coordinate) where the top-left corner of the foreground image will be placed on the background image.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`y_position`**
    - The vertical position (y-coordinate) where the top-left corner of the foreground image will be placed on the background image.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The composite image resulting from pasting the foreground image over the background, converted back to a tensor format.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class ImagePaste:
    # takes 2 images, background image and foreground image with transparency areas
    # and pastes the foreground image over the background image
    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'background_image': ('IMAGE',),
                             'foreground_image': ('IMAGE',),
                             'x_position': ('INT', {'default': 0, 'min': -10000, 'max': 10000}),
                             'y_position': ('INT', {'default': 0, 'min': -10000, 'max': 10000})}}

    RETURN_TYPES = ('IMAGE',)
    RETURN_NAMES = ('image',)
    FUNCTION = 'paste'
    CATEGORY = 'Mikey/Image'

    def tensor2pil(self, image):
        image_np = np.clip(255. * image.cpu().numpy().squeeze(), 0, 255).astype(np.uint8)
        if image_np.shape[0] == 4:  # Check for an alpha channel
            return Image.fromarray(image_np.transpose(1, 2, 0), 'RGBA')
        else:
            return Image.fromarray(image_np.transpose(1, 2, 0), 'RGB')

    def paste(self, background_image, foreground_image, x_position, y_position):
        # Convert tensor to PIL image
        background_image = tensor2pil(background_image)
        foreground_image = tensor2pil(foreground_image)  # Using same function for now

        # Check if the images have alpha channel and create mask
        if foreground_image.mode != 'RGBA':
            foreground_image = foreground_image.convert('RGBA')

        # Separate the alpha channel and use it as mask
        r, g, b, alpha = foreground_image.split()

        # paste the foreground image onto the background image
        background_image.paste(foreground_image, (x_position, y_position), mask=alpha)

        return (pil2tensor(background_image),)

```
