---
tags:
- AnimationScheduling
- Scheduling
---

# 📑 CR Value Scheduler
## Documentation
- Class name: `CR Value Scheduler`
- Category: `🧩 Comfyroll Studio/🎥 Animation/📑 Schedulers`
- Output node: `False`

The CR Value Scheduler node is designed to manage the scheduling of numerical values across different frames in an animation sequence. It allows for the dynamic adjustment of values based on a predefined schedule, enhancing the flexibility and control over the animation's parameters.
## Input types
### Required
- **`mode`**
    - Specifies the mode of operation, which can either use a default value or follow a custom schedule for value changes.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`current_frame`**
    - Indicates the current frame number in the animation sequence, used to determine the appropriate value based on the schedule.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`schedule_alias`**
    - A unique identifier for the schedule being applied, facilitating the management and reference of multiple schedules.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`default_value`**
    - The fallback value to be used when the schedule is disabled or an appropriate scheduled value cannot be found.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`schedule_format`**
    - Defines the format of the schedule, dictating how scheduled values are interpreted and applied.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
### Optional
- **`schedule`**
    - The actual schedule containing the frame-wise values to be applied throughout the animation.
    - Comfy dtype: `SCHEDULE`
    - Python dtype: `str`
## Output types
- **`INT`**
    - Comfy dtype: `INT`
    - The scheduled value converted to an integer, applicable for parameters requiring discrete values.
    - Python dtype: `int`
- **`FLOAT`**
    - Comfy dtype: `FLOAT`
    - The scheduled value in its original floating-point format, suitable for parameters requiring continuous values.
    - Python dtype: `float`
- **`show_help`**
    - Comfy dtype: `STRING`
    - A URL providing additional information and guidance on using the CR Value Scheduler.
    - Python dtype: `str`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class CR_ValueScheduler:

    @classmethod
    def INPUT_TYPES(s):
        modes = ["Default Value", "Schedule"]
        return {"required": {"mode": (modes,),
                             "current_frame": ("INT", {"default": 0.0, "min": 0.0, "max": 9999.0, "step": 1.0,}),
                             "schedule_alias": ("STRING", {"default": "", "multiline": False}),
                             "default_value": ("FLOAT", {"default": 1.0, "min": -9999.0, "max": 9999.0, "step": 0.01,}), 
                             "schedule_format": (["CR", "Deforum"],),
                },
                "optional": {"schedule": ("SCHEDULE",),               
                }                    
        }
    
    RETURN_TYPES = ("INT", "FLOAT", "STRING", )
    RETURN_NAMES = ("INT", "FLOAT", "show_help", )
    FUNCTION = "schedule"
    CATEGORY = icons.get("Comfyroll/Animation/Schedulers")

    def schedule(self, mode, current_frame, schedule_alias, default_value, schedule_format, schedule=None):
        show_help = "https://github.com/Suzie1/ComfyUI_Comfyroll_CustomNodes/wiki/Scheduler-Nodes#cr-value-scheduler"

        if mode == "Default Value":
            print(f"[Info] CR Value Scheduler: Scheduler {schedule_alias} is disabled")
            int_out, float_out = int(default_value), float(default_value)    
            return (int_out, float_out, show_help, )

        # Get params
        params = keyframe_scheduler(schedule, schedule_alias, current_frame)

        # Handle case where there is no schedule line for frame 0          
        if params == "":
            if current_frame == 0:
                print(f"[Warning] CR Value Scheduler. No frame 0 found in schedule. Starting with default value at frame 0")
            int_out, float_out = int(default_value), float(default_value) 
        else:
            # Try the params
            try:
                value = float(params)
                int_out, float_out = int(value), float(value)
            except ValueError:
                print(f"[Warning] CR Value Scheduler. Invalid params: {params}")
                return()
        return (int_out, float_out, show_help, )

```
