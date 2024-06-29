---
tags:
- Crop
- Image
- ImageTransformation
---

# Mask Crop Region
## Documentation
- Class name: `Mask Crop Region`
- Category: `WAS Suite/Image/Masking`
- Output node: `False`

The node focuses on cropping a specified region from a given mask, based on the region type (dominant or minority) and an optional padding. It aims to extract and highlight specific areas within masks, enhancing the focus on regions of interest.
## Input types
### Required
- **`mask`**
    - The mask input represents the image mask from which a specific region is to be cropped. It plays a crucial role in determining the area of interest for cropping.
    - Comfy dtype: `MASK`
    - Python dtype: `torch.Tensor`
- **`padding`**
    - Padding specifies the additional space to be added around the cropped region. It allows for more flexibility in the size of the output region, potentially including more context around the targeted area.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`region_type`**
    - The region type determines whether the dominant or minority region within the mask is to be cropped. This choice directs the cropping process towards areas of major or minor presence, respectively.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
## Output types
- **`cropped_mask`**
    - Comfy dtype: `MASK`
    - The cropped mask is the result of the cropping operation, containing the specified region of interest from the original mask.
    - Python dtype: `torch.Tensor`
- **`crop_data`**
    - Comfy dtype: `CROP_DATA`
    - Crop data provides detailed information about the dimensions and coordinates of the cropped region, facilitating further processing or analysis.
    - Python dtype: `Tuple[int, int, int, int]`
- **`top_int`**
    - Comfy dtype: `INT`
    - The top boundary coordinate of the cropped region.
    - Python dtype: `int`
- **`left_int`**
    - Comfy dtype: `INT`
    - The left boundary coordinate of the cropped region.
    - Python dtype: `int`
- **`right_int`**
    - Comfy dtype: `INT`
    - The right boundary coordinate of the cropped region.
    - Python dtype: `int`
- **`bottom_int`**
    - Comfy dtype: `INT`
    - The bottom boundary coordinate of the cropped region.
    - Python dtype: `int`
- **`width_int`**
    - Comfy dtype: `INT`
    - The width of the cropped region.
    - Python dtype: `int`
- **`height_int`**
    - Comfy dtype: `INT`
    - The height of the cropped region.
    - Python dtype: `int`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class WAS_Mask_Crop_Region:
    def __init__(self):
        self.WT = WAS_Tools_Class()

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "mask": ("MASK",),
                "padding": ("INT",{"default": 24, "min": 0, "max": 4096, "step": 1}),
                "region_type": (["dominant", "minority"],),
            }
        }

    RETURN_TYPES = ("MASK", "CROP_DATA", "INT", "INT", "INT", "INT", "INT", "INT")
    RETURN_NAMES = ("cropped_mask", "crop_data", "top_int", "left_int", "right_int", "bottom_int", "width_int", "height_int")
    FUNCTION = "mask_crop_region"

    CATEGORY = "WAS Suite/Image/Masking"

    def mask_crop_region(self, mask, padding=24, region_type="dominant"):

        mask_pil = Image.fromarray(np.clip(255. * mask.cpu().numpy().squeeze(), 0, 255).astype(np.uint8))
        region_mask, crop_data = self.WT.Masking.crop_region(mask_pil, region_type, padding)
        region_tensor = pil2mask(ImageOps.invert(region_mask)).unsqueeze(0).unsqueeze(1)

        (width, height), (left, top, right, bottom) = crop_data

        return (region_tensor, crop_data, top, left, right, bottom, width, height)

```
