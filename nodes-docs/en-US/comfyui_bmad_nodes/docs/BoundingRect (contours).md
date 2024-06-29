---
tags:
- Contour
- Image
---

# BoundingRect (contours)
## Documentation
- Class name: `BoundingRect (contours)`
- Category: `Bmad/CV/Contour`
- Output node: `False`

The BoundingRect node is designed to calculate the bounding rectangle of a contour. It abstracts the process of determining the smallest rectangle that can completely enclose the contour, providing a simple way to understand the spatial extent of the contour.
## Input types
### Required
- **`contour`**
    - The contour for which the bounding rectangle is to be calculated. This input is crucial as it directly influences the output by determining the spatial extent of the given contour.
    - Comfy dtype: `CV_CONTOUR`
    - Python dtype: `CV_CONTOUR`
- **`return_mode`**
    - Specifies the mode of rectangle calculation to be used. This affects how the bounding rectangle's dimensions are computed and returned.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `rect_modes`
## Output types
- **`int`**
    - Comfy dtype: `INT`
    - The output is the bounding rectangle of the specified contour, represented as a tuple of four integers (x, y, width, height), where (x, y) is the top-left corner of the rectangle.
    - Python dtype: `Tuple[int, int, int, int]`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class ContourGetBoundingRect:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "contour": ("CV_CONTOUR",),
                "return_mode": (rect_modes, {"default": rect_modes[1]})
            },
        }

    RETURN_TYPES = tuple(["INT" for x in range(4)])
    FUNCTION = "compute"
    CATEGORY = "Bmad/CV/Contour"

    def compute(self, contour, return_mode):
        if contour is None:
            print("Contour = None !")
            return (0, 0, 0, 0,)

        # convert opencv boundingRect format to bounds
        bounds = rect_modes_map[rect_modes[0]]["toBounds"](*cv.boundingRect(contour))

        # convert from bounds to desired output format on return
        return rect_modes_map[return_mode]["fromBounds"](*bounds)

```
