
# Documentation
- Class name: Multiply Float Float (JPS)
- Category: JPS Nodes/Math
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

Multiply Float Float (JPS)节点执行两个浮点数的乘法运算，并返回结果的整数和浮点数表示。这个节点旨在促进更广泛的计算工作流程中的数学运算，强调了处理数值数据的灵活性。

# Input types
## Required
- float_a
    - 表示要相乘的第一个浮点数。它的值影响乘法运算及其结果输出。
    - Comfy dtype: FLOAT
    - Python dtype: float
- float_b
    - 表示要相乘的第二个浮点数。它与float_a一起决定乘法过程的结果。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- int_multiply
    - 乘法运算结果转换为整数，提供产品的整数表示。
    - Comfy dtype: INT
    - Python dtype: int
- float_multiply
    - 乘法运算结果作为浮点数，提供产品的精确表示。
    - Comfy dtype: FLOAT
    - Python dtype: float


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class Math_Multiply_FLOAT_FLOAT:

    def init(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "float_a": ("FLOAT", {"default": 1,}),
                "float_b": ("FLOAT", {"default": 1,}),
            }
        }

    RETURN_TYPES = ("INT","FLOAT")
    RETURN_NAMES = ("int_multiply","float_multiply")
    FUNCTION = "get_multiply_float_float"

    CATEGORY="JPS Nodes/Math"

    def get_multiply_float_float(self,float_a,float_b):
        int_multiply = float(float_a) * float(float_b)
        float_multiply = float(float_a) * float(float_b)

        return(int(int_multiply),float(float_multiply))

```
