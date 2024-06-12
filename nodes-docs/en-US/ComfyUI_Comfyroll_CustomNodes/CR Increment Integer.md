---
tags:
- AnimationScheduling
- FrameInterpolation
- Interpolation
- VisualEffects
---

# 🔢 CR Increment Integer
## Documentation
- Class name: `CR Increment Integer`
- Category: `🧩 Comfyroll Studio/🎥 Animation/🔢 Interpolate`
- Output node: `True`

This node is designed for the incremental adjustment of integer values over a sequence of frames, providing a means to dynamically alter numerical values based on frame progression within animations or simulations.
## Input types
### Required
- **`start_value`**
    - The initial integer value from which the increment operation begins. It serves as the foundational value for subsequent increments, influenced by the 'step' parameter across frames.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`step`**
    - The fixed amount added to 'start_value' at each increment step, allowing for consistent or variable progression of the value across frames.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`start_frame`**
    - The frame at which the increment operation commences, enabling synchronization of value changes with specific points in an animation timeline.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`frame_duration`**
    - Defines the duration over which the increment operation is applied, allowing for controlled adjustments within a specified timeframe.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`current_frame`**
    - The current frame being processed, determining if and how 'start_value' is incremented based on its relation to 'start_frame' and 'frame_duration'.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`INT`**
    - Comfy dtype: `INT`
    - The resulting integer value after applying the increment operation, reflecting the cumulative effect of the 'step' parameter over the specified frame range.
    - Python dtype: `int`
- **`show_help`**
    - Comfy dtype: `STRING`
    - A URL providing access to additional help and documentation related to the node's functionality.
    - Python dtype: `str`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class CR_IncrementInteger:

    @classmethod
    def INPUT_TYPES(s):
    
        return {"required": {"start_value": ("INT", {"default": 1.0, "min": 0.0, "max": 9999.0, "step": 1.0,}),
                             "step": ("INT", {"default": 1.0, "min": -9999.0, "max": 9999.0, "step": 1.0,}),
                             "start_frame": ("INT", {"default": 0.0, "min": 0.0, "max": 9999.0, "step": 1.0,}),
                             "frame_duration": ("INT", {"default": 1.0, "min": 0.0, "max": 9999.0, "step": 1.0,}),
                             "current_frame": ("INT", {"default": 0.0, "min": 0.0, "max": 9999.0, "step": 1.0,}),
                },
        }
    
    RETURN_TYPES = ("INT", "STRING", )
    RETURN_NAMES = ("INT", "show_help", )
    OUTPUT_NODE = True    
    FUNCTION = "increment"
    CATEGORY = icons.get("Comfyroll/Animation/Interpolate")

    def increment(self, start_value, step, start_frame, frame_duration, current_frame):
        show_help = "https://github.com/Suzie1/ComfyUI_Comfyroll_CustomNodes/wiki/Interpolation-Nodes#cr-increment-integer"

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
