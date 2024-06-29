---
tags:
- AnimationScheduling
- Scheduling
---

# 📋 CR Schedule Input Switch
## Documentation
- Class name: `CR Schedule Input Switch`
- Category: `🧩 Comfyroll Studio/🎥 Animation/📋 Schedule`
- Output node: `True`

This node allows for the dynamic selection between two input schedules based on a given integer input. It facilitates conditional scheduling within animations, enabling the switch from one schedule to another based on the specified condition.
## Input types
### Required
- **`Input`**
    - Determines which schedule to output based on its value. A value of 1 selects the first schedule, while any other value selects the second schedule.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`schedule1`**
    - The first schedule option that can be selected.
    - Comfy dtype: `SCHEDULE`
    - Python dtype: `SCHEDULE`
- **`schedule2`**
    - The second schedule option that can be selected.
    - Comfy dtype: `SCHEDULE`
    - Python dtype: `SCHEDULE`
## Output types
- **`SCHEDULE`**
    - Comfy dtype: `SCHEDULE`
    - Outputs the selected schedule based on the input condition.
    - Python dtype: `SCHEDULE`
- **`show_help`**
    - Comfy dtype: `STRING`
    - Provides a URL to the help documentation for this node.
    - Python dtype: `str`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class Comfyroll_ScheduleInputSwitch:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "Input": ("INT", {"default": 1, "min": 1, "max": 2}),
                "schedule1": ("SCHEDULE",),
                "schedule2": ("SCHEDULE",)
            }
        }

    RETURN_TYPES = ("SCHEDULE", "STRING", )
    RETURN_NAMES = ("SCHEDULE", "show_help", )
    OUTPUT_NODE = True
    FUNCTION = "switch"

    CATEGORY = icons.get("Comfyroll/Animation/Schedule")

    def switch(self, Input, schedule1, schedule2):
        show_help = "https://github.com/Suzie1/ComfyUI_Comfyroll_CustomNodes/wiki/Schedule-Nodes#cr-schedule-input-switch"
        if Input == 1:
            return (schedule1, show_help, )
        else:
            return (schedule2, show_help, )

```
