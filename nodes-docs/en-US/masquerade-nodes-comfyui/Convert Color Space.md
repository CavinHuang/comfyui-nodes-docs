---
tags:
- Color
- HSVColorSpace
---

# Convert Color Space
## Documentation
- Class name: `Convert Color Space`
- Category: `Masquerade Nodes`
- Output node: `False`

The ConvertColorSpace node is designed to transform the color space of an image from one format to another, such as from RGB to HSV or HSL, and vice versa. This node facilitates the manipulation and analysis of images by allowing them to be represented in different color models, which can be more suitable for specific tasks or visual effects.
## Input types
### Required
- **`in_space`**
    - Specifies the original color space of the input image. This parameter determines how the image's color data is interpreted before conversion.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`out_space`**
    - Defines the target color space to which the image will be converted. This parameter sets the desired color model format for the output image.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`image`**
    - The input image to be converted. This parameter is the actual image data that will undergo the color space transformation.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The output image after the color space conversion. This image will be in the target color space specified by the 'out_space' parameter.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class ConvertColorSpace:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "in_space": (["RGB", "HSV", "HSL"],),
                "out_space": (["RGB", "HSV", "HSL"],),
                "image": ("IMAGE",),
            },
        }

    RETURN_TYPES = ("IMAGE",)
    FUNCTION = "convert_color_space"

    CATEGORY = "Masquerade Nodes"

    def convert_color_space(self, in_space, out_space, image):
        if in_space == out_space:
            return (image,)

        image = tensor2rgb(image)

        if in_space == "HSV":
            hsv = image
        if in_space == "RGB":
            hsv = rgb2hsv(image)
        elif in_space == "HSL":
            hsv = hsl2hsv(image)

        # We are now in RGB or HSV
        if out_space == "HSV":
            return (hsv,)
        elif out_space == "RGB":
            return (hsv2rgb(hsv),)
        else:
            assert out_space == "HSL"
            return (hsv2hsl(hsv),)

```
