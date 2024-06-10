---
tags:
- Mask
- MaskRegion
---

# Dominant Mask Regions
## Documentation
- Class name: `SaltMaskDominantRegion`
- Category: `SALT/Masking/Filter`
- Output node: `False`

This node focuses on identifying and isolating the dominant region within a given set of masks based on a specified threshold. It effectively highlights the most prominent area in an image mask, making it useful for tasks that require focus on significant mask regions.
## Input types
### Required
- **`masks`**
    - The input masks on which the dominant region detection is to be performed. These masks are crucial for determining the area of interest within the images.
    - Comfy dtype: `MASK`
    - Python dtype: `torch.Tensor`
- **`threshold`**
    - A threshold value to distinguish the dominant region within the masks. It plays a pivotal role in defining what constitutes the 'dominant' area by setting a cutoff intensity value.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`MASKS`**
    - Comfy dtype: `MASK`
    - The output is a tensor of masks with the dominant region highlighted. This is significant for applications needing to focus on or manipulate the primary area within the masks.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class SaltMaskDominantRegion:
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

    FUNCTION = "dominant_region"

    def dominant_region(self, masks, threshold=128):
        if not isinstance(threshold, list):
            threshold = [threshold]
        regions = []
        for i, mask in enumerate(masks):
            mask_pil = mask2pil(mask.unsqueeze(0))
            region_mask = MaskFilters.dominant_region(mask_pil, int(threshold[i if i < len(threshold) else -1]))
            region_tensor = pil2mask(region_mask)
            regions.append(region_tensor)
        regions_tensor = torch.cat(regions, dim=0)
        return (regions_tensor,)

```
