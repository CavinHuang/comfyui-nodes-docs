---
tags:
- ImpactPack
- Segmentation
---

# SEGS Concat
## Documentation
- Class name: `ImpactSEGSConcat`
- Category: `ImpactPack/Util`
- Output node: `False`

The ImpactSEGSConcat node is designed to concatenate multiple segmentation data structures (SEGS) into a single SEGS structure. It ensures that all concatenated segments have the same dimensions and combines them accordingly, handling discrepancies by ignoring incompatible segments.
## Input types
### Required
- **`segs1`**
    - Represents the first set of segmentation data structures to be concatenated. It is crucial for combining multiple SEGS into a single structure, ensuring they share the same dimensions for successful concatenation.
    - Comfy dtype: `SEGS`
    - Python dtype: `Tuple[Tuple[int, int], List[Any]]`
## Output types
- **`segs`**
    - Comfy dtype: `SEGS`
    - The output is a single SEGS data structure that combines the input SEGS structures, ensuring they share the same dimensions. It may return an empty SEGS if no compatible segments are found.
    - Python dtype: `Tuple[Tuple[int, int], List[Any]]`
## Usage tips
- Infra type: `CPU`
- Common nodes:
    - [DetailerForEachDebugPipe](../../ComfyUI-Impact-Pack/Nodes/DetailerForEachDebugPipe.md)



## Source code
```python
class SEGSConcat:
    @classmethod
    def INPUT_TYPES(s):
        return {"required": {
                     "segs1": ("SEGS", ),
                     },
                }

    RETURN_TYPES = ("SEGS",)
    FUNCTION = "doit"

    CATEGORY = "ImpactPack/Util"

    def doit(self, **kwargs):
        dim = None
        res = None

        for k, v in list(kwargs.items()):
            if v[0] == (0, 0) or len(v[1]) == 0:
                continue

            if dim is None:
                dim = v[0]
                res = v[1]
            else:
                if v[0] == dim:
                    res = res + v[1]
                else:
                    print(f"ERROR: source shape of 'segs1'{dim} and '{k}'{v[0]} are different. '{k}' will be ignored")

        if dim is None:
            empty_segs = ((0, 0), [])
            return (empty_segs, )
        else:
            return ((dim, res), )

```
