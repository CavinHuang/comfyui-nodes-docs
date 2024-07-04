
# Documentation
- Class name: `Frame Counter Info [Dream]`
- Category: `✨ Dream/🎥 animation`
- Output node: `False`

Frame Counter Info [Dream]节点提供了动画上下文中帧计数器当前状态的详细信息,包括已完成帧数、总帧数以及各种基于时间的指标。

# Input types
## Required
- frame_counter
    - 这是一个帧计数器对象，用于跟踪动画序列中的当前帧、总帧数和时间信息。它是获取动画进度和状态信息的核心输入。
    - Comfy dtype: FRAME_COUNTER
    - Python dtype: FrameCounter

# Output types
- frames_completed
    - 表示已经完成的帧数。这个输出可以用来跟踪动画的进度。
    - Comfy dtype: INT
    - Python dtype: int
- total_frames
    - 表示动画序列中的总帧数。这个输出定义了整个动画的长度。
    - Comfy dtype: INT
    - Python dtype: int
- first_frame
    - 一个布尔值，指示当前帧是否是第一帧。这对于初始化或特殊的开始处理很有用。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool
- last_frame
    - 一个布尔值，指示当前帧是否是最后一帧。这对于结束处理或最终操作很有用。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool
- elapsed_seconds
    - 表示自动画开始以来经过的时间（以秒为单位）。这可用于计时或进度跟踪。
    - Comfy dtype: FLOAT
    - Python dtype: float
- remaining_seconds
    - 估计动画完成前剩余的时间（以秒为单位）。这对于预估完成时间很有帮助。
    - Comfy dtype: FLOAT
    - Python dtype: float
- total_seconds
    - 表示整个动画的总时间（以秒为单位）。这定义了动画的总持续时间。
    - Comfy dtype: FLOAT
    - Python dtype: float
- completion
    - 表示动画的完成百分比。这是一个介于0和1之间的浮点数，可用于显示进度条或其他可视化。
    - Comfy dtype: FLOAT
    - Python dtype: float


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class DreamFrameCounterInfo:
    NODE_NAME = "Frame Counter Info"
    ICON = "⚋"

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": SharedTypes.frame_counter
        }

    CATEGORY = NodeCategories.ANIMATION
    RETURN_TYPES = ("INT", "INT", "BOOLEAN", "BOOLEAN", "FLOAT", "FLOAT", "FLOAT", "FLOAT")
    RETURN_NAMES = ("frames_completed", "total_frames", "first_frame", "last_frame",
                    "elapsed_seconds", "remaining_seconds", "total_seconds", "completion")
    FUNCTION = "result"

    @classmethod
    def IS_CHANGED(cls, *v):
        return ALWAYS_CHANGED_FLAG

    def result(self, frame_counter: FrameCounter):
        return (frame_counter.current_frame,
                frame_counter.total_frames,
                frame_counter.is_first_frame,
                frame_counter.is_final_frame,
                frame_counter.current_time_in_seconds,
                frame_counter.remaining_time_in_seconds,
                frame_counter.total_time_in_seconds,
                frame_counter.current_time_in_seconds / max(0.01, frame_counter.total_time_in_seconds))

```
