---
tags:
- Constant
---

# Integer Constant
## Documentation
- Class name: `SeargeIntegerConstant`
- Category: `Searge/_deprecated_/Integers`
- Output node: `False`

The SeargeIntegerConstant node is designed to provide a constant integer value as output. It serves as a simple utility within a larger system to supply fixed numerical values, facilitating operations or calculations that require a specific, unchanging integer.
## Input types
### Required
- **`value`**
    - Specifies the constant integer value to be returned by the node. This parameter allows for the customization of the output based on the user's needs, ensuring flexibility in providing a specific integer constant.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`value`**
    - Comfy dtype: `INT`
    - The constant integer value specified by the input parameter. This output is used in subsequent operations or calculations that require a fixed integer.
    - Python dtype: `int`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class SeargeIntegerConstant:
    @classmethod
    def INPUT_TYPES(s):
        return {"required": {
            "value": ("INT", {"default": 0, "min": 0, "max": 0xffffffffffffffff}),
        },
        }

    RETURN_TYPES = ("INT",)
    RETURN_NAMES = ("value",)
    FUNCTION = "get_value"

    CATEGORY = "Searge/_deprecated_/Integers"

    def get_value(self, value):
        return (value,)

```
