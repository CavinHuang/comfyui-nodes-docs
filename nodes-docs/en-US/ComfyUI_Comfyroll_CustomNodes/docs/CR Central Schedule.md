---
tags:
- AnimationScheduling
- Scheduling
---

# 📋 CR Central Schedule
## Documentation
- Class name: `CR Central Schedule`
- Category: `🧩 Comfyroll Studio/🎥 Animation/📋 Schedule`
- Output node: `False`

This node serves as a central hub for managing and coordinating multiple animation schedules within a project. It allows for the integration and synchronization of various animation schedules, ensuring a cohesive animation flow across different elements or scenes.
## Input types
### Required
- **`schedule_1`**
    - Defines the first animation schedule to be managed, allowing for the specification of complex animation sequences.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`schedule_type1`**
    - Specifies the type of the first animation schedule, categorizing it for appropriate processing and integration.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `list`
- **`schedule_alias1`**
    - Provides an alias for the first animation schedule, facilitating easier reference and management within the node.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`schedule_2`**
    - Defines the second animation schedule to be managed, extending the node's capability to coordinate multiple schedules.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`schedule_type2`**
    - Specifies the type of the second animation schedule, enhancing the node's ability to categorize and process various schedules.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `list`
- **`schedule_alias2`**
    - Provides an alias for the second animation schedule, aiding in its identification and management.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`schedule_3`**
    - Defines the third animation schedule to be managed, further broadening the node's capacity to handle multiple animation sequences.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`schedule_type3`**
    - Specifies the type of the third animation schedule, allowing for its proper categorization and integration.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `list`
- **`schedule_alias3`**
    - Provides an alias for the third animation schedule, simplifying its reference and management.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`schedule_format`**
    - Determines the format in which the schedules are to be processed, supporting different animation frameworks.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `list`
### Optional
- **`schedule`**
    - An optional schedule parameter that can be used to provide additional scheduling information.
    - Comfy dtype: `SCHEDULE`
    - Python dtype: `str`
## Output types
- **`SCHEDULE`**
    - Comfy dtype: `SCHEDULE`
    - The combined or processed animation schedule resulting from the node's operation, ready for use in the animation project.
    - Python dtype: `str`
- **`show_text`**
    - Comfy dtype: `STRING`
    - Provides textual information or feedback about the processed schedule, aiding in debugging or further adjustments.
    - Python dtype: `str`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class CR_CentralSchedule:
   
    @classmethod
    def INPUT_TYPES(cls):
        schedule_types = ["Value", "Text", "Prompt", "Prompt Weight", "Model", "LoRA", "ControlNet", "Style", "Upscale", "Camera", "Job"]
        return {"required": {
                    "schedule_1": ("STRING", {"multiline": True, "default": "schedule"}),
                    "schedule_type1": (schedule_types,),
                    "schedule_alias1": ("STRING", {"multiline": False, "default": ""}),
                    "schedule_2": ("STRING", {"multiline": True, "default": "schedule"}),
                    "schedule_type2": (schedule_types,),
                    "schedule_alias2": ("STRING", {"multiline": False, "default": ""}),
                    "schedule_3": ("STRING", {"multiline": True, "default": "schedule"}),
                    "schedule_type3": (schedule_types,),
                    "schedule_alias3": ("STRING", {"multiline": False, "default": ""}),
                    "schedule_format": (["CR", "Deforum"],),
                },
                "optional": {"schedule": ("SCHEDULE",)
                },
        }

    RETURN_TYPES = ("SCHEDULE", "STRING", )
    RETURN_NAMES = ("SCHEDULE", "show_text", )
    FUNCTION = "build_schedule"
    CATEGORY = icons.get("Comfyroll/Animation/Schedule")

    def build_schedule(self, schedule_1, schedule_type1, schedule_alias1, schedule_2, schedule_type2, schedule_alias2, schedule_3, schedule_type3, schedule_alias3, schedule_format, schedule=None):
    
        # schedule_type and schedule_format are not used in the function

        # Initialise the list
        schedules = list()
        schedule_text = list()
        
        # Extend the list for each schedule in linked stacks
        if schedule is not None:
            schedules.extend([l for l in schedule])
            schedule_text.extend([l for l in schedule]),
        
        # Extend the list for each schedule in the stack
        if schedule_1 != "" and schedule_alias1 != "":
            lines = schedule_1.split('\n')
            for line in lines:
                schedules.extend([(schedule_alias1, line)]),
            schedule_text.extend([(schedule_alias1 + "," + schedule_1 + "\n")]),

        if schedule_2 != "" and schedule_alias2 != "":
            lines = schedule_2.split('\n')
            for line in lines:        
                schedules.extend([(schedule_alias2, line)]),
            schedule_text.extend([(schedule_alias2 + "," + schedule_2 + "\n")]),

        if schedule_3 != "" and schedule_alias3 != "":
            lines = schedule_3.split('\n')
            for line in lines: 
                schedules.extend([(schedule_alias3, line)]),
            schedule_text.extend([(schedule_alias3 + "," + schedule_3 + "\n")]),
            
        #print(f"[Debug] CR Schedule List: {schedules}")

        show_text = "".join(schedule_text)
            
        return (schedules, show_text, )    

```
