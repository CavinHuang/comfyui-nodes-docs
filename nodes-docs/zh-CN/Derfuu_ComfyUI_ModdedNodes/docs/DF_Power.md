
# Documentation
- Class name: DF_Power
- Category: Derfuu_Nodes/Math
- Output node: False

DF_Power节点执行指数运算，将基数值提升到指定的指数幂。它抽象了指数运算的数学操作，使得在工作流程中能够动态计算幂值。

# Input types
## Required
- Value
    - 指数运算的基数值。它决定了被提升到指数幂的数字。
    - Comfy dtype: FLOAT
    - Python dtype: float
- Exponent
    - 指数运算中的指数值。它指定了基数值要被提升到的幂。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- float
    - 将基数值提升到指数幂的结果，计算为浮点数。
    - Comfy dtype: FLOAT
    - Python dtype: float


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class PowNode:
    def __init__(self) -> None:
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "Value": Field.float(),
                "Exponent": Field.float(),
            },
        }

    RETURN_TYPES = ("FLOAT",)
    FUNCTION = "pow"
    CATEGORY = TREE_MATH

    def pow(self, Value, Exponent):
        total = math.pow(Value, Exponent)
        return (total,)

```
