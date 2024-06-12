---
tags:
- Scheduling
---

# Convert Schedule List
## Documentation
- Class name: `SaltScheduleConverter`
- Category: `SALT/Scheduling`
- Output node: `False`

The SaltScheduleConverter node is designed to transform schedule lists into formats compatible with various modules by converting list inputs into floats, ensuring interoperability with modules that require specific numeric types.
## Input types
### Required
- **`schedule_list`**
    - The schedule_list parameter is a list of values intended to be converted. It plays a crucial role in determining the output format and type, affecting the compatibility with other modules.
    - Comfy dtype: `LIST`
    - Python dtype: `List[float]`
## Output types
- **`floats`**
    - Comfy dtype: `FLOATS`
    - A list of original float values from the input schedule list, maintaining the original numeric format.
    - Python dtype: `List[float]`
- **`float`**
    - Comfy dtype: `FLOAT`
    - A duplicate of the original float list, serving as an alternative format for compatibility.
    - Python dtype: `List[float]`
- **`int`**
    - Comfy dtype: `INT`
    - A list of integers derived from rounding the original schedule list values, tailored for modules requiring integer inputs.
    - Python dtype: `List[int]`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class SaltScheduleConverter:
    """
        Converts a LIST input to FLOATS or FLOAT type
        Makes schedule lists compatible with MTB, IPAdapter, and other modules that use false types.
    """
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "schedule_list": ("LIST",)
            },
        }
    
    RETURN_TYPES = ("FLOATS", "FLOAT", "INT")
    RETURN_NAMES = ("floats", "float", "int")
    FUNCTION = "convert"
    CATEGORY = "SALT/Scheduling"

    def convert(self, schedule_list):
        int_schedule = [int(round(val)) for val in schedule_list]
        return (schedule_list, schedule_list, int_schedule)

```
