---
tags:
- Mask
- MaskRegion
---

# Mask Dominant Region
## Documentation
- Class name: `Mask Dominant Region`
- Category: `WAS Suite/Image/Masking`
- Output node: `False`

This node is designed to identify and isolate the dominant region within a given set of masks based on a specified threshold. It effectively filters out less significant areas, focusing on the most prominent region as determined by pixel intensity and area size.
## Input types
### Required
- **`masks`**
    - The input masks on which the dominant region detection is to be performed. This parameter is crucial for identifying the area of interest within the provided images.
    - Comfy dtype: `MASK`
    - Python dtype: `torch.Tensor`
- **`threshold`**
    - A value that determines the cutoff intensity for considering a region as dominant. It plays a key role in distinguishing between the significant and insignificant areas within the masks.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`MASKS`**
    - Comfy dtype: `MASK`
    - The output consists of masks with the dominant region highlighted, effectively isolating the most significant area from the rest of the image.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class WAS_Mask_Dominant_Region:

    def __init__(self):
        self.WT = WAS_Tools_Class()

    @classmethod
    def INPUT_TYPES(cls):
        return {
                    "required": {
                        "masks": ("MASK",),
                        "threshold": ("INT", {"default":128, "min":0, "max":255, "step":1}),
                    }
                }

    CATEGORY = "WAS Suite/Image/Masking"

    RETURN_TYPES = ("MASK",)
    RETURN_NAMES = ("MASKS",)

    FUNCTION = "dominant_region"

    def dominant_region(self, masks, threshold=128):
        if masks.ndim > 3:
            regions = []
            for mask in masks:
                mask_pil = Image.fromarray(np.clip(255. * mask.cpu().numpy().squeeze(), 0, 255).astype(np.uint8))
                region_mask = self.WT.Masking.dominant_region(mask_pil, threshold)
                region_tensor = pil2mask(region_mask).unsqueeze(0).unsqueeze(1)
                regions.append(region_tensor)
            regions_tensor = torch.cat(regions, dim=0)
            return (regions_tensor,)
        else:
            mask_pil = Image.fromarray(np.clip(255. * masks.cpu().numpy().squeeze(), 0, 255).astype(np.uint8))
            region_mask = self.WT.Masking.dominant_region(mask_pil, threshold)
            region_tensor = pil2mask(region_mask).unsqueeze(0).unsqueeze(1)
            return (region_tensor,)

```
