
# Documentation
- Class name: Saw Curve [Dream]
- Category: ✨ Dream/🎥 animation/📈 curves
- Output node: False

Saw Curve节点生成一个在指定周期内循环的线性斜坡波形，用于基于帧数和时间创建锯齿波动画。它支持通过最大值、最小值、周期性和相位调整等参数进行自定义。

# Input types
## Required
- frame_counter
    - 表示当前帧数和时间，用作计算锯齿曲线在其周期内位置的基础。
    - Comfy dtype: FRAME_COUNTER
    - Python dtype: FrameCounter
- max_value
    - 锯齿曲线在其周期内可达到的最大值，定义了波形的峰值。
    - Comfy dtype: FLOAT
    - Python dtype: float
- min_value
    - 锯齿曲线可达到的最小值，定义了波形的基线。
    - Comfy dtype: FLOAT
    - Python dtype: float
- periodicity_seconds
    - 锯齿曲线一个完整周期的持续时间（以秒为单位），决定了其频率。
    - Comfy dtype: FLOAT
    - Python dtype: float
- phase
    - 锯齿曲线的相位偏移，允许在其周期内提前或延迟波形。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- FLOAT
    - 当前帧锯齿曲线的计算浮点值。
    - Comfy dtype: FLOAT
    - Python dtype: float
- INT
    - 锯齿曲线当前值的整数表示，由浮点计算结果四舍五入得到。
    - Comfy dtype: INT
    - Python dtype: int


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class DreamSawWave:
    NODE_NAME = "Saw Curve"

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
        x = ((x + periodicity_seconds * phase) % periodicity_seconds) / periodicity_seconds
        y = x * (max_value - min_value) + min_value
        return _curve_result(y)

```
