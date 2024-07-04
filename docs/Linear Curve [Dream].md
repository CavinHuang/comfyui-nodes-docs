
# Documentation
- Class name: Linear Curve [Dream]
- Category: ✨ Dream/🎥 animation/📈 curves
- Output node: False

Linear Curve节点提供了一个在初始值和最终值之间的线性插值，这个插值基于一系列帧。它通常用于创建平滑的过渡或动画效果。

# Input types
## Required
- frame_counter
    - 用于追踪帧的进度，决定了插值过程中的当前位置。它是整个插值过程的关键，直接影响输出值的计算。
    - Comfy dtype: FRAME_COUNTER
    - Python dtype: FrameCounter
- initial_value
    - 指定线性插值的起始值，作为动画或过渡的基础。这个值决定了插值的起点，对整个过程的初始状态至关重要。
    - Comfy dtype: FLOAT
    - Python dtype: float
- final_value
    - 定义线性插值的终点值，确定动画或过渡的目标。这个值设定了插值的最终状态，对整个过程的结果有决定性影响。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- FLOAT
    - 输出当前帧的插值浮点数，反映了线性进程的状态。这个值可以用于需要精确小数的场景。
    - Comfy dtype: FLOAT
    - Python dtype: float
- INT
    - 输出四舍五入到最近整数的插值，提供了进程的离散步骤。这个值适用于需要整数输出的场景。
    - Comfy dtype: INT
    - Python dtype: int


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class DreamLinear:
    NODE_NAME = "Linear Curve"

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": SharedTypes.frame_counter | {
                "initial_value": ("FLOAT", {"default": 0.0, "multiline": False}),
                "final_value": ("FLOAT", {"default": 100.0, "multiline": False}),
            },
        }

    CATEGORY = NodeCategories.ANIMATION_CURVES
    RETURN_TYPES = ("FLOAT", "INT")
    RETURN_NAMES = ("FLOAT", "INT")
    FUNCTION = "result"

    @classmethod
    def IS_CHANGED(cls, *values):
        return hashed_as_strings(*values)

    def result(self, initial_value, final_value, frame_counter: FrameCounter):
        d = final_value - initial_value
        v = initial_value + frame_counter.progress * d
        return (v, int(round(v)))

```
