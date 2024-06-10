---
tags:
- ImageTransformation
---

# RemapMaskRange
## Documentation
- Class name: `RemapMaskRange`
- Category: `KJNodes/masking`
- Output node: `False`

The `RemapMaskRange` node is designed to adjust the range of values within a mask to a new specified minimum and maximum, ensuring that the mask's values are scaled appropriately within this new range.
## Input types
### Required
- **`mask`**
    - The mask whose values are to be remapped. This input is crucial for defining the source data that will undergo the range adjustment process.
    - Comfy dtype: `MASK`
    - Python dtype: `torch.Tensor`
- **`min`**
    - Specifies the new minimum value in the remapped range. This parameter sets the lower bound of the target range for the mask's values.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`max`**
    - Defines the new maximum value in the remapped range. This parameter establishes the upper limit of the target range for the mask's values.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
## Output types
- **`mask`**
    - Comfy dtype: `MASK`
    - The output is the mask with its values remapped to the new specified range, ensuring that all values fall within this defined interval.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class RemapMaskRange:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "mask": ("MASK",),
                "min": ("FLOAT", {"default": 0.0,"min": -10.0, "max": 1.0, "step": 0.01}),
                "max": ("FLOAT", {"default": 1.0,"min": 0.0, "max": 10.0, "step": 0.01}),
            }
        }

    RETURN_TYPES = ("MASK",)
    RETURN_NAMES = ("mask",)
    FUNCTION = "remap"
    CATEGORY = "KJNodes/masking"
    DESCRIPTION = """
Sets new min and max values for the mask.
"""

    def remap(self, mask, min, max):

         # Find the maximum value in the mask
        mask_max = torch.max(mask)
        
        # If the maximum mask value is zero, avoid division by zero by setting it to 1
        mask_max = mask_max if mask_max > 0 else 1
        
        # Scale the mask values to the new range defined by min and max
        # The highest pixel value in the mask will be scaled to max
        scaled_mask = (mask / mask_max) * (max - min) + min
        
        # Clamp the values to ensure they are within [0.0, 1.0]
        scaled_mask = torch.clamp(scaled_mask, min=0.0, max=1.0)
        
        return (scaled_mask, )

```
