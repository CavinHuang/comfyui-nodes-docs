# Documentation
- Class name: BreakoutVec2
- Category: math/conversion
- Output node: False
- Repo Ref: https://github.com/evanspearman/ComfyMath

BreakoutVec2节点旨在将二维向量分解为其各个组成部分。它在向量操作中扮演基础角色，通过提供对Vec2对象单独元素的访问，这些元素随后可以独立用于进一步的计算或操作。

# Input types
## Required
- a
    - 参数'a'是一个二维向量，是节点操作的对象。它至关重要，因为它是决定节点输出的主要输入。节点将这个向量分解为其组成部分，然后这些部分就可以供其他过程使用。
    - Comfy dtype: VEC2
    - Python dtype: Vec2

# Output types
- x
    - 输出'x'代表输入向量经过节点处理后的第一个分量。它很重要，因为它允许分离和单独处理向量元素，这在各种数学和几何计算中可能至关重要。
    - Comfy dtype: FLOAT
    - Python dtype: float
- y
    - 输出'y'对应于输入向量的第二个分量。它与'x'输出同样重要，适用于需要分别操作或分析向量分量的应用，例如在图形渲染或物理模拟中。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Usage tips
- Infra type: CPU

# Source code
```
class BreakoutVec2:

    @classmethod
    def INPUT_TYPES(cls) -> Mapping[str, Any]:
        return {'required': {'a': ('VEC2', {'default': VEC2_ZERO})}}
    RETURN_TYPES = ('FLOAT', 'FLOAT')
    FUNCTION = 'op'
    CATEGORY = 'math/conversion'

    def op(self, a: Vec2) -> tuple[float, float]:
        return (a[0], a[1])
```