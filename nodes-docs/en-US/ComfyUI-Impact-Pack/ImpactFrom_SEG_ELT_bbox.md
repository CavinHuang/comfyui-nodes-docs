---
tags:
- ImpactPack
- Segmentation
---

# From SEG_ELT bbox
## Documentation
- Class name: `ImpactFrom_SEG_ELT_bbox`
- Category: `ImpactPack/Util`
- Output node: `False`

This node is designed to extract the bounding box coordinates from a given segmentation element, providing a straightforward way to access the spatial boundaries of an object within an image.
## Input types
### Required
- **`bbox`**
    - The bounding box of a segmentation element, specifying the spatial boundaries of an object within an image. It is crucial for determining the area of interest.
    - Comfy dtype: `SEG_ELT_bbox`
    - Python dtype: `Tuple[int, int, int, int]`
## Output types
- **`left`**
    - Comfy dtype: `INT`
    - The left coordinate of the bounding box.
    - Python dtype: `int`
- **`top`**
    - Comfy dtype: `INT`
    - The top coordinate of the bounding box.
    - Python dtype: `int`
- **`right`**
    - Comfy dtype: `INT`
    - The right coordinate of the bounding box.
    - Python dtype: `int`
- **`bottom`**
    - Comfy dtype: `INT`
    - The bottom coordinate of the bounding box.
    - Python dtype: `int`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class From_SEG_ELT_bbox:
    @classmethod
    def INPUT_TYPES(s):
        return {"required": {
                     "bbox": ("SEG_ELT_bbox", ),
                     },
                }

    RETURN_TYPES = ("INT", "INT", "INT", "INT")
    RETURN_NAMES = ("left", "top", "right", "bottom")

    FUNCTION = "doit"

    CATEGORY = "ImpactPack/Util"

    def doit(self, bbox):
        return bbox

```
