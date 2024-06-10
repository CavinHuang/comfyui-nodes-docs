---
tags:
- Mask
- MaskList
---

# Masks to Mask List
## Documentation
- Class name: `MasksToMaskList`
- Category: `ImpactPack/Operation`
- Output node: `False`

The MasksToMaskList node is designed to transform a collection of individual masks into a list of masks, applying a 3D mask transformation to each mask in the process. This operation is essential for preparing mask data for further processing or analysis within a pipeline that requires masks in a standardized format.
## Input types
### Required
- **`masks`**
    - The 'masks' parameter represents the collection of masks to be transformed. It is crucial for the node's operation as it provides the raw data that will be processed into a standardized list format.
    - Comfy dtype: `MASK`
    - Python dtype: `Optional[List[torch.Tensor]]`
## Output types
- **`mask`**
    - Comfy dtype: `MASK`
    - The output is a list of masks, each transformed into a 3D format, ready for further processing or analysis.
    - Python dtype: `List[torch.Tensor]`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class MasksToMaskList:
    @classmethod
    def INPUT_TYPES(s):
        return {"required": {
                        "masks": ("MASK", ),
                      }
                }

    RETURN_TYPES = ("MASK", )
    OUTPUT_IS_LIST = (True, )
    FUNCTION = "doit"

    CATEGORY = "ImpactPack/Operation"

    def doit(self, masks):
        if masks is None:
            empty_mask = torch.zeros((64, 64), dtype=torch.float32, device="cpu")
            return ([empty_mask], )

        res = []

        for mask in masks:
            res.append(mask)

        print(f"mask len: {len(res)}")

        res = [make_3d_mask(x) for x in res]

        return (res, )

```
