---
tags:
- Mask
- MaskGeneration
---

# SolidMask
## Documentation
- Class name: `SolidMask`
- Category: `mask`
- Output node: `False`

The SolidMask node generates a uniform mask with a specified value across its entire area. It's designed to create masks of specific dimensions and intensity, useful in various image processing and masking tasks.
## Input types
### Required
- **`value`**
    - Specifies the intensity value of the mask, affecting its overall appearance and utility in subsequent operations.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`width`**
    - Determines the width of the generated mask, directly influencing its size and aspect ratio.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`height`**
    - Sets the height of the generated mask, affecting its size and aspect ratio.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`mask`**
    - Comfy dtype: `MASK`
    - Outputs a uniform mask with the specified dimensions and value.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `CPU`
- Common nodes:
    - [MaskComposite](../../Comfy/Nodes/MaskComposite.md)
    - [MaskToImage](../../Comfy/Nodes/MaskToImage.md)
    - [FeatherMask](../../Comfy/Nodes/FeatherMask.md)



## Source code
```python
class SolidMask:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "value": ("FLOAT", {"default": 1.0, "min": 0.0, "max": 1.0, "step": 0.01}),
                "width": ("INT", {"default": 512, "min": 1, "max": MAX_RESOLUTION, "step": 1}),
                "height": ("INT", {"default": 512, "min": 1, "max": MAX_RESOLUTION, "step": 1}),
            }
        }

    CATEGORY = "mask"

    RETURN_TYPES = ("MASK",)

    FUNCTION = "solid"

    def solid(self, value, width, height):
        out = torch.full((1, height, width), value, dtype=torch.float32, device="cpu")
        return (out,)

```
