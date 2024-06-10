# Documentation
- Class name: Vec3UnaryCondition
- Category: math/vec3
- Output node: False
- Repo Ref: https://github.com/evanspearman/ComfyMath

Vec3UnaryCondition节点旨在对三维向量执行向量化的一元运算。它对向量的每个元素应用指定的条件，并返回一个布尔结果，指示条件的结果。该节点对于需要对向量元素进行条件逻辑的数学运算至关重要，例如过滤或阈值处理。

# Input types
## Required
- op
    - 参数'op'定义了要应用于向量每个元素的一元条件。它是预定义的向量一元条件集的一个键。此参数至关重要，因为它决定了节点将评估的特定条件。
    - Comfy dtype: str
    - Python dtype: str
- a
    - 参数'a'表示将应用一元条件的三维向量。这是一个关键输入，因为节点的操作直接依赖于这个向量内的值。节点根据指定的条件处理每个元素以产生布尔结果。
    - Comfy dtype: Vec3
    - Python dtype: Vec3

# Output types
- result
    - 输出'result'是一个布尔值，表示将一元条件应用于输入向量的结果。它表明条件是否对向量中的每个元素都成立，根据指定的条件提供对向量状态的清晰和简洁的评估。
    - Comfy dtype: BOOL
    - Python dtype: bool

# Usage tips
- Infra type: CPU

# Source code
```
class Vec3UnaryCondition:

    @classmethod
    def INPUT_TYPES(cls) -> Mapping[str, Any]:
        return {'required': {'op': (list(VEC_UNARY_CONDITIONS.keys()),), 'a': DEFAULT_VEC3}}
    RETURN_TYPES = ('BOOL',)
    FUNCTION = 'op'
    CATEGORY = 'math/vec3'

    def op(self, op: str, a: Vec3) -> tuple[bool]:
        return (VEC_UNARY_CONDITIONS[op](numpy.array(a)),)
```