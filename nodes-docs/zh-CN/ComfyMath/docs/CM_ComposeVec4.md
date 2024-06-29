# Documentation
- Class name: ComposeVec4
- Category: math/conversion
- Output node: False
- Repo Ref: https://github.com/evanspearman/ComfyMath

ComposeVec4节点旨在将四个单独的浮点数值组合成一个Vec4对象。它在数学运算中转换和聚合空间或颜色数据中扮演着关键角色。该节点简化了从标量组件创建四维向量的过程，这对于各种计算几何和图形应用至关重要。

# Input types
## Required
- x
    - 参数'x'代表四维向量的首个分量。它对于定义生成的Vec4对象中的空间方向或颜色强度至关重要。此参数直接影响向量组合的结果，是节点功能中不可或缺的一部分。
    - Comfy dtype: FLOAT
    - Python dtype: float
- y
    - 参数'y'表示Vec4的第二个分量，有助于向量的整体结构。它对于需要全面表示空间或颜色数据的应用至关重要，确保了节点在生成一个定义良好的向量中的作用。
    - Comfy dtype: FLOAT
    - Python dtype: float
- z
    - 参数'z'表示四维向量的第三个分量。它是向量构造中的关键元素，特别是在三维空间表示或涉及颜色通道时。'z'值对于节点从各个分量生成有意义的向量的能力至关重要。
    - Comfy dtype: FLOAT
    - Python dtype: float
- w
    - 参数'w'是Vec4对象的第四个也是最后一个分量。它通常表示额外信息，如在齐次坐标系统中的透视或颜色数据中的alpha通道。包含'w'可以完成向量，允许在各种数学和图形上下文中完整表示。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- Vec4
    - ComposeVec4节点的输出是一个Vec4对象，它将四个输入参数封装成一致的结构。这个输出非常重要，因为它为下游操作中的进一步处理或分析提供了统一的表示，促进了向量数据在计算工作流中的无缝集成。
    - Comfy dtype: VEC4
    - Python dtype: Vec4

# Usage tips
- Infra type: CPU

# Source code
```
class ComposeVec4:

    @classmethod
    def INPUT_TYPES(cls) -> Mapping[str, Any]:
        return {'required': {'x': ('FLOAT', {'default': 0.0}), 'y': ('FLOAT', {'default': 0.0}), 'z': ('FLOAT', {'default': 0.0}), 'w': ('FLOAT', {'default': 0.0})}}
    RETURN_TYPES = ('VEC4',)
    FUNCTION = 'op'
    CATEGORY = 'math/conversion'

    def op(self, x: float, y: float, z: float, w: float) -> tuple[Vec4]:
        return ((x, y, z, w),)
```