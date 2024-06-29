---
tags:
- AnimationScheduling
- Scheduling
---

# 📑 CR Text Scheduler
## Documentation
- Class name: `CR Text Scheduler`
- Category: `🧩 Comfyroll Studio/🎥 Animation/📑 Schedulers`
- Output node: `False`

The CR Text Scheduler node is designed to manage and schedule text outputs based on predefined schedules or default settings. It dynamically adjusts text outputs according to the current frame and specified scheduling parameters, facilitating the creation of animated text sequences in a user-friendly manner.
## Input types
### Required
- **`mode`**
    - Specifies the scheduling mode, which can be either 'Default Text' or based on a 'Schedule', determining how text outputs are managed.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`current_frame`**
    - Indicates the current frame number, used to determine the appropriate text output based on the schedule.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`schedule_alias`**
    - An alias for the schedule, used for identification and reference within the scheduling process.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`default_text`**
    - The default text to be used when no specific schedule is applied, ensuring a fallback text output.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`schedule_format`**
    - Defines the format of the schedule, either 'CR' or 'Deforum', affecting how the schedule is interpreted.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `List[str]`
### Optional
- **`schedule`**
    - The actual schedule data, optional, used when the mode is set to 'Schedule'.
    - Comfy dtype: `SCHEDULE`
    - Python dtype: `Optional[Dict[str, Any]]`
## Output types
- **`STRING`**
    - Comfy dtype: `STRING`
    - The scheduled text output for the current frame.
    - Python dtype: `str`
- **`show_help`**
    - Comfy dtype: `STRING`
    - A URL providing additional information or assistance related to text scheduling.
    - Python dtype: `str`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class CR_TextScheduler:

    @classmethod
    def INPUT_TYPES(s):
        modes = ["Default Text", "Schedule"]
        return {"required": {"mode": (modes,),
                             "current_frame": ("INT", {"default": 0.0, "min": 0.0, "max": 9999.0, "step": 1.0,}),
                             "schedule_alias": ("STRING", {"default": "", "multiline": False}),
                             "default_text": ("STRING", {"multiline": False, "default": "default text"}),
                             "schedule_format": (["CR", "Deforum"],),
                },
                "optional": {"schedule": ("SCHEDULE",),               
                }                    
        }
    
    RETURN_TYPES = ("STRING", "STRING", )
    RETURN_NAMES = ("STRING", "show_help", )
    FUNCTION = "schedule"
    CATEGORY = icons.get("Comfyroll/Animation/Schedulers")

    def schedule(self, mode, current_frame, schedule_alias, default_text, schedule_format, schedule=None):
        show_help = "https://github.com/Suzie1/ComfyUI_Comfyroll_CustomNodes/wiki/Scheduler-Nodes#cr-text-scheduler"

        if mode == "Default Text":
            print(f"[Info] CR Text Scheduler: Scheduler {schedule_alias} is disabled")
            text_out = default_text
            return (text_out, show_help, )

        # Get params
        params = keyframe_scheduler(schedule, schedule_alias, current_frame)
         
        # Handle case where there is no schedule line for frame 0 
        if params == "":
            if current_frame == 0:
                print(f"[Warning] CR Text Scheduler. No frame 0 found in schedule. Starting with default value at frame 0")
            text_out = default_value,
        else:
            # Try the params
            try:
                text_out = params
            except ValueError:
                print(f"[Warning] CR Text Scheduler. Invalid params: {params}")
                return()
        return (text_out, show_help, )

```
