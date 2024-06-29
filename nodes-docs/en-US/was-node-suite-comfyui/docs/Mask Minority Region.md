---
tags:
- Mask
- MaskRegion
---

# Mask Minority Region
## Documentation
- Class name: `Mask Minority Region`
- Category: `WAS Suite/Image/Masking`
- Output node: `False`

The Mask Minority Region node is designed to identify and process the minority regions within given mask images, applying a threshold to distinguish between major and minor areas. This functionality is crucial for tasks requiring focus on less dominant features within images, such as isolating specific objects or areas that occupy a smaller portion of the visual space.
## Input types
### Required
- **`masks`**
    - The 'masks' parameter represents the input mask images on which the minority region identification and processing will be performed. It is essential for determining the areas to be isolated based on their dominance within the image.
    - Comfy dtype: `MASK`
    - Python dtype: `torch.Tensor`
- **`threshold`**
    - The 'threshold' parameter sets the boundary for distinguishing between majority and minority regions within the mask images. It plays a critical role in defining which areas are considered minor and thus subject to further processing.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`MASKS`**
    - Comfy dtype: `MASK`
    - The output is a tensor representing the processed mask images, where the minority regions have been isolated and emphasized, ready for further analysis or manipulation.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class WAS_Mask_Minority_Region:

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

    FUNCTION = "minority_region"

    def minority_region(self, masks, threshold=128):
        if masks.ndim > 3:
            regions = []
            for mask in masks:
                mask_np = np.clip(255. * mask.cpu().numpy().squeeze(), 0, 255).astype(np.uint8)
                pil_image = Image.fromarray(mask_np, mode="L")
                region_mask = self.WT.Masking.minority_region(pil_image, threshold)
                region_tensor = pil2mask(region_mask).unsqueeze(0).unsqueeze(1)
                regions.append(region_tensor)
            regions_tensor = torch.cat(regions, dim=0)
            return (regions_tensor,)
        else:
            mask_np = np.clip(255. * masks.cpu().numpy().squeeze(), 0, 255).astype(np.uint8)
            pil_image = Image.fromarray(mask_np, mode="L")
            region_mask = self.WT.Masking.minority_region(pil_image, threshold)
            region_tensor = pil2mask(region_mask).unsqueeze(0).unsqueeze(1)
            return (region_tensor,)

```
