---
tags:
- Mask
- MaskRegion
---

# Mask Ceiling Region
## Documentation
- Class name: `Mask Ceiling Region`
- Category: `WAS Suite/Image/Masking`
- Output node: `False`

This node specializes in identifying and isolating the ceiling regions within given mask images. It leverages specific image processing techniques to discern and extract the ceiling areas, making it a valuable tool for tasks requiring focused analysis or manipulation of ceiling elements in images.
## Input types
### Required
- **`masks`**
    - The input masks represent the images from which the ceiling regions are to be extracted. These masks are crucial for the node's operation as they serve as the basis for identifying and isolating ceiling areas.
    - Comfy dtype: `MASK`
    - Python dtype: `torch.Tensor`
## Output types
- **`MASKS`**
    - Comfy dtype: `MASK`
    - The output is a tensor of masks specifically highlighting the ceiling regions within the original input images. This allows for targeted analysis or manipulation of these areas.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class WAS_Mask_Ceiling_Region:

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

    FUNCTION = "ceiling_region"

    def ceiling_region(self, masks):
        if masks.ndim > 3:
            regions = []
            for mask in masks:
                mask_np = np.clip(255. * mask.cpu().numpy().squeeze(), 0, 255).astype(np.uint8)
                pil_image = Image.fromarray(mask_np, mode="L")
                region_mask = self.WT.Masking.ceiling_region(pil_image)
                region_tensor = pil2mask(region_mask).unsqueeze(0).unsqueeze(1)
                regions.append(region_tensor)
            regions_tensor = torch.cat(regions, dim=0)
            return (regions_tensor,)
        else:
            mask_np = np.clip(255. * masks.cpu().numpy().squeeze(), 0, 255).astype(np.uint8)
            pil_image = Image.fromarray(mask_np, mode="L")
            region_mask = self.WT.Masking.ceiling_region(pil_image)
            region_tensor = pil2mask(region_mask).unsqueeze(0).unsqueeze(1)
            return (region_tensor,)

```
