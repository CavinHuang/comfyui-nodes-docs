---
tags:
- ImageTransformation
---

# RemapFromQuadrilateral (homography)
## Documentation
- Class name: `RemapFromQuadrilateral (homography)`
- Category: `Bmad/CV/Transform`
- Output node: `False`

The RemapFromQuadrilateral node is designed to transform an image by remapping it from a specified quadrilateral shape to a rectangular shape using homography. This process involves calculating a homography matrix based on the source image's quadrilateral points and the destination rectangle's dimensions, allowing for perspective correction or transformation of the image.
## Input types
### Required
- **`src_mask_with_i_points`**
    - Specifies the source image mask with four points defining the quadrilateral to be transformed. This input is crucial for determining the quadrilateral's corners for the homography calculation.
    - Comfy dtype: `MASK`
    - Python dtype: `ndarray`
- **`width`**
    - Defines the width of the destination rectangle. This parameter influences the scale and aspect ratio of the transformed image.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`height`**
    - Defines the height of the destination rectangle. Along with width, it determines the size and shape of the output image after transformation.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`remap`**
    - Comfy dtype: `REMAP`
    - The output is the transformed image data, remapped from the specified quadrilateral to a rectangular shape, based on the calculated homography matrix. This transformation allows for perspective correction or other adjustments to the image's appearance.
    - Python dtype: `ndarray`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class RemapFromQuadrilateral(RemapBase):
    @classmethod
    def INPUT_TYPES(s):
        return {"required": {
            "src_mask_with_4_points": ("MASK",),
            # "mode": (s.modes_list, {"default": s.modes_list[0]}),
            "width": ("INT", {"default": 512, "min": 16, "max": 4096}),
            "height": ("INT", {"default": 512, "min": 16, "max": 4096}),
        }
        }

    @staticmethod
    def homography(*args):
        ret, mask, bb = RemapQuadrilateral.homography(*args)
        return ret, mask, None

    def send_remap(self, src_mask_with_4_points, width, height):
        from .utils.remaps import remap_from_quadrilateral
        remap_data = {
            "func": remap_from_quadrilateral,
            "xargs": [tensor2opencv(src_mask_with_4_points, 1), width, height],
            "dims": (width, height),  # seems kinda redundant, not sure if should refactor
            "custom": RemapFromQuadrilateral.homography
        }
        return (remap_data,)

```
