---
tags:
- AnimationScheduling
- Scheduling
---

# Value Schedule 📅🅕🅝
## Documentation
- Class name: `ValueSchedule`
- Category: `FizzNodes 📅🅕🅝/ScheduleNodes`
- Output node: `False`

The ValueSchedule node is designed to animate values over a sequence of frames based on keyframes defined in a text input. It modulates the current frame within the maximum frame range and computes interpolated values to provide dynamic, frame-specific outputs.
## Input types
### Required
- **`text`**
    - A multiline string containing keyframes for animation, serving as the blueprint for generating interpolated values across frames.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`max_frames`**
    - The maximum number of frames for the animation, setting an upper limit for frame modulation and interpolation.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`current_frame`**
    - The current frame number, used to determine the specific value to be output based on the animation's progression.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`print_output`**
    - A boolean flag that, when true, prints the current frame and its corresponding value for debugging purposes.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
## Output types
- **`float`**
    - Comfy dtype: `FLOAT`
    - The interpolated value for the current frame as a floating-point number.
    - Python dtype: `float`
- **`int`**
    - Comfy dtype: `INT`
    - The interpolated value for the current frame, cast to an integer.
    - Python dtype: `int`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class ValueSchedule:
    @classmethod
    def INPUT_TYPES(s):
        return {"required": {"text": ("STRING", {"multiline": True, "default":defaultValue}),
                             "max_frames": ("INT", {"default": 120.0, "min": 1.0, "max": 999999.0, "step": 1.0}),
                             "current_frame": ("INT", {"default": 0.0, "min": 0.0, "max": 999999.0, "step": 1.0, "forceInput": True}),
                             "print_output": ("BOOLEAN", {"default": False})}}
    RETURN_TYPES = ("FLOAT", "INT")
    FUNCTION = "animate"

    CATEGORY = "FizzNodes 📅🅕🅝/ScheduleNodes"
    
    def animate(self, text, max_frames, current_frame, print_output):
        current_frame = current_frame % max_frames
        t = get_inbetweens(parse_key_frames(text, max_frames), max_frames)
        if (print_output is True):
            print("ValueSchedule: ",current_frame,"\n","current_frame: ",current_frame)
        return (t[current_frame],int(t[current_frame]),)

```
