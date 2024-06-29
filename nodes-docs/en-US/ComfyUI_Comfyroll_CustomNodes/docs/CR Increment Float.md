---
tags:
- AnimationScheduling
- FrameInterpolation
- Interpolation
- VisualEffects
---

# 🔢 CR Increment Float
## Documentation
- Class name: `CR Increment Float`
- Category: `🧩 Comfyroll Studio/🎥 Animation/🔢 Interpolate`
- Output node: `True`

The CR_IncrementFloat node is designed to incrementally adjust floating-point values, facilitating the creation of sequences or gradients of numbers. This node is particularly useful in scenarios where gradual changes or interpolations are required.
## Input types
### Required
- **`start_value`**
    - Specifies the initial value from which the incrementation starts, setting the baseline for the sequence generation.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`step`**
    - Determines the increment size for each step, directly influencing the pace and scale of the sequence progression.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`start_frame`**
    - Defines the starting frame for the incrementation process, marking the point at which the sequence begins.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`frame_duration`**
    - Specifies the duration in frames for each increment step, affecting the timing and pacing of the sequence.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`current_frame`**
    - Indicates the current frame in the sequence, used to calculate the current value based on the starting point and step size.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`FLOAT`**
    - Comfy dtype: `FLOAT`
    - Outputs the current incremented value, reflecting the progression of the sequence.
    - Python dtype: `float`
- **`show_help`**
    - Comfy dtype: `STRING`
    - Provides additional information or guidance related to the node's operation.
    - Python dtype: `str`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class CR_IncrementFloat:

    @classmethod
    def INPUT_TYPES(s):
    
        return {"required": {"start_value": ("FLOAT", {"default": 1.0, "min": 0.0, "max": 9999.0, "step": 0.001,}),
                             "step": ("FLOAT", {"default": 0.1, "min": -9999.0, "max": 9999.0, "step": 0.001,}),
                             "start_frame": ("INT", {"default": 0.0, "min": 0.0, "max": 9999.0, "step": 1.00,}),
                             "frame_duration": ("INT", {"default": 1.0, "min": 0.0, "max": 9999.0, "step": 1.0,}),
                             "current_frame": ("INT", {"default": 0.0, "min": 0.0, "max": 9999.0, "step": 1.0,}),
                },
        }
    
    RETURN_TYPES = ("FLOAT", "STRING", )
    RETURN_NAMES = ("FLOAT", "show_help", )
    OUTPUT_NODE = True    
    FUNCTION = "increment"
    CATEGORY = icons.get("Comfyroll/Animation/Interpolate")

    def increment(self, start_value, step, start_frame, frame_duration, current_frame):
        show_help = "https://github.com/Suzie1/ComfyUI_Comfyroll_CustomNodes/wiki/Interpolation-Nodes#cr-increment-float"

        #print(f"current frame {current_frame}")
        if current_frame < start_frame:
            return (start_value, show_help, )
  
        current_value = start_value + (current_frame - start_frame) * step
        if current_frame <= start_frame + frame_duration:
            current_value += step
            #print(f"<current value {current_value}")    
            return (current_value, show_help, )
                
        return (current_value, show_help, )

```
