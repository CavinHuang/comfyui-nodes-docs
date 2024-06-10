---
tags:
- Blur
- MaskBlur
- VisualEffects
---

# Mask Gaussian Region
## Documentation
- Class name: `Mask Gaussian Region`
- Category: `WAS Suite/Image/Masking`
- Output node: `False`

This node applies a Gaussian blur to specified regions within given masks, effectively smoothing the edges and transitions within the mask areas. It's designed to create softer, more natural-looking mask boundaries by utilizing a Gaussian filter.
## Input types
### Required
- **`masks`**
    - The input masks to which the Gaussian blur will be applied. These masks define the regions that will be smoothed.
    - Comfy dtype: `MASK`
    - Python dtype: `torch.Tensor`
- **`radius`**
    - Defines the radius of the Gaussian blur. A larger radius results in a smoother, more blurred mask region.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
## Output types
- **`MASKS`**
    - Comfy dtype: `MASK`
    - The output masks after applying the Gaussian blur to the specified regions. These masks will have smoother transitions and edges.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `GPU`
- Common nodes:
    - [VAEEncodeForInpaint](../../Comfy/Nodes/VAEEncodeForInpaint.md)
    - [MaskToSEGS](../../ComfyUI-Impact-Pack/Nodes/MaskToSEGS.md)
    - [MaskToImage](../../Comfy/Nodes/MaskToImage.md)



## Source code
```python
class WAS_Mask_Gaussian_Region:

    def __init__(self):
        self.WT = WAS_Tools_Class()

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "masks": ("MASK",),
                "radius": ("FLOAT", {"default": 5.0, "min": 0.0, "max": 1024, "step": 0.1}),
            }
        }

    CATEGORY = "WAS Suite/Image/Masking"

    RETURN_TYPES = ("MASK",)
    RETURN_NAMES = ("MASKS",)

    FUNCTION = "gaussian_region"

    def gaussian_region(self, masks, radius=5.0):
        if masks.ndim > 3:
            regions = []
            for mask in masks:
                mask_np = np.clip(255. * mask.cpu().numpy().squeeze(), 0, 255).astype(np.uint8)
                pil_image = Image.fromarray(mask_np, mode="L")
                region_mask = self.WT.Masking.gaussian_region(pil_image, radius)
                region_tensor = pil2mask(region_mask).unsqueeze(0).unsqueeze(1)
                regions.append(region_tensor)
            regions_tensor = torch.cat(regions, dim=0)
            return (regions_tensor,)
        else:
            mask_np = np.clip(255. * masks.cpu().numpy().squeeze(), 0, 255).astype(np.uint8)
            pil_image = Image.fromarray(mask_np, mode="L")
            region_mask = self.WT.Masking.gaussian_region(pil_image, radius)
            region_tensor = pil2mask(region_mask).unsqueeze(0).unsqueeze(1)
            return (region_tensor,)

```
