
# Documentation
- Class name: DF_Absolute_value
- Category: Derfuu_Nodes/Functions/Converters
- Output node: False

DF_Absolute_value节点提供了计算给定输入绝对值的功能。它可以根据指定条件选择性地返回负绝对值，从而在数据处理流程中实现灵活的数值转换。

# Input types
## Required
- Value
    - 节点的主要输入，表示需要计算绝对值（或负绝对值）的数值。它在决定节点输出结果中起着至关重要的作用。
    - Comfy dtype: FLOAT
    - Python dtype: float
- negative_out
    - 一个布尔标志，用于确定输出是否应为输入的负绝对值。这个参数允许条件性输出，提高了节点在数值运算中的多功能性。
    - Comfy dtype: COMBO[BOOLEAN]
    - Python dtype: bool

# Output types
- float
    - 节点的输出，根据'negative_out'参数的设置，可能是输入的绝对值或负绝对值。
    - Comfy dtype: FLOAT
    - Python dtype: float


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class ABSNode:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(self):
        return {
            "required": {
                "Value": Field.float(),
                "negative_out": ([False, True],)
            }
        }

    RETURN_TYPES = ("FLOAT",)
    FUNCTION = "abs_val"
    CATEGORY = TREE_CONVERTERS

    def abs_val(self, Value, Get_negative):
        if Get_negative:
            return (-abs(Value),)
        return (abs(Value),)

```
