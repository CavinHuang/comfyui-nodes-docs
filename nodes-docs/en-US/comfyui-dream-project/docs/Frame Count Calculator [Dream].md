---
tags:
- AnimationScheduling
- Frame
---

# ⌛ Frame Count Calculator
## Documentation
- Class name: `Frame Count Calculator [Dream]`
- Category: `✨ Dream/🎥 animation`
- Output node: `False`

The Frame Count Calculator node is designed to compute the total number of frames based on a given time duration and frame rate. It takes into account hours, minutes, seconds, and milliseconds to provide a precise frame count, making it essential for animation and video processing tasks where timing and synchronization are critical.
## Input types
### Required
- **`hours`**
    - Specifies the number of hours to be included in the total time duration for which frames are to be calculated. It directly influences the total frame count by contributing to the overall time.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`minutes`**
    - Specifies the number of minutes to be included in the total time duration. This parameter, along with others, determines the total number of frames by contributing to the total time.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`seconds`**
    - Defines the number of seconds to be considered in the total time duration. This is crucial for calculating the precise number of frames, especially in short clips or animations.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`milliseconds`**
    - Includes milliseconds in the total time calculation, allowing for more precise frame count calculations in scenarios requiring high accuracy.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`frames_per_second`**
    - Sets the frame rate per second, which is used to calculate the total number of frames based on the time duration provided. This parameter is essential for determining the animation or video's smoothness and quality.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`TOTAL`**
    - Comfy dtype: `INT`
    - The total number of frames calculated based on the input time duration and frame rate. This output is crucial for planning and synchronizing animations or video sequences.
    - Python dtype: `int`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class DreamFrameCountCalculator:
    NODE_NAME = "Frame Count Calculator"
    ICON = "⌛"

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "hours": ("INT", {"min": 0, "default": 0, "max": 23}),
                "minutes": ("INT", {"min": 0, "default": 0, "max": 59}),
                "seconds": ("INT", {"min": 0, "default": 10, "max": 59}),
                "milliseconds": ("INT", {"min": 0, "default": 0, "max": 59}),
                "frames_per_second": ("INT", {"min": 1, "default": 30})
            },
        }

    CATEGORY = NodeCategories.ANIMATION
    RETURN_TYPES = ("INT",)
    RETURN_NAMES = ("TOTAL",)
    FUNCTION = "result"

    @classmethod
    def IS_CHANGED(cls, *v):
        return ALWAYS_CHANGED_FLAG

    def result(self, hours, minutes, seconds, milliseconds, frames_per_second):
        total_s = seconds + 0.001 * milliseconds + minutes * 60 + hours * 3600
        return (round(total_s * frames_per_second),)

```
