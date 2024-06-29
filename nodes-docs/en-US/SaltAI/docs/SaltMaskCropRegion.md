---
tags:
- Crop
- Image
- ImageTransformation
---

# Mask Batch Crop Region
## Documentation
- Class name: `SaltMaskCropRegion`
- Category: `SALT/Masking/Process`
- Output node: `False`

The SaltMaskCropRegion node focuses on cropping regions within masks based on specified criteria, such as dominant or minority areas, and applying padding around these regions. It aims to refine mask data by isolating and resizing specific regions, facilitating targeted analysis or manipulation of mask-based data.
## Input types
### Required
- **`masks`**
    - The 'masks' parameter represents the input masks to be cropped. It is crucial for determining the areas within each mask that meet the specified cropping criteria, directly influencing the output cropped masks.
    - Comfy dtype: `MASK`
    - Python dtype: `torch.Tensor`
- **`padding`**
    - The 'padding' parameter specifies the amount of padding to add around the cropped region. It affects the size of the output cropped masks by expanding the cropped area, allowing for more flexible usage of the masks.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`region_type`**
    - The 'region_type' parameter determines the criteria for cropping, choosing between 'dominant' or 'minority' regions within the masks. This choice directs the cropping process, tailoring the output to specific areas of interest.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
## Output types
- **`cropped_masks`**
    - Comfy dtype: `MASK`
    - The cropped masks after applying the specified cropping and padding, ready for further processing or analysis.
    - Python dtype: `torch.Tensor`
- **`crop_data_batch`**
    - Comfy dtype: `CROP_DATA_BATCH`
    - A batch of data detailing the cropping operations performed, including dimensions and locations of the cropped regions.
    - Python dtype: `List[Dict]`
- **`top_int`**
    - Comfy dtype: `INT`
    - The top boundary integer value of the cropped region.
    - Python dtype: `int`
- **`left_int`**
    - Comfy dtype: `INT`
    - The left boundary integer value of the cropped region.
    - Python dtype: `int`
- **`right_int`**
    - Comfy dtype: `INT`
    - The right boundary integer value of the cropped region.
    - Python dtype: `int`
- **`bottom_int`**
    - Comfy dtype: `INT`
    - The bottom boundary integer value of the cropped region.
    - Python dtype: `int`
- **`width_int`**
    - Comfy dtype: `INT`
    - The width integer value of the cropped region, calculated from the cropping data.
    - Python dtype: `int`
- **`height_int`**
    - Comfy dtype: `INT`
    - The height integer value of the cropped region, calculated from the cropping data.
    - Python dtype: `int`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class SaltMaskCropRegion:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "masks": ("MASK",),
                "padding": ("INT",{"default": 24, "min": 0, "max": 4096, "step": 1}),
                "region_type": (["dominant", "minority"],),
            }
        }
    
    RETURN_TYPES = ("MASK", "CROP_DATA_BATCH", "INT", "INT", "INT", "INT", "INT", "INT")
    RETURN_NAMES = ("cropped_masks", "crop_data_batch", "top_int", "left_int", "right_int", "bottom_int", "width_int", "height_int")
    
    FUNCTION = "mask_crop_region"
    CATEGORY = f"{NAME}/Masking/Process"
    
    def mask_crop_region(self, masks, padding=24, region_type="dominant"):
        N = len(masks)
        cropped_masks = []
        crop_data_list = []
        master_size = None
        
        for n in range(N):
            mask = masks[n]
            mask_pil = mask2pil(mask.unsqueeze(0))
            if not master_size:
                master_size = mask_pil.size
            region_mask, crop_data = MaskFilters.crop_region(mask_pil, region_type, padding)
            region_mask = region_mask.resize(master_size)
            region_tensor = pil2mask(region_mask)
            cropped_masks.append(region_tensor)
            crop_data_list.append(crop_data)

        cropped_masks_batch = torch.cat(cropped_masks, dim=0)

        return (cropped_masks_batch, crop_data_list)

```
