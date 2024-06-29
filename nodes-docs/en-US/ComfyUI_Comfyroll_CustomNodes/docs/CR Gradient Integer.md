---
tags:
- AnimationScheduling
- FrameInterpolation
- Interpolation
- VisualEffects
---

# 🔢 CR Gradient Integer
## Documentation
- Class name: `CR Gradient Integer`
- Category: `🧩 Comfyroll Studio/🎥 Animation/🔢 Interpolate`
- Output node: `False`

The CR_GradientInteger node is designed to generate a gradient of integer values based on a specified start and end value, frame duration, and the current frame. It interpolates the value at the current frame within the gradient, providing a smooth transition between the start and end values over the specified duration.
## Input types
### Required
- **`start_value`**
    - The starting value of the gradient. It marks the beginning of the interpolation.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`end_value`**
    - The ending value of the gradient. It marks the end point of the interpolation.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`start_frame`**
    - The frame at which the gradient interpolation begins.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`frame_duration`**
    - The total duration over which the gradient transitions from the start value to the end value.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`current_frame`**
    - The current frame for which the interpolated value is calculated. It determines the specific point of interpolation within the gradient.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`gradient_profile`**
    - A profile that defines the characteristics of the gradient, such as its type or method of interpolation.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
## Output types
- **`INT`**
    - Comfy dtype: `INT`
    - The interpolated integer value at the current frame within the gradient.
    - Python dtype: `int`
- **`show_help`**
    - Comfy dtype: `STRING`
    - A URL to a help page providing more information about the CR_GradientInteger node.
    - Python dtype: `str`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class CR_GradientInteger:

    @classmethod
    def INPUT_TYPES(s):
        gradient_profiles = ["Lerp"]
       
        return {"required": {"start_value": ("INT", {"default": 1.0, "min": 0.0, "max": 9999.0, "step": 1.0,}),
                             "end_value": ("INT", {"default": 1.0, "min": 0.0, "max": 9999.0, "step": 1.0,}),
                             "start_frame": ("INT", {"default": 0.0, "min": 0.0, "max": 9999.0, "step": 1.0,}),
                             "frame_duration": ("INT", {"default": 1.0, "min": 0.0, "max": 9999.0, "step": 1.0,}),
                             "current_frame": ("INT", {"default": 0.0, "min": 0.0, "max": 9999.0, "step": 1.0,}),
                             "gradient_profile": (gradient_profiles,) 
                },
        }
    
    RETURN_TYPES = ("INT", "STRING", )
    RETURN_NAMES = ("INT", "show_help", )
    FUNCTION = "gradient"
    CATEGORY = icons.get("Comfyroll/Animation/Interpolate")

    def gradient(self, start_value, end_value, start_frame, frame_duration, current_frame, gradient_profile):
        show_help = "https://github.com/Suzie1/ComfyUI_Comfyroll_CustomNodes/wiki/Interpolation-Nodes#cr-gradient-integer"

        if current_frame < start_frame:
            return (start_value, show_help, )

        if current_frame > start_frame + frame_duration:
            return (end_value, show_help, )
            
        step = (end_value - start_value) / frame_duration
        
        current_step = current_frame - start_frame
        
        int_out = start_value + int(current_step * step)
        
        return (int_out, show_help, )

```
