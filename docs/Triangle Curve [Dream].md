
# Documentation
- Class name: `Triangle Curve [Dream]`
- Category: `✨ Dream/🎥 animation/📈 curves`
- Output node: `False`

Triangle Curve节点生成基于当前帧时间的三角波形，允许在指定的周期和相位内创建具有线性上升和下降值的动画。该节点非常适合创建具有清晰、可预测模式的周期性动画。

# Input types
## Required
- frame_counter
    - 表示动画中的当前帧，用于计算波形生成的当前时间（以秒为单位）。
    - Comfy dtype: FRAME_COUNTER
    - Python dtype: FrameCounter
- max_value
    - 三角波可以达到的最大值，定义了波形的峰值。
    - Comfy dtype: FLOAT
    - Python dtype: float
- min_value
    - 三角波可以达到的最小值，定义了波形的谷值。
    - Comfy dtype: FLOAT
    - Python dtype: float
- periodicity_seconds
    - 三角波一个完整周期的持续时间（以秒为单位），决定了其频率。
    - Comfy dtype: FLOAT
    - Python dtype: float
- phase
    - 调整波形在其周期内的起始点，允许波形进行相位偏移。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- FLOAT
    - 当前帧时间下计算得出的三角波浮点值。
    - Comfy dtype: FLOAT
    - Python dtype: float
- INT
    - 计算得出的三角波值的整数表示，四舍五入到最接近的整数。
    - Comfy dtype: INT
    - Python dtype: int


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class DreamTriangleWave:
    NODE_NAME = "Triangle Curve"

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
        if x <= 0.5:
            x *= 2
            y = x * (max_value - min_value) + min_value
        else:
            x = (x - 0.5) * 2
            y = max_value - x * (max_value - min_value)
        return _curve_result(y)

```
