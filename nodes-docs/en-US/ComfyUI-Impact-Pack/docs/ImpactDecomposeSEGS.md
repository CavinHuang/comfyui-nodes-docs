---
tags:
- ImpactPack
- Segmentation
---

# Decompose (SEGS)
## Documentation
- Class name: `ImpactDecomposeSEGS`
- Category: `ImpactPack/Util`
- Output node: `False`

The ImpactDecomposeSEGS node is designed to decompose a given SEGS data structure into its constituent elements. This operation facilitates the manipulation and analysis of the segmented data by breaking it down into more manageable parts.
## Input types
### Required
- **`segs`**
    - Represents the SEGS data structure to be decomposed. This input is crucial for the operation as it provides the segmented data that will be broken down into its constituent elements.
    - Comfy dtype: `SEGS`
    - Python dtype: `tuple`
## Output types
- **`segs_header`**
    - Comfy dtype: `SEGS_HEADER`
    - Represents the header information of the decomposed SEGS data structure.
    - Python dtype: `tuple`
- **`seg_elt`**
    - Comfy dtype: `SEG_ELT`
    - Represents the individual elements of the decomposed SEGS data structure. This output is a list, allowing for the representation of multiple segmented elements.
    - Python dtype: `list`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class DecomposeSEGS:
    @classmethod
    def INPUT_TYPES(s):
        return {"required": {
                     "segs": ("SEGS", ),
                     },
                }

    RETURN_TYPES = ("SEGS_HEADER", "SEG_ELT",)
    OUTPUT_IS_LIST = (False, True, )

    FUNCTION = "doit"

    CATEGORY = "ImpactPack/Util"

    def doit(self, segs):
        return segs

```
