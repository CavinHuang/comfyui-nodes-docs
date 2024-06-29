---
tags:
- Mask
- MaskMorphology
---

# Dilate Mask Regions
## Documentation
- Class name: `SaltMaskDilateRegion`
- Category: `SALT/Masking/Filter`
- Output node: `False`

This node applies a dilation filter to mask regions, effectively expanding the areas of interest within the masks based on the specified number of iterations. It's designed to process and modify mask regions to highlight or enlarge specific features within the masks.
## Input types
### Required
- **`masks`**
    - The input masks to be dilated. This parameter is crucial for defining the areas within the image that will undergo dilation, directly impacting the node's output.
    - Comfy dtype: `MASK`
    - Python dtype: `torch.Tensor`
- **`iterations`**
    - Specifies the number of times the dilation operation is applied to the masks. This parameter controls the extent of dilation, affecting the size and visibility of features within the masks.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`MASKS`**
    - Comfy dtype: `MASK`
    - The output masks after dilation. These masks represent the modified regions with expanded areas of interest, showcasing the effect of the dilation process.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class SaltMaskDilateRegion:
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

    FUNCTION = "dilate_region"

    def dilate_region(self, masks, iterations=5):
        if not isinstance(iterations, list):
            iterations = [iterations]
        regions = []
        for i, mask in enumerate(masks):
            pil_image = mask2pil(mask.unsqueeze(0))
            region_mask = MaskFilters.dilate_region(pil_image, iterations[i if i < len(iterations) else -1])
            region_tensor = pil2mask(region_mask)
            regions.append(region_tensor)
        regions_tensor = torch.cat(regions, dim=0)
        return (regions_tensor,)

```
