
# Documentation
- Class name: DF_Subtract
- Category: Derfuu_Nodes/Math
- Output node: False

DF_Subtract节点设计用于执行两个输入值之间的减法运算，并返回其差值作为输出。该节点抽象了减法的数学运算，允许在数据流中动态计算数值之间的差异。

# Input types
## Required
- Value_A
    - Value_A代表减法运算中的被减数。它是初始值，Value_B将从中被减去，在节点计算结果中起着关键作用。
    - Comfy dtype: FLOAT
    - Python dtype: float
- Value_B
    - Value_B作为减法运算中的减数。其值从Value_A中减去，直接影响节点输出的差值结果。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- float
    - 输出是Value_A减去Value_B得到的数值差，体现了减法运算的结果。
    - Comfy dtype: FLOAT
    - Python dtype: float


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
