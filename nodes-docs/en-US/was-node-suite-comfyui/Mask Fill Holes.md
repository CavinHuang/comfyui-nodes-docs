---
tags:
- Mask
---

# Mask Fill Holes
## Documentation
- Class name: `Mask Fill Holes`
- Category: `WAS Suite/Image/Masking`
- Output node: `False`

This node is designed to fill in the regions of a mask where there are holes, effectively creating a more solid and continuous mask area. It operates on mask inputs, applying a filling operation to ensure that any gaps or holes within the mask are filled, enhancing the mask's integrity for further image processing tasks.
## Input types
### Required
- **`masks`**
    - The 'masks' input represents the mask or masks to be filled. It is crucial for determining which areas of the image need to be processed to fill in the gaps or holes, directly influencing the node's output by specifying the target regions for the fill operation.
    - Comfy dtype: `MASK`
    - Python dtype: `torch.Tensor`
## Output types
- **`MASKS`**
    - Comfy dtype: `MASK`
    - The output 'MASKS' consists of the processed masks with filled regions, providing a more continuous and solid mask area for subsequent image manipulation or analysis tasks.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class WAS_Mask_Fill_Region:

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

    FUNCTION = "fill_region"

    def fill_region(self, masks):
        if masks.ndim > 3:
            regions = []
            for mask in masks:
                mask_np = np.clip(255. * mask.cpu().numpy().squeeze(), 0, 255).astype(np.uint8)
                pil_image = Image.fromarray(mask_np, mode="L")
                region_mask = self.WT.Masking.fill_region(pil_image)
                region_tensor = pil2mask(region_mask).unsqueeze(0).unsqueeze(1)
                regions.append(region_tensor)
            regions_tensor = torch.cat(regions, dim=0)
            return (regions_tensor,)
        else:
            mask_np = np.clip(255. * masks.cpu().numpy().squeeze(), 0, 255).astype(np.uint8)
            pil_image = Image.fromarray(mask_np, mode="L")
            region_mask = self.WT.Masking.fill_region(pil_image)
            region_tensor = pil2mask(region_mask).unsqueeze(0).unsqueeze(1)
            return (region_tensor,)

```
