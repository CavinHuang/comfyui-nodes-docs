---
tags:
- Scheduling
---

# Schedule Cyclical Loop
## Documentation
- Class name: `SaltCyclicalSchedule`
- Category: `SALT/Scheduling/Filter`
- Output node: `False`

The SaltCyclicalSchedule node is designed to generate a cyclical pattern within a given schedule list. It allows for the repetition of a specified segment of the schedule, optionally incorporating a ping-pong effect for a mirrored repetition, enhancing the dynamic range and variability of the schedule.
## Input types
### Required
- **`schedule_list`**
    - The list of scheduled items to be processed for cyclical repetition. It serves as the base sequence from which a cyclical pattern is generated, determining the overall structure and content of the output.
    - Comfy dtype: `LIST`
    - Python dtype: `List[Any]`
- **`start_index`**
    - Specifies the starting index of the segment within the schedule list to be repeated, marking the beginning of the cyclical pattern.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`end_index`**
    - Defines the ending index of the segment within the schedule list to be repeated, marking the end of the cyclical pattern.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`repetitions`**
    - Determines the number of times the specified segment is repeated, directly influencing the length and repetition rate of the cyclical schedule.
    - Comfy dtype: `INT`
    - Python dtype: `int`
### Optional
- **`ping_pong`**
    - When enabled, adds a mirrored repetition of the segment to the cycle, creating a back-and-forth pattern that enhances the schedule's complexity.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
## Output types
- **`schedule_list`**
    - Comfy dtype: `LIST`
    - The resulting list after applying the cyclical pattern generation, which includes the repeated segments and, if enabled, their mirrored repetitions.
    - Python dtype: `List[Any]`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class SaltCyclicalSchedule:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "schedule_list": ("LIST", ),
                "start_index": ("INT", {"min": 0}),
                "end_index": ("INT", {"min": 0}),
                "repetitions": ("INT", {"min": 1}),
            },
            "optional": {
                "ping_pong": ("BOOLEAN", {"default": False}),
            },
        }

    RETURN_TYPES = ("LIST",)
    RETURN_NAMES = ("schedule_list",)
    FUNCTION = "generate_cyclical"
    CATEGORY = "SALT/Scheduling/Filter"

    def generate_cyclical(self, schedule_list, start_index, end_index, repetitions, ping_pong=False):
        if end_index < start_index:
            raise ValueError("Schedule end_index must be greater than or equal to start_index.")
        
        if end_index >= len(schedule_list):
            raise ValueError("Schedule end_index must be within the range of the schedule_list.")
        
        loop_segment = schedule_list[start_index:end_index + 1]
        
        cyclical_schedule = []
        for _ in range(repetitions):
            cyclical_schedule.extend(loop_segment)
            if ping_pong:
                cyclical_schedule.extend(loop_segment[-2:0:-1])
        
        return (cyclical_schedule,)

```
