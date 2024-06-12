---
tags:
- Math
- MathematicalFunctions
---

# Power
## Documentation
- Class name: `DF_Power`
- Category: `Derfuu_Nodes/Math`
- Output node: `False`

The `DF_Power` node performs exponentiation, raising a base value to the power of a specified exponent. It abstracts the mathematical operation of exponentiation, enabling the dynamic computation of powers within a workflow.
## Input types
### Required
- **`Value`**
    - The base value for the exponentiation operation. It determines the number being raised to the power of the exponent.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`Exponent`**
    - The exponent value in the exponentiation operation. It specifies the power to which the base value is raised.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
## Output types
- **`float`**
    - Comfy dtype: `FLOAT`
    - The result of raising the base value to the power of the exponent, computed as a floating-point number.
    - Python dtype: `float`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class PowNode:
    def __init__(self) -> None:
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "Value": Field.float(),
                "Exponent": Field.float(),
            },
        }

    RETURN_TYPES = ("FLOAT",)
    FUNCTION = "pow"
    CATEGORY = TREE_MATH

    def pow(self, Value, Exponent):
        total = math.pow(Value, Exponent)
        return (total,)

```
