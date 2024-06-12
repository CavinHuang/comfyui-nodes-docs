---
tags:
- Scheduling
---

# Schedule Numeric Clamp
## Documentation
- Class name: `SaltListClamp`
- Category: `SALT/Scheduling/Filter`
- Output node: `False`

The SaltListClamp node is designed to adjust the values in a given list to ensure they fall within a specified minimum and maximum range. This process, known as clamping, is crucial for maintaining the integrity of data by preventing values from exceeding predetermined bounds.
## Input types
### Required
- **`schedule_list`**
    - The list of values to be clamped. This parameter is essential for defining the scope of data that will undergo the clamping process.
    - Comfy dtype: `LIST`
    - Python dtype: `List[float]`
- **`min_value`**
    - The minimum allowable value in the clamped list. This parameter sets the lower bound for the clamping operation.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`max_value`**
    - The maximum allowable value in the clamped list. This parameter establishes the upper limit for the clamping operation.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
## Output types
- **`schedule_list`**
    - Comfy dtype: `LIST`
    - The resulting list after clamping, where all values are adjusted to fall within the specified minimum and maximum bounds.
    - Python dtype: `List[float]`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class SaltListClamp:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "schedule_list": ("LIST", ),
                "min_value": ("FLOAT", {"step": 0.01}),
                "max_value": ("FLOAT", {"step": 0.01})
            },
        }

    RETURN_TYPES = ("LIST",)
    RETURN_NAMES = ("schedule_list",)
    FUNCTION = "clamp_values"
    CATEGORY = "SALT/Scheduling/Filter"

    def clamp_values(self, schedule_list, min_value, max_value):
        if min_value > max_value:
            raise ValueError("Schedules min_value cannot be greater than max_value.")

        clamped_list = [max(min(x, max_value), min_value) for x in schedule_list]

        return (clamped_list, )

```
