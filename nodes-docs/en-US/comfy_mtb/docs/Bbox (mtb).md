---
tags:
- BoundingBox
- Image
- ImageTransformation
---

# Bbox (mtb)
## Documentation
- Class name: `Bbox (mtb)`
- Category: `mtb/crop`
- Output node: `False`

The Bbox (mtb) node is designed to generate a bounding box (bbox) based on specified dimensions. It abstracts the process of defining a rectangular area within an image or a frame, facilitating operations like cropping or region of interest (ROI) identification.
## Input types
### Required
- **`x`**
    - Specifies the x-coordinate of the top-left corner of the bounding box, serving as a starting point for the rectangle's horizontal dimension.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`y`**
    - Specifies the y-coordinate of the top-left corner of the bounding box, serving as a starting point for the rectangle's vertical dimension.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`width`**
    - Defines the width of the bounding box, determining how far it extends horizontally from the x-coordinate.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`height`**
    - Defines the height of the bounding box, determining how far it extends vertically from the y-coordinate.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`bbox`**
    - Comfy dtype: `BBOX`
    - The output is a tuple representing the bounding box, structured as (x, y, width, height), which can be used for further image processing tasks.
    - Python dtype: `Tuple[int, int, int, int]`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class MTB_Bbox:
    """The bounding box (BBOX) custom type used by other nodes"""

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                # "bbox": ("BBOX",),
                "x": (
                    "INT",
                    {"default": 0, "max": 10000000, "min": 0, "step": 1},
                ),
                "y": (
                    "INT",
                    {"default": 0, "max": 10000000, "min": 0, "step": 1},
                ),
                "width": (
                    "INT",
                    {"default": 256, "max": 10000000, "min": 0, "step": 1},
                ),
                "height": (
                    "INT",
                    {"default": 256, "max": 10000000, "min": 0, "step": 1},
                ),
            }
        }

    RETURN_TYPES = ("BBOX",)
    FUNCTION = "do_crop"
    CATEGORY = "mtb/crop"

    def do_crop(self, x: int, y: int, width: int, height: int):  # bbox
        return ((x, y, width, height),)

```
