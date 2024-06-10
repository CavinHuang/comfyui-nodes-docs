---
tags:
- Math
- MathematicalFunctions
---

# Sum
## Documentation
- Class name: `DF_Sum`
- Category: `Derfuu_Nodes/Math`
- Output node: `False`

The SumNode is designed to perform arithmetic addition, taking two float inputs and returning their sum as a float output. This node simplifies the process of adding numbers within a mathematical or computational context, facilitating operations that require summation.
## Input types
### Required
- **`Value_A`**
    - Represents one of the two values to be added together. Its role is crucial as it directly influences the sum calculation.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`Value_B`**
    - Serves as the second value to be added to the first. Its importance lies in its contribution to the overall sum, affecting the node's output.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
## Output types
- **`float`**
    - Comfy dtype: `FLOAT`
    - The result of adding the two input values. It signifies the computed sum, encapsulating the node's primary function.
    - Python dtype: `float`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class SumNode:
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
    FUNCTION = "sum"
    CATEGORY = TREE_MATH

    def sum(self, Value_A, Value_B):
        total = float(Value_A + Value_B)
        return (total,)

```
