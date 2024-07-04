
# Documentation
- Class name: RemapPinch
- Category: Bmad/CV/Transform
- Output node: False

RemapPinch节点用于对图像应用挤压变形效果，允许围绕指定的中心点以不同程度的强度操纵图像几何形状。

# Input types
## Required
- power_x
    - 指定要应用的水平挤压效果的程度。较高的值会产生更明显的挤压效果。
    - Comfy dtype: FLOAT
    - Python dtype: float
- power_y
    - 指定要应用的垂直挤压效果的程度。较高的值会产生更明显的挤压效果。
    - Comfy dtype: FLOAT
    - Python dtype: float
- center_x
    - 确定应用挤压效果的水平中心。取值范围从0到1，代表图像的宽度。
    - Comfy dtype: FLOAT
    - Python dtype: float
- center_y
    - 确定应用挤压效果的垂直中心。取值范围从0到1，代表图像的高度。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- remap
    - 该节点返回一个remap输出，用于将指定的挤压变形效果应用到图像上。
    - Comfy dtype: REMAP
    - Python dtype: Tuple[np.ndarray, np.ndarray, NoneType]


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class RemapPinch(RemapBase):
    INPUT_TYPES_DICT = {
        "required": {
            "power_x": ("FLOAT", {"default": 1, "min": 1, "max": 3, "step": .05}),
            "power_y": ("FLOAT", {"default": 1, "min": 1, "max": 3, "step": .05}),
            "center_x": ("FLOAT", {"default": .5, "min": 0, "max": 1, "step": .05}),
            "center_y": ("FLOAT", {"default": .5, "min": 0, "max": 1, "step": .05}),
        }
    }

    @classmethod
    def INPUT_TYPES(s):
        return RemapPinch.INPUT_TYPES_DICT

    def send_remap(self, power_x, power_y, center_x, center_y):
        from .utils.remaps import remap_pinch_or_stretch
        return ({
                    "func": remap_pinch_or_stretch,
                    "xargs": [(power_x, power_y), (center_x, center_y)]
                },)

```
