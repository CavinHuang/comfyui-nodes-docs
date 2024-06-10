---
tags:
- ImpactPack
- Segmentation
---

# From SEG_ELT crop_region
## Documentation
- Class name: `ImpactFrom_SEG_ELT_crop_region`
- Category: `ImpactPack/Util`
- Output node: `False`

This node is designed to extract the bounding box coordinates from a given crop region of a segmented element. It serves as a utility within the ImpactPack to facilitate operations that require precise location information of a segment within an image.
## Input types
### Required
- **`crop_region`**
    - Specifies the crop region from which to extract the bounding box coordinates. This parameter is crucial for determining the exact area of interest within the segmented element.
    - Comfy dtype: `SEG_ELT_crop_region`
    - Python dtype: `tuple`
## Output types
- **`left`**
    - Comfy dtype: `INT`
    - The left coordinate of the bounding box extracted from the crop region.
    - Python dtype: `int`
- **`top`**
    - Comfy dtype: `INT`
    - The top coordinate of the bounding box extracted from the crop region.
    - Python dtype: `int`
- **`right`**
    - Comfy dtype: `INT`
    - The right coordinate of the bounding box extracted from the crop region.
    - Python dtype: `int`
- **`bottom`**
    - Comfy dtype: `INT`
    - The bottom coordinate of the bounding box extracted from the crop region.
    - Python dtype: `int`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class From_SEG_ELT_crop_region:
    @classmethod
    def INPUT_TYPES(s):
        return {"required": {
                     "crop_region": ("SEG_ELT_crop_region", ),
                     },
                }

    RETURN_TYPES = ("INT", "INT", "INT", "INT")
    RETURN_NAMES = ("left", "top", "right", "bottom")

    FUNCTION = "doit"

    CATEGORY = "ImpactPack/Util"

    def doit(self, crop_region):
        return crop_region

```
