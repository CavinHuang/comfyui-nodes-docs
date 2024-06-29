---
tags:
- Mask
---

# Fill Mask Regions
## Documentation
- Class name: `SaltMaskFillRegion`
- Category: `SALT/Masking/Filter`
- Output node: `False`

This node is designed to fill regions within masks, transforming the input masks by identifying and filling specified regions to produce modified masks.
## Input types
### Required
- **`masks`**
    - The input masks to be processed for region filling. This parameter is crucial for determining the areas within each mask that will undergo the filling operation.
    - Comfy dtype: `MASK`
    - Python dtype: `torch.Tensor`
## Output types
- **`MASKS`**
    - Comfy dtype: `MASK`
    - The output consists of masks with specified regions filled, resulting from the processing of the input masks.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class SaltMaskFillRegion:
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

    FUNCTION = "fill_region"

    def fill_region(self, masks):
        regions = []
        for mask in masks:
            pil_image = mask2pil(mask.unsqueeze(0))
            region_mask = MaskFilters.fill_region(pil_image)
            region_tensor = pil2mask(region_mask)
            regions.append(region_tensor)
        regions_tensor = torch.cat(regions, dim=0)
        return (regions_tensor,)

```
