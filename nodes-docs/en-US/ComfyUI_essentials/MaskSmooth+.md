---
tags:
- Blur
- MaskBlur
- VisualEffects
---

# 🔧 Mask Smooth
## Documentation
- Class name: `MaskSmooth+`
- Category: `essentials`
- Output node: `False`

The MaskSmooth node is designed to apply a Gaussian blur to a given mask, with the intensity of the blur adjustable by the user. This process smooths the edges of the mask, creating a more visually appealing and less jagged appearance.
## Input types
### Required
- **`mask`**
    - The mask input represents the binary or grayscale image to which the Gaussian blur will be applied. It is central to achieving the smoothing effect.
    - Comfy dtype: `MASK`
    - Python dtype: `torch.Tensor`
- **`amount`**
    - The amount parameter controls the intensity of the Gaussian blur applied to the mask. A higher value results in a more pronounced smoothing effect.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`mask`**
    - Comfy dtype: `MASK`
    - The output is a modified version of the input mask, having undergone Gaussian blurring to smooth its edges.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class MaskSmooth:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "mask": ("MASK",),
                "amount": ("INT", { "default": 0, "min": 0, "max": 127, "step": 1, }),
            }
        }

    RETURN_TYPES = ("MASK",)
    FUNCTION = "execute"
    CATEGORY = "essentials"

    def execute(self, mask, amount):
        if amount == 0:
            return (mask,)
        
        if amount % 2 == 0:
            amount += 1

        mask = mask > 0.5
        mask = T.functional.gaussian_blur(mask.unsqueeze(1), amount).squeeze(1).float()

        return (mask,)

```
