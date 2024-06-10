---
tags:
- ImageTransformation
---

# RemapToQuadrilateral
## Documentation
- Class name: `RemapToQuadrilateral`
- Category: `Bmad/CV/Transform`
- Output node: `False`

This node specializes in transforming images by remapping them based on quadrilateral shapes. It adjusts the perspective of images or maps them to or from a quadrilateral shape, utilizing various methods including homography.
## Input types
### Required
- **`dst_mask_with_i_points`**
    - Specifies the destination mask with four points defining the quadrilateral to which the image will be remapped. This input is crucial for determining the transformation's target geometry.
    - Comfy dtype: `MASK`
    - Python dtype: `ndarray`
- **`mode`**
    - Defines the method used for the remapping process, such as homography or other quadrilateral remapping techniques. The choice of mode affects how the image is transformed.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
## Output types
- **`remap`**
    - Comfy dtype: `REMAP`
    - Provides the details of the remapping process, including the transformed image and any relevant geometric transformations applied.
    - Python dtype: `tuple`
- **`ui`**
    - The output includes a transformed image according to the specified quadrilateral shape and remapping method.
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class RemapQuadrilateral(RemapBase):
    from .utils.remaps import quad_remap_methods_map

    modes_list = list(quad_remap_methods_map.keys())

    @classmethod
    def INPUT_TYPES(s):
        return {"required": {
            "dst_mask_with_4_points": ("MASK",),
            "mode": (s.modes_list, {"default": s.modes_list[0]}),
        }
        }

    @staticmethod
    def homography(custom_data, src, interpolation, mask=None):
        h_matrix, bb = custom_data
        bb_width, bb_height = bb[2] - bb[0], bb[3] - bb[1]
        ret = cv.warpPerspective(src, h_matrix, (bb_width, bb_height), flags=interpolation,
                                 borderMode=cv.BORDER_CONSTANT)
        if mask is not None:
            mask = cv.warpPerspective(mask, h_matrix, (bb_width, bb_height), flags=interpolation,
                                      borderMode=cv.BORDER_CONSTANT)
        return ret, mask, bb

    def send_remap(self, dst_mask_with_4_points, mode):
        from .utils.remaps import remap_quadrilateral
        remap_data = {
            "func": remap_quadrilateral,
            "xargs": [tensor2opencv(dst_mask_with_4_points, 1), mode],
            "dims": RemapBase.get_dims(dst_mask_with_4_points)
        }
        if mode == "HOMOGRAPHY":
            remap_data["custom"] = RemapQuadrilateral.homography
        return (remap_data,)

```
