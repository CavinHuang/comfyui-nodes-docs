---
tags:
- ImageEnhancement
- ImageTransformation
- VisualEffects
---

# ◐ Image Contrast Adjustment
## Documentation
- Class name: `Image Contrast Adjustment [Dream]`
- Category: `✨ Dream/🌄 image/🎨 color`
- Output node: `False`

This node adjusts the contrast of an image based on a specified factor, enhancing or reducing the differences between the lightest and darkest parts of the image.
## Input types
### Required
- **`image`**
    - The image to adjust the contrast for. This is the primary input on which the contrast adjustment operation is performed.
    - Comfy dtype: `IMAGE`
    - Python dtype: `DreamImage`
- **`factor`**
    - A multiplier for adjusting the contrast. Values greater than 1.0 increase contrast, while values less than 1.0 decrease it.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The resulting image after the contrast adjustment has been applied.
    - Python dtype: `DreamImage`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class DreamImageContrast:
    NODE_NAME = "Image Contrast Adjustment"
    ICON = "◐"

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {"image": ("IMAGE",),
                         "factor": ("FLOAT", {"default": 1.0, "min": 0.0}),
                         },

        }

    CATEGORY = NodeCategories.IMAGE_COLORS
    RETURN_TYPES = ("IMAGE",)
    RETURN_NAMES = ("image",)
    FUNCTION = "result"

    @classmethod
    def IS_CHANGED(cls, *values):
        return ALWAYS_CHANGED_FLAG

    def result(self, image, factor):
        proc = DreamImageProcessor(inputs=image)

        def change(im: DreamImage, *a, **args):
            return (im.change_contrast(factor),)

        return proc.process(change)

```
