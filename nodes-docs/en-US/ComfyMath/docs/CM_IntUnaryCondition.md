---
tags:
- Math
- UnaryOperations
- VectorMath
---

# IntUnaryCondition
## Documentation
- Class name: `CM_IntUnaryCondition`
- Category: `math/int`
- Output node: `False`

This node performs unary operations on integers based on a specified operation. It abstracts the complexity of various unary operations into a simple interface, allowing for the evaluation of conditions or transformations on single integer values.
## Input types
### Required
- **`op`**
    - Specifies the unary operation to be performed on the integer. This operation determines how the integer is evaluated or transformed, impacting the node's output.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`a`**
    - The integer value to be operated on. This is the primary input for the unary operation, which will be evaluated or transformed according to the specified operation.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`bool`**
    - Comfy dtype: `BOOL`
    - The result of the unary operation on the integer, typically a boolean value indicating the outcome of a condition.
    - Python dtype: `bool`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class IntUnaryCondition:
    @classmethod
    def INPUT_TYPES(cls) -> Mapping[str, Any]:
        return {
            "required": {"op": (list(INT_UNARY_CONDITIONS.keys()),), "a": DEFAULT_INT}
        }

    RETURN_TYPES = ("BOOL",)
    FUNCTION = "op"
    CATEGORY = "math/int"

    def op(self, op: str, a: int) -> tuple[bool]:
        return (INT_UNARY_CONDITIONS[op](a),)

```
