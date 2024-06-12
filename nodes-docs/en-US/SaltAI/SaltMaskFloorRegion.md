---
tags:
- Mask
- MaskRegion
---

# Floor Mask Regions
## Documentation
- Class name: `SaltMaskFloorRegion`
- Category: `SALT/Masking/Filter`
- Output node: `False`

The SaltMaskFloorRegion node is designed to identify and isolate floor regions within given masks. It processes each mask to extract the floor area, converting it into a tensor that represents the floor region.
## Input types
### Required
- **`masks`**
    - The input masks for which floor regions need to be identified. These masks are processed to extract floor areas, significantly impacting the node's output.
    - Comfy dtype: `MASK`
    - Python dtype: `torch.Tensor`
## Output types
- **`MASKS`**
    - Comfy dtype: `MASK`
    - The output tensor representing the isolated floor regions within the input masks.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class SaltMaskFloorRegion:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "masks": ("MASK",),
            }
        }

    CATEGORY = f"{NAME}/Masking/Filter"

    RETURN_TYPES = ("MASK",)
    RETURN_NAMES = ("MASKS",)

    FUNCTION = "floor_region"

    def floor_region(self, masks):
        regions = []
        for mask in masks:
            pil_image = mask2pil(mask.unsqueeze(0))
            region_mask = MaskFilters.floor_region(pil_image)
            region_tensor = pil2mask(region_mask)
            regions.append(region_tensor)
        regions_tensor = torch.cat(regions, dim=0)
        return (regions_tensor,)

```
