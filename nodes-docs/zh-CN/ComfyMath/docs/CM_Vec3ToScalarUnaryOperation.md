# Documentation
- Class name: Vec3ToScalarUnaryOperation
- Category: math/vec3
- Output node: False
- Repo Ref: https://github.com/evanspearman/ComfyMath

Vec3ToScalarUnaryOperation节点旨在对三维向量执行多种一元运算，将其转换为标量值。此节点对于需要将向量的大小或方向属性简化为单个数值表示以进行进一步分析或决策过程的应用至关重要。

# Input types
## Required
- op
    - 'op'参数是一个字符串，用于指定要在输入向量上执行的一元运算。它对于确定标量输出的性质以及应用于向量的数学变换至关重要。
    - Comfy dtype: str
    - Python dtype: str
- a
    - 'a'参数表示将在其上执行一元运算的三维向量。这是一个必要的输入，因为整个操作都围绕着将这个向量转换为标量值。
    - Comfy dtype: Vec3
    - Python dtype: numpy.ndarray

# Output types
- result
    - 'result'输出是从输入向量上执行的一元运算派生的标量值。它以单一数值形式概括了向量的本质，便于在随后的计算任务中使用。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Usage tips
- Infra type: CPU

# Source code
```
class Vec3ToScalarUnaryOperation:

    @classmethod
    def INPUT_TYPES(cls) -> Mapping[str, Any]:
        return {'required': {'op': (list(VEC_TO_SCALAR_UNARY_OPERATION.keys()),), 'a': DEFAULT_VEC3}}
    RETURN_TYPES = ('FLOAT',)
    FUNCTION = 'op'
    CATEGORY = 'math/vec3'

    def op(self, op: str, a: Vec3) -> tuple[float]:
        return (VEC_TO_SCALAR_UNARY_OPERATION[op](numpy.array(a)),)
```