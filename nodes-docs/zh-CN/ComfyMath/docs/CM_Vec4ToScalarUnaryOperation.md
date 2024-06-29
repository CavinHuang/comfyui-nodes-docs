# Documentation
- Class name: Vec4ToScalarUnaryOperation
- Category: math/vec4
- Output node: False
- Repo Ref: https://github.com/evanspearman/ComfyMath

该节点对四维向量执行数学运算，将其转换为标量值。它旨在封装一系列可以应用于向量每个元素的一元运算，从而以一种简化和高效的方式实现复杂的数学转换。

# Input types
## Required
- op
    - 参数 'op' 指定要应用于输入向量每个元素的一元运算。它至关重要，因为它决定了将执行的数学转换类型。
    - Comfy dtype: str
    - Python dtype: str
- a
    - 参数 'a' 表示节点将处理的四维向量。这是一个基本输入，因为节点的功能围绕在这个向量上执行运算。
    - Comfy dtype: Vec4
    - Python dtype: numpy.ndarray

# Output types
- result
    - 参数 'result' 是节点的输出，它是通过对输入向量应用指定的一元运算得到的标量值。它标志着节点数学处理的完成。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Usage tips
- Infra type: CPU

# Source code
```
class Vec4ToScalarUnaryOperation:

    @classmethod
    def INPUT_TYPES(cls) -> Mapping[str, Any]:
        return {'required': {'op': (list(VEC_TO_SCALAR_UNARY_OPERATION.keys()),), 'a': DEFAULT_VEC4}}
    RETURN_TYPES = ('FLOAT',)
    FUNCTION = 'op'
    CATEGORY = 'math/vec4'

    def op(self, op: str, a: Vec4) -> tuple[float]:
        return (VEC_TO_SCALAR_UNARY_OPERATION[op](numpy.array(a)),)
```