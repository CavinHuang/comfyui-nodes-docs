---
tags:
- Arithmetic
- MathematicalFunctions
---

# Divide
## Documentation
- Class name: `DF_Divide`
- Category: `Derfuu_Nodes/Math`
- Output node: `False`

The DivideNode facilitates the division of two numerical values, providing a straightforward way to perform arithmetic division operations within a node-based programming environment.
## Input types
### Required
- **`Numerator`**
    - Specifies the dividend in the division operation, determining the value to be divided.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`Denominator`**
    - Determines the divisor in the division operation, affecting the outcome by dividing the numerator.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
## Output types
- **`float`**
    - Comfy dtype: `FLOAT`
    - The result of dividing the Numerator by the Denominator, expressed as a floating-point number.
    - Python dtype: `float`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class DivideNode:
    def __init__(self) -> None:
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "Numerator": Field.float(),
                "Denominator": Field.float(),
            },
        }

    RETURN_TYPES = ("FLOAT",)
    FUNCTION = "divide"
    CATEGORY = TREE_MATH

    def divide(self, Numerator, Denominator):
        total = float(Numerator / Denominator)
        return (total,)

```
