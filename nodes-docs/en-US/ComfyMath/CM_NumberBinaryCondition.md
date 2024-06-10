---
tags:
- Math
- VectorMath
---

# NumberBinaryCondition
## Documentation
- Class name: `CM_NumberBinaryCondition`
- Category: `math/float`
- Output node: `False`

This node performs binary conditional operations on numbers, evaluating the relationship between two numeric inputs based on a specified condition.
## Input types
### Required
- **`op`**
    - Specifies the binary conditional operation to be performed, determining how the two numbers are compared.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`a`**
    - The first number to be compared in the conditional operation.
    - Comfy dtype: `NUMBER`
    - Python dtype: `float`
- **`b`**
    - The second number to be compared in the conditional operation.
    - Comfy dtype: `NUMBER`
    - Python dtype: `float`
## Output types
- **`bool`**
    - Comfy dtype: `BOOL`
    - The result of the binary conditional operation, indicating whether the specified condition holds true between the two numbers.
    - Python dtype: `tuple[bool]`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class NumberBinaryCondition:
    @classmethod
    def INPUT_TYPES(cls) -> Mapping[str, Any]:
        return {
            "required": {
                "op": (list(FLOAT_BINARY_CONDITIONS.keys()),),
                "a": DEFAULT_NUMBER,
                "b": DEFAULT_NUMBER,
            }
        }

    RETURN_TYPES = ("BOOL",)
    FUNCTION = "op"
    CATEGORY = "math/float"

    def op(self, op: str, a: number, b: number) -> tuple[bool]:
        return (FLOAT_BINARY_CONDITIONS[op](float(a), float(b)),)

```
