---
tags:
- Math
- VectorMath
---

# BoolBinaryOperation
## Documentation
- Class name: `CM_BoolBinaryOperation`
- Category: `math/bool`
- Output node: `False`

This node performs binary operations on boolean values, allowing for the combination and manipulation of boolean logic.
## Input types
### Required
- **`op`**
    - Specifies the binary operation to perform on the boolean inputs, such as 'And', 'Or', 'Xor', etc. This choice determines how the two boolean inputs will be combined.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`a`**
    - The first boolean input for the binary operation.
    - Comfy dtype: `BOOL`
    - Python dtype: `bool`
- **`b`**
    - The second boolean input for the binary operation.
    - Comfy dtype: `BOOL`
    - Python dtype: `bool`
## Output types
- **`bool`**
    - Comfy dtype: `BOOL`
    - The result of the specified binary operation on the two boolean inputs.
    - Python dtype: `bool`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class BoolBinaryOperation:
    @classmethod
    def INPUT_TYPES(cls) -> Mapping[str, Any]:
        return {
            "required": {
                "op": (list(BOOL_BINARY_OPERATIONS.keys()),),
                "a": DEFAULT_BOOL,
                "b": DEFAULT_BOOL,
            }
        }

    RETURN_TYPES = ("BOOL",)
    FUNCTION = "op"
    CATEGORY = "math/bool"

    def op(self, op: str, a: bool, b: bool) -> tuple[bool]:
        return (BOOL_BINARY_OPERATIONS[op](a, b),)

```
