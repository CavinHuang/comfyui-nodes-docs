---
tags:
- Mask
---

# FeatherMask
## Documentation
- Class name: `FeatherMask`
- Category: `mask`
- Output node: `False`

The FeatherMask node applies a feathering effect to the edges of a given mask, smoothly transitioning the mask's edges by adjusting their opacity based on specified distances from each edge. This creates a softer, more blended edge effect.
## Input types
### Required
- **`mask`**
    - The mask to which the feathering effect will be applied. It determines the area of the image that will be affected by the feathering.
    - Comfy dtype: `MASK`
    - Python dtype: `torch.Tensor`
- **`left`**
    - Specifies the distance from the left edge within which the feathering effect will be applied.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`top`**
    - Specifies the distance from the top edge within which the feathering effect will be applied.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`right`**
    - Specifies the distance from the right edge within which the feathering effect will be applied.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`bottom`**
    - Specifies the distance from the bottom edge within which the feathering effect will be applied.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`mask`**
    - Comfy dtype: `MASK`
    - The output is a modified version of the input mask with a feathering effect applied to its edges.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `CPU`
- Common nodes:
    - [MaskComposite](../../Comfy/Nodes/MaskComposite.md)
    - Reroute



## Source code
```python
class FeatherMask:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "mask": ("MASK",),
                "left": ("INT", {"default": 0, "min": 0, "max": MAX_RESOLUTION, "step": 1}),
                "top": ("INT", {"default": 0, "min": 0, "max": MAX_RESOLUTION, "step": 1}),
                "right": ("INT", {"default": 0, "min": 0, "max": MAX_RESOLUTION, "step": 1}),
                "bottom": ("INT", {"default": 0, "min": 0, "max": MAX_RESOLUTION, "step": 1}),
            }
        }

    CATEGORY = "mask"

    RETURN_TYPES = ("MASK",)

    FUNCTION = "feather"

    def feather(self, mask, left, top, right, bottom):
        output = mask.reshape((-1, mask.shape[-2], mask.shape[-1])).clone()

        left = min(left, output.shape[-1])
        right = min(right, output.shape[-1])
        top = min(top, output.shape[-2])
        bottom = min(bottom, output.shape[-2])

        for x in range(left):
            feather_rate = (x + 1.0) / left
            output[:, :, x] *= feather_rate

        for x in range(right):
            feather_rate = (x + 1) / right
            output[:, :, -x] *= feather_rate

        for y in range(top):
            feather_rate = (y + 1) / top
            output[:, y, :] *= feather_rate

        for y in range(bottom):
            feather_rate = (y + 1) / bottom
            output[:, -y, :] *= feather_rate

        return (output,)

```
