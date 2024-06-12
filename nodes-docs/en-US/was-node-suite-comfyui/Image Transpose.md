---
tags:
- Image
- ImageComposite
---

# Image Transpose
## Documentation
- Class name: `Image Transpose`
- Category: `WAS Suite/Image/Transform`
- Output node: `False`

The Image Overlay node is designed to overlay one image onto another with specified dimensions, location, rotation, and feathering options. It enables complex image composition tasks, allowing for precise control over how images are combined and manipulated.
## Input types
### Required
- **`image`**
    - The 'image' parameter represents the base image onto which the overlay will be applied. It is fundamental in defining the canvas for the transformation.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`image_overlay`**
    - The 'image_overlay' parameter specifies the image to be overlaid on the base image. This image will undergo transformations and be composited onto the base image.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`width`**
    - Specifies the width of the overlay image after resizing, playing a critical role in how the overlay fits onto the base image.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`height`**
    - Specifies the height of the overlay image after resizing, crucial for adjusting the overlay's fit on the base image.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`X`**
    - The X coordinate for the top-left corner of the overlay image on the base image, determining the overlay's horizontal placement.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`Y`**
    - The Y coordinate for the top-left corner of the overlay image on the base image, determining the overlay's vertical placement.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`rotation`**
    - Defines the rotation angle of the overlay image, allowing for dynamic orientation adjustments.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`feathering`**
    - Specifies the feathering radius for the overlay edges, enabling smooth transitions between the overlay and the base image.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The output 'image' parameter contains the composited image after applying the specified transformations and overlay operations.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class WAS_Image_Transpose:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "image": ("IMAGE",),
                "image_overlay": ("IMAGE",),
                "width": ("INT", {"default": 512, "min": -48000, "max": 48000, "step": 1}),
                "height": ("INT", {"default": 512, "min": -48000, "max": 48000, "step": 1}),
                "X": ("INT", {"default": 0, "min": -48000, "max": 48000, "step": 1}),
                "Y": ("INT", {"default": 0, "min": -48000, "max": 48000, "step": 1}),
                "rotation": ("INT", {"default": 0, "min": -360, "max": 360, "step": 1}),
                "feathering": ("INT", {"default": 0, "min": 0, "max": 4096, "step": 1}),
            },
        }

    RETURN_TYPES = ("IMAGE",)
    FUNCTION = "image_transpose"

    CATEGORY = "WAS Suite/Image/Transform"

    def image_transpose(self, image: torch.Tensor, image_overlay: torch.Tensor, width: int, height: int, X: int, Y: int, rotation: int, feathering: int = 0):
        return (pil2tensor(self.apply_transpose_image(tensor2pil(image), tensor2pil(image_overlay), (width, height), (X, Y), rotation, feathering)), )

    def apply_transpose_image(self, image_bg, image_element, size, loc, rotate=0, feathering=0):

        # Apply transformations to the element image
        image_element = image_element.rotate(rotate, expand=True)
        image_element = image_element.resize(size)

        # Create a mask for the image with the faded border
        if feathering > 0:
            mask = Image.new('L', image_element.size, 255)  # Initialize with 255 instead of 0
            draw = ImageDraw.Draw(mask)
            for i in range(feathering):
                alpha_value = int(255 * (i + 1) / feathering)  # Invert the calculation for alpha value
                draw.rectangle((i, i, image_element.size[0] - i, image_element.size[1] - i), fill=alpha_value)
            alpha_mask = Image.merge('RGBA', (mask, mask, mask, mask))
            image_element = Image.composite(image_element, Image.new('RGBA', image_element.size, (0, 0, 0, 0)), alpha_mask)

        # Create a new image of the same size as the base image with an alpha channel
        new_image = Image.new('RGBA', image_bg.size, (0, 0, 0, 0))
        new_image.paste(image_element, loc)

        # Paste the new image onto the base image
        image_bg = image_bg.convert('RGBA')
        image_bg.paste(new_image, (0, 0), new_image)

        return image_bg

```
