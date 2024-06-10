---
tags:
- Mask
- MaskGeneration
---

# RoundMask
## Documentation
- Class name: `RoundMask`
- Category: `KJNodes/masking`
- Output node: `False`

The RoundMask node is designed to convert a mask or a batch of masks into binary masks, effectively rounding the values to the nearest binary values (0 or 1). This operation is crucial for tasks that require clear, distinct mask boundaries without gradations.
## Input types
### Required
- **`mask`**
    - The input mask or batch of masks to be rounded to binary values. This is essential for achieving clear and distinct mask boundaries in various image processing tasks.
    - Comfy dtype: `MASK`
    - Python dtype: `torch.Tensor`
## Output types
- **`mask`**
    - Comfy dtype: `MASK`
    - The output is a binary mask or a batch of binary masks, where each pixel value is rounded to the nearest binary value (0 or 1), ensuring clear and distinct boundaries.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class RoundMask:
    @classmethod
    def INPUT_TYPES(s):
        return {"required": {
            "mask": ("MASK",),  
        }}

    RETURN_TYPES = ("MASK",)
    FUNCTION = "round"
    CATEGORY = "KJNodes/masking"
    DESCRIPTION = """
Rounds the mask or batch of masks to a binary mask.  
<img src="https://github.com/kijai/ComfyUI-KJNodes/assets/40791699/52c85202-f74e-4b96-9dac-c8bda5ddcc40" width="300" height="250" alt="RoundMask example">

"""

    def round(self, mask):
        mask = mask.round()
        return (mask,)

```
