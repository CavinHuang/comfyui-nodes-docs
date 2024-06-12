---
tags:
- AnimationScheduling
- FrameInterpolation
- Interpolation
- VisualEffects
---

# Lerp 📅🅕🅝
## Documentation
- Class name: `Lerp`
- Category: `FizzNodes 📅🅕🅝/WaveNodes`
- Output node: `False`

The Lerp node linearly interpolates between two values based on a given strength and the current frame within a specified number of images. It's designed to smoothly transition or blend values across a sequence, making it useful for animations or gradual changes.
## Input types
### Required
- **`num_Images`**
    - Specifies the total number of images in the sequence. It determines the interpolation step size, affecting the smoothness of the transition.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`strength`**
    - Defines the interpolation strength. It influences the range of output values, affecting how significantly the output changes across frames.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`current_frame`**
    - Indicates the current frame number in the sequence. It's used to calculate the specific interpolation value for that frame, determining the output at each step.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`float`**
    - Comfy dtype: `FLOAT`
    - The floating-point result of the linear interpolation, representing the interpolated value at the current frame.
    - Python dtype: `float`
- **`int`**
    - Comfy dtype: `INT`
    - The integer representation of the interpolated value, providing a discretized output for scenarios requiring whole numbers.
    - Python dtype: `int`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class Lerp:
    @classmethod
    def INPUT_TYPES(s):
        return {"required": {"num_Images": ("FLOAT", {"default": 1.0, "min": 0.0, "max": 9999.0, "step": 1.0}),
                             "strength": ("FLOAT", {"default": 1.0, "min": 0.0, "max": 10.0, "step": 0.01}),
                             "current_frame": ("INT", {"default": 1.0, "min": 0.0, "max": 9999, "step": 1.0}),
                             }}
    RETURN_TYPES = ("FLOAT", "INT",)
    FUNCTION = "lerp"
    
    CATEGORY = "FizzNodes 📅🅕🅝/WaveNodes"

    def lerp(self, num_Images, strength, current_frame):
        step = strength/num_Images
        output = strength - (step * current_frame)
        return (output, int(output),)

```
