---
tags:
- AnimationScheduling
- FrameInterpolation
- Interpolation
- VisualEffects
---

# 🔢 CR Gradient Float
## Documentation
- Class name: `CR Gradient Float`
- Category: `🧩 Comfyroll Studio/🎥 Animation/🔢 Interpolate`
- Output node: `False`

The CR_GradientFloat node is designed for creating smooth transitions between two float values over a specified number of frames, based on a given gradient profile. It calculates the interpolated float value for any given frame within the animation sequence, facilitating dynamic visual effects.
## Input types
### Required
- **`start_value`**
    - The starting float value of the gradient transition, marking the beginning of the interpolation.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`end_value`**
    - The ending float value of the gradient transition, marking the end of the interpolation.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`start_frame`**
    - The frame number at which the gradient transition begins.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`frame_duration`**
    - The total number of frames over which the gradient transition occurs.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`current_frame`**
    - The current frame number for which the interpolated value is being calculated.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`gradient_profile`**
    - A profile defining the nature of the gradient transition, influencing the interpolation calculation.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
## Output types
- **`FLOAT`**
    - Comfy dtype: `FLOAT`
    - The interpolated float value for the current frame, based on the gradient transition.
    - Python dtype: `float`
- **`show_help`**
    - Comfy dtype: `STRING`
    - A URL to a help page providing additional information and guidance on using the gradient interpolation node.
    - Python dtype: `str`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class CR_GradientFloat:

    @classmethod
    def INPUT_TYPES(s):
        gradient_profiles = ["Lerp"]    
    
        return {"required": {"start_value": ("FLOAT", {"default": 1.0, "min": 0.0, "max": 9999.0, "step": 0.01,}),
                             "end_value": ("FLOAT", {"default": 1.0, "min": 0.0, "max": 9999.0, "step": 0.01,}),
                             "start_frame": ("INT", {"default": 0.0, "min": 0.0, "max": 9999.0, "step": 1.0,}),
                             "frame_duration": ("INT", {"default": 1.0, "min": 0.0, "max": 9999.0, "step": 1.0,}),
                             "current_frame": ("INT", {"default": 0.0, "min": 0.0, "max": 9999.0, "step": 1.0,}),
                             "gradient_profile": (gradient_profiles,)                              
                },
        }
    
    RETURN_TYPES = ("FLOAT", "STRING", )
    RETURN_NAMES = ("FLOAT", "show_help", )    
    FUNCTION = "gradient"
    CATEGORY = icons.get("Comfyroll/Animation/Interpolate")

    def gradient(self, start_value, end_value, start_frame, frame_duration, current_frame, gradient_profile):
        show_help = "https://github.com/Suzie1/ComfyUI_Comfyroll_CustomNodes/wiki/Interpolation-Nodes#cr-gradient-float"

        if current_frame < start_frame:
            return (start_value, show_help, )

        if current_frame > start_frame + frame_duration:
            return (end_value, show_help, )
            
        step = (end_value - start_value) / frame_duration
        
        current_step = current_frame - start_frame        
        
        float_out = start_value + current_step * step
        
        return (float_out, show_help, )

```
