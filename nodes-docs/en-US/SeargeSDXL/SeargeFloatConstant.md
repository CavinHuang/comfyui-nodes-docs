---
tags:
- Constant
---

# Float Constant
## Documentation
- Class name: `SeargeFloatConstant`
- Category: `Searge/_deprecated_/Floats`
- Output node: `False`

The SeargeFloatConstant node is designed to provide a constant floating-point value as specified by the user. It serves as a simple utility to inject fixed numerical values into a data flow or computation process.
## Input types
### Required
- **`value`**
    - Specifies the constant floating-point value to be returned by the node. This allows for the injection of a predetermined numerical value into the workflow.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
## Output types
- **`value`**
    - Comfy dtype: `FLOAT`
    - The constant floating-point value specified by the user, serving as the node's output.
    - Python dtype: `float`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class SeargeFloatConstant:
    @classmethod
    def INPUT_TYPES(s):
        return {"required": {
            "value": ("FLOAT", {"default": 0.0, "step": 0.01}),
        },
        }

    RETURN_TYPES = ("FLOAT",)
    RETURN_NAMES = ("value",)
    FUNCTION = "get_value"

    CATEGORY = "Searge/_deprecated_/Floats"

    def get_value(self, value):
        return (value,)

```
