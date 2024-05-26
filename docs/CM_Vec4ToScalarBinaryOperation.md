# Documentation
- Class name: Vec4ToScalarBinaryOperation
- Category: math/vec4
- Output node: False
- Repo Ref: https://github.com/evanspearman/ComfyMath

Vec4ToScalarBinaryOperation节点旨在对两个四维向量（Vec4）执行二元运算，结果为一个标量值。它封装了执行此类运算所需的数学逻辑，抽象了复杂性，并为基于向量的计算提供了一个直观的接口。

# Input types
## Required
- op
    - 参数'op'定义了要在输入向量上执行的二元运算。它至关重要，因为它决定了将应用于向量的数学函数，直接影响运算的结果。
    - Comfy dtype: str
    - Python dtype: str
- a
    - 参数'a'表示二元运算中的第一个四维向量（Vec4）。它是一个必要的输入，因为它构成了操作的一个操作数，对最终的标量结果有所贡献。
    - Comfy dtype: Vec4
    - Python dtype: List[float]
- b
    - 参数'b'表示参与二元运算的第二个四维向量（Vec4）。它是一个必需的输入，因为它补充了第一个向量以完成运算，影响结果的标量值。
    - Comfy dtype: Vec4
    - Python dtype: List[float]

# Output types
- result
    - 参数'result'是输入向量上执行的二元运算的标量输出。它代表了数学过程的最终结果，将运算的结果封装在一个单一的数值中。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Usage tips
- Infra type: CPU

# Source code
```
class Vec4ToScalarBinaryOperation:

    @classmethod
    def INPUT_TYPES(cls) -> Mapping[str, Any]:
        return {'required': {'op': (list(VEC_TO_SCALAR_BINARY_OPERATION.keys()),), 'a': DEFAULT_VEC4, 'b': DEFAULT_VEC4}}
    RETURN_TYPES = ('FLOAT',)
    FUNCTION = 'op'
    CATEGORY = 'math/vec4'

    def op(self, op: str, a: Vec4, b: Vec4) -> tuple[float]:
        return (VEC_TO_SCALAR_BINARY_OPERATION[op](numpy.array(a), numpy.array(b)),)
```