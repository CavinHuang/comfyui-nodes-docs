# Documentation
- Class name: Vec3UnaryOperation
- Category: math/vec3
- Output node: False
- Repo Ref: https://github.com/evanspearman/ComfyMath

Vec3UnaryOperation 类设计用于对三维向量执行一元运算。它封装了各种向量操作的逻辑，为三维空间中的数学操作提供了一个灵活的接口。

# Input types
## Required
- op
    - 参数 'op' 指定了要在向量上执行的一元运算。它至关重要，因为它决定了将应用于向量每个分量的数学函数类型。
    - Comfy dtype: str
    - Python dtype: str
- a
    - 参数 'a' 表示将执行一元运算的三维向量。它是一个必要的输入，因为它是数学操作的对象。
    - Comfy dtype: Vec3
    - Python dtype: Tuple[float, float, float]

# Output types
- result
    - 输出 'result' 是应用指定的一元运算后的变换三维向量。它很重要，因为它代表了数学过程的结果。
    - Comfy dtype: VEC3
    - Python dtype: Tuple[float, float, float]

# Usage tips
- Infra type: CPU

# Source code
```
class Vec3UnaryOperation:

    @classmethod
    def INPUT_TYPES(cls) -> Mapping[str, Any]:
        return {'required': {'op': (list(VEC_UNARY_OPERATIONS.keys()),), 'a': DEFAULT_VEC3}}
    RETURN_TYPES = ('VEC3',)
    FUNCTION = 'op'
    CATEGORY = 'math/vec3'

    def op(self, op: str, a: Vec3) -> tuple[Vec3]:
        return (_vec3_from_numpy(VEC_UNARY_OPERATIONS[op](numpy.array(a))),)
```