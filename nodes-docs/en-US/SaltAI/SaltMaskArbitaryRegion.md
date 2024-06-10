---
tags:
- Mask
- MaskEnhancement
- MaskRegion
---

# Arbitrary Mask Regions
## Documentation
- Class name: `SaltMaskArbitaryRegion`
- Category: `SALT/Masking/Filter`
- Output node: `False`

This node applies a filter to mask arbitrary regions within given masks based on specified size and threshold parameters. It enables the customization of mask regions for various applications, such as image segmentation or object isolation.
## Input types
### Required
- **`masks`**
    - The input masks on which the arbitrary region filtering is applied. This parameter is crucial for defining the areas to be processed.
    - Comfy dtype: `MASK`
    - Python dtype: `torch.Tensor`
- **`size`**
    - Specifies the size parameter for the arbitrary region filter, affecting the scale of the regions to be filtered within the masks.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`threshold`**
    - Determines the threshold for the arbitrary region filtering, influencing which parts of the mask are considered for processing.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`MASKS`**
    - Comfy dtype: `MASK`
    - The output is a modified mask where arbitrary regions have been filtered according to the specified size and threshold.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class SaltMaskArbitaryRegion:
    @classmethod
    def INPUT_TYPES(cls):
        return {
                    "required": {
                        "masks": ("MASK",),
                        "size": ("INT", {"default":256, "min":1, "max":4096, "step":1}),
                        "threshold": ("INT", {"default":128, "min":0, "max":255, "step":1}),
                    }
                }

    CATEGORY = f"{NAME}/Masking/Filter"

    RETURN_TYPES = ("MASK",)
    RETURN_NAMES = ("MASKS",)

    FUNCTION = "arbitrary_region"

    def arbitrary_region(self, masks, size=256, threshold=128):
        if not isinstance(threshold, list):
            threshold = [threshold]
        regions = []
        for i, mask in enumerate(masks):
            pil_image = mask2pil(mask.unsqueeze(0))
            region_mask = MaskFilters.arbitrary_region(pil_image, size, int(threshold[i if i < len(threshold) else -1]))
            region_tensor = pil2mask(region_mask)
            regions.append(region_tensor)
        regions_tensor = torch.cat(regions, dim=0)
        return (regions_tensor,)

```
