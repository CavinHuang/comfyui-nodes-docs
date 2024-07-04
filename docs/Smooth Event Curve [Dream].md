
# Documentation
- Class name: `Smooth Event Curve [Dream]`
- Category: `✨ Dream/🎥 animation/📈 curves`
- Output node: `False`

Smooth Event Curve节点旨在根据帧计数器生成平滑过渡的曲线，有助于创建具有平滑开始和结束的动画。它在指定的范围和时间框架内计算值，并应用平滑算法以确保渐进过渡。

# Input types
## Required
- frame_counter
    - 帧计数器对于确定当前时间（以秒为单位）至关重要，用于计算曲线上的位置。它通过决定曲线进展的时间来影响节点的执行。
    - Comfy dtype: FRAME_COUNTER
    - Python dtype: FrameCounter
- max_value
    - 指定曲线可以达到的最大值，在定义曲线振幅方面起着至关重要的作用。
    - Comfy dtype: FLOAT
    - Python dtype: float
- min_value
    - 定义曲线的最小值，设置曲线可以开始的基线。
    - Comfy dtype: FLOAT
    - Python dtype: float
- width_seconds
    - 决定曲线的宽度（以秒为单位），影响平滑过渡的持续时间。
    - Comfy dtype: FLOAT
    - Python dtype: float
- center_seconds
    - 设置曲线的中心点（以秒为单位），平滑过渡围绕这个点进行。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- FLOAT
    - 曲线计算的浮点结果，表示当前帧的平滑值。
    - Comfy dtype: FLOAT
    - Python dtype: float
- INT
    - 曲线计算值的整数表示，为需要整数值的应用提供离散化输出。
    - Comfy dtype: INT
    - Python dtype: int


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class DreamSmoothEvent:
    NODE_NAME = "Smooth Event Curve"

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
            y = _linear_value_calc(x, start, center_seconds, 0.0, 1.0)
        elif center_seconds < x <= end:
            y = _linear_value_calc(x, center_seconds, end, 1.0, 0.0)
        else:
            y = 0.0
        if y < 0.5:
            y = ((y + y) * (y + y)) * 0.5
        else:
            a = (y - 0.5) * 2
            y = math.pow(a, 0.25) * 0.5 + 0.5
        return _curve_result(y * (max_value - min_value) + min_value)

```
