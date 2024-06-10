---
tags:
- Mask
- MaskRegion
---

# Ceiling Mask Regions
## Documentation
- Class name: `SaltMaskCeilingRegion`
- Category: `SALT/Masking/Filter`
- Output node: `False`

This node is designed to identify and isolate the ceiling regions within a given set of masks. It processes each mask to highlight the ceiling areas, facilitating focused analysis or modifications on these specific regions.
## Input types
### Required
- **`masks`**
    - The input masks to be processed for ceiling region identification. This parameter is crucial for determining the areas within each mask that correspond to ceiling regions.
    - Comfy dtype: `MASK`
    - Python dtype: `torch.Tensor`
## Output types
- **`MASKS`**
    - Comfy dtype: `MASK`
    - The output masks with the ceiling regions identified and isolated from the original input masks.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class SaltMaskCeilingRegion:
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

    FUNCTION = "ceiling_region"
    
    def ceiling_region(self, masks):
        regions = []
        for mask in masks:
            pil_image = mask2pil(mask.unsqueeze(0))
            region_mask = MaskFilters.ceiling_region(pil_image)
            region_tensor = pil2mask(region_mask)
            regions.append(region_tensor)
        regions_tensor = torch.cat(regions, dim=0)
        return (regions_tensor,)

```
