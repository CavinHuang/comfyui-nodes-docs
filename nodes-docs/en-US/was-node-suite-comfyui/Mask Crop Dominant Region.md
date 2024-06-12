---
tags:
- Mask
- MaskRegion
---

# Mask Crop Dominant Region
## Documentation
- Class name: `Mask Crop Dominant Region`
- Category: `WAS Suite/Image/Masking`
- Output node: `False`

This node is designed to identify and extract the dominant region from a given set of masks, applying a specified padding around the cropped area. It leverages image processing techniques to focus on the most significant part of the image, enhancing the relevance of the extracted region.
## Input types
### Required
- **`masks`**
    - The input masks from which the dominant region is to be cropped. It plays a crucial role in determining the area of interest within the image.
    - Comfy dtype: `MASK`
    - Python dtype: `torch.Tensor`
- **`padding`**
    - Specifies the padding to be applied around the cropped dominant region, allowing for adjustable margins around the extracted area.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`MASKS`**
    - Comfy dtype: `MASK`
    - The output consists of the cropped dominant regions from the input masks, potentially with applied padding.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class WAS_Mask_Crop_Dominant_Region:

    def __init__(self):
        self.WT = WAS_Tools_Class()

    @classmethod
    def INPUT_TYPES(cls):
        return {
                    "required": {
                        "masks": ("MASK",),
                        "padding": ("INT", {"default": 24, "min": 0, "max": 4096, "step": 1}),
                    }
                }

    CATEGORY = "WAS Suite/Image/Masking"

    RETURN_TYPES = ("MASK",)
    RETURN_NAMES = ("MASKS",)

    FUNCTION = "crop_dominant_region"

    def crop_dominant_region(self, masks, padding=24):
        if masks.ndim > 3:
            regions = []
            for mask in masks:
                mask_pil = Image.fromarray(np.clip(255. * mask.cpu().numpy().squeeze(), 0, 255).astype(np.uint8))
                region_mask = self.WT.Masking.crop_dominant_region(mask_pil, padding)
                region_tensor = pil2mask(region_mask).unsqueeze(0).unsqueeze(1)
                regions.append(region_tensor)
            regions_tensor = torch.cat(regions, dim=0)
            return (regions_tensor,)
        else:
            mask_pil = Image.fromarray(np.clip(255. * masks.cpu().numpy().squeeze(), 0, 255).astype(np.uint8))
            region_mask = self.WT.Masking.crop_dominant_region(mask_pil, padding)
            region_tensor = pil2mask(region_mask).unsqueeze(0).unsqueeze(1)
            return (region_tensor,)

```
