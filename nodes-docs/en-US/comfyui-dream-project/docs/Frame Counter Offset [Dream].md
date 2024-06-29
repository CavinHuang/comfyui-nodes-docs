---
tags:
- AnimationScheduling
- Frame
---

# ± Frame Counter Offset
## Documentation
- Class name: `Frame Counter Offset [Dream]`
- Category: `✨ Dream/🎥 animation`
- Output node: `False`

The Frame Counter Offset node is designed to modify the frame counter by applying a specified offset value. This adjustment allows for the dynamic alteration of animation timelines, enabling the creation of shifted or delayed animation sequences based on the original frame count.
## Input types
### Required
- **`frame_counter`**
    - The frame counter input represents the current state of an animation's frame count, including information such as the current frame, total frames, and frames per second. The offset applied to this counter can shift the animation timeline forward or backward.
    - Comfy dtype: `FRAME_COUNTER`
    - Python dtype: `FrameCounter`
- **`offset`**
    - The offset parameter specifies the number of frames by which the frame counter should be incremented or decremented. This allows for the adjustment of the animation's timeline, effectively shifting the sequence of frames.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`frame_counter`**
    - Comfy dtype: `FRAME_COUNTER`
    - The modified frame counter, which has been incremented or decremented by the specified offset, reflecting the new position in the animation timeline.
    - Python dtype: `FrameCounter`
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
