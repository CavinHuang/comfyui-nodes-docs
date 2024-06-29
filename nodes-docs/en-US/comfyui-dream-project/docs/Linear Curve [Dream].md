---
tags:
- AnimationScheduling
- Curve
---

# 📈 Linear Curve
## Documentation
- Class name: `Linear Curve [Dream]`
- Category: `✨ Dream/🎥 animation/📈 curves`
- Output node: `False`

The Linear Curve node provides a linear interpolation between an initial and a final value over a sequence of frames, typically used to create smooth transitions or animations.
## Input types
### Required
- **`frame_counter`**
    - Tracks the progression of frames, dictating the current position in the interpolation process.
    - Comfy dtype: `FRAME_COUNTER`
    - Python dtype: `FrameCounter`
- **`initial_value`**
    - Specifies the starting value of the linear interpolation, serving as the base for the animation or transition.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`final_value`**
    - Defines the end value of the linear interpolation, determining the target of the animation or transition.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
## Output types
- **`FLOAT`**
    - Comfy dtype: `FLOAT`
    - The interpolated float value at the current frame, reflecting the linear progression.
    - Python dtype: `float`
- **`INT`**
    - Comfy dtype: `INT`
    - The interpolated value rounded to the nearest integer, providing a discrete step in the progression.
    - Python dtype: `int`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class DreamLinear:
    NODE_NAME = "Linear Curve"

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": SharedTypes.frame_counter | {
                "initial_value": ("FLOAT", {"default": 0.0, "multiline": False}),
                "final_value": ("FLOAT", {"default": 100.0, "multiline": False}),
            },
        }

    CATEGORY = NodeCategories.ANIMATION_CURVES
    RETURN_TYPES = ("FLOAT", "INT")
    RETURN_NAMES = ("FLOAT", "INT")
    FUNCTION = "result"

    @classmethod
    def IS_CHANGED(cls, *values):
        return hashed_as_strings(*values)

    def result(self, initial_value, final_value, frame_counter: FrameCounter):
        d = final_value - initial_value
        v = initial_value + frame_counter.progress * d
        return (v, int(round(v)))

```
