# Documentation
- Class name: Vec3ToScalarBinaryOperation
- Category: math/vec3
- Output node: False
- Repo Ref: https://github.com/evanspearman/ComfyMath

Vec3ToScalarBinaryOperation节点旨在对两个三维向量执行二元运算，结果为一个标量值。它封装了向量运算的数学逻辑，并针对计算效率进行了优化，确保该节点通过提供准确可靠的向量计算为整个系统做出贡献。

# Input types
## Required
- op
    - 参数'op'定义了要在输入向量上执行的二元运算。它至关重要，因为它决定了应用于向量的数学函数，影响节点计算的结果。
    - Comfy dtype: str
    - Python dtype: str
- a
    - 参数'a'代表二元运算中的第一个向量。它对于提供向量计算所需的一个操作数至关重要，影响最终的标量结果。
    - Comfy dtype: Vec3
    - Python dtype: numpy.ndarray
- b
    - 参数'b'表示二元运算中涉及的第二个向量。它对于提供向量计算所需的另一个操作数不可或缺，直接影响节点的输出。
    - Comfy dtype: Vec3
    - Python dtype: numpy.ndarray

# Output types
- result
    - 'result'输出提供了对输入向量执行二元运算所得到的标量值。它很重要，因为它包含了节点数学处理的结果。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Usage tips
- Infra type: CPU

# Source code
```
class Vec3ToScalarBinaryOperation:

    @classmethod
    def INPUT_TYPES(cls) -> Mapping[str, Any]:
        return {'required': {'op': (list(VEC_TO_SCALAR_BINARY_OPERATION.keys()),), 'a': DEFAULT_VEC3, 'b': DEFAULT_VEC3}}
    RETURN_TYPES = ('FLOAT',)
    FUNCTION = 'op'
    CATEGORY = 'math/vec3'

    def op(self, op: str, a: Vec3, b: Vec3) -> tuple[float]:
        return (VEC_TO_SCALAR_BINARY_OPERATION[op](numpy.array(a), numpy.array(b)),)
```