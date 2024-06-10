---
tags:
- Mask
- MaskRegion
---

# Mask Floor Region
## Documentation
- Class name: `Mask Floor Region`
- Category: `WAS Suite/Image/Masking`
- Output node: `False`

The Mask Floor Region node is designed to process input masks and apply a specific floor region masking operation. This operation identifies and isolates the floor regions within the given masks, transforming them into a format suitable for further analysis or processing.
## Input types
### Required
- **`masks`**
    - The 'masks' parameter represents the input masks on which the floor region detection and isolation will be performed. It is crucial for identifying the specific areas within the images that correspond to floor regions.
    - Comfy dtype: `MASK`
    - Python dtype: `torch.Tensor`
## Output types
- **`MASKS`**
    - Comfy dtype: `MASK`
    - The output is a tensor containing the processed masks with the floor regions isolated, ready for further analysis or processing.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class WAS_Mask_Floor_Region:

    def __init__(self):
        self.WT = WAS_Tools_Class()

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "masks": ("MASK",),
            }
        }

    CATEGORY = "WAS Suite/Image/Masking"

    RETURN_TYPES = ("MASK",)
    RETURN_NAMES = ("MASKS",)

    FUNCTION = "floor_region"

    def floor_region(self, masks):
        if masks.ndim > 3:
            regions = []
            for mask in masks:
                mask_np = np.clip(255. * mask.cpu().numpy().squeeze(), 0, 255).astype(np.uint8)
                pil_image = Image.fromarray(mask_np, mode="L")
                region_mask = self.WT.Masking.floor_region(pil_image)
                region_tensor = pil2mask(region_mask).unsqueeze(0).unsqueeze(1)
                regions.append(region_tensor)
            regions_tensor = torch.cat(regions, dim=0)
            return (regions_tensor,)
        else:
            mask_np = np.clip(255. * masks.cpu().numpy().squeeze(), 0, 255).astype(np.uint8)
            pil_image = Image.fromarray(mask_np, mode="L")
            region_mask = self.WT.Masking.floor_region(pil_image)
            region_tensor = pil2mask(region_mask).unsqueeze(0).unsqueeze(1)
            return (region_tensor,)

```
