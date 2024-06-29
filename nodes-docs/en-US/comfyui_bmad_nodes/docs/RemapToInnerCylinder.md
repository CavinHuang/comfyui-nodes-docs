---
tags:
- ImageTransformation
---

# RemapToInnerCylinder
## Documentation
- Class name: `RemapToInnerCylinder`
- Category: `Bmad/CV/Transform`
- Output node: `False`

This node applies a cylindrical remapping to an image, simulating the effect of viewing the image as if it were wrapped around an inner cylinder. It adjusts the image based on the field of view and can optionally swap the x and y axes for different perspectives.
## Input types
### Required
- **`fov`**
    - The field of view in degrees, which determines the curvature of the cylindrical projection. It affects how the image is stretched or compressed to fit the cylinder.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`swap_xy`**
    - A boolean flag that, when set to true, swaps the x and y axes of the image, altering the orientation of the cylindrical projection.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
## Output types
- **`remap`**
    - Comfy dtype: `REMAP`
    - The result of the cylindrical remapping, providing the transformed image as if viewed on the surface of an inner cylinder.
    - Python dtype: `Dict[str, Any]`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class InnerCylinderRemap(RemapBase):
    @classmethod
    def INPUT_TYPES(s):
        return {"required": {
            "fov": ("INT", {"default": 90, "min": 1, "max": 179}),
            "swap_xy": ("BOOLEAN", {"default": False}),
        }
        }

    def send_remap(self, fov, swap_xy):
        from .utils.remaps import remap_inner_cylinder
        return ({
                    "func": remap_inner_cylinder,
                    "xargs": [fov, swap_xy]
                },)

```
