
# Documentation
- Class name: Frame Counter Time Offset [Dream]
- Category: ✨ Dream/🎥 animation
- Output node: False

这个节点用于对帧计数器应用基于时间的偏移，根据指定的秒数有效地调整当前帧。它旨在通过将时间转换为等效的帧计数增量来促进动画时间调整，利用帧速率实现精确同步。

# Input types
## Required
- frame_counter
    - 需要调整的帧计数器。它作为应用时间偏移的基础，决定新的帧位置。
    - Comfy dtype: FRAME_COUNTER
    - Python dtype: FrameCounter
- offset_seconds
    - 用于偏移帧计数器的时间长度（以秒为单位）。该值会与帧速率相乘，以计算出需要调整的等效帧数。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- frame_counter
    - 经过调整的帧计数器，增加了指定时间偏移所对应的计算帧数。
    - Comfy dtype: FRAME_COUNTER
    - Python dtype: FrameCounter


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class DreamFrameCounterTimeOffset:
    NODE_NAME = "Frame Counter Time Offset"

    ICON = "±"

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": SharedTypes.frame_counter | {
                "offset_seconds": ("FLOAT", {"default": 0.0}),
            },
        }

    CATEGORY = NodeCategories.ANIMATION
    RETURN_TYPES = (FrameCounter.ID,)
    RETURN_NAMES = ("frame_counter",)
    FUNCTION = "result"

    @classmethod
    def IS_CHANGED(cls, frame_counter, offset):
        return hashed_as_strings(frame_counter, offset)

    def result(self, frame_counter: FrameCounter, offset_seconds):
        offset = offset_seconds * frame_counter.frames_per_second
        return (frame_counter.incremented(offset),)

```
