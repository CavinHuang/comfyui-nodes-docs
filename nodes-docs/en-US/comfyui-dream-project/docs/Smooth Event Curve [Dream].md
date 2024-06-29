---
tags:
- AnimationScheduling
- Curve
---

# 📈 Smooth Event Curve
## Documentation
- Class name: `Smooth Event Curve [Dream]`
- Category: `✨ Dream/🎥 animation/📈 curves`
- Output node: `False`

The Smooth Event Curve node is designed to generate a smoothly transitioning curve based on a frame counter, facilitating the creation of animations with smooth starts and ends. It calculates values within a specified range and time frame, applying a smoothing algorithm to ensure a gradual transition.
## Input types
### Required
- **`frame_counter`**
    - The frame counter is essential for determining the current time in seconds, which is used to calculate the position on the curve. It affects the node's execution by dictating the timing of the curve's progression.
    - Comfy dtype: `FRAME_COUNTER`
    - Python dtype: `FrameCounter`
- **`max_value`**
    - Specifies the maximum value the curve can reach, playing a crucial role in defining the curve's amplitude.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`min_value`**
    - Defines the minimum value of the curve, setting the baseline from which the curve can start.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`width_seconds`**
    - Determines the width of the curve in seconds, affecting the duration of the smooth transition.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`center_seconds`**
    - Sets the center point of the curve in seconds, around which the smooth transition is centered.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
## Output types
- **`FLOAT`**
    - Comfy dtype: `FLOAT`
    - The floating-point result of the curve calculation, representing the smoothed value at the current frame.
    - Python dtype: `float`
- **`INT`**
    - Comfy dtype: `INT`
    - An integer representation of the curve's calculated value, providing a discretized output for applications requiring integer values.
    - Python dtype: `int`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class DreamSmoothEvent:
    NODE_NAME = "Smooth Event Curve"

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
            y = _linear_value_calc(x, start, center_seconds, 0.0, 1.0)
        elif center_seconds < x <= end:
            y = _linear_value_calc(x, center_seconds, end, 1.0, 0.0)
        else:
            y = 0.0
        if y < 0.5:
            y = ((y + y) * (y + y)) * 0.5
        else:
            a = (y - 0.5) * 2
            y = math.pow(a, 0.25) * 0.5 + 0.5
        return _curve_result(y * (max_value - min_value) + min_value)

```
