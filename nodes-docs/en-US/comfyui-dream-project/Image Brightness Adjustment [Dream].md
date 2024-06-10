---
tags:
- ImageEnhancement
- ImageTransformation
- VisualEffects
---

# ☼ Image Brightness Adjustment
## Documentation
- Class name: `Image Brightness Adjustment [Dream]`
- Category: `✨ Dream/🌄 image/🎨 color`
- Output node: `False`

This node adjusts the brightness of an image based on a specified factor, enhancing or dimming the image's overall luminance.
## Input types
### Required
- **`image`**
    - The image to be processed for brightness adjustment. It serves as the primary input on which the brightness modification is performed.
    - Comfy dtype: `IMAGE`
    - Python dtype: `DreamImage`
- **`factor`**
    - A multiplier for adjusting the brightness. Values greater than 1.0 increase brightness, while values less than 1.0 decrease it.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The resulting image after the brightness adjustment has been applied.
    - Python dtype: `DreamImage`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class DreamImageBrightness:
    NODE_NAME = "Image Brightness Adjustment"
    ICON = "☼"

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
            return (im.change_brightness(factor),)

        return proc.process(change)

```
