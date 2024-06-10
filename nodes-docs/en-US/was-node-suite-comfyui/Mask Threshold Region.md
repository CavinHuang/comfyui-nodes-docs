---
tags:
- Mask
- MaskGeneration
---

# Mask Threshold Region
## Documentation
- Class name: `Mask Threshold Region`
- Category: `WAS Suite/Image/Masking`
- Output node: `False`

This node applies a thresholding operation to a given mask or set of masks, effectively segmenting the image into regions based on specified black and white threshold values. It aims to isolate and highlight areas within the masks that fall within the defined threshold range, enhancing the distinction between different regions.
## Input types
### Required
- **`masks`**
    - The masks to be thresholded. This parameter is crucial for determining which areas of the image are to be isolated based on the threshold values, directly influencing the node's output.
    - Comfy dtype: `MASK`
    - Python dtype: `torch.Tensor`
- **`black_threshold`**
    - The lower bound for the thresholding operation. Pixels with values below this threshold are set to black, contributing to the segmentation of the mask.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`white_threshold`**
    - The upper bound for the thresholding operation. Pixels with values above this threshold are set to white, further refining the segmentation of the mask.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`MASKS`**
    - Comfy dtype: `MASK`
    - The result of the thresholding operation, a tensor representing the segmented regions within the original masks.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `GPU`
- Common nodes:
    - [MaskBlur+](../../ComfyUI_essentials/Nodes/MaskBlur+.md)



## Source code
```python
class WAS_Mask_Threshold_Region:

    def __init__(self):
        self.WT = WAS_Tools_Class()

    @classmethod
    def INPUT_TYPES(cls):
        return {
                    "required": {
                        "masks": ("MASK",),
                        "black_threshold": ("INT",{"default":75, "min":0, "max": 255, "step": 1}),
                        "white_threshold": ("INT",{"default":175, "min":0, "max": 255, "step": 1}),
                    }
                }

    CATEGORY = "WAS Suite/Image/Masking"

    RETURN_TYPES = ("MASK",)
    RETURN_NAMES = ("MASKS",)

    FUNCTION = "threshold_region"

    def threshold_region(self, masks, black_threshold=75, white_threshold=255):
        if masks.ndim > 3:
            regions = []
            for mask in masks:
                mask_np = np.clip(255. * mask.cpu().numpy().squeeze(), 0, 255).astype(np.uint8)
                pil_image = Image.fromarray(mask_np, mode="L")
                region_mask = self.WT.Masking.threshold_region(pil_image, black_threshold, white_threshold)
                region_tensor = pil2mask(region_mask).unsqueeze(0).unsqueeze(1)
                regions.append(region_tensor)
            regions_tensor = torch.cat(regions, dim=0)
            return (regions_tensor,)
        else:
            mask_np = np.clip(255. * masks.cpu().numpy().squeeze(), 0, 255).astype(np.uint8)
            pil_image = Image.fromarray(mask_np, mode="L")
            region_mask = self.WT.Masking.threshold_region(pil_image, black_threshold, white_threshold)
            region_tensor = pil2mask(region_mask).unsqueeze(0).unsqueeze(1)
            return (region_tensor,)

```
