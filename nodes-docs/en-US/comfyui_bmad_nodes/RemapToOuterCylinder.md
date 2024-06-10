---
tags:
- ImageTransformation
---

# RemapToOuterCylinder
## Documentation
- Class name: `RemapToOuterCylinder`
- Category: `Bmad/CV/Transform`
- Output node: `False`

This node is designed to transform an image by mapping it onto the surface of an imaginary outer cylinder. It adjusts the image's perspective to simulate how it would appear wrapped around a cylinder, taking into account the field of view and whether to swap the x and y coordinates.
## Input types
### Required
- **`fov`**
    - Specifies the field of view in degrees, influencing the curvature and perspective of the remapped image.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`swap_xy`**
    - Determines whether the x and y coordinates should be swapped, affecting the orientation of the remapped image.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
## Output types
- **`remap`**
    - Comfy dtype: `REMAP`
    - Provides the mappings for x and y coordinates to the original image pixels, facilitating the transformation of the image onto the outer cylinder's surface.
    - Python dtype: `Tuple[ndarray, ndarray, NoneType]`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class OuterCylinderRemap(RemapBase):
    @classmethod
    def INPUT_TYPES(s):
        return {"required": {
            "fov": ("INT", {"default": 90, "min": 1, "max": 179}),
            "swap_xy": ("BOOLEAN", {"default": False}),
        }
        }

    def send_remap(self, fov, swap_xy):
        from .utils.remaps import remap_outer_cylinder
        return ({
                    "func": remap_outer_cylinder,
                    "xargs": [fov, swap_xy]
                },)

```
