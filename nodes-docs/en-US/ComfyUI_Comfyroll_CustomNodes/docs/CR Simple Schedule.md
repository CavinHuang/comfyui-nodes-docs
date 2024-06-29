---
tags:
- AnimationScheduling
- Scheduling
---

# 📋 CR Simple Schedule
## Documentation
- Class name: `CR Simple Schedule`
- Category: `🧩 Comfyroll Studio/🎥 Animation/📋 Schedule`
- Output node: `False`

This node is designed to process and format animation schedules, simplifying the creation and management of animation timelines by allowing users to define schedules in a straightforward manner.
## Input types
### Required
- **`schedule`**
    - The 'schedule' parameter represents the animation schedule to be processed. It is crucial for defining the sequence and timing of animations, impacting the node's execution and the resulting animation timeline.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`schedule_type`**
    - The 'schedule_type' parameter specifies the type of the schedule, influencing how the schedule is interpreted and processed by the node.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`schedule_alias`**
    - The 'schedule_alias' parameter provides an alias for the schedule, facilitating easier identification and management of multiple schedules.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`schedule_format`**
    - The 'schedule_format' parameter determines the format in which the schedule is to be processed, affecting the interpretation and output of the animation schedule.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
## Output types
- **`SCHEDULE`**
    - Comfy dtype: `SCHEDULE`
    - A list of formatted schedule lines, ready for further processing or execution in animation workflows.
    - Python dtype: `List[Tuple[str, str]]`
- **`show_help`**
    - Comfy dtype: `STRING`
    - A URL providing additional help and documentation related to the node's functionality.
    - Python dtype: `str`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class CR_SimpleSchedule:

    @classmethod
    def INPUT_TYPES(s):
        schedule_types = ["Value", "Text", "Prompt", "Prompt Weight", "Model", "LoRA", "ControlNet", "Style", "Upscale", "Camera", "Job"]
        return {"required": {"schedule": ("STRING",
                             {"multiline": True, "default": "frame_number, item_alias, [attr_value1, attr_value2]"}
                             ),
                             "schedule_type": (schedule_types,),
                             "schedule_alias": ("STRING", {"default": "", "multiline": False}),  
                             "schedule_format": (["CR", "Deforum"],),
                },
        }
    
    RETURN_TYPES = ("SCHEDULE", "STRING", )
    RETURN_NAMES = ("SCHEDULE", "show_help", )
    FUNCTION = "send_schedule"
    CATEGORY = icons.get("Comfyroll/Animation/Schedule")

    def send_schedule(self, schedule, schedule_type, schedule_alias, schedule_format):

        schedule_lines = list()
      
      # Extend the list for each line in the schedule
        if schedule != "" and schedule_alias != "":
            lines = schedule.split('\n')
            for line in lines:
                # Skip empty lines
                if not line.strip():
                    print(f"[Warning] CR Simple Schedule. Skipped blank line: {line}")
                    continue            
            
                schedule_lines.extend([(schedule_alias, line)])
        #print(f"[Debug] CR Simple Schedule: {schedule_lines}")

        show_help = "https://github.com/Suzie1/ComfyUI_Comfyroll_CustomNodes/wiki/Schedule-Nodes#cr-simple-schedule"

        return (schedule_lines, show_help, )

```
