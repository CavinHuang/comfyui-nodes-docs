---
tags:
- Mask
- MaskGeneration
---

# Mask Arbitrary Region
## Documentation
- Class name: `Mask Arbitrary Region`
- Category: `WAS Suite/Image/Masking`
- Output node: `False`

This node is designed to process image masks by applying an arbitrary region masking technique. It adjusts the regions within the masks based on specified size and threshold parameters, effectively altering the mask's focus or coverage area.
## Input types
### Required
- **`masks`**
    - The input masks to be processed. These masks are adjusted to focus on arbitrary regions based on the given size and threshold.
    - Comfy dtype: `MASK`
    - Python dtype: `torch.Tensor`
- **`size`**
    - Specifies the size of the region to focus on within each mask. It influences the scale of the region being highlighted or suppressed.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`threshold`**
    - Determines the intensity threshold for selecting which parts of the mask to include in the arbitrary region. It affects the mask's detail level and the region's prominence.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`MASKS`**
    - Comfy dtype: `MASK`
    - The processed masks with arbitrary regions applied, reflecting the specified size and threshold adjustments.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class WAS_Mask_Arbitrary_Region:

    def __init__(self):
        self.WT = WAS_Tools_Class()

    @classmethod
    def INPUT_TYPES(cls):
        return {
                    "required": {
                        "masks": ("MASK",),
                        "size": ("INT", {"default":256, "min":1, "max":4096, "step":1}),
                        "threshold": ("INT", {"default":128, "min":0, "max":255, "step":1}),
                    }
                }

    CATEGORY = "WAS Suite/Image/Masking"

    RETURN_TYPES = ("MASK",)
    RETURN_NAMES = ("MASKS",)

    FUNCTION = "arbitrary_region"

    def arbitrary_region(self, masks, size=256, threshold=128):
        if masks.ndim > 3:
            regions = []
            for mask in masks:
                mask_np = np.clip(255. * mask.cpu().numpy().squeeze(), 0, 255).astype(np.uint8)
                pil_image = Image.fromarray(mask_np, mode="L")
                region_mask = self.WT.Masking.arbitrary_region(pil_image, size, threshold)
                region_tensor = pil2mask(region_mask).unsqueeze(0).unsqueeze(1)
                regions.append(region_tensor)
            regions_tensor = torch.cat(regions, dim=0)
            return (regions_tensor,)
        else:
            mask_np = np.clip(255. * masks.cpu().numpy().squeeze(), 0, 255).astype(np.uint8)
            pil_image = Image.fromarray(mask_np, mode="L")
            region_mask = self.WT.Masking.arbitrary_region(pil_image, size, threshold)
            region_tensor = pil2mask(region_mask).unsqueeze(0).unsqueeze(1)
            return (region_tensor,)

```
