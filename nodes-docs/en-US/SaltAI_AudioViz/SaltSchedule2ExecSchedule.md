---
tags:
- Scheduling
---

# Convert Schedule to Iterative Execution List
## Documentation
- Class name: `SaltSchedule2ExecSchedule`
- Category: `SALT/Scheduling`
- Output node: `False`

This node is designed to transform a list into an iterative execution list, facilitating the conversion of scheduling data into a format suitable for sequential processing.
## Input types
### Required
- **`list_input`**
    - Represents the input list to be converted into an iterative execution list, serving as the primary data structure for transformation.
    - Comfy dtype: `LIST`
    - Python dtype: `List`
## Output types
- **`float`**
    - Comfy dtype: `FLOAT`
    - Outputs a list of floats derived from the input list, indicating the transformed scheduling data.
    - Python dtype: `List[float]`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class SaltSchedule2ExecSchedule:
    """
        Converts a list to a list output (iterative execution list)
    """
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "list_input": ("LIST", {}), 
            },
        }

    RETURN_TYPES = ("FLOAT",)
    RETURN_NAMES = ("float",)
    OUTPUT_IS_LIST = (True,)
    FUNCTION = "convert"
    CATEGORY = "SALT/Scheduling"

    def convert(self, list_input):
        return (list_input, )

```
