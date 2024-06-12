---
tags:
- ImageTransformation
---

# RemapInsideParabolasAdvanced
## Documentation
- Class name: `RemapInsideParabolasAdvanced`
- Category: `Bmad/CV/Transform`
- Output node: `False`

This node specializes in remapping images based on the geometry of two parabolas within a given mask. It allows for advanced adjustments to the remapping process, including curve-wise and ortho-wise adjustments, as well as the option to flip the ortho direction, providing a high degree of control over the remapping output.
## Input types
### Required
- **`dst_mask_with_i_parabolas`**
    - Specifies the destination mask containing two parabolas. This mask is used to guide the remapping process, determining how pixels are relocated.
    - Comfy dtype: `MASK`
    - Python dtype: `numpy.ndarray`
- **`curve_wise_adjust`**
    - Adjusts the remapping intensity along the curve of the parabolas, allowing for finer control over the curvature effect in the remapped image.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`ortho_wise_adjust`**
    - Adjusts the remapping intensity orthogonally to the curve of the parabolas, enabling control over the spread of the remapping effect perpendicular to the parabolas' curvature.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`flip_ortho`**
    - Determines whether the orthogonal adjustment direction should be flipped, offering an additional layer of customization to the remapping effect.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
## Output types
- **`remap`**
    - Comfy dtype: `REMAP`
    - The output is a remapped image based on the specified parabolas and adjustments. It reflects the changes in pixel locations as dictated by the input parameters, offering a visually modified version of the original image.
    - Python dtype: `Dict[str, numpy.ndarray]`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class RemapInsideParabolasAdvanced(RemapBase):
    @classmethod
    def INPUT_TYPES(s):
        return {"required": {
            "dst_mask_with_2_parabolas": ("MASK",),
            "curve_wise_adjust": ("FLOAT", {"default": 1, "min": .3, "max": 2, "step": .01}),
            "ortho_wise_adjust": ("FLOAT", {"default": 1, "min": 1, "max": 3, "step": .01}),
            "flip_ortho": ("BOOLEAN", {"default": False})
        }
        }

    def send_remap(self, dst_mask_with_2_parabolas, curve_wise_adjust, ortho_wise_adjust, flip_ortho):
        from .utils.remaps import remap_inside_parabolas_advanced
        return ({
                    "func": remap_inside_parabolas_advanced,
                    "xargs": [tensor2opencv(dst_mask_with_2_parabolas, 1),
                              curve_wise_adjust, ortho_wise_adjust, flip_ortho],
                    "dims": RemapBase.get_dims(dst_mask_with_2_parabolas)
                },)

```
