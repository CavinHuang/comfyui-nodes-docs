
# Documentation
- Class name: DF_Square_root
- Category: Derfuu_Nodes/Math
- Output node: False

SquareRootNode提供了一个数学运算功能，用于计算给定值的平方根，并返回正负两个平方根值。

# Input types
## Required
- Value
    - 需要计算平方根的输入值。这个值决定了输出的大小。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- float
    - 输入值的正负平方根。
    - Comfy dtype: FLOAT
    - Python dtype: tuple[float, float]


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class SquareRootNode:
    def __init__(self) -> None:
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "Value": Field.float(),
            },
        }

    RETURN_TYPES = ("FLOAT", "FLOAT",)
    FUNCTION = "sqrt"
    CATEGORY = TREE_MATH

    def sqrt(self, Value):
        total = math.sqrt(Value)
        return (total, -total,)

```
