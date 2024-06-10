---
tags:
- Image
- ImageComposite
---

# Image Overlay (Mikey)
## Documentation
- Class name: `ImageOverlay`
- Category: `Mikey/Image`
- Output node: `False`

The ImageOverlay node is designed to seamlessly overlay a foreground image onto a background image. It automatically adjusts the foreground image by filling, cropping, or resizing it to match the dimensions of the background image, ensuring a harmonious blend between the two.
## Input types
### Required
- **`background_image`**
    - The background image onto which the foreground image will be overlaid. It serves as the base layer in the overlay process.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`foreground_image`**
    - The foreground image to be overlaid onto the background image. This image is adjusted to match the size of the background image for a seamless overlay.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`opacity`**
    - Determines the transparency level of the foreground image when overlaid onto the background image. A higher value results in a less transparent foreground, making it more prominent in the final image.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
## Output types
- **`result_img`**
    - Comfy dtype: `IMAGE`
    - The resulting image after overlaying the foreground image onto the background image, with adjustments made for size and transparency.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class ImageOverlay:
    # overlay foreground image on top of background image
    # automatically fill or crop foreground image to match background image size
    # automatically resize foreground image to match background image size
    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'background_image': ('IMAGE', {'default': None}),
                             'foreground_image': ('IMAGE', {'default': None}),
                             'opacity': ('FLOAT', {'default': 1.0, 'min': 0.0, 'max': 1.0, 'step': 0.01})}}

    RETURN_TYPES = ('IMAGE',)
    RETURN_NAMES = ('result_img',)
    FUNCTION = 'overlay'
    CATEGORY = 'Mikey/Image'

    def overlay(self, background_image, foreground_image, opacity):
        background_image = tensor2pil(background_image)
        foreground_image = tensor2pil(foreground_image)
        # Ensure images are in RGB mode and resize foreground to match background
        background_image = background_image.convert('RGB')
        foreground_image = foreground_image.convert('RGB')
        # create a cropped image from the foreground image with the same dimensions as the background image
        cropped_fg = Image.new('RGB', (background_image.size[0], background_image.size[1]))
        # paste the foreground image into the center of the cropped image
        cropped_fg.paste(foreground_image, (int((background_image.size[0] - foreground_image.size[0]) / 2), int((background_image.size[1] - foreground_image.size[1]) / 2)))

        # Convert images to NumPy arrays
        bg_array = np.array(background_image, dtype=np.float32) / 255
        fg_array = np.array(cropped_fg, dtype=np.float32) / 255

        ## Calculate Overlay blend
        mask = bg_array < 0.5
        overlay = np.zeros_like(bg_array)
        overlay[mask] = 2 * bg_array[mask] * fg_array[mask]
        overlay[~mask] = 1 - 2 * (1 - bg_array[~mask]) * (1 - fg_array[~mask])

        ## Apply opacity
        result = (1 - opacity) * bg_array + opacity * overlay

        ## Convert the result to uint8 and back to an Image
        result_img = Image.fromarray((result * 255).astype(np.uint8))
        result_img = pil2tensor(result_img)
        return result_img,

```
