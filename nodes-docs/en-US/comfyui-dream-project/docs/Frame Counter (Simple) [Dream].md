---
tags:
- AnimationScheduling
- Frame
---

# ⚋ Frame Counter (Simple)
## Documentation
- Class name: `Frame Counter (Simple) [Dream]`
- Category: `✨ Dream/🎥 animation`
- Output node: `False`

This node generates a frame counter based on the specified frame index, total number of frames, and frames per second. It is designed to facilitate animation processes by tracking and managing frame progression.
## Input types
### Required
- **`frame_index`**
    - Specifies the current frame index. It is crucial for determining the starting point of the frame counter.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`total_frames`**
    - Defines the total number of frames in the animation sequence. It sets the upper limit for the frame counter.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`frames_per_second`**
    - Determines the frame rate by specifying the number of frames to be played per second. This affects the timing and speed of the animation.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`frame_counter`**
    - Comfy dtype: `FRAME_COUNTER`
    - Outputs a FrameCounter object initialized with the current frame, total frames, and frames per second, facilitating further animation control.
    - Python dtype: `FrameCounter`
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
