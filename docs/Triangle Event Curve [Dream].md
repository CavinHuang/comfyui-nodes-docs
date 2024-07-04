
# Documentation
- Class name: Triangle Event Curve [Dream]
- Category: ✨ Dream/🎥 animation/📈 curves
- Output node: False

Triangle Event Curve节点生成一个三角形状的时间曲线，专为创建动态的、事件驱动的动画而设计。它根据帧计数器和定义曲线峰值、宽度和中心的参数计算值，适用于定时动画和过渡效果。

# Input types
## Required
- frame_counter
    - 表示动画中的当前帧，用于计算给定时间点的曲线值。
    - Comfy dtype: FRAME_COUNTER
    - Python dtype: FrameCounter
- max_value
    - 三角曲线的峰值，定义其最大高度。
    - Comfy dtype: FLOAT
    - Python dtype: float
- min_value
    - 三角曲线的基准值，定义其最小高度。
    - Comfy dtype: FLOAT
    - Python dtype: float
- width_seconds
    - 从基准值达到三角曲线峰值所需的持续时间（以秒为单位）。
    - Comfy dtype: FLOAT
    - Python dtype: float
- center_seconds
    - 三角曲线峰值出现的时间点（以秒为单位）。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- FLOAT
    - 当前帧计算得出的曲线浮点值。
    - Comfy dtype: FLOAT
    - Python dtype: float
- INT
    - 当前帧计算得出的曲线值的整数表示。
    - Comfy dtype: INT
    - Python dtype: int


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class DreamTriangleEvent:
    NODE_NAME = "Triangle Event Curve"

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": SharedTypes.frame_counter | {
                "max_value": ("FLOAT", {"default": 1.0, "multiline": False}),
                "min_value": ("FLOAT", {"default": 0.0, "multiline": False}),
                "width_seconds": ("FLOAT", {"default": 1.0, "multiline": False, "min": 0.1}),
                "center_seconds": ("FLOAT", {"default": 10.0, "multiline": False, "min": 0.0}),
            },
        }

    CATEGORY = NodeCategories.ANIMATION_CURVES
    RETURN_TYPES = ("FLOAT", "INT")
    RETURN_NAMES = ("FLOAT", "INT")
    FUNCTION = "result"

    @classmethod
    def IS_CHANGED(cls, *values):
        return hashed_as_strings(*values)

    def result(self, frame_counter: FrameCounter, max_value, min_value, width_seconds, center_seconds):
        x = frame_counter.current_time_in_seconds
        start = center_seconds - width_seconds * 0.5
        end = center_seconds + width_seconds * 0.5
        if start <= x <= center_seconds:
            y = _linear_value_calc(x, start, center_seconds, min_value, max_value)
        elif center_seconds < x <= end:
            y = _linear_value_calc(x, center_seconds, end, max_value, min_value)
        else:
            y = min_value
        return _curve_result(y)

```
