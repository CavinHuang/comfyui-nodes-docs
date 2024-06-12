---
tags:
- MathematicalFunctions
- Multiplication
---

# Multiply
## Documentation
- Class name: `DF_Multiply`
- Category: `Derfuu_Nodes/Math`
- Output node: `False`

The `DF_Multiply` node performs multiplication of two floating-point numbers, providing a straightforward way to calculate the product of two values within a mathematical or computational workflow.
## Input types
### Required
- **`Value_A`**
    - `Value_A` represents the first floating-point number to be multiplied. It plays a crucial role in determining the overall result of the multiplication operation.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`Value_B`**
    - `Value_B` is the second floating-point number involved in the multiplication. Its value directly influences the product outcome, making it an essential component of the operation.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
## Output types
- **`float`**
    - Comfy dtype: `FLOAT`
    - The output is a floating-point number representing the product of the two input values, `Value_A` and `Value_B`. It encapsulates the result of the multiplication operation.
    - Python dtype: `float`
## Usage tips
- Infra type: `CPU`
- Common nodes:
    - floatToInt _O



## Source code
```python
class MultiplyNode:
    def __init__(self) -> None:
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "Value_A": Field.float(),
                "Value_B": Field.float(),
            },
        }

    RETURN_TYPES = ("FLOAT",)
    FUNCTION = "multiply"
    CATEGORY = TREE_MATH

    def multiply(self, Value_A, Value_B):
        total = float(Value_A * Value_B)
        return (total,)

```
