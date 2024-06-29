---
tags:
- Mask
- MaskMorphology
---

# Mask Dilate Region
## Documentation
- Class name: `Mask Dilate Region`
- Category: `WAS Suite/Image/Masking`
- Output node: `False`

This node is designed to dilate regions within given masks, effectively expanding the areas of interest. It utilizes iterations to control the extent of dilation, allowing for precise adjustments to the mask's features.
## Input types
### Required
- **`masks`**
    - The input masks to be dilated. This parameter is crucial for defining the areas within the image that will undergo dilation.
    - Comfy dtype: `MASK`
    - Python dtype: `torch.Tensor`
- **`iterations`**
    - Specifies the number of times the dilation operation is applied, directly influencing the degree of expansion for the mask's regions.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`MASKS`**
    - Comfy dtype: `MASK`
    - The output consists of dilated masks, where the specified regions have been expanded according to the number of iterations.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class WAS_Mask_Dilate_Region:

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

    FUNCTION = "dilate_region"

    def dilate_region(self, masks, iterations=5):
        if masks.ndim > 3:
            regions = []
            for mask in masks:
                mask_np = np.clip(255. * mask.cpu().numpy().squeeze(), 0, 255).astype(np.uint8)
                pil_image = Image.fromarray(mask_np, mode="L")
                region_mask = self.WT.Masking.dilate_region(pil_image, iterations)
                region_tensor = pil2mask(region_mask).unsqueeze(0).unsqueeze(1)
                regions.append(region_tensor)
            regions_tensor = torch.cat(regions, dim=0)
            return (regions_tensor,)
        else:
            mask_np = np.clip(255. * masks.cpu().numpy().squeeze(), 0, 255).astype(np.uint8)
            pil_image = Image.fromarray(mask_np, mode="L")
            region_mask = self.WT.Masking.dilate_region(pil_image, iterations)
            region_tensor = pil2mask(region_mask).unsqueeze(0).unsqueeze(1)
            return (region_tensor,)

```
