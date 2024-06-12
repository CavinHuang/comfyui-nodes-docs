---
tags:
- Math
- VectorMath
---

# IntBinaryOperation
## Documentation
- Class name: `CM_IntBinaryOperation`
- Category: `math/int`
- Output node: `False`

The node `CM_IntBinaryOperation` performs binary operations on integer inputs, such as addition, subtraction, multiplication, and division, based on a specified operation. It abstracts the complexity of these operations into a simple interface, allowing for the dynamic execution of various mathematical operations on integers.
## Input types
### Required
- **`op`**
    - Specifies the binary operation to be performed on the integer inputs. This affects the node's execution by determining the mathematical operation applied.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`a`**
    - Represents the first integer input for the binary operation. It is one of the operands on which the specified operation is performed.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`b`**
    - Represents the second integer input for the binary operation. It serves as the other operand in the operation alongside `a`.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`int`**
    - Comfy dtype: `INT`
    - The result of the specified binary operation performed on the integer inputs `a` and `b`.
    - Python dtype: `int`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class IntBinaryOperation:
    @classmethod
    def INPUT_TYPES(cls) -> Mapping[str, Any]:
        return {
            "required": {
                "op": (list(INT_BINARY_OPERATIONS.keys()),),
                "a": DEFAULT_INT,
                "b": DEFAULT_INT,
            }
        }

    RETURN_TYPES = ("INT",)
    FUNCTION = "op"
    CATEGORY = "math/int"

    def op(self, op: str, a: int, b: int) -> tuple[int]:
        return (INT_BINARY_OPERATIONS[op](a, b),)

```
