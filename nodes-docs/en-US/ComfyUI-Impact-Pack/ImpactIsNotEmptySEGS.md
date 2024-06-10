---
tags:
- ImpactPack
- Segmentation
---

# SEGS isn't Empty
## Documentation
- Class name: `ImpactIsNotEmptySEGS`
- Category: `ImpactPack/Logic`
- Output node: `False`

This node checks if a given SEGS (segmentation data structure) is not empty. It is useful for determining whether segmentation results contain any segments, aiding in decision-making processes within workflows that involve image segmentation.
## Input types
### Required
- **`segs`**
    - The SEGS input represents the segmentation data structure to be checked for non-emptiness. It is crucial for determining the presence of segmentation results.
    - Comfy dtype: `SEGS`
    - Python dtype: `Tuple[Tuple[int, int], List[Any]]`
## Output types
- **`boolean`**
    - Comfy dtype: `BOOLEAN`
    - The output is a boolean indicating whether the input SEGS contains any segments. True means there are segments present, and False indicates an empty SEGS.
    - Python dtype: `bool`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class ImpactNotEmptySEGS:
    @classmethod
    def INPUT_TYPES(cls):
        return {"required": {"segs": ("SEGS",)}}

    FUNCTION = "doit"
    CATEGORY = "ImpactPack/Logic"

    RETURN_TYPES = ("BOOLEAN", )

    def doit(self, segs):
        return (segs[1] != [], )

```
