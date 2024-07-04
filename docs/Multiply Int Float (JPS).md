
# Documentation
- Class name: Multiply Int Float (JPS)
- Category: JPS Nodes/Math
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

Math_Multiply_INT_FLOAT 节点专门用于执行整数和浮点数之间的乘法运算，同时生成整数和浮点数结果。该节点在工作流程中促进数学运算，允许组合不同的数值类型以实现精确计算。

# Input types
## Required
- int_a
    - 表示要乘的整数值。它在乘法运算中起着关键作用，决定了乘法的规模。
    - Comfy dtype: INT
    - Python dtype: int
- float_b
    - 表示要与整数相乘的浮点数。它允许在乘法过程中进行分数缩放。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- int_multiply
    - 输入整数和浮点数相乘的整数结果。
    - Comfy dtype: INT
    - Python dtype: int
- float_multiply
    - 乘法运算的浮点数结果，提供精确的计算结果。
    - Comfy dtype: FLOAT
    - Python dtype: float


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class Math_Multiply_INT_FLOAT:

    def init(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "int_a": ("INT", {"default": 1,}),
                "float_b": ("FLOAT", {"default": 1,}),
            }
        }

    RETURN_TYPES = ("INT","FLOAT")
    RETURN_NAMES = ("int_multiply","float_multiply")
    FUNCTION = "get_multiply_int_float"

    CATEGORY="JPS Nodes/Math"

    def get_multiply_int_float(self,int_a,float_b):
        int_multiply = int(int_a) * float(float_b)
        float_multiply = int(int_a) * float(float_b)

        return(int(int_multiply),float(float_multiply))

```
