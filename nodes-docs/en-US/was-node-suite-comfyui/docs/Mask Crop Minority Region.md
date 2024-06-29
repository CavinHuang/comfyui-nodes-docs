---
tags:
- Crop
- Image
- ImageTransformation
---

# Mask Crop Minority Region
## Documentation
- Class name: `Mask Crop Minority Region`
- Category: `WAS Suite/Image/Masking`
- Output node: `False`

This node focuses on isolating and cropping the smallest detected region within a given mask, applying optional padding to the cropped area. It leverages image processing techniques to identify minority regions in masks, enhancing the focus on less prominent features by cropping around them.
## Input types
### Required
- **`masks`**
    - The input masks on which the minority region cropping operation is to be performed. This parameter is crucial for determining the specific area to be isolated and cropped, directly influencing the output based on the mask's content.
    - Comfy dtype: `MASK`
    - Python dtype: `torch.Tensor`
- **`padding`**
    - An optional parameter that specifies the amount of padding to add around the cropped minority region. This affects the final size of the cropped area, allowing for adjustments in the focus area's boundary.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`MASKS`**
    - Comfy dtype: `MASK`
    - The output is a tensor representing the cropped minority region of the input mask, potentially with added padding. This tensor highlights the least prominent area within the original mask, focusing on details that might otherwise be overlooked.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class WAS_Mask_Crop_Minority_Region:

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

    FUNCTION = "crop_minority_region"

    def crop_minority_region(self, masks, padding=24):
        if masks.ndim > 3:
            regions = []
            for mask in masks:
                mask_pil = Image.fromarray(np.clip(255. * mask.cpu().numpy().squeeze(), 0, 255).astype(np.uint8))
                region_mask = self.WT.Masking.crop_minority_region(mask_pil, padding)
                region_tensor = pil2mask(region_mask).unsqueeze(0).unsqueeze(1)
                regions.append(region_tensor)
            regions_tensor = torch.cat(regions, dim=0)
            return (regions_tensor,)
        else:
            mask_pil = Image.fromarray(np.clip(255. * masks.cpu().numpy().squeeze(), 0, 255).astype(np.uint8))
            region_mask = self.WT.Masking.crop_minority_region(mask_pil, padding)
            region_tensor = pil2mask(region_mask).unsqueeze(0).unsqueeze(1)
            return (region_tensor,)

```
