
# Documentation
- Class name: DF_Sum
- Category: Derfuu_Nodes/Math
- Output node: False

DF_Sum节点旨在执行算术加法运算，接受两个浮点数输入并返回它们的和作为浮点数输出。这个节点简化了在数学或计算环境中进行数字相加的过程，有助于需要求和的操作。

# Input types
## Required
- Value_A
    - 代表要相加的两个值中的一个。它的作用至关重要，因为它直接影响求和计算的结果。
    - Comfy dtype: FLOAT
    - Python dtype: float
- Value_B
    - 作为要与第一个值相加的第二个值。它的重要性在于对总和的贡献，影响节点的输出。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- float
    - 两个输入值相加的结果。它表示计算得出的总和，体现了节点的主要功能。
    - Comfy dtype: FLOAT
    - Python dtype: float


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
