# Documentation
- Class name: Vec4UnaryOperation
- Category: math/vec4
- Output node: False
- Repo Ref: https://github.com/evanspearman/ComfyMath

Vec4UnaryOperation节点旨在对四维向量执行各种一元操作。它能够对向量应用不同的数学变换，这在图形、物理或其他数学应用中的基于向量的计算中可能至关重要。

# Input types
## Required
- op
    - 参数'op'指定了要在向量'a'上执行的一元操作。它是一个字符串，代表操作本身，对于确定应用于向量的变化至关重要。
    - Comfy dtype: str
    - Python dtype: str
- a
    - 参数'a'表示将应用一元操作的四维向量。这是一个基本输入，因为操作的效果直接体现在这个向量的变换中。
    - Comfy dtype: Vec4
    - Python dtype: Tuple[float, float, float, float]

# Output types
- result
    - 参数'result'代表对输入向量'a'应用一元操作的结果。它是经过变换的向量，包含了操作的效果。
    - Comfy dtype: Vec4
    - Python dtype: Tuple[float, float, float, float]

# Usage tips
- Infra type: CPU

# Source code
```
class Vec4UnaryOperation:

    @classmethod
    def INPUT_TYPES(cls) -> Mapping[str, Any]:
        return {'required': {'op': (list(VEC_UNARY_OPERATIONS.keys()),), 'a': DEFAULT_VEC4}}
    RETURN_TYPES = ('VEC4',)
    FUNCTION = 'op'
    CATEGORY = 'math/vec4'

    def op(self, op: str, a: Vec4) -> tuple[Vec4]:
        return (_vec4_from_numpy(VEC_UNARY_OPERATIONS[op](numpy.array(a))),)
```