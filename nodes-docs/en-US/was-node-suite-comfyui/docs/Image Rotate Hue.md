---
tags:
- Image
- ImageTransformation
---

# Image Rotate Hue
## Documentation
- Class name: `Image Rotate Hue`
- Category: `WAS Suite/Image/Adjustment`
- Output node: `False`

This node is designed to adjust the hue of an image by applying a specified hue shift within a valid range. It ensures the hue shift stays within acceptable bounds and applies the shift to each pixel, effectively rotating the hue of the entire image.
## Input types
### Required
- **`image`**
    - The input image to which the hue rotation will be applied. This image is transformed to ensure compatibility with the hue rotation process.
    - Comfy dtype: `IMAGE`
    - Python dtype: `PIL.Image`
- **`hue_shift`**
    - The degree of hue shift to apply to the image, constrained within a specified range to ensure valid hue rotation.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The output image with the applied hue rotation, reflecting the specified hue shift across all pixels.
    - Python dtype: `PIL.Image`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class WAS_Image_Rotate_Hue:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "image": ("IMAGE",),
                "hue_shift": ("FLOAT", {"default": 0.0, "min": 0.0, "max": 1.0, "step": 0.001}),
            },
        }

    RETURN_TYPES = ("IMAGE",)
    FUNCTION = "rotate_hue"

    CATEGORY = "WAS Suite/Image/Adjustment"

    def rotate_hue(self, image, hue_shift=0.0):
        if hue_shift > 1.0 or hue_shift < 0.0:
            cstr(f"The hue_shift `{cstr.color.LIGHTYELLOW}{hue_shift}{cstr.color.END}` is out of range. Valid range is {cstr.color.BOLD}0.0 - 1.0{cstr.color.END}").error.print()
            hue_shift = 0.0
        shifted_hue = pil2tensor(self.hue_rotation(image, hue_shift))
        return (shifted_hue, )

    def hue_rotation(self, image, hue_shift=0.0):
        import colorsys
        if hue_shift > 1.0 or hue_shift < 0.0:
            print(f"The hue_shift '{hue_shift}' is out of range. Valid range is 0.0 - 1.0")
            hue_shift = 0.0

        pil_image = tensor2pil(image)
        width, height = pil_image.size
        rotated_image = Image.new("RGB", (width, height))

        for x in range(width):
            for y in range(height):
                r, g, b = pil_image.getpixel((x, y))
                h, l, s = colorsys.rgb_to_hls(r / 255, g / 255, b / 255)
                h = (h + hue_shift) % 1.0
                r, g, b = colorsys.hls_to_rgb(h, l, s)
                r, g, b = int(r * 255), int(g * 255), int(b * 255)
                rotated_image.putpixel((x, y), (r, g, b))

        return rotated_image

```
