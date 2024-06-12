# Documentation
- Class name: Vec4UnaryCondition
- Category: math/vec4
- Output node: False
- Repo Ref: https://github.com/evanspearman/ComfyMath

Vec4UnaryCondition节点旨在对四维向量执行一元运算。它评估向量每个分量上的条件，返回一个单一的布尔结果，指示所有分量是否满足条件。此节点在需要条件逻辑的基于向量的数学运算中至关重要。

# Input types
## Required
- op
    - 参数'op'定义了要应用于向量每个分量的一元条件。它非常重要，因为它决定了节点执行的条件检查的性质。
    - Comfy dtype: str
    - Python dtype: str
- a
    - 参数'a'表示将评估一元条件的四维向量。它是一个关键的输入，因为节点的操作完全依赖于这个向量内的值。
    - Comfy dtype: Vec4
    - Python dtype: Vec4

# Output types
- result
    - 输出'result'是一个布尔值，表示应用于输入向量所有分量的一元条件是否计算为真。
    - Comfy dtype: BOOL
    - Python dtype: bool

# Usage tips
- Infra type: CPU

# Source code
```
class Vec4UnaryCondition:

    @classmethod
    def INPUT_TYPES(cls) -> Mapping[str, Any]:
        return {'required': {'op': (list(VEC_UNARY_CONDITIONS.keys()),), 'a': DEFAULT_VEC4}}
    RETURN_TYPES = ('BOOL',)
    FUNCTION = 'op'
    CATEGORY = 'math/vec4'

    def op(self, op: str, a: Vec4) -> tuple[bool]:
        return (VEC_UNARY_CONDITIONS[op](numpy.array(a)),)
```