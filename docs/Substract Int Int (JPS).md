
# Documentation
- Class name: Substract Int Int (JPS)
- Category: JPS Nodes/Math
- Output node: False
- Repo Ref: Unknown

Substract Int Int (JPS)节点执行两个整数输入之间的减法运算，并提供结果的整数和浮点数表示。该节点旨在JPS Nodes/Math类别中促进数学运算，提供了一种简单直接的方法来计算两个数字之间的差值。

# Input types
## Required
- int_a
    - 减法运算的第一个整数输入。它在减法中充当被减数的角色。
    - Comfy dtype: INT
    - Python dtype: int
- int_b
    - 减法运算的第二个整数输入。它作为减数，从第一个输入中被减去。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- int_substract
    - 减法运算的结果，以整数形式表示。
    - Comfy dtype: INT
    - Python dtype: int
- float_substract
    - 减法运算的结果，以浮点数形式表示，提供了精度的灵活性。
    - Comfy dtype: FLOAT
    - Python dtype: float


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class Math_Substract_INT_INT:

    def init(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "int_a": ("INT", {"default": 1,}),
                "int_b": ("INT", {"default": 1,}),
            }
        }

    RETURN_TYPES = ("INT","FLOAT")
    RETURN_NAMES = ("int_substract","float_substract")
    FUNCTION = "get_substract_int_int"

    CATEGORY="JPS Nodes/Math"

    def get_substract_int_int(self,int_a,int_b):
        int_substract = int(int_a) - int(int_b)
        float_substract = int(int_a) - int(int_b)

        return(int(int_substract),float(float_substract))

```
