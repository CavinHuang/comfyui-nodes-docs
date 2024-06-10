---
tags:
- Mask
- MaskMorphology
---

# Erode Mask Regions
## Documentation
- Class name: `SaltMaskErodeRegion`
- Category: `SALT/Masking/Filter`
- Output node: `False`

This node applies an erosion filter to mask regions, effectively shrinking the masked areas based on the specified number of iterations. It's designed to refine mask boundaries by eroding away the edges of masked regions.
## Input types
### Required
- **`masks`**
    - The input masks to be eroded. This parameter is crucial for defining the areas to be processed and refined by the erosion operation.
    - Comfy dtype: `MASK`
    - Python dtype: `torch.Tensor`
- **`iterations`**
    - Specifies the number of times the erosion operation is applied to each mask, allowing for adjustable intensity of the effect.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`MASKS`**
    - Comfy dtype: `MASK`
    - The output masks after applying the erosion filter, showcasing the refined and reduced masked regions.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class SaltMaskErodeRegion:
    @classmethod
    def INPUT_TYPES(cls):
        return {
                    "required": {
                        "masks": ("MASK",),
                        "iterations": ("INT", {"default":5, "min":1, "max":64, "step":1}),
                    }
                }

    CATEGORY = f"{NAME}/Masking/Filter"

    RETURN_TYPES = ("MASK",)
    RETURN_NAMES = ("MASKS",)

    FUNCTION = "erode_region"

    def erode_region(self, masks, iterations=5):
        if not isinstance(iterations, list):
            iterations = [iterations]
        regions = []
        for i, mask in enumerate(masks):
            pil_image = mask2pil(mask.unsqueeze(0))
            region_mask = MaskFilters.erode_region(pil_image, iterations[i if i < len(iterations) else -1])
            region_tensor = pil2mask(region_mask)
            regions.append(region_tensor)
        regions_tensor = torch.cat(regions, dim=0)
        return (regions_tensor,)

```
