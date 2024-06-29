---
tags:
- BooleanLogic
- ConditionalSelection
---

# 🪛 Primitive boolean
## Documentation
- Class name: `Primitive boolean [Crystools]`
- Category: `crystools 🪛/Primitive`
- Output node: `False`

This node represents a primitive boolean data type in Crystools, allowing for the manipulation and processing of boolean values within the framework.
## Input types
### Required
- **`boolean`**
    - The boolean input parameter allows users to provide a boolean value, which is essential for the node's operation as it determines the boolean value to be processed or manipulated.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
## Output types
- **`boolean`**
    - Comfy dtype: `BOOLEAN`
    - The output is a boolean value, reflecting the input boolean value after being processed or manipulated by the node.
    - Python dtype: `bool`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class CBoolean:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "boolean": BOOLEAN,
            }
        }

    CATEGORY = CATEGORY.MAIN.value + CATEGORY.PRIMITIVE.value
    RETURN_TYPES = ("BOOLEAN",)
    RETURN_NAMES = ("boolean",)

    FUNCTION = "execute"

    def execute(self, boolean=True):
        return (boolean,)

```
