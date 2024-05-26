# Documentation
- Class name: Vec2ToScalarUnaryOperation
- Category: math/vec2
- Output node: False
- Repo Ref: https://github.com/evanspearman/ComfyMath

Vec2ToScalarUnaryOperation节点旨在对二维向量执行多种一元运算，将其转换为标量值。它封装了可以应用于向量的数学运算，强调了该节点在数学计算中向量-标量转换的作用。

# Input types
## Required
- op
    - 参数'op'定义了要在向量'a'上执行的一元运算。它至关重要，因为它决定了将应用的特定数学函数，从而影响节点执行的结果。
    - Comfy dtype: str
    - Python dtype: str
- a
    - 参数'a'表示将要在其上执行一元运算的二维向量。它的重要性在于它是节点操作以产生标量结果的主要输入。
    - Comfy dtype: Vec2
    - Python dtype: numpy.ndarray

# Output types
- result
    - 输出'result'是将指定的一元运算应用于输入向量'a'后获得的标量值。它标志着节点数学处理的结果。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Usage tips
- Infra type: CPU

# Source code
```
class Vec2ToScalarUnaryOperation:

    @classmethod
    def INPUT_TYPES(cls) -> Mapping[str, Any]:
        return {'required': {'op': (list(VEC_TO_SCALAR_UNARY_OPERATION.keys()),), 'a': DEFAULT_VEC2}}
    RETURN_TYPES = ('FLOAT',)
    FUNCTION = 'op'
    CATEGORY = 'math/vec2'

    def op(self, op: str, a: Vec2) -> tuple[float]:
        return (VEC_TO_SCALAR_UNARY_OPERATION[op](numpy.array(a)),)
```