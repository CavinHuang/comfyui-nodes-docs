---
tags:
- Flip
- Image
- ImageTransformation
---

# 🔧 Mask Flip
## Documentation
- Class name: `MaskFlip+`
- Category: `essentials`
- Output node: `False`

The MaskFlip node is designed to flip a given mask along specified axes, allowing for the manipulation of mask orientation in image processing tasks.
## Input types
### Required
- **`mask`**
    - The mask to be flipped. This parameter is crucial as it determines the input mask that will undergo the flipping operation.
    - Comfy dtype: `MASK`
    - Python dtype: `torch.Tensor`
- **`axis`**
    - Specifies the axis or axes along which the mask will be flipped. This affects the direction of the flip, enabling horizontal, vertical, or both flips.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `Tuple[str]`
## Output types
- **`mask`**
    - Comfy dtype: `MASK`
    - The flipped version of the input mask, altered according to the specified axis or axes.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class MaskFlip:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "mask": ("MASK",),
                "axis": (["x", "y", "xy"],),
            }
        }

    RETURN_TYPES = ("MASK",)
    FUNCTION = "execute"
    CATEGORY = "essentials"

    def execute(self, mask, axis):
        dim = ()
        if "y" in axis:
            dim += (1,)
        if "x" in axis:
            dim += (2,)
        mask = torch.flip(mask, dims=dim)

        return(mask,)

```
