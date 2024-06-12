---
tags:
- Math
- MathematicalFunctions
---

# Int to Float
## Documentation
- Class name: `DF_Int_to_Float`
- Category: `Derfuu_Nodes/Functions/Converters`
- Output node: `False`

The DF_Int_to_Float node is designed to convert integer values to floating-point numbers, facilitating operations that require decimal precision.
## Input types
### Required
- **`Value`**
    - The 'Value' parameter represents the integer input that will be converted to a floating-point number. This conversion is essential for enabling precise calculations that integers alone cannot accommodate.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`float`**
    - Comfy dtype: `FLOAT`
    - The output is a floating-point representation of the input integer, allowing for decimal precision in subsequent operations.
    - Python dtype: `float`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class Int2Float:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "Value": Field.int(),
            }
        }

    RETURN_TYPES = ("FLOAT",)
    FUNCTION = "get_value"
    CATEGORY = TREE_CONVERTERS

    def get_value(self, Value):
        return (float(Value),)

```
