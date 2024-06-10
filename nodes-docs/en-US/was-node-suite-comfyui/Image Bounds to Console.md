---
tags:
- Crop
- Image
- ImageTransformation
---

# Image Bounds to Console
## Documentation
- Class name: `Image Bounds to Console`
- Category: `WAS Suite/Debug`
- Output node: `True`

This node is designed for debugging purposes, specifically to output the bounds of an image to the console. It allows for a customizable label to accompany the bounds information, enhancing readability and traceability during debugging sessions.
## Input types
### Required
- **`image_bounds`**
    - Represents the boundaries of an image that are to be debugged. This input is crucial for determining the specific area of the image to focus on during the debugging process.
    - Comfy dtype: `IMAGE_BOUNDS`
    - Python dtype: `Tuple[Tuple[int, int, int, int], ...]`
- **`label`**
    - An optional label to accompany the bounds information in the console output. This label can provide context or a description for the bounds being debugged, making the output more informative.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
## Output types
- **`image_bounds`**
    - Comfy dtype: `IMAGE_BOUNDS`
    - Echoes back the input image bounds, allowing for further processing or analysis in subsequent nodes.
    - Python dtype: `Tuple[Tuple[int, int, int, int], ...]`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class WAS_Image_Bounds_to_Console:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "image_bounds": ("IMAGE_BOUNDS",),
                "label": ("STRING", {"default": 'Debug to Console', "multiline": False}),
            }
        }

    RETURN_TYPES = ("IMAGE_BOUNDS",)
    OUTPUT_NODE = True
    FUNCTION = "debug_to_console"

    CATEGORY = "WAS Suite/Debug"

    def debug_to_console(self, image_bounds, label):
        label_out = 'Debug to Console'
        if label.strip() != '':
            label_out = label

        bounds_out = 'Empty'
        if len(bounds_out) > 0:
            bounds_out = ', \n    '.join('\t(rmin={}, rmax={}, cmin={}, cmax={})'
                                     .format(a, b, c, d) for a, b, c, d in image_bounds)

        cstr(f'\033[33m{label_out}\033[0m:\n[\n{bounds_out}\n]\n').msg.print()
        return (image_bounds, )

    @classmethod
    def IS_CHANGED(cls, **kwargs):
        return float("NaN")

```
