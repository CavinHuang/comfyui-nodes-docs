---
tags:
- Math
- MathematicalFunctions
---

# Floor
## Documentation
- Class name: `DF_Floor`
- Category: `Derfuu_Nodes/Functions/Converters`
- Output node: `False`

The DF_Floor node is designed to round down the input floating-point number to its nearest lower integer. This operation is commonly known as 'flooring' a number.
## Input types
### Required
- **`Value`**
    - The 'Value' parameter represents the floating-point number that is to be rounded down. It is crucial for determining the output of the node, as it directly influences the floor operation.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
## Output types
- **`int`**
    - Comfy dtype: `INT`
    - The output is the nearest lower integer value of the input floating-point number, achieved through the floor operation.
    - Python dtype: `int`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class FloorNode:
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
        total = int(math.floor(Value))
        return (total,)

```
