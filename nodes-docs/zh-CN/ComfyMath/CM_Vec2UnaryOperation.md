# Documentation
- Class name: Vec2UnaryOperation
- Category: math/vec2
- Output node: False
- Repo Ref: https://github.com/evanspearman/ComfyMath

Vec2UnaryOperation节点旨在对二维向量执行多种一元运算。它接受一个操作作为输入，该操作是一个字符串，表示一个数学函数，并将该函数应用于向量'a'，从而得到一个变换后的向量。此节点在数学和计算上下文中的向量代数中至关重要，其中可能需要进行否定、反转或绝对值等运算。

# Input types
## Required
- op
    - 参数'op'指定要应用于向量'a'的一元运算。它是一个字符串，对应于一个预定义的数学函数。此参数至关重要，因为它决定了输入向量将经历的变换的性质。
    - Comfy dtype: str
    - Python dtype: str
- a
    - 参数'a'是二维向量，将要应用一元运算。这是一个关键的输入，因为整个运算都是围绕根据指定的数学函数变换这个向量进行的。
    - Comfy dtype: VEC2
    - Python dtype: Tuple[float, float]

# Output types
- result
    - 输出'result'是在输入向量'a'上应用由'op'指定的一元运算后的变换向量。它代表了数学变换的结果，是Vec2UnaryOperation节点的主要输出。
    - Comfy dtype: VEC2
    - Python dtype: Tuple[float, float]

# Usage tips
- Infra type: CPU

# Source code
```
class Vec2UnaryOperation:

    @classmethod
    def INPUT_TYPES(cls) -> Mapping[str, Any]:
        return {'required': {'op': (list(VEC_UNARY_OPERATIONS.keys()),), 'a': DEFAULT_VEC2}}
    RETURN_TYPES = ('VEC2',)
    FUNCTION = 'op'
    CATEGORY = 'math/vec2'

    def op(self, op: str, a: Vec2) -> tuple[Vec2]:
        return (_vec2_from_numpy(VEC_UNARY_OPERATIONS[op](numpy.array(a))),)
```