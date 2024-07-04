
# Documentation
- Class name: DF_Multiply
- Category: Derfuu_Nodes/Math
- Output node: False

DF_Multiply节点执行两个浮点数的乘法运算，为在数学或计算工作流程中计算两个值的乘积提供了一种直接的方法。

# Input types
## Required
- Value_A
    - Value_A代表要相乘的第一个浮点数。它在决定乘法运算的最终结果中起着至关重要的作用。
    - Comfy dtype: FLOAT
    - Python dtype: float
- Value_B
    - Value_B是参与乘法运算的第二个浮点数。其值直接影响乘积结果，是运算中不可或缺的组成部分。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- float
    - 输出是一个浮点数，表示输入值Value_A和Value_B的乘积。它封装了乘法运算的结果。
    - Comfy dtype: FLOAT
    - Python dtype: float


## Usage tips
- Infra type: `CPU`
- Common nodes:
    - floatToInt _O



## Source code
```python
class MultiplyNode:
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
    FUNCTION = "multiply"
    CATEGORY = TREE_MATH

    def multiply(self, Value_A, Value_B):
        total = float(Value_A * Value_B)
        return (total,)

```
