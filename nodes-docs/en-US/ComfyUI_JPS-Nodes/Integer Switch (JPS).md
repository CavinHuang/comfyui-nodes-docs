---
tags:
- ConditionalSelection
---

# Integer Switch (JPS)
## Documentation
- Class name: `Integer Switch (JPS)`
- Category: `JPS Nodes/Switches`
- Output node: `False`

The Integer Switch node is designed to select and output one of several integer inputs based on a specified selection criterion. It facilitates conditional logic within data flows by allowing the dynamic selection of integer values.
## Input types
### Required
- **`select`**
    - Determines which integer input to select and output. The selection is based on this integer value, enabling conditional logic and dynamic data flow.
    - Comfy dtype: `INT`
    - Python dtype: `int`
### Optional
- **`int_i`**
    - Represents a series of optional integer inputs (int_1 to int_5) that can be selected for output. Each 'int_i' serves as a potential output based on the 'select' criterion.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`int_out`**
    - Comfy dtype: `INT`
    - The output integer value selected based on the input criteria.
    - Python dtype: `int`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class Integer_Switch:

    CATEGORY = 'JPS Nodes/Switches'
    RETURN_TYPES = ("INT",)
    RETURN_NAMES = ("int_out",)
    FUNCTION = "get_int"

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "select": ("INT", {}),
            },
            "optional": {
                "int_1": ("INT", {}),
                "int_2": ("INT", {}),
                "int_3": ("INT", {}),
                "int_4": ("INT", {}),
                "int_5": ("INT", {}),
            }
        }

    def get_int(self,select,int_1=None,int_2=None,int_3=None,int_4=None,int_5=None,):
        
        int_out = int_1

        if (select == 2):
            int_out = int_2
        elif (select == 3):
            int_out = int_3
        elif (select == 4):
            int_out = int_4
        elif (select == 5):
            int_out = int_5

        return (int_out,)

```
