---
tags:
- Math
- VectorMath
---

# FloatBinaryCondition
## Documentation
- Class name: `CM_FloatBinaryCondition`
- Category: `math/float`
- Output node: `False`

This node evaluates binary conditions between two floating-point numbers based on a specified operation. It abstracts the complexity of various floating-point comparisons into a simple interface, allowing users to perform mathematical comparisons like equality, inequality, greater than, and less than operations.
## Input types
### Required
- **`op`**
    - Specifies the operation to perform on the two floating-point numbers. It determines the type of comparison (e.g., equal, not equal, greater than) to be executed.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`a`**
    - The first floating-point number to be compared.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`b`**
    - The second floating-point number to be compared.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
## Output types
- **`bool`**
    - Comfy dtype: `BOOL`
    - The result of the binary condition operation, indicating whether the specified condition between the two floating-point numbers is true or false.
    - Python dtype: `bool`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class FloatBinaryCondition:
    @classmethod
    def INPUT_TYPES(cls) -> Mapping[str, Any]:
        return {
            "required": {
                "op": (list(FLOAT_BINARY_CONDITIONS.keys()),),
                "a": DEFAULT_FLOAT,
                "b": DEFAULT_FLOAT,
            }
        }

    RETURN_TYPES = ("BOOL",)
    FUNCTION = "op"
    CATEGORY = "math/float"

    def op(self, op: str, a: float, b: float) -> tuple[bool]:
        return (FLOAT_BINARY_CONDITIONS[op](a, b),)

```
