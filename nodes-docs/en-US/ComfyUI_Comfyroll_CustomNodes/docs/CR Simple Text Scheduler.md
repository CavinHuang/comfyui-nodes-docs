---
tags:
- AnimationScheduling
- Scheduling
---

# 📑 CR Simple Text Scheduler
## Documentation
- Class name: `CR Simple Text Scheduler`
- Category: `🧩 Comfyroll Studio/🎥 Animation/📑 Schedulers`
- Output node: `False`

This node is designed to manage and schedule text animations within a user interface, allowing for dynamic text updates based on predefined schedules or conditions.
## Input types
### Required
- **`schedule`**
    - The 'schedule' parameter specifies the text and timing for each animation frame, serving as the blueprint for dynamic text updates.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`current_frame`**
    - The 'current_frame' parameter indicates the current frame number in the animation sequence, determining which part of the schedule to execute.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`STRING`**
    - Comfy dtype: `STRING`
    - This output represents the text scheduled for the current frame, ready for display or further processing.
    - Python dtype: `str`
- **`show_help`**
    - Comfy dtype: `STRING`
    - Provides a URL to documentation or help related to the scheduling process, offering guidance on how to use the scheduler effectively.
    - Python dtype: `str`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class CR_SimpleTextScheduler:
        
    @classmethod
    def INPUT_TYPES(s):
        return {"required": {"schedule": ("STRING", {"multiline": True, "default": "frame_number, text"}),
                             "current_frame": ("INT", {"default": 0.0, "min": 0.0, "max": 9999.0, "step": 1.0,}),
                },
        }
    
    RETURN_TYPES = ("STRING", "STRING", )
    RETURN_NAMES = ("STRING", "show_help", )
    FUNCTION = "simple_schedule"
    CATEGORY = icons.get("Comfyroll/Animation/Schedulers")

    def simple_schedule(self, schedule, current_frame):
        
        schedule_lines = list()
        
        if schedule == "":
            print(f"[Warning] CR Simple Text Scheduler. No lines in schedule") 
            return ()
            
        lines = schedule.split('\n')
        for line in lines:       
            schedule_lines.extend([("SIMPLE", line)])        
        
        params = keyframe_scheduler(schedule_lines, "SIMPLE", current_frame)

        if params == "":
            print(f"[Warning] CR Simple Text Scheduler. No schedule found for frame. Simple schedules must start at frame 0.")
        else:        
            try:
                text_out = str(params)
            except ValueError:
                print(f"[Warning] CR Simple Text Scheduler. Invalid params {params} at frame {current_frame}")

            show_help = "https://github.com/Suzie1/ComfyUI_Comfyroll_CustomNodes/wiki/Scheduler-Nodes#cr-simple-text-scheduler"

            return(text_out, show_help, )

```
