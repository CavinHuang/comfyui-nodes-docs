---
tags:
- Math
- VectorMath
---

# IntBinaryCondition
## Documentation
- Class name: `CM_IntBinaryCondition`
- Category: `math/int`
- Output node: `False`

This node performs binary conditional operations on integer inputs, evaluating the relationship between two integers based on a specified operation (e.g., equality, inequality, greater than, less than). It abstracts the complexity of conditional checks into a simple interface, allowing for easy integration into mathematical and logical workflows.
## Input types
### Required
- **`op`**
    - Specifies the binary conditional operation to perform on the integers, such as equality or greater than, and directly influences the outcome of the node's evaluation.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `List[str]`
- **`a`**
    - The first integer operand in the binary conditional operation, serving as one of the two values to be compared.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`b`**
    - The second integer operand in the binary conditional operation, serving as the other value to be compared with the first operand.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`bool`**
    - Comfy dtype: `BOOL`
    - The result of the binary conditional operation, indicating whether the specified condition holds true between the two integer operands.
    - Python dtype: `bool`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class IntBinaryCondition:
    @classmethod
    def INPUT_TYPES(cls) -> Mapping[str, Any]:
        return {
            "required": {
                "op": (list(INT_BINARY_CONDITIONS.keys()),),
                "a": DEFAULT_INT,
                "b": DEFAULT_INT,
            }
        }

    RETURN_TYPES = ("BOOL",)
    FUNCTION = "op"
    CATEGORY = "math/int"

    def op(self, op: str, a: int, b: int) -> tuple[bool]:
        return (INT_BINARY_CONDITIONS[op](a, b),)

```
