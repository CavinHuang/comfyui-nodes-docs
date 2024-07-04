
# Documentation
- Class name: RemapToOuterCylinder
- Category: Bmad/CV/Transform
- Output node: False

RemapToOuterCylinder节点旨在将图像转换为映射到虚拟外部圆柱体表面的形式。它调整图像的透视效果，模拟图像包裹在圆柱体表面上的视觉效果，同时考虑视场角度以及是否需要交换x和y坐标。

# Input types
## Required
- fov
    - 指定视场角度（以度为单位），这个参数影响重映射图像的曲率和透视效果。
    - Comfy dtype: INT
    - Python dtype: int
- swap_xy
    - 决定是否交换x和y坐标，这会影响重映射图像的方向。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool

# Output types
- remap
    - 提供x和y坐标到原始图像像素的映射，用于将图像转换到外部圆柱体表面。
    - Comfy dtype: REMAP
    - Python dtype: Tuple[ndarray, ndarray, NoneType]


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
