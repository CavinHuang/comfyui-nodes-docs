---
tags:
- Crop
- Image
- ImageTransformation
---

# Inset Image Bounds
## Documentation
- Class name: `Inset Image Bounds`
- Category: `WAS Suite/Image/Bound`
- Output node: `False`

This node is designed to adjust the boundaries of an image by applying insets, effectively shrinking the image's visible area by specified amounts from each edge. It's useful for creating margins or focusing on central parts of an image without resizing.
## Input types
### Required
- **`image_bounds`**
    - Specifies the original boundaries of the image to be inset. It's crucial for determining the new, inset boundaries based on the provided inset values.
    - Comfy dtype: `IMAGE_BOUNDS`
    - Python dtype: `List[Tuple[int, int, int, int]]`
- **`inset_left`**
    - Defines the amount by which the left boundary of the image is to be inset, reducing the visible width from the left side.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`inset_right`**
    - Defines the amount by which the right boundary of the image is to be inset, reducing the visible width from the right side.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`inset_top`**
    - Defines the amount by which the top boundary of the image is to be inset, reducing the visible height from the top.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`inset_bottom`**
    - Defines the amount by which the bottom boundary of the image is to be inset, reducing the visible height from the bottom.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`image_bounds`**
    - Comfy dtype: `IMAGE_BOUNDS`
    - The new, inset image boundaries after applying the specified insets to each side of the original boundaries.
    - Python dtype: `List[Tuple[int, int, int, int]]`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class WAS_Inset_Image_Bounds:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(self):
        return {
            "required": {
                "image_bounds": ("IMAGE_BOUNDS",),
                "inset_left": ("INT", {"default": 64, "min": 0, "max": 0xffffffffffffffff}),
                "inset_right": ("INT", {"default": 64, "min": 0, "max": 0xffffffffffffffff}),
                "inset_top": ("INT", {"default": 64, "min": 0, "max": 0xffffffffffffffff}),
                "inset_bottom": ("INT", {"default": 64, "min": 0, "max": 0xffffffffffffffff}),
            }
        }

    RETURN_TYPES = ("IMAGE_BOUNDS",)
    FUNCTION = "inset_image_bounds"

    CATEGORY = "WAS Suite/Image/Bound"

    def inset_image_bounds(self, image_bounds, inset_left, inset_right, inset_top, inset_bottom):
        inset_bounds = []
        for rmin, rmax, cmin, cmax in image_bounds:
            rmin += inset_top
            rmax -= inset_bottom
            cmin += inset_left
            cmax -= inset_right

            if rmin > rmax or cmin > cmax:
                raise ValueError("Invalid insets provided. Please make sure the insets do not exceed the image bounds.")

            inset_bounds.append((rmin, rmax, cmin, cmax))
        return (inset_bounds,)

```
