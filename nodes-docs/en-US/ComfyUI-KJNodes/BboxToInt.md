---
tags:
- BoundingBox
- Image
- ImageTransformation
---

# BboxToInt
## Documentation
- Class name: `BboxToInt`
- Category: `KJNodes/masking`
- Output node: `False`

The BboxToInt node is designed to convert bounding box coordinates from a list into integer values, including the calculation of the center points of the bounding boxes. This node facilitates the manipulation and analysis of bounding box data by providing precise integer coordinates.
## Input types
### Required
- **`bboxes`**
    - The 'bboxes' parameter represents the list of bounding boxes to be processed. Each bounding box is expected to be a tuple or list of coordinates. This parameter is crucial for determining which bounding boxes will be converted into integer values.
    - Comfy dtype: `BBOX`
    - Python dtype: `List[Tuple[int, int, int, int]]`
- **`index`**
    - The 'index' parameter specifies the position of the bounding box in the 'bboxes' list that should be processed. It allows for selective conversion of bounding boxes, enhancing flexibility in handling bounding box data.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`x_min`**
    - Comfy dtype: `INT`
    - The minimum x-coordinate of the selected bounding box.
    - Python dtype: `int`
- **`y_min`**
    - Comfy dtype: `INT`
    - The minimum y-coordinate of the selected bounding box.
    - Python dtype: `int`
- **`width`**
    - Comfy dtype: `INT`
    - The width of the selected bounding box.
    - Python dtype: `int`
- **`height`**
    - Comfy dtype: `INT`
    - The height of the selected bounding box.
    - Python dtype: `int`
- **`center_x`**
    - Comfy dtype: `INT`
    - The x-coordinate of the center point of the selected bounding box.
    - Python dtype: `int`
- **`center_y`**
    - Comfy dtype: `INT`
    - The y-coordinate of the center point of the selected bounding box.
    - Python dtype: `int`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class BboxToInt:

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "bboxes": ("BBOX",),
                "index": ("INT", {"default": 0,"min": 0, "max": 99999999, "step": 1}),
            },
        }

    RETURN_TYPES = ("INT","INT","INT","INT","INT","INT",)
    RETURN_NAMES = ("x_min","y_min","width","height", "center_x","center_y",)
    FUNCTION = "bboxtoint"
    CATEGORY = "KJNodes/masking"
    DESCRIPTION = """
Returns selected index from bounding box list as integers.
"""
    def bboxtoint(self, bboxes, index):
        x_min, y_min, width, height = bboxes[index]
        center_x = int(x_min + width / 2)
        center_y = int(y_min + height / 2)
        
        return (x_min, y_min, width, height, center_x, center_y,)

```
