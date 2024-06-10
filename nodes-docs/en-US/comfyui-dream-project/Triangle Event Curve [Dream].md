---
tags:
- AnimationScheduling
- Curve
---

# 📈 Triangle Event Curve
## Documentation
- Class name: `Triangle Event Curve [Dream]`
- Category: `✨ Dream/🎥 animation/📈 curves`
- Output node: `False`

The Triangle Event Curve node generates a triangular-shaped curve over time, designed for creating dynamic, event-driven animations. It calculates values based on a frame counter and parameters defining the curve's peak, width, and center, making it suitable for timed animations and transitions.
## Input types
### Required
- **`frame_counter`**
    - Represents the current frame in the animation, used to calculate the curve's value at any given time.
    - Comfy dtype: `FRAME_COUNTER`
    - Python dtype: `FrameCounter`
- **`max_value`**
    - The peak value of the triangle curve, defining its maximum height.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`min_value`**
    - The base value of the triangle curve, defining its minimum height.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`width_seconds`**
    - The duration in seconds over which the peak of the triangle curve is reached from its base value.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`center_seconds`**
    - The point in time (in seconds) at which the peak of the triangle curve occurs.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
## Output types
- **`FLOAT`**
    - Comfy dtype: `FLOAT`
    - The calculated float value of the curve at the current frame.
    - Python dtype: `float`
- **`INT`**
    - Comfy dtype: `INT`
    - An integer representation of the calculated curve value at the current frame.
    - Python dtype: `int`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class DreamTriangleEvent:
    NODE_NAME = "Triangle Event Curve"

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": SharedTypes.frame_counter | {
                "max_value": ("FLOAT", {"default": 1.0, "multiline": False}),
                "min_value": ("FLOAT", {"default": 0.0, "multiline": False}),
                "width_seconds": ("FLOAT", {"default": 1.0, "multiline": False, "min": 0.1}),
                "center_seconds": ("FLOAT", {"default": 10.0, "multiline": False, "min": 0.0}),
            },
        }

    CATEGORY = NodeCategories.ANIMATION_CURVES
    RETURN_TYPES = ("FLOAT", "INT")
    RETURN_NAMES = ("FLOAT", "INT")
    FUNCTION = "result"

    @classmethod
    def IS_CHANGED(cls, *values):
        return hashed_as_strings(*values)

    def result(self, frame_counter: FrameCounter, max_value, min_value, width_seconds, center_seconds):
        x = frame_counter.current_time_in_seconds
        start = center_seconds - width_seconds * 0.5
        end = center_seconds + width_seconds * 0.5
        if start <= x <= center_seconds:
            y = _linear_value_calc(x, start, center_seconds, min_value, max_value)
        elif center_seconds < x <= end:
            y = _linear_value_calc(x, center_seconds, end, max_value, min_value)
        else:
            y = min_value
        return _curve_result(y)

```
