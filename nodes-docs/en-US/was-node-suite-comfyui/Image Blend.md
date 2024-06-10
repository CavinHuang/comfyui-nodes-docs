---
tags:
- Image
- ImageBlend
- ImageComposite
---

# Image Blend
## Documentation
- Class name: `Image Blend`
- Category: `WAS Suite/Image`
- Output node: `False`

The Image Blend node is designed to seamlessly blend two images together based on a specified blend percentage. This node allows for the creation of composite images by adjusting the degree of visibility of each input image in the final output.
## Input types
### Required
- **`image_a`**
    - The first image to be blended. It serves as one of the primary components in the blending process.
    - Comfy dtype: `IMAGE`
    - Python dtype: `PIL.Image`
- **`image_b`**
    - The second image to be blended with the first. It contributes to the final composite image alongside 'image_a'.
    - Comfy dtype: `IMAGE`
    - Python dtype: `PIL.Image`
- **`blend_percentage`**
    - A float value that determines the blending ratio between 'image_a' and 'image_b'. A higher percentage increases the visibility of 'image_b' in the output.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The resulting image after blending 'image_a' and 'image_b' according to the specified blend percentage.
    - Python dtype: `PIL.Image`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class WAS_Image_Blend:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "image_a": ("IMAGE",),
                "image_b": ("IMAGE",),
                "blend_percentage": ("FLOAT", {"default": 0.5, "min": 0.0, "max": 1.0, "step": 0.01}),
            },
        }

    RETURN_TYPES = ("IMAGE",)
    RETURN_NAMES = ("image",)
    FUNCTION = "image_blend"

    CATEGORY = "WAS Suite/Image"

    def image_blend(self, image_a, image_b, blend_percentage):

        # Convert images to PIL
        img_a = tensor2pil(image_a)
        img_b = tensor2pil(image_b)

        # Blend image
        blend_mask = Image.new(mode="L", size=img_a.size,
                               color=(round(blend_percentage * 255)))
        blend_mask = ImageOps.invert(blend_mask)
        img_result = Image.composite(img_a, img_b, blend_mask)

        del img_a, img_b, blend_mask

        return (pil2tensor(img_result), )

```
