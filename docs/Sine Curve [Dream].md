
# Documentation
- Class name: Sine Curve [Dream]
- Category: ✨ Dream/🎥 animation/📈 curves
- Output node: False

'Sine Curve'节点基于动画帧数据生成正弦波，用于创建动态视觉效果。它通过最大值、最小值、周期和相位等参数来调整正弦波的幅度和频率。

# Input types
## Required
- frame_counter
    - frame_counter参数根据动画的帧率跟踪当前时间（以秒为单位），作为计算正弦波位置的基础。
    - Comfy dtype: FRAME_COUNTER
    - Python dtype: FrameCounter
- max_value
    - max_value参数指定正弦波的最大幅度，定义了它能达到的峰值。
    - Comfy dtype: FLOAT
    - Python dtype: float
- min_value
    - min_value参数确定正弦波的最小幅度，设置了它可以下降到的最低值。
    - Comfy dtype: FLOAT
    - Python dtype: float
- periodicity_seconds
    - periodicity_seconds参数控制正弦波的周期，影响它完成一个完整周期的速度。
    - Comfy dtype: FLOAT
    - Python dtype: float
- phase
    - phase参数调整正弦波的相位，改变其在周期内的起始位置。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- FLOAT
    - 输出当前帧计算得到的正弦波值，为浮点数。
    - Comfy dtype: FLOAT
    - Python dtype: float
- INT
    - 输出正弦波值四舍五入后的整数，适用于离散动画或效果。
    - Comfy dtype: INT
    - Python dtype: int


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class DreamSineWave:
    NODE_NAME = "Sine Curve"

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": SharedTypes.frame_counter | {
                "max_value": ("FLOAT", {"default": 1.0, "multiline": False}),
                "min_value": ("FLOAT", {"default": 0.0, "multiline": False}),
                "periodicity_seconds": ("FLOAT", {"default": 10.0, "multiline": False, "min": 0.01}),
                "phase": ("FLOAT", {"default": 0.0, "multiline": False, "min": -1, "max": 1}),
            },
        }

    CATEGORY = NodeCategories.ANIMATION_CURVES
    RETURN_TYPES = ("FLOAT", "INT")
    RETURN_NAMES = ("FLOAT", "INT")
    FUNCTION = "result"

    @classmethod
    def IS_CHANGED(cls, *values):
        return hashed_as_strings(*values)

    def result(self, frame_counter: FrameCounter, max_value, min_value, periodicity_seconds, phase):
        x = frame_counter.current_time_in_seconds
        a = (max_value - min_value) * 0.5
        c = phase
        b = 2 * math.pi / periodicity_seconds
        d = (max_value + min_value) / 2
        y = a * math.sin(b * (x + c)) + d
        return _curve_result(y)

```
