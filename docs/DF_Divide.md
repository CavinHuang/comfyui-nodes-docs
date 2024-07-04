
# Documentation
- Class name: DF_Divide
- Category: Derfuu_Nodes/Math
- Output node: False

DF_Divide节点提供了一种在基于节点的编程环境中执行简单算术除法运算的方法。它接受两个数值输入，并输出它们的商。

# Input types
## Required
- Numerator
    - 指定除法运算中的被除数，即要被除的数值。
    - Comfy dtype: FLOAT
    - Python dtype: float
- Denominator
    - 确定除法运算中的除数，通过除以分子来影响运算结果。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- float
    - 将Numerator除以Denominator的结果，以浮点数形式表示。
    - Comfy dtype: FLOAT
    - Python dtype: float


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class DivideNode:
    def __init__(self) -> None:
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "Numerator": Field.float(),
                "Denominator": Field.float(),
            },
        }

    RETURN_TYPES = ("FLOAT",)
    FUNCTION = "divide"
    CATEGORY = TREE_MATH

    def divide(self, Numerator, Denominator):
        total = float(Numerator / Denominator)
        return (total,)

```
