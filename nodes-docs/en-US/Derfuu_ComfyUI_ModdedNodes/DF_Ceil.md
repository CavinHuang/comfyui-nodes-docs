---
tags:
- Math
- MathematicalFunctions
---

# Ceil
## Documentation
- Class name: `DF_Ceil`
- Category: `Derfuu_Nodes/Functions/Converters`
- Output node: `False`

The DF_Ceil node rounds up a given floating-point number to the nearest integer, effectively implementing the mathematical ceiling function.
## Input types
### Required
- **`Value`**
    - Specifies the floating-point number to be rounded up to its nearest integer value. This input is crucial for determining the output of the node.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
## Output types
- **`int`**
    - Comfy dtype: `INT`
    - Represents the integer result of rounding up the input floating-point number.
    - Python dtype: `int`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class CeilNode:
    def __init__(self) -> None:
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "Value": Field.float(),
            }
        }

    RETURN_TYPES = ("INT",)
    FUNCTION = "get_value"
    CATEGORY = TREE_CONVERTERS

    def get_value(self, Value):
        total = int(math.ceil(Value))
        return (total,)

```
