---
tags:
- Arithmetic
- MathematicalFunctions
---

# Subtract
## Documentation
- Class name: `DF_Subtract`
- Category: `Derfuu_Nodes/Math`
- Output node: `False`

The DF_Subtract node is designed to perform subtraction between two input values, returning the difference as its output. This node abstracts the mathematical operation of subtraction, allowing for the dynamic computation of differences between numerical values within a data flow.
## Input types
### Required
- **`Value_A`**
    - Value_A represents the minuend in the subtraction operation. It is the initial value from which Value_B will be subtracted, playing a crucial role in determining the outcome of the node's computation.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`Value_B`**
    - Value_B serves as the subtrahend in the subtraction operation. Its value is subtracted from Value_A, directly influencing the resulting difference output by the node.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
## Output types
- **`float`**
    - Comfy dtype: `FLOAT`
    - The output is the numerical difference resulting from subtracting Value_B from Value_A, encapsulating the subtraction operation's result.
    - Python dtype: `float`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class SubtractNode:
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
    FUNCTION = "sub"
    CATEGORY = TREE_MATH

    def sub(self, Value_A, Value_B):
        total = float(Value_A - Value_B)
        return (total,)

```
