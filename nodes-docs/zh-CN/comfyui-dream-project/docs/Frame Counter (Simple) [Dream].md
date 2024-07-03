
# Documentation
- Class name: Frame Counter (Simple) [Dream]
- Category: ✨ Dream/🎥 animation
- Output node: False

该节点生成一个基于指定帧索引、总帧数和每秒帧数的帧计数器。它旨在通过跟踪和管理帧进度来辅助动画制作过程。

# Input types
## Required
- frame_index
    - 指定当前帧索引。它对确定帧计数器的起始点至关重要。
    - Comfy dtype: INT
    - Python dtype: int
- total_frames
    - 定义动画序列中的总帧数。它为帧计数器设置上限。
    - Comfy dtype: INT
    - Python dtype: int
- frames_per_second
    - 通过指定每秒播放的帧数来确定帧率。这会影响动画的时间和速度。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- frame_counter
    - 输出一个以当前帧、总帧数和每秒帧数初始化的FrameCounter对象，便于进一步控制动画。
    - Comfy dtype: FRAME_COUNTER
    - Python dtype: FrameCounter


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class DreamSimpleFrameCounter:
    NODE_NAME = "Frame Counter (Simple)"
    ICON = "⚋"

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "frame_index": ("INT", {"min": 0, "default": 0}),
                "total_frames": ("INT", {"default": 100, "min": 1, "max": 24 * 3600 * 60}),
                "frames_per_second": ("INT", {"min": 1, "default": 25}),
            },
        }

    CATEGORY = NodeCategories.ANIMATION
    RETURN_TYPES = (FrameCounter.ID,)
    RETURN_NAMES = ("frame_counter",)
    FUNCTION = "result"

    @classmethod
    def IS_CHANGED(cls, *values):
        return ALWAYS_CHANGED_FLAG

    def result(self, frame_index, total_frames, frames_per_second):
        n = frame_index
        return (FrameCounter(n, total_frames, frames_per_second),)

```
