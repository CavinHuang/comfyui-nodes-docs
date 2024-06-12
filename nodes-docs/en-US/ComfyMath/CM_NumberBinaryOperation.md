---
tags:
- Math
- VectorMath
---

# NumberBinaryOperation
## Documentation
- Class name: `CM_NumberBinaryOperation`
- Category: `math/number`
- Output node: `False`

This node performs binary operations on numbers, such as addition, subtraction, multiplication, and division, based on a specified operation. It abstracts the complexity of handling different types of number operations, providing a straightforward way to execute binary mathematical operations between two numbers.
## Input types
### Required
- **`op`**
    - Specifies the binary operation to be performed on the two numbers. It determines the mathematical action (e.g., addition, subtraction) that will be executed.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `List[str]`
- **`a`**
    - The first operand in the binary operation, representing one of the numbers involved in the calculation.
    - Comfy dtype: `NUMBER`
    - Python dtype: `float`
- **`b`**
    - The second operand in the binary operation, representing the other number involved in the calculation.
    - Comfy dtype: `NUMBER`
    - Python dtype: `float`
## Output types
- **`number`**
    - Comfy dtype: `NUMBER`
    - The result of the binary operation performed on the two input numbers.
    - Python dtype: `Tuple[float]`
## Usage tips
- Infra type: `CPU`
- Common nodes:
    - [CM_NumberToInt](../../ComfyMath/Nodes/CM_NumberToInt.md)



## Source code
```python
class NumberBinaryOperation:
    @classmethod
    def INPUT_TYPES(cls) -> Mapping[str, Any]:
        return {
            "required": {
                "op": (list(FLOAT_BINARY_OPERATIONS.keys()),),
                "a": DEFAULT_NUMBER,
                "b": DEFAULT_NUMBER,
            }
        }

    RETURN_TYPES = ("NUMBER",)
    FUNCTION = "op"
    CATEGORY = "math/number"

    def op(self, op: str, a: number, b: number) -> tuple[float]:
        return (FLOAT_BINARY_OPERATIONS[op](float(a), float(b)),)

```
