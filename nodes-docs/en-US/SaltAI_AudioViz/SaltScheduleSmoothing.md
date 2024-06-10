---
tags:
- Scheduling
---

# Schedule Smoothing
## Documentation
- Class name: `SaltScheduleSmoothing`
- Category: `SALT/Scheduling/Filter`
- Output node: `False`

The SaltScheduleSmoothing node is designed to apply a smoothing filter to a schedule list, using a specified smoothing factor to blend between consecutive values. This process aims to create a more gradual transition between points in the schedule, enhancing the overall smoothness of the sequence.
## Input types
### Required
- **`schedule_list`**
    - The schedule_list is the sequence of values to be smoothed. It serves as the primary data upon which the smoothing operation is performed, influencing the smoothness of the resulting schedule.
    - Comfy dtype: `LIST`
    - Python dtype: `List[float]`
- **`smoothing_factor`**
    - The smoothing_factor determines the degree of smoothing applied to the schedule list. A higher factor results in a smoother transition between points, directly affecting the smoothness of the output.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
## Output types
- **`schedule_list`**
    - Comfy dtype: `LIST`
    - The output is a smoothed version of the input schedule list, with transitions between points made more gradual by the smoothing process.
    - Python dtype: `List[float]`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class SaltScheduleSmoothing:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "schedule_list": ("LIST", ),
                "smoothing_factor": ("FLOAT", {"min": 0.0, "max": 1.0, "default": 0.5}),
            },
        }

    RETURN_TYPES = ("LIST",)
    RETURN_NAMES = ("schedule_list", )
    FUNCTION = "smooth"
    CATEGORY = "SALT/Scheduling/Filter"

    def smooth(self, schedule_list, smoothing_factor):
        smoothed_schedule = schedule_list[:]
        for i in range(1, len(schedule_list)):
            smoothed_schedule[i] = smoothed_schedule[i-1] * (1 - smoothing_factor) + schedule_list[i] * smoothing_factor
        return (smoothed_schedule, )

```
