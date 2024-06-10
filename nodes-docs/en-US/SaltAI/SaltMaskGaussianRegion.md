---
tags:
- Mask
- MaskRegion
---

# Gaussian Mask Regions
## Documentation
- Class name: `SaltMaskGaussianRegion`
- Category: `SALT/Masking/Filter`
- Output node: `False`

Applies a Gaussian filter to specified regions within masks, allowing for the softening of edges and blending of regions for a smoother appearance. This node is particularly useful for image processing tasks where the focus is on enhancing or modifying the visual characteristics of masked areas.
## Input types
### Required
- **`masks`**
    - The masks to which the Gaussian filter will be applied. These masks define the regions that will be processed to achieve a smoother appearance.
    - Comfy dtype: `MASK`
    - Python dtype: `List[torch.Tensor]`
- **`radius`**
    - Specifies the radius of the Gaussian filter. A larger radius results in a more pronounced smoothing effect, allowing for greater control over the degree of blending and softening of the masked regions.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
## Output types
- **`MASKS`**
    - Comfy dtype: `MASK`
    - The modified masks after the application of the Gaussian filter, showcasing smoother and more blended regions.
    - Python dtype: `List[torch.Tensor]`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class SaltMaskGaussianRegion:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "masks": ("MASK",),
                "radius": ("FLOAT", {"default": 5.0, "min": 0.0, "max": 1024, "step": 0.1}),
            }
        }

    CATEGORY = f"{NAME}/Masking/Filter"

    RETURN_TYPES = ("MASK",)
    RETURN_NAMES = ("MASKS",)

    FUNCTION = "gaussian_region"

    def gaussian_region(self, masks, radius=5.0):
        if not isinstance(radius, list):
            radius = [radius]
        regions = []
        for i, mask in enumerate(masks):
            pil_image = mask2pil(mask.unsqueeze(0))
            region_mask = MaskFilters.gaussian_region(pil_image, radius[i if i < len(radius) else -1])
            region_tensor = pil2mask(region_mask)
            regions.append(region_tensor)
        regions_tensor = torch.cat(regions, dim=0)
        return (regions_tensor,)

```
