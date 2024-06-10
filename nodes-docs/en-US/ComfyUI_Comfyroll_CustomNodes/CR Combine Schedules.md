---
tags:
- AnimationScheduling
- Scheduling
---

# 📋 CR Combine Schedules
## Documentation
- Class name: `CR Combine Schedules`
- Category: `🧩 Comfyroll Studio/🎥 Animation/📋 Schedule`
- Output node: `False`

The CR Combine Schedules node is designed to merge multiple animation schedules into a single comprehensive schedule. It facilitates the integration of various animation sequences by combining their schedules, enhancing the flexibility and complexity of animation planning.
## Input types
### Required
### Optional
- **`schedule_1`**
    - Represents the first animation schedule to be combined. Its inclusion allows for the sequential integration of multiple schedules, contributing to the creation of a unified animation timeline.
    - Comfy dtype: `SCHEDULE`
    - Python dtype: `List[str]`
- **`schedule_2`**
    - Represents the second animation schedule to be combined, further enriching the unified animation timeline by adding its sequence.
    - Comfy dtype: `SCHEDULE`
    - Python dtype: `List[str]`
- **`schedule_3`**
    - Represents the third animation schedule to be combined, adding another layer of complexity to the unified animation timeline.
    - Comfy dtype: `SCHEDULE`
    - Python dtype: `List[str]`
- **`schedule_4`**
    - Represents the fourth animation schedule to be combined, completing the integration of multiple animation sequences into a single comprehensive schedule.
    - Comfy dtype: `SCHEDULE`
    - Python dtype: `List[str]`
## Output types
- **`SCHEDULE`**
    - Comfy dtype: `SCHEDULE`
    - The combined list of schedules from all provided animation sequences.
    - Python dtype: `List[str]`
- **`show_text`**
    - Comfy dtype: `STRING`
    - A concatenated string representation of all schedules, intended for display or debugging purposes.
    - Python dtype: `str`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class CR_CombineSchedules:

    @classmethod
    def INPUT_TYPES(cls):
        return {"required": {
                },
                "optional":{
                    "schedule_1": ("SCHEDULE",),                
                    "schedule_2": ("SCHEDULE",),
                    "schedule_3": ("SCHEDULE",),
                    "schedule_4": ("SCHEDULE",),                   
                },
        }

    RETURN_TYPES = ("SCHEDULE", "STRING", )
    RETURN_NAMES = ("SCHEDULE", "show_text", )
    FUNCTION = "combine"
    CATEGORY = icons.get("Comfyroll/Animation/Schedule")

    def combine(self, schedule_1=None, schedule_2=None, schedule_3=None, schedule_4=None):

        # Initialise the list
        schedules = list()
        schedule_text = list()
 
        # Extend the list for each schedule in connected stacks
        if schedule_1 is not None:
            schedules.extend([l for l in schedule_1]),
            schedule_text.extend(schedule_1),

        if schedule_2 is not None:
            schedules.extend([l for l in schedule_2]),
            schedule_text.extend(schedule_2),            

        if schedule_3 is not None:
            schedules.extend([l for l in schedule_3]),
            schedule_text.extend(schedule_3),               

        if schedule_4 is not None:
            schedules.extend([l for l in schedule_4]),
            schedule_text.extend(schedule_4),

        print(f"[Debug] CR Combine Schedules: {schedules}")

        show_text = "".join(str(schedule_text))
            
        return (schedules, show_text, )

```
