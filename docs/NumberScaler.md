
# Documentation
- Class name: NumberScaler
- Category: Art Venture/Utils
- Output node: False

NumberScaler节点旨在将一个数值从指定范围缩放到新的范围内，有效地根据提供的最小和最大边界对数值进行归一化或反归一化处理。

# Input types
## Required
- min
    - 指定原始范围的最小值。它为输入值的缩放设定了下限。
    - Comfy dtype: FLOAT
    - Python dtype: float
- max
    - 定义原始范围的最大值。它为输入值的缩放设定了上限。
    - Comfy dtype: FLOAT
    - Python dtype: float
- scale_to_min
    - 确定目标缩放范围的最小值。它影响输出缩放值的下限。
    - Comfy dtype: FLOAT
    - Python dtype: float
- scale_to_max
    - 设置目标缩放范围的最大值。它影响输出缩放值的上限。
    - Comfy dtype: FLOAT
    - Python dtype: float
- value
    - 需要从原始范围缩放到目标范围的数值。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- float
    - 经过调整以适应新指定范围的缩放后数值。
    - Comfy dtype: FLOAT
    - Python dtype: float


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class UtilNumberScaler:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "min": ("FLOAT", {"default": 1.0, "min": 0.0, "max": 0xFFFFFFFFFFFFFFFF}),
                "max": ("FLOAT", {"default": 10.0, "min": 0.0, "max": 0xFFFFFFFFFFFFFFFF}),
                "scale_to_min": ("FLOAT", {"default": 0.0, "min": 0.0, "max": 0xFFFFFFFFFFFFFFFF}),
                "scale_to_max": ("FLOAT", {"default": 1.0, "min": 0.0, "max": 0xFFFFFFFFFFFFFFFF}),
                "value": ("FLOAT", {"default": 0.0, "min": 0.0, "max": 0xFFFFFFFFFFFFFFFF}),
            }
        }

    RETURN_TYPES = ("FLOAT",)
    CATEGORY = "Art Venture/Utils"
    FUNCTION = "scale_number"

    def scale_number(self, min: float, max: float, scale_to_min: float, scale_to_max: float, value: float):
        num = (value - min) / (max - min) * (scale_to_max - scale_to_min) + scale_to_min
        return (num,)

```
