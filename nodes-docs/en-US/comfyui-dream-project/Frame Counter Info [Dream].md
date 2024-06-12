---
tags:
- AnimationScheduling
- Frame
---

# ⚋ Frame Counter Info
## Documentation
- Class name: `Frame Counter Info [Dream]`
- Category: `✨ Dream/🎥 animation`
- Output node: `False`

Provides detailed information about the current state of a frame counter in an animation context, including completed frames, total frames, and various time-based metrics.
## Input types
### Required
- **`frame_counter`**
    - The frame counter object that tracks the current frame, total frames, and timing information for an animation sequence.
    - Comfy dtype: `FRAME_COUNTER`
    - Python dtype: `FrameCounter`
## Output types
- **`frames_completed`**
    - Comfy dtype: `INT`
    - The number of frames that have been completed.
    - Python dtype: `int`
- **`total_frames`**
    - Comfy dtype: `INT`
    - The total number of frames in the animation sequence.
    - Python dtype: `int`
- **`first_frame`**
    - Comfy dtype: `BOOLEAN`
    - A boolean indicating if the current frame is the first frame.
    - Python dtype: `bool`
- **`last_frame`**
    - Comfy dtype: `BOOLEAN`
    - A boolean indicating if the current frame is the last frame.
    - Python dtype: `bool`
- **`elapsed_seconds`**
    - Comfy dtype: `FLOAT`
    - The elapsed time in seconds since the animation started.
    - Python dtype: `float`
- **`remaining_seconds`**
    - Comfy dtype: `FLOAT`
    - The estimated remaining time in seconds until the animation completes.
    - Python dtype: `float`
- **`total_seconds`**
    - Comfy dtype: `FLOAT`
    - The total time in seconds for the animation.
    - Python dtype: `float`
- **`completion`**
    - Comfy dtype: `FLOAT`
    - The completion percentage of the animation.
    - Python dtype: `float`
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
