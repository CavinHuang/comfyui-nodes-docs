---
tags:
- Math
- VectorMath
---

# FloatBinaryOperation
## Documentation
- Class name: `CM_FloatBinaryOperation`
- Category: `math/float`
- Output node: `False`

This node performs binary operations on two float inputs, such as addition, subtraction, multiplication, or division, based on the operation specified. It abstracts the complexity of float arithmetic operations, providing a straightforward way to execute binary mathematical operations on float values.
## Input types
### Required
- **`op`**
    - Specifies the binary operation to be performed on the float inputs. This parameter determines the mathematical operation (e.g., addition, subtraction) that will be applied.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`a`**
    - The first float input for the binary operation. Acts as one of the operands in the mathematical operation.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`b`**
    - The second float input for the binary operation. Serves as the other operand in the mathematical operation.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
## Output types
- **`float`**
    - Comfy dtype: `FLOAT`
    - The result of the binary operation performed on the two float inputs. It is a single float value representing the outcome of the specified operation.
    - Python dtype: `float`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class FloatBinaryOperation:
    @classmethod
    def INPUT_TYPES(cls) -> Mapping[str, Any]:
        return {
            "required": {
                "op": (list(FLOAT_BINARY_OPERATIONS.keys()),),
                "a": DEFAULT_FLOAT,
                "b": DEFAULT_FLOAT,
            }
        }

    RETURN_TYPES = ("FLOAT",)
    FUNCTION = "op"
    CATEGORY = "math/float"

    def op(self, op: str, a: float, b: float) -> tuple[float]:
        return (FLOAT_BINARY_OPERATIONS[op](a, b),)

```
