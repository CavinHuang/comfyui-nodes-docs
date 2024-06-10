# Documentation
- Class name: Vec2ScalarOperation
- Category: math/vec2
- Output node: False
- Repo Ref: https://github.com/evanspearman/ComfyMath

Vec2ScalarOperation节点旨在执行二维向量（Vec2）和标量（float）之间的各种数学运算。它封装了应用各种向量-标量操作的功能，这些操作在计算几何和线性代数中至关重要。此节点在数学上下文中操纵向量数据中发挥关键作用。

# Input types
## Required
- op
    - ‘op’参数指定要在向量和标量之间执行的数学运算类型。它对于确定节点将执行的计算性质至关重要。运算的选择直接影响向量-标量交互的结果。
    - Comfy dtype: str
    - Python dtype: str
- a
    - ‘a’参数表示将在运算中使用的二维向量（Vec2）。作为一个基本输入，它对数学过程至关重要，并且直接促成了计算的最终结果。根据指定的运算，向量的分量将被操作。
    - Comfy dtype: Vec2
    - Python dtype: Tuple[float, float]
- b
    - ‘b’参数是将与向量‘a’一起用于运算的标量值。它的重要性在于它作为乘数或运算数在向量-标量运算中的作用，影响计算的最终结果。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- result
    - ‘result’输出是应用了指定运算后的变换二维向量（Vec2）。它代表了向量-标量计算的最终结果，直接反映了输入参数和所选运算。
    - Comfy dtype: VEC2
    - Python dtype: Tuple[float, float]

# Usage tips
- Infra type: CPU

# Source code
```
class Vec2ScalarOperation:

    @classmethod
    def INPUT_TYPES(cls) -> Mapping[str, Any]:
        return {'required': {'op': (list(VEC_SCALAR_OPERATION.keys()),), 'a': DEFAULT_VEC2, 'b': ('FLOAT',)}}
    RETURN_TYPES = ('VEC2',)
    FUNCTION = 'op'
    CATEGORY = 'math/vec2'

    def op(self, op: str, a: Vec2, b: float) -> tuple[Vec2]:
        return (_vec2_from_numpy(VEC_SCALAR_OPERATION[op](numpy.array(a), b)),)
```