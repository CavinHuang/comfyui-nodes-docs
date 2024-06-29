---
tags:
- ImageTransformation
---

# RemapReverseBarrelDistortion
## Documentation
- Class name: `RemapReverseBarrelDistortion`
- Category: `Bmad/CV/Transform`
- Output node: `False`

This node is designed to apply a reverse barrel distortion effect to images. It utilizes parameters to adjust the distortion effect, allowing for the correction of images that have been distorted by a barrel distortion, typically caused by lens imperfections.
## Input types
### Required
- **`a`**
    - Coefficient 'a' influences the primary distortion effect, playing a crucial role in the reverse barrel distortion correction process. Its value directly alters the curvature of the image, impacting the intensity of the correction applied.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`b`**
    - Coefficient 'b' modifies the distortion effect alongside 'a' and 'c', contributing to the fine-tuning of the reverse barrel distortion. It adjusts the mid-range distortion, balancing the correction between center and edge.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`c`**
    - Coefficient 'c' works in conjunction with 'a' and 'b' to adjust the distortion effect, essential for achieving the desired reverse barrel distortion correction. It primarily affects the edge distortion, fine-tuning the correction's extent.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`use_inverse_variant`**
    - This boolean parameter determines whether an inverse variant of the distortion formula is used, affecting the overall distortion correction. Choosing the inverse variant can alter the correction method, potentially leading to different visual outcomes.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
### Optional
- **`d`**
    - An optional coefficient that further refines the distortion effect, providing additional control over the reverse barrel distortion correction. When specified, it offers a higher degree of customization for the correction process.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float | None`
## Output types
- **`remap`**
    - Comfy dtype: `REMAP`
    - The output is a remapped image where the reverse barrel distortion has been applied, correcting the original distortion.
    - Python dtype: `ndarray`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class RemapReverseBarrelDistortion(RemapBase):
    @classmethod
    def INPUT_TYPES(s):
        return RemapBarrelDistortion.BARREL_DIST_TYPES()

    def send_remap(self, a, b, c, use_inverse_variant, d=None):
        from .utils.remaps import remap_reverse_barrel_distortion
        return ({
                    "func": remap_reverse_barrel_distortion,
                    "xargs": [a, b, c, d, use_inverse_variant]
                },)

```
