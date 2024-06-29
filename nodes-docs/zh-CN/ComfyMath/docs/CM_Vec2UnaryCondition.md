# Documentation
- Class name: Vec2UnaryCondition
- Category: math/vec2
- Output node: False
- Repo Ref: https://github.com/evanspearman/ComfyMath

Vec2UnaryCondition节点旨在对二维向量执行各种一元操作。它对向量的每个元素应用指定的条件，并返回一个布尔结果，指示每个元素操作的结果。

# Input types
## Required
- op
    - 参数'op'定义了将应用于向量元素的一元条件。它对于确定操作的性质和预期结果至关重要。
    - Comfy dtype: str
    - Python dtype: str
- a
    - 参数'a'代表将在其上评估一元条件的二维向量。它是节点执行的关键，因为它为操作提供了输入数据。
    - Comfy dtype: Vec2
    - Python dtype: Vec2

# Output types
- result
    - 输出'result'是一个布尔值的元组，对应于对输入向量每个元素的一元条件的评估。
    - Comfy dtype: tuple[bool]
    - Python dtype: Tuple[bool]

# Usage tips
- Infra type: CPU

# Source code
```
class Vec2UnaryCondition:

    @classmethod
    def INPUT_TYPES(cls) -> Mapping[str, Any]:
        return {'required': {'op': (list(VEC_UNARY_CONDITIONS.keys()),), 'a': DEFAULT_VEC2}}
    RETURN_TYPES = ('BOOL',)
    FUNCTION = 'op'
    CATEGORY = 'math/vec2'

    def op(self, op: str, a: Vec2) -> tuple[bool]:
        return (VEC_UNARY_CONDITIONS[op](numpy.array(a)),)
```