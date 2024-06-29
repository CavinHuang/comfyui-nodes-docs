---
tags:
- Math
- VectorMath
---

# BoolUnaryOperation
## Documentation
- Class name: `CM_BoolUnaryOperation`
- Category: `math/bool`
- Output node: `False`

This node performs unary boolean operations on a given boolean value. It supports operations like logical NOT, allowing for the manipulation of boolean logic in a mathematical or logical context.
## Input types
### Required
- **`op`**
    - Specifies the unary boolean operation to be performed, such as 'Not'. This choice determines how the input boolean value is manipulated.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `List[str]`
- **`a`**
    - The boolean value to be operated on. This is the primary input for the unary operation.
    - Comfy dtype: `BOOL`
    - Python dtype: `bool`
## Output types
- **`bool`**
    - Comfy dtype: `BOOL`
    - The result of the unary boolean operation performed on the input value.
    - Python dtype: `bool`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class BoolUnaryOperation:
    @classmethod
    def INPUT_TYPES(cls) -> Mapping[str, Any]:
        return {
            "required": {"op": (list(BOOL_UNARY_OPERATIONS.keys()),), "a": DEFAULT_BOOL}
        }

    RETURN_TYPES = ("BOOL",)
    FUNCTION = "op"
    CATEGORY = "math/bool"

    def op(self, op: str, a: bool) -> tuple[bool]:
        return (BOOL_UNARY_OPERATIONS[op](a),)

```
