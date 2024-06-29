---
tags:
- AnimationScheduling
- Frame
---

# ± Frame Counter Time Offset
## Documentation
- Class name: `Frame Counter Time Offset [Dream]`
- Category: `✨ Dream/🎥 animation`
- Output node: `False`

This node applies a time-based offset to a frame counter, effectively adjusting the current frame based on a specified duration in seconds. It's designed to facilitate animation timing adjustments by converting time into an equivalent frame count increment, using the frame rate for accurate synchronization.
## Input types
### Required
- **`frame_counter`**
    - The frame counter to be adjusted. It serves as the basis for applying the time offset, determining the new frame position.
    - Comfy dtype: `FRAME_COUNTER`
    - Python dtype: `FrameCounter`
- **`offset_seconds`**
    - The duration in seconds to offset the frame counter. This value is multiplied by the frame rate to calculate the equivalent frame count to adjust.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
## Output types
- **`frame_counter`**
    - Comfy dtype: `FRAME_COUNTER`
    - The adjusted frame counter, incremented by the calculated frame count equivalent of the specified time offset.
    - Python dtype: `FrameCounter`
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
