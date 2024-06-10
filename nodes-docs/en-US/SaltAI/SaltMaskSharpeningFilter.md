---
tags:
- Mask
- MaskRegion
---

# Sharpen Mask Regions
## Documentation
- Class name: `SaltMaskSharpeningFilter`
- Category: `SALT/Masking/Filter`
- Output node: `False`

This node applies a sharpening filter to a collection of masks, enhancing their edges and details according to a specified strength. It's designed to refine mask visuals by iteratively applying a sharpening effect, making the features within the masks more pronounced.
## Input types
### Required
- **`masks`**
    - The collection of masks to be sharpened. This input is crucial for determining the regions within which the sharpening filter will be applied.
    - Comfy dtype: `MASK`
    - Python dtype: `torch.Tensor`
### Optional
- **`strength`**
    - Defines the intensity of the sharpening effect. A higher value results in a more pronounced sharpening effect on the masks.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`MASKS`**
    - Comfy dtype: `MASK`
    - The output is a tensor of sharpened masks, where each mask has undergone the specified number of sharpening iterations to enhance its details.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class SaltMaskSharpeningFilter:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "masks": ("MASK",),
            },
            "optional": {
                "strength": ("INT", {"default": 1, "min": 1, "max": 12, "step": 1}),
            }
        }

    CATEGORY = f"{NAME}/Masking/Filter"

    RETURN_TYPES = ("MASK",)
    RETURN_NAMES = ("MASKS",)

    FUNCTION = "sharpening_filter"

    def sharpening_filter(self, masks, strength=1.5):
        if not isinstance(strength, list):
            strength = [strength]

        strength = [int(val) for val in strength]

        regions = []
        for i, mask in enumerate(masks):
            pil_image = ImageOps.invert(mask2pil(mask.unsqueeze(0)))

            for _ in range(strength[i if i < len(strength) else -1]):
                pil_image = pil_image.filter(ImageFilter.SHARPEN)

            region_tensor = pil2mask(pil_image)
            regions.append(region_tensor)

        regions_tensor = torch.cat(regions, dim=0)
        return (regions_tensor,)

```
