---
tags:
- ImpactPack
- Segmentation
---

# Assemble (SEGS)
## Documentation
- Class name: `ImpactAssembleSEGS`
- Category: `ImpactPack/Util`
- Output node: `False`

The ImpactAssembleSEGS node is designed to aggregate segment headers and segment elements into a unified structure, facilitating the organization and manipulation of segmented data within the ImpactPack framework.
## Input types
### Required
- **`seg_header`**
    - The 'seg_header' parameter represents the header information for a segment, serving as a crucial component in assembling the overall segmented structure.
    - Comfy dtype: `SEGS_HEADER`
    - Python dtype: `Tuple[str]`
- **`seg_elt`**
    - The 'seg_elt' parameter signifies the individual segment elements, which are essential in constructing the complete segmented data structure.
    - Comfy dtype: `SEG_ELT`
    - Python dtype: `Tuple[str]`
## Output types
- **`segs`**
    - Comfy dtype: `SEGS`
    - Produces a unified segmented data structure, combining the provided segment headers and elements.
    - Python dtype: `Tuple[Tuple[str], Tuple[str]]`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class AssembleSEGS:
    @classmethod
    def INPUT_TYPES(s):
        return {"required": {
                     "seg_header": ("SEGS_HEADER", ),
                     "seg_elt": ("SEG_ELT", ),
                     },
                }

    INPUT_IS_LIST = True

    RETURN_TYPES = ("SEGS", )

    FUNCTION = "doit"

    CATEGORY = "ImpactPack/Util"

    def doit(self, seg_header, seg_elt):
        return ((seg_header[0], seg_elt), )

```
