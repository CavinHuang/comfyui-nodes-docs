---
tags:
- Mask
- MaskRegion
---

# Minority Mask Regions
## Documentation
- Class name: `SaltMaskMinorityRegion`
- Category: `SALT/Masking/Filter`
- Output node: `False`

This node is designed to identify and isolate minority regions within a given set of masks, applying a threshold to distinguish these areas. It focuses on highlighting less prevalent features in the mask data, potentially for further analysis or processing.
## Input types
### Required
- **`masks`**
    - The masks input represents the collection of mask images to be processed, aiming to identify minority regions within each mask.
    - Comfy dtype: `MASK`
    - Python dtype: `torch.Tensor`
- **`threshold`**
    - The threshold parameter determines the sensitivity of the minority region detection, influencing which areas are considered minority based on their pixel intensity.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`MASKS`**
    - Comfy dtype: `MASK`
    - The output is a tensor of masks, each corresponding to the isolated minority region within the original input masks.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class SaltMaskMinorityRegion:
    @classmethod
    def INPUT_TYPES(cls):
        return {
                    "required": {
                        "masks": ("MASK",),
                        "threshold": ("INT", {"default":128, "min":0, "max":255, "step":1}),
                    }
                }

    CATEGORY = f"{NAME}/Masking/Filter"

    RETURN_TYPES = ("MASK",)
    RETURN_NAMES = ("MASKS",)

    FUNCTION = "minority_region"

    def minority_region(self, masks, threshold=128):
        if not isinstance(threshold, list):
            threshold = [threshold]
        regions = []
        for i, mask in enumerate(masks):
            pil_image = mask2pil(mask.unsqueeze(0))
            region_mask = MaskFilters.minority_region(pil_image, int(threshold[i if i < len(threshold) else -1]))
            region_tensor = pil2mask(region_mask)
            regions.append(region_tensor)
        regions_tensor = torch.cat(regions, dim=0)
        return (regions_tensor,)

```
