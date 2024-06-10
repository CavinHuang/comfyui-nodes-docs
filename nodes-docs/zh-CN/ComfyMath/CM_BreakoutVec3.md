# Documentation
- Class name: BreakoutVec3
- Category: math/conversion
- Output node: False
- Repo Ref: https://github.com/evanspearman/ComfyMath

BreakoutVec3节点旨在将三维向量分解为其各个分量。它在需要进一步处理或分析的数学运算中扮演着基础角色，其中向量元素的分离是必要的。

# Input types
## Required
- a
    - 'a'参数是一个三维向量，节点对其进行操作。它对节点的功能至关重要，因为它是将被分解为其组成部分的输入向量。
    - Comfy dtype: VEC3
    - Python dtype: Vec3

# Output types
- result
    - BreakoutVec3节点的输出是一个包含输入向量三个独立分量的元组。每个分量是一个浮点数，代表向量的一个维度。
    - Comfy dtype: FLOAT
    - Python dtype: Tuple[float, float, float]

# Usage tips
- Infra type: CPU

# Source code
```
class BreakoutVec3:

    @classmethod
    def INPUT_TYPES(cls) -> Mapping[str, Any]:
        return {'required': {'a': ('VEC3', {'default': VEC3_ZERO})}}
    RETURN_TYPES = ('FLOAT', 'FLOAT', 'FLOAT')
    FUNCTION = 'op'
    CATEGORY = 'math/conversion'

    def op(self, a: Vec3) -> tuple[float, float, float]:
        return (a[0], a[1], a[2])
```