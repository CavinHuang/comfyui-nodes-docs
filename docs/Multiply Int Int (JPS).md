
# Documentation
- Class name: Multiply Int Int (JPS)
- Category: JPS Nodes/Math
- Output node: False

该节点执行两个整数输入的乘法运算，并以整数和浮点数格式提供结果。

# Input types
## Required
- int_a
    - 表示乘法运算的第一个整数输入。其值直接影响乘法结果。
    - Comfy dtype: INT
    - Python dtype: int
- int_b
    - 表示乘法运算的第二个整数输入。其值直接影响乘法结果。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- int_multiply
    - 两个整数输入相乘的结果，以整数形式返回。
    - Comfy dtype: INT
    - Python dtype: int
- float_multiply
    - 两个整数输入相乘的结果，以浮点数形式返回。
    - Comfy dtype: FLOAT
    - Python dtype: float


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class Math_Multiply_INT_INT:

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
    RETURN_NAMES = ("int_multiply","float_multiply")
    FUNCTION = "get_multiply_int_int"

    CATEGORY="JPS Nodes/Math"

    def get_multiply_int_int(self,int_a,int_b):
        int_multiply = int(int_a) * int(int_b)
        float_multiply = int(int_a) * int(int_b)

        return(int(int_multiply),float(float_multiply))

```
