---
tags:
- ImageTransformation
---

# RemapFromInsideParabolas
## Documentation
- Class name: `RemapFromInsideParabolas`
- Category: `Bmad/CV/Transform`
- Output node: `False`

This node is designed to perform a remapping operation from the perspective of inside two parabolas, transforming an image based on specified parabolic contours and dimensions. It utilizes geometric transformations to adjust the image's representation, aligning it with the curvature and orientation defined by the parabolas.
## Input types
### Required
- **`src_mask_with_i_parabolas`**
    - Specifies the source mask that contains two parabolas, which are used to define the transformation geometry. This mask is crucial for determining how the image will be remapped according to the parabolic contours.
    - Comfy dtype: `MASK`
    - Python dtype: `numpy.ndarray`
- **`width`**
    - Defines the width of the output image after remapping. This parameter allows for adjusting the scale of the transformed image.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`height`**
    - Specifies the height of the output image after remapping, enabling control over the vertical scale of the transformed image.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`remap`**
    - Comfy dtype: `REMAP`
    - The result of the remapping operation, which is an image transformed to align with the specified parabolic contours and dimensions.
    - Python dtype: `Tuple[numpy.ndarray, numpy.ndarray, Tuple[int, int, int, int]]`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class RemapFromInsideParabolas(RemapBase):
    @classmethod
    def INPUT_TYPES(s):
        return {"required": {
            "src_mask_with_2_parabolas": ("MASK",),
            "width": ("INT", {"default": 512, "min": 16, "max": 4096}),
            "height": ("INT", {"default": 512, "min": 16, "max": 4096}),
        }
        }

    def send_remap(self, src_mask_with_2_parabolas, width, height):
        from .utils.remaps import remap_from_inside_parabolas
        return ({
                    "func": remap_from_inside_parabolas,
                    "xargs": [tensor2opencv(src_mask_with_2_parabolas, 1), width, height],
                    "dims": (width, height)
                },)

```
