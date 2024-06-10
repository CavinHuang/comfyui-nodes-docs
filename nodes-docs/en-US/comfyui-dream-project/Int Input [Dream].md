---
tags:
- DataConversion
- DataTypeConversion
- Integer
- NumericConversion
---

# ✍ Int Input
## Documentation
- Class name: `Int Input [Dream]`
- Category: `✨ Dream/🛠 utils`
- Output node: `False`

The 'Int Input' node allows users to input integer values into a system, providing a straightforward interface for numerical data entry. This node is essential for scenarios requiring precise numerical inputs, such as setting parameters or configurations that rely on integer values.
## Input types
### Required
- **`value`**
    - Represents the integer value to be input by the user. It is crucial for defining the exact numerical input that the system will process.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`INT`**
    - Comfy dtype: `INT`
    - Outputs the integer value input by the user, facilitating its use in subsequent operations or calculations within the system.
    - Python dtype: `int`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class DreamInputInt:
    NODE_NAME = "Int Input"
    ICON = "✍"

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "value": ("INT", {"default": 0}),
            },
        }

    CATEGORY = NodeCategories.UTILS
    RETURN_TYPES = ("INT",)
    RETURN_NAMES = ("INT",)
    FUNCTION = "noop"

    @classmethod
    def IS_CHANGED(cls, *values):
        return hashed_as_strings(*values)

    def noop(self, value):
        return (value,)

```
