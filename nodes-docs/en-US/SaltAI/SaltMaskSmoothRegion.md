---
tags:
- Blur
- VisualEffects
---

# Smooth Mask Regions
## Documentation
- Class name: `SaltMaskSmoothRegion`
- Category: `SALT/Masking/Filter`
- Output node: `False`

The SaltMaskSmoothRegion node applies a smoothing filter to regions within masks, utilizing a specified sigma value to control the smoothness level. This process enhances the visual quality of mask regions by reducing noise and irregularities.
## Input types
### Required
- **`masks`**
    - The 'masks' parameter represents the input masks on which the smoothing operation is to be performed, serving as the primary data for the node's processing.
    - Comfy dtype: `MASK`
    - Python dtype: `torch.Tensor`
- **`sigma`**
    - The 'sigma' parameter controls the smoothness level of the smoothing filter applied to the mask regions, directly influencing the degree of smoothing and noise reduction.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
## Output types
- **`MASKS`**
    - Comfy dtype: `MASK`
    - The output is a tensor of masks that have been smoothed according to the specified sigma value, offering enhanced visual quality by reducing noise and irregularities.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class SaltMaskSmoothRegion:
    @classmethod
    def INPUT_TYPES(cls):
        return {
                    "required": {
                        "masks": ("MASK",),
                        "sigma": ("FLOAT", {"default":5.0, "min":0.0, "max":128.0, "step":0.1}),
                    }
                }

    CATEGORY = f"{NAME}/Masking/Filter"

    RETURN_TYPES = ("MASK",)
    RETURN_NAMES = ("MASKS",)

    FUNCTION = "smooth_region"

    def smooth_region(self, masks, sigma=128):
        if not isinstance(sigma, list):
            sigma = [sigma]
        regions = []
        for i, mask in enumerate(masks):
            pil_image = mask2pil(mask.unsqueeze(0))
            region_mask = MaskFilters.smooth_region(pil_image, sigma[i if i < len(sigma) else -1])
            region_tensor = pil2mask(region_mask)
            regions.append(region_tensor)
        regions_tensor = torch.cat(regions, dim=0)
        return (regions_tensor,)

```
