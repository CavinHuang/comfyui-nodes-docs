---
tags:
- Image
- ImageGeneration
---

# Image Blank
## Documentation
- Class name: `Image Blank`
- Category: `WAS Suite/Image`
- Output node: `False`

The WAS_Image_Blank node generates a blank image with specified dimensions and color. It allows for the creation of a simple, solid-colored image by defining its width, height, and RGB color values.
## Input types
### Required
- **`width`**
    - Specifies the width of the generated image.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`height`**
    - Specifies the height of the generated image.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`red`**
    - Determines the red component of the image's color, allowing for customization of the image's appearance.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`green`**
    - Determines the green component of the image's color, contributing to the customization of the image's overall color.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`blue`**
    - Determines the blue component of the image's color, finalizing the customization of the image's color.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The output is a blank image with the specified dimensions and color.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class WAS_Image_Blank:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "width": ("INT", {"default": 512, "min": 8, "max": 4096, "step": 1}),
                "height": ("INT", {"default": 512, "min": 8, "max": 4096, "step": 1}),
                "red": ("INT", {"default": 255, "min": 0, "max": 255, "step": 1}),
                "green": ("INT", {"default": 255, "min": 0, "max": 255, "step": 1}),
                "blue": ("INT", {"default": 255, "min": 0, "max": 255, "step": 1}),
            }
        }
    RETURN_TYPES = ("IMAGE",)
    FUNCTION = "blank_image"

    CATEGORY = "WAS Suite/Image"

    def blank_image(self, width, height, red, green, blue):

        # Ensure multiples
        width = (width // 8) * 8
        height = (height // 8) * 8

        # Blend image
        blank = Image.new(mode="RGB", size=(width, height),
                          color=(red, green, blue))

        return (pil2tensor(blank), )

```
