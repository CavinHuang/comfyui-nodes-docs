
# Documentation
- Class name: RemapToInnerCylinder
- Category: Bmad/CV/Transform
- Output node: False

RemapToInnerCylinder节点对图像应用柱面重映射，模拟将图像包裹在内部圆柱体表面上的观看效果。它根据视场角调整图像，并可选择性地交换x和y轴以获得不同的视角。

# Input types
## Required
- fov
    - 以度为单位的视场角，决定了柱面投影的曲率。它影响图像如何被拉伸或压缩以适应圆柱体。
    - Comfy dtype: INT
    - Python dtype: int
- swap_xy
    - 一个布尔标志，当设置为true时，交换图像的x和y轴，改变柱面投影的方向。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool

# Output types
- remap
    - 柱面重映射的结果，提供了如同在内部圆柱体表面上观看的变换后的图像。
    - Comfy dtype: REMAP
    - Python dtype: Dict[str, Any]


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
