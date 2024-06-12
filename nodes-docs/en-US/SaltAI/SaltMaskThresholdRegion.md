---
tags:
- Mask
- MaskEnhancement
- MaskRegion
---

# Threshold Mask Regions
## Documentation
- Class name: `SaltMaskThresholdRegion`
- Category: `SALT/Masking/Filter`
- Output node: `False`

This node applies a threshold filter to mask regions, segmenting them based on specified black and white threshold values. It's designed to isolate and enhance areas within the masks, making it easier to distinguish between different regions based on their intensity levels.
## Input types
### Required
- **`masks`**
    - The input masks to be processed. These masks are segmented based on the provided threshold values, which determine the intensity levels that define the boundaries of the regions.
    - Comfy dtype: `MASK`
    - Python dtype: `List[torch.Tensor]`
- **`black_threshold`**
    - The lower bound for pixel intensity. Pixels with intensity below this value are set to black, aiding in the segmentation of darker regions within the masks.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`white_threshold`**
    - The upper bound for pixel intensity. Pixels with intensity above this value are set to white, aiding in the segmentation of lighter regions within the masks.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`MASKS`**
    - Comfy dtype: `MASK`
    - The output masks after applying the threshold filter, with regions segmented based on the specified black and white thresholds.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class SaltMaskThresholdRegion:
    @classmethod
    def INPUT_TYPES(cls):
        return {
                    "required": {
                        "masks": ("MASK",),
                        "black_threshold": ("INT",{"default":75, "min":0, "max": 255, "step": 1}),
                        "white_threshold": ("INT",{"default":175, "min":0, "max": 255, "step": 1}),
                    }
                }

    CATEGORY = f"{NAME}/Masking/Filter"

    RETURN_TYPES = ("MASK",)
    RETURN_NAMES = ("MASKS",)

    FUNCTION = "threshold_region"

    def threshold_region(self, masks, black_threshold=75, white_threshold=255):
        if not isinstance(black_threshold, list):
            black_threshold = [black_threshold]
        if not isinstance(white_threshold, list):
            white_threshold = [white_threshold]
        regions = []
        for i, mask in enumerate(masks):
            pil_image = mask2pil(mask.unsqueeze(0))
            region_mask = MaskFilters.threshold_region(
                pil_image, 
                int(black_threshold[i if i < len(black_threshold) else -1]), 
                int(white_threshold[i if i < len(white_threshold) else -1])
            )
            region_tensor = pil2mask(region_mask)
            regions.append(region_tensor)
        regions_tensor = torch.cat(regions, dim=0)
        return (regions_tensor,)

```
