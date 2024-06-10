# Documentation
- Class name: Vec4ScalarOperation
- Category: math/vec4
- Output node: False
- Repo Ref: https://github.com/evanspearman/ComfyMath

Vec4ScalarOperation节点对四维向量执行标量运算，提供了一种通过各种数学运算来操作向量数据的方法。它旨在灵活高效，允许在需要向量算术的场景中直接应用。

# Input types
## Required
- op
    - 操作参数定义了要在向量上执行的特定标量运算。它至关重要，因为它决定了应用于向量每个分量的数学函数。
    - Comfy dtype: str
    - Python dtype: str
- a
    - 参数'a'代表将在其上执行标量运算的四维向量。它至关重要，因为它是节点操作以产生结果的主要输入。
    - Comfy dtype: Vec4
    - Python dtype: Tuple[float, float, float, float]
- b
    - 标量'b'是将与向量'a'一起用于由'op'定义的操作的浮点数。它在计算中扮演重要角色，因为它直接影响向量变换的结果。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- result
    - 对输入向量'a'执行的标量运算的结果。它包含了将指定的数学函数应用于向量每个分量后的结果。
    - Comfy dtype: VEC4
    - Python dtype: Tuple[float, float, float, float]

# Usage tips
- Infra type: CPU

# Source code
```
class Vec4ScalarOperation:

    @classmethod
    def INPUT_TYPES(cls) -> Mapping[str, Any]:
        return {'required': {'op': (list(VEC_SCALAR_OPERATION.keys()),), 'a': DEFAULT_VEC4, 'b': ('FLOAT',)}}
    RETURN_TYPES = ('VEC4',)
    FUNCTION = 'op'
    CATEGORY = 'math/vec4'

    def op(self, op: str, a: Vec4, b: float) -> tuple[Vec4]:
        return (_vec4_from_numpy(VEC_SCALAR_OPERATION[op](numpy.array(a), b)),)
```