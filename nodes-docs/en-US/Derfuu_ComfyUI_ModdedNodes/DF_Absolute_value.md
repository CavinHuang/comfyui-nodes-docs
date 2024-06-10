---
tags:
- MathematicalFunctions
---

# Absolute value
## Documentation
- Class name: `DF_Absolute_value`
- Category: `Derfuu_Nodes/Functions/Converters`
- Output node: `False`

The DF_Absolute_value node provides a functionality to compute the absolute value of a given input. It can optionally return the negative absolute value based on a specified condition, allowing for flexible numerical transformations within data processing pipelines.
## Input types
### Required
- **`Value`**
    - The primary input for the node, representing the value for which the absolute (or negative absolute) value is to be computed. Its role is crucial in determining the output of the node.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`negative_out`**
    - A boolean flag that determines whether the output should be the negative absolute value of the input. This parameter allows for conditional output, enhancing the node's versatility in numerical operations.
    - Comfy dtype: `COMBO[BOOLEAN]`
    - Python dtype: `bool`
## Output types
- **`float`**
    - Comfy dtype: `FLOAT`
    - The output of the node, which is either the absolute value or the negative absolute value of the input, depending on the 'negative_out' parameter.
    - Python dtype: `float`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class ABSNode:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(self):
        return {
            "required": {
                "Value": Field.float(),
                "negative_out": ([False, True],)
            }
        }

    RETURN_TYPES = ("FLOAT",)
    FUNCTION = "abs_val"
    CATEGORY = TREE_CONVERTERS

    def abs_val(self, Value, Get_negative):
        if Get_negative:
            return (-abs(Value),)
        return (abs(Value),)

```
