---
tags:
- Mask
- MaskMorphology
---

# Mask Erode Region
## Documentation
- Class name: `Mask Erode Region`
- Category: `WAS Suite/Image/Masking`
- Output node: `False`

The node is designed to perform erosion on specified mask regions, effectively shrinking the mask areas based on the number of iterations specified. This operation is useful for refining mask boundaries or reducing noise in mask regions.
## Input types
### Required
- **`masks`**
    - The input masks to be eroded. This parameter is crucial for determining the regions within the image that will undergo the erosion process.
    - Comfy dtype: `MASK`
    - Python dtype: `torch.Tensor`
- **`iterations`**
    - Specifies the number of times the erosion operation is applied to the mask regions. A higher number of iterations results in more pronounced erosion.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`MASKS`**
    - Comfy dtype: `MASK`
    - The eroded mask regions as a result of applying the erosion operation specified by the iterations parameter.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class WAS_Mask_Erode_Region:

    def __init__(self):
        self.WT = WAS_Tools_Class()

    @classmethod
    def INPUT_TYPES(cls):
        return {
                    "required": {
                        "masks": ("MASK",),
                        "iterations": ("INT", {"default":5, "min":1, "max":64, "step":1}),
                    }
                }

    CATEGORY = "WAS Suite/Image/Masking"

    RETURN_TYPES = ("MASK",)
    RETURN_NAMES = ("MASKS",)

    FUNCTION = "erode_region"

    def erode_region(self, masks, iterations=5):
        if masks.ndim > 3:
            regions = []
            for mask in masks:
                mask_np = np.clip(255. * mask.cpu().numpy().squeeze(), 0, 255).astype(np.uint8)
                pil_image = Image.fromarray(mask_np, mode="L")
                region_mask = self.WT.Masking.erode_region(pil_image, iterations)
                region_tensor = pil2mask(region_mask).unsqueeze(0).unsqueeze(1)
                regions.append(region_tensor)
            regions_tensor = torch.cat(regions, dim=0)
            return (regions_tensor,)
        else:
            mask_np = np.clip(255. * masks.cpu().numpy().squeeze(), 0, 255).astype(np.uint8)
            pil_image = Image.fromarray(mask_np, mode="L")
            region_mask = self.WT.Masking.erode_region(pil_image, iterations)
            region_tensor = pil2mask(region_mask).unsqueeze(0).unsqueeze(1)
            return (region_tensor,)

```
