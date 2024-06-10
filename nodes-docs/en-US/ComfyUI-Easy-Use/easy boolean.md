---
tags:
- BooleanLogic
- ConditionalSelection
---

# Boolean
## Documentation
- Class name: `easy boolean`
- Category: `EasyUse/Logic/Type`
- Output node: `False`

This node provides a simplified interface for toggling boolean settings within a larger system, streamlining the process of enabling or disabling features or behaviors based on user input or predefined conditions.
## Input types
### Required
- **`value`**
    - unknown
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `unknown`
## Output types
- **`boolean`**
    - Comfy dtype: `BOOLEAN`
    - Outputs a boolean value indicating the result of the condition check, which determines if the specified feature or behavior should be enabled or disabled.
    - Python dtype: `bool`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class Boolean:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {"value": ("BOOLEAN", {"default": False})},
        }

    RETURN_TYPES = ("BOOLEAN",)
    RETURN_NAMES = ("boolean",)
    FUNCTION = "execute"
    CATEGORY = "EasyUse/Logic/Type"

    def execute(self, value):
        return (value,)

```
