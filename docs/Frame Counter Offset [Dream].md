
# Documentation
- Class name: Frame Counter Offset [Dream]
- Category: ✨ Dream/🎥 animation
- Output node: False

Frame Counter Offset节点用于通过应用指定的偏移值来修改帧计数器。这种调整允许动态改变动画时间线，能够基于原始帧计数创建移位或延迟的动画序列。

# Input types
## Required
- frame_counter
    - 帧计数器输入代表动画帧计数的当前状态，包括当前帧、总帧数和每秒帧数等信息。应用于此计数器的偏移可以向前或向后移动动画时间线。
    - Comfy dtype: FRAME_COUNTER
    - Python dtype: FrameCounter
- offset
    - 偏移参数指定帧计数器应该增加或减少的帧数。这允许调整动画的时间线，有效地移动帧序列。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- frame_counter
    - 修改后的帧计数器，已根据指定的偏移量进行了增加或减少，反映了动画时间线中的新位置。
    - Comfy dtype: FRAME_COUNTER
    - Python dtype: FrameCounter


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class DreamFrameCounterOffset:
    NODE_NAME = "Frame Counter Offset"

    ICON = "±"

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": SharedTypes.frame_counter | {
                "offset": ("INT", {"default": -1}),
            },
        }

    CATEGORY = NodeCategories.ANIMATION
    RETURN_TYPES = (FrameCounter.ID,)
    RETURN_NAMES = ("frame_counter",)
    FUNCTION = "result"

    @classmethod
    def IS_CHANGED(cls, frame_counter, offset):
        return hashed_as_strings(frame_counter, offset)

    def result(self, frame_counter: FrameCounter, offset):
        return (frame_counter.incremented(offset),)

```
