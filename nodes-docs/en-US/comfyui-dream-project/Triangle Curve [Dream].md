---
tags:
- AnimationScheduling
- Curve
---

# 📈 Triangle Curve
## Documentation
- Class name: `Triangle Curve [Dream]`
- Category: `✨ Dream/🎥 animation/📈 curves`
- Output node: `False`

The Triangle Curve node generates a triangular waveform based on the current frame's time, allowing for the creation of animations with linear ascending and descending values within a specified periodicity and phase. This node is ideal for creating cyclic animations with a clear, predictable pattern.
## Input types
### Required
- **`frame_counter`**
    - Represents the current frame in the animation, used to calculate the current time in seconds for waveform generation.
    - Comfy dtype: `FRAME_COUNTER`
    - Python dtype: `FrameCounter`
- **`max_value`**
    - The maximum value the triangle wave can reach, defining the peak of the waveform.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`min_value`**
    - The minimum value the triangle wave can reach, defining the trough of the waveform.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`periodicity_seconds`**
    - The duration in seconds for one complete cycle of the triangle wave, determining its frequency.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`phase`**
    - Adjusts the starting point of the wave within its cycle, allowing for phase shifts in the waveform.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
## Output types
- **`FLOAT`**
    - Comfy dtype: `FLOAT`
    - The calculated float value of the triangle wave at the current frame's time.
    - Python dtype: `float`
- **`INT`**
    - Comfy dtype: `INT`
    - The integer representation of the calculated triangle wave value, rounded to the nearest whole number.
    - Python dtype: `int`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class DreamTriangleWave:
    NODE_NAME = "Triangle Curve"

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": SharedTypes.frame_counter | {
                "max_value": ("FLOAT", {"default": 1.0, "multiline": False}),
                "min_value": ("FLOAT", {"default": 0.0, "multiline": False}),
                "periodicity_seconds": ("FLOAT", {"default": 10.0, "multiline": False, "min": 0.01}),
                "phase": ("FLOAT", {"default": 0.0, "multiline": False, "min": -1, "max": 1}),
            },
        }

    CATEGORY = NodeCategories.ANIMATION_CURVES
    RETURN_TYPES = ("FLOAT", "INT")
    RETURN_NAMES = ("FLOAT", "INT")
    FUNCTION = "result"

    @classmethod
    def IS_CHANGED(cls, *values):
        return hashed_as_strings(*values)

    def result(self, frame_counter: FrameCounter, max_value, min_value, periodicity_seconds, phase):
        x = frame_counter.current_time_in_seconds
        x = ((x + periodicity_seconds * phase) % periodicity_seconds) / periodicity_seconds
        if x <= 0.5:
            x *= 2
            y = x * (max_value - min_value) + min_value
        else:
            x = (x - 0.5) * 2
            y = max_value - x * (max_value - min_value)
        return _curve_result(y)

```
