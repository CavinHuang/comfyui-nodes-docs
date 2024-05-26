# Documentation
- Class name: ComposeVec2
- Category: math/conversion
- Output node: False
- Repo Ref: https://github.com/evanspearman/ComfyMath

ComposeVec2节点旨在将两个标量值组合成一个单一的二维向量。它在向量数学中扮演着关键角色，通过允许从单独的分量创建Vec2对象，然后可以在进一步的几何或数学运算中使用这些对象。

# Input types
## Required
- x
    - 参数'x'表示二维向量的第一个分量。它对于在笛卡尔坐标系中定义水平位置至关重要，并且对向量的总体方向和大小有重要贡献。
    - Comfy dtype: FLOAT
    - Python dtype: float
- y
    - 参数'y'表示二维向量的第二个分量，表示坐标系中的垂直位置。它对于建立向量的垂直方向至关重要，并且与'x'一起决定了向量的总体轨迹。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- Vec2
    - ComposeVec2节点的输出是一个Vec2对象，它将提供的'x'和'y'分量封装成一个连贯的二维向量。这个向量可以用于广泛的数学和几何计算。
    - Comfy dtype: VEC2
    - Python dtype: Vec2

# Usage tips
- Infra type: CPU

# Source code
```
class ComposeVec2:

    @classmethod
    def INPUT_TYPES(cls) -> Mapping[str, Any]:
        return {'required': {'x': ('FLOAT', {'default': 0.0}), 'y': ('FLOAT', {'default': 0.0})}}
    RETURN_TYPES = ('VEC2',)
    FUNCTION = 'op'
    CATEGORY = 'math/conversion'

    def op(self, x: float, y: float) -> tuple[Vec2]:
        return ((x, y),)
```