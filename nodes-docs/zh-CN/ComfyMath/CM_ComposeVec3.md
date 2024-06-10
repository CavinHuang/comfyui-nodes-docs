# Documentation
- Class name: ComposeVec3
- Category: math/conversion
- Output node: False
- Repo Ref: https://github.com/evanspearman/ComfyMath

该节点从三个独立的浮点值合成一个Vec3对象，便于在数学或几何上下文中创建和操作三维向量。

# Input types
## Required
- x
    - 向量的x坐标是一个基本参数，它定义了三维空间中沿水平轴的位置，影响向量的方向和大小。
    - Comfy dtype: FLOAT
    - Python dtype: float
- y
    - 向量的y坐标决定了它在三维空间中垂直轴上的位置，这对于建立向量在坐标系统中的方向和影响至关重要。
    - Comfy dtype: FLOAT
    - Python dtype: float
- z
    - 向量的z坐标决定了它在三维空间中深度轴上的位置，这对向量的整体空间表示起着至关重要的作用。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- Vec3
    - 输出是一个Vec3对象，封装了三个输入值，代表三维空间中的一个向量，可以用于各种数学和几何操作。
    - Comfy dtype: VEC3
    - Python dtype: Vec3

# Usage tips
- Infra type: CPU

# Source code
```
class ComposeVec3:

    @classmethod
    def INPUT_TYPES(cls) -> Mapping[str, Any]:
        return {'required': {'x': ('FLOAT', {'default': 0.0}), 'y': ('FLOAT', {'default': 0.0}), 'z': ('FLOAT', {'default': 0.0})}}
    RETURN_TYPES = ('VEC3',)
    FUNCTION = 'op'
    CATEGORY = 'math/conversion'

    def op(self, x: float, y: float, z: float) -> tuple[Vec3]:
        return ((x, y, z),)
```