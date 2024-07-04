
# Documentation
- Class name: IG Multiply
- Category: 🐓 IG Nodes/Math
- Output node: False

IG Multiply节点执行两个浮点值的乘法运算，为在图形化编程环境中计算两个数字的乘积提供了一种简单直接的方法。

# Input types
## Required
- Value_A
    - 指定要相乘的第一个浮点值。它的取值范围几乎是无限的，允许输入各种各样的数值。
    - Comfy dtype: FLOAT
    - Python dtype: float
- Value_B
    - 确定要相乘的第二个浮点值。与Value_A类似，它支持广泛的数值输入范围，从而能够实现多样化的乘法场景。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- float
    - 输入值Value_A和Value_B相乘的结果，以浮点数的形式返回。
    - Comfy dtype: FLOAT
    - Python dtype: float


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class IG_MultiplyNode:
    def __init__(self) -> None:
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "Value_A": ("FLOAT", {"default": 1, "min": -sys.float_info.max, "max": sys.float_info.max, "step": FLOAT_STEP}),
                "Value_B": ("FLOAT", {"default": 1, "min": -sys.float_info.max, "max": sys.float_info.max, "step": FLOAT_STEP}),
            },
        }

    RETURN_TYPES = ("FLOAT",)
    FUNCTION = "main"
    CATEGORY = TREE_MATH

    def main(self, Value_A, Value_B):
        total = float(Value_A * Value_B)
        return (total,)

```
