---
tags:
- AnimationScheduling
- Scheduling
---

# 📑 CR Simple Value Scheduler
## Documentation
- Class name: `CR Simple Value Scheduler`
- Category: `🧩 Comfyroll Studio/🎥 Animation/📑 Schedulers`
- Output node: `False`

This node is designed to manage and apply simple value-based scheduling for animations. It interprets a given schedule and the current frame to output appropriate integer and floating-point values, facilitating dynamic adjustments throughout the animation sequence.
## Input types
### Required
- **`schedule`**
    - The schedule string defines keyframes and their corresponding values for the animation, serving as the blueprint for value transitions across frames.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`current_frame`**
    - Specifies the current frame in the animation sequence, determining which value from the schedule should be applied.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`INT`**
    - Comfy dtype: `INT`
    - The integer value corresponding to the current frame's schedule, rounded down from the floating-point representation.
    - Python dtype: `int`
- **`FLOAT`**
    - Comfy dtype: `FLOAT`
    - The floating-point value directly derived from the schedule for the current frame.
    - Python dtype: `float`
- **`show_help`**
    - Comfy dtype: `STRING`
    - A URL providing additional help and documentation on using the CR Simple Value Scheduler.
    - Python dtype: `str`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class CR_SimpleValueScheduler:
        
    @classmethod
    def INPUT_TYPES(s):
        return {"required": {"schedule": ("STRING", {"multiline": True, "default": "frame_number, value"}),
                             "current_frame": ("INT", {"default": 0.0, "min": 0.0, "max": 9999.0, "step": 1.0,}),
                },
        }
    
    RETURN_TYPES = ("INT", "FLOAT", "STRING", )
    RETURN_NAMES = ("INT", "FLOAT", "show_help", )
    FUNCTION = "simple_schedule"
    CATEGORY = icons.get("Comfyroll/Animation/Schedulers")

    def simple_schedule(self, schedule, current_frame):

        schedule_lines = list()
        
        if schedule == "":
            print(f"[Warning] CR Simple Value Scheduler. No lines in schedule") 
            return ()
            
        lines = schedule.split('\n')
        for line in lines:        
            schedule_lines.extend([("SIMPLE", line)])        
        
        params = keyframe_scheduler(schedule_lines, "SIMPLE", current_frame)

        if params == "":
            print(f"[Warning] CR Simple Value Scheduler. No schedule found for frame. Simple schedules must start at frame 0.")
        else:
            try:
                int_out = int(params.split('.')[0]) #rounds down
                float_out = float(params)
            except ValueError:
                print(f"[Warning] CR Simple Value Scheduler. Invalid params {params} at frame {current_frame}")

            show_help = "https://github.com/Suzie1/ComfyUI_Comfyroll_CustomNodes/wiki/Scheduler-Nodes#cr-simple-value-scheduler"

            return (int_out, float_out, show_help, )

```
