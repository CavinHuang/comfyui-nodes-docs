---
tags:
- Scheduling
---

# Schedule Merge
## Documentation
- Class name: `SaltScheduleMerge`
- Category: `SALT/Scheduling/Filter`
- Output node: `False`

The SaltScheduleMerge node is designed to combine two schedule lists into a single list, effectively appending the second list to the end of the first. This functionality is crucial for scenarios where sequential scheduling tasks need to be merged for streamlined processing.
## Input types
### Required
- **`schedule_list_a`**
    - Represents the first schedule list to be merged. It serves as the initial part of the new, combined schedule list.
    - Comfy dtype: `LIST`
    - Python dtype: `List[Any]`
- **`schedule_list_b`**
    - Represents the second schedule list to be merged. It is appended to the end of the first list, completing the combined schedule list.
    - Comfy dtype: `LIST`
    - Python dtype: `List[Any]`
## Output types
- **`schedule_list`**
    - Comfy dtype: `LIST`
    - The combined schedule list resulting from appending the second list to the first.
    - Python dtype: `List[Any]`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class SaltScheduleMerge:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "schedule_list_a": ("LIST", ),
                "schedule_list_b": ("LIST", ),
            },
        }

    RETURN_TYPES = ("LIST",)
    RETURN_NAMES = ("schedule_list", )
    FUNCTION = "append"
    CATEGORY = "SALT/Scheduling/Filter"

    def append(self, schedule_list_a, schedule_list_b):
        appended_list = schedule_list_a + schedule_list_b
        return (appended_list, )

```
