# Documentation
- Class name: BreakoutVec4
- Category: math/conversion
- Output node: False
- Repo Ref: https://github.com/evanspearman/ComfyMath

BreakoutVec4节点旨在将四维向量分解为其各个组成部分。它的作用是促进需要单独操作Vec4对象中每个元素的操作。该节点在数学转换中扮演着关键角色，特别是当上下文要求分别处理向量分量时。

# Input types
## Required
- a
    - 参数'a'是节点将分解的输入四维向量。它对节点的操作至关重要，因为它是正在处理的主要数据结构。节点的功能集中在将这个向量分解为其组成部分，以供进一步使用。
    - Comfy dtype: VEC4
    - Python dtype: Vec4

# Output types
- a components
    - BreakoutVec4节点的输出由四个独立的浮点数组成，每个数代表原始Vec4输入的一个分量。此输出允许对向量分量进行单独分析和操作，这对于各种数学和计算应用来说都是重要的。
    - Comfy dtype: FLOAT
    - Python dtype: Tuple[float, float, float, float]

# Usage tips
- Infra type: CPU

# Source code
```
class BreakoutVec4:

    @classmethod
    def INPUT_TYPES(cls) -> Mapping[str, Any]:
        return {'required': {'a': ('VEC4', {'default': VEC4_ZERO})}}
    RETURN_TYPES = ('FLOAT', 'FLOAT', 'FLOAT', 'FLOAT')
    FUNCTION = 'op'
    CATEGORY = 'math/conversion'

    def op(self, a: Vec4) -> tuple[float, float, float, float]:
        return (a[0], a[1], a[2], a[3])
```