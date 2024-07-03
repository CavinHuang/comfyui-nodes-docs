
# Documentation
- Class name: RemapToQuadrilateral
- Category: Bmad/CV/Transform
- Output node: False

RemapToQuadrilateral节点专门用于基于四边形形状对图像进行变换。它可以调整图像的透视效果，或将图像映射到四边形形状上或从四边形形状映射回来，采用包括单应性在内的多种方法。

# Input types
## Required
- dst_mask_with_i_points
    - 指定带有四个点的目标掩码，这四个点定义了图像将被重新映射到的四边形。这个输入对于确定变换的目标几何形状至关重要。
    - Comfy dtype: MASK
    - Python dtype: ndarray
- mode
    - 定义用于重新映射过程的方法，如单应性或其他四边形重映射技术。模式的选择会影响图像的变换方式。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str

# Output types
- remap
    - 提供重映射过程的详细信息，包括变换后的图像和应用的任何相关几何变换。
    - Comfy dtype: REMAP
    - Python dtype: tuple
- ui
    - 输出包括根据指定的四边形形状和重映射方法变换后的图像。


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
