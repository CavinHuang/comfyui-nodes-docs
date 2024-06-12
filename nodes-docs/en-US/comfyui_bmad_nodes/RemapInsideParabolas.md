---
tags:
- ImageTransformation
---

# RemapInsideParabolas
## Documentation
- Class name: `RemapInsideParabolas`
- Category: `Bmad/CV/Transform`
- Output node: `False`

This node is designed to perform a remapping operation based on the geometry of two parabolas within an image. It adjusts the image's pixels according to the specified parabolas, aiming to transform or correct the image's perspective or distortion in a way that aligns with these curves.
## Input types
### Required
- **`dst_mask_with_i_parabolas`**
    - Specifies the destination mask that contains parabolas. This mask is crucial for determining the transformation's geometry and guiding the remapping process.
    - Comfy dtype: `MASK`
    - Python dtype: `numpy.ndarray`
## Output types
- **`remap`**
    - Comfy dtype: `REMAP`
    - The output is a transformed version of the input image, adjusted according to the geometry of the specified parabolas.
    - Python dtype: `Dict[str, Any]`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class RemapInsideParabolas(RemapBase):
    @classmethod
    def INPUT_TYPES(s):
        return {"required": {
            "dst_mask_with_2_parabolas": ("MASK",),
        }
        }

    def send_remap(self, dst_mask_with_2_parabolas):
        from .utils.remaps import remap_inside_parabolas_simple
        return ({
                    "func": remap_inside_parabolas_simple,
                    "xargs": [tensor2opencv(dst_mask_with_2_parabolas, 1)],
                    "dims": RemapBase.get_dims(dst_mask_with_2_parabolas)
                },)

```
