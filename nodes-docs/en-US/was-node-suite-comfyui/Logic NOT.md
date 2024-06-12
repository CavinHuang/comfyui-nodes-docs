---
tags:
- BooleanLogic
- ConditionalSelection
---

# Logic NOT
## Documentation
- Class name: `Logic NOT`
- Category: `WAS Suite/Logic`
- Output node: `False`

The node performs a logical NOT operation on a given boolean input, effectively inverting its value. It's a fundamental component in logical operations, allowing for the negation of boolean conditions.
## Input types
### Required
- **`boolean`**
    - The boolean input to be negated. This parameter determines the boolean value that will be inverted by the logical NOT operation.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
## Output types
- **`boolean`**
    - Comfy dtype: `BOOLEAN`
    - The inverted boolean value of the input. If the input is True, the output will be False, and vice versa.
    - Python dtype: `bool`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class WAS_Logical_NOT:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "boolean": ("BOOLEAN", {"default": False}),
            }
        }

    RETURN_TYPES = ("BOOLEAN",)
    FUNCTION = "do"

    CATEGORY = "WAS Suite/Logic"

    def do(self, boolean):
        return (not boolean,)

```
