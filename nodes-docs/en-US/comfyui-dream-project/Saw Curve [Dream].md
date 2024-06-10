---
tags:
- AnimationScheduling
- Curve
---

# 📈 Saw Curve
## Documentation
- Class name: `Saw Curve [Dream]`
- Category: `✨ Dream/🎥 animation/📈 curves`
- Output node: `False`

The Saw Curve node generates a linear ramp waveform that cycles over a specified period, allowing for the creation of sawtooth wave animations based on frame count and time. It supports customization through parameters like maximum and minimum values, periodicity, and phase adjustment.
## Input types
### Required
- **`frame_counter`**
    - Represents the current frame count and time, used as the basis for calculating the saw curve's position within its cycle.
    - Comfy dtype: `FRAME_COUNTER`
    - Python dtype: `FrameCounter`
- **`max_value`**
    - The maximum value the saw curve can reach within its cycle, defining the peak of the waveform.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`min_value`**
    - The minimum value the saw curve can reach, defining the base of the waveform.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`periodicity_seconds`**
    - The duration of one complete cycle of the saw curve in seconds, determining its frequency.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`phase`**
    - A phase shift for the saw curve, allowing the waveform to be advanced or delayed within its cycle.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
## Output types
- **`FLOAT`**
    - Comfy dtype: `FLOAT`
    - The calculated float value of the saw curve at the current frame.
    - Python dtype: `float`
- **`INT`**
    - Comfy dtype: `INT`
    - An integer representation of the saw curve's current value, rounded from the float calculation.
    - Python dtype: `int`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class DreamSawWave:
    NODE_NAME = "Saw Curve"

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
        y = x * (max_value - min_value) + min_value
        return _curve_result(y)

```
