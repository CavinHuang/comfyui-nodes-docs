---
tags:
- AnimationScheduling
- Scheduling
---

# 📋 CR Bit Schedule
## Documentation
- Class name: `CR Bit Schedule`
- Category: `🧩 Comfyroll Studio/🎥 Animation/📋 Schedule`
- Output node: `False`

The CR Bit Schedule node is designed to generate a schedule based on a binary string, where each bit represents a state at a given interval over a specified number of loops. It abstracts the process of creating time-based sequences from binary data, facilitating the scheduling of animations or other time-sensitive operations.
## Input types
### Required
- **`binary_string`**
    - The binary string input represents a sequence of states (0 or 1) that are used to generate the schedule. Each bit in the string corresponds to a state at a specific time interval, playing a crucial role in defining the schedule's structure.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`interval`**
    - The interval input specifies the time gap between each state in the schedule, determining the pace at which the binary string's states are processed and included in the schedule.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`loops`**
    - The loops input defines how many times the binary string is repeated in the schedule, allowing for the extension or repetition of the sequence to meet the desired duration.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`SCHEDULE`**
    - Comfy dtype: `STRING`
    - The SCHEDULE output is a string representation of the generated schedule, where each line corresponds to a time-stamped state derived from the binary string.
    - Python dtype: `str`
- **`show_text`**
    - Comfy dtype: `STRING`
    - The show_text output provides a link to helpful documentation or additional information related to the node's functionality.
    - Python dtype: `str`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class CR_BitSchedule:
    
    @classmethod
    def INPUT_TYPES(s):
        return {"required": {
            "binary_string": ("STRING", {"multiline": True, "default": ""}),
            "interval": ("INT", {"default": 1, "min": 1, "max": 99999}),
            "loops": ("INT", {"default": 1, "min": 1, "max": 99999}),
            }
        }

    RETURN_TYPES = ("STRING", "STRING", )
    RETURN_NAMES = ("SCHEDULE", "show_text", )
    FUNCTION = "bit_schedule"
    CATEGORY = icons.get("Comfyroll/Animation/Schedule")    

    def bit_schedule(self, binary_string, interval, loops=1):
    
        show_help = "https://github.com/Suzie1/ComfyUI_Comfyroll_CustomNodes/wiki/Schedule-Nodes#cr-bit-schedule"
    
        schedule = []

        # Remove spaces and line returns from the input
        binary_string = binary_string.replace(" ", "").replace("\n", "")
        '''
        for i in range(len(binary_string) * loops):
            index = i % len(binary_string)  # Use modulo to ensure the index continues in a single sequence
            bit = int(binary_string[index])
            schedule.append(f"{i},{bit}")
        '''    
        for i in range(len(binary_string) * loops):
            schedule_index = i * interval
            bit_index = i % len(binary_string)
            bit = int(binary_string[bit_index])
            schedule.append(f"{schedule_index},{bit}")            
                
        schedule_out = '\n'.join(schedule)
        
        return (schedule_out, show_help,)

```
