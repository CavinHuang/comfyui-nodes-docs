---
tags:
- AnimationScheduling
- Curve
---

# 📈 Sine Curve
## Documentation
- Class name: `Sine Curve [Dream]`
- Category: `✨ Dream/🎥 animation/📈 curves`
- Output node: `False`

The 'Sine Curve' node generates a sine wave based on animation frame data, allowing for dynamic visual effects in animations. It utilizes parameters such as maximum and minimum values, periodicity, and phase to shape the sine wave's amplitude and frequency.
## Input types
### Required
- **`frame_counter`**
    - The frame counter tracks the current time in seconds based on the animation's frame rate, serving as the basis for calculating the sine wave's position.
    - Comfy dtype: `FRAME_COUNTER`
    - Python dtype: `FrameCounter`
- **`max_value`**
    - Specifies the maximum amplitude of the sine wave, defining the peak value it can reach.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`min_value`**
    - Determines the minimum amplitude of the sine wave, setting the lowest value it can descend to.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`periodicity_seconds`**
    - Controls the period of the sine wave, affecting how quickly it completes a full cycle.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`phase`**
    - Adjusts the phase of the sine wave, shifting its starting position within the cycle.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
## Output types
- **`FLOAT`**
    - Comfy dtype: `FLOAT`
    - The calculated sine wave value at the current frame, as a floating-point number.
    - Python dtype: `float`
- **`INT`**
    - Comfy dtype: `INT`
    - The sine wave value rounded to the nearest integer, for discrete animations or effects.
    - Python dtype: `int`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class DreamSineWave:
    NODE_NAME = "Sine Curve"

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
        a = (max_value - min_value) * 0.5
        c = phase
        b = 2 * math.pi / periodicity_seconds
        d = (max_value + min_value) / 2
        y = a * math.sin(b * (x + c)) + d
        return _curve_result(y)

```
