---
tags:
- ConditionalSelection
---

# Number Input Switch
## Documentation
- Class name: `Number Input Switch`
- Category: `WAS Suite/Logic`
- Output node: `False`

The Number Input Switch node provides a mechanism to select between two numerical inputs based on a boolean condition. It is designed to facilitate conditional logic within data flows, allowing for dynamic selection of input values.
## Input types
### Required
- **`number_a`**
    - Represents the first numerical input option for the switch. Its value is considered if the boolean condition is true.
    - Comfy dtype: `NUMBER`
    - Python dtype: `float | int`
- **`number_b`**
    - Represents the second numerical input option for the switch. Its value is considered if the boolean condition is false.
    - Comfy dtype: `NUMBER`
    - Python dtype: `float | int`
- **`boolean`**
    - A boolean flag that determines which of the two numerical inputs (number_a or number_b) is selected for output.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
## Output types
- **`number`**
    - Comfy dtype: `NUMBER`
    - The original number selected based on the boolean condition.
    - Python dtype: `float | int`
- **`float`**
    - Comfy dtype: `FLOAT`
    - The float representation of the selected number.
    - Python dtype: `float`
- **`int`**
    - Comfy dtype: `INT`
    - The integer representation of the selected number.
    - Python dtype: `int`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class WAS_Number_Input_Switch:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "number_a": ("NUMBER",),
                "number_b": ("NUMBER",),
                "boolean": ("BOOLEAN", {"forceInput": True}),
            }
        }

    RETURN_TYPES = ("NUMBER", "FLOAT", "INT")
    FUNCTION = "number_input_switch"

    CATEGORY = "WAS Suite/Logic"

    def number_input_switch(self, number_a, number_b, boolean=True):

        if boolean:
            return (number_a, float(number_a), int(number_a))
        else:
            return (number_b, float(number_b), int(number_b))

```
