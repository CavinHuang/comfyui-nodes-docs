# Documentation
- Class name: Vec2BinaryOperation
- Category: math/vec2
- Output node: False
- Repo Ref: https://github.com/evanspearman/ComfyMath

Vec2BinaryOperation节点旨在对二维向量执行二元运算。它能够处理各种向量运算，如加法、减法、乘法和除法，为应用程序内的向量数学提供了多功能工具。此节点在操作向量数据中扮演着关键角色，使用户能够轻松而精确地执行复杂计算。

# Input types
## Required
- op
    - 参数'op'定义了要在输入向量上执行的二元运算类型。它对于确定节点将执行的数学运算至关重要，从而直接影响计算结果。运算的选择可以显著影响结果以及随后的分析或处理步骤。
    - Comfy dtype: str
    - Python dtype: str
- a
    - 参数'a'代表二元运算中的第一个向量。它是一个必要的输入，因为它构成了向量运算所需的一半操作数。向量'a'的值和特性将极大地影响计算的最终结果，使其成为节点功能中的关键要素。
    - Comfy dtype: Vec2
    - Python dtype: Tuple[float, float]
- b
    - 参数'b'表示参与二元运算的第二个向量。与'a'一样，它是一个必需的输入，它完成了向量运算所需的操作数集合。向量'b'中的属性和值对计算过程以及节点产生准确和有意义的结果的能力至关重要。
    - Comfy dtype: Vec2
    - Python dtype: Tuple[float, float]

# Output types
- result
    - 输出参数'result'包含了对输入向量执行的二元运算的结果。它是一个关键的输出，因为它传达了最终计算的值，代表了节点在计算工作流程中的主要功能和目的。
    - Comfy dtype: Vec2
    - Python dtype: Tuple[float, float]

# Usage tips
- Infra type: CPU

# Source code
```
class Vec2BinaryOperation:

    @classmethod
    def INPUT_TYPES(cls) -> Mapping[str, Any]:
        return {'required': {'op': (list(VEC_BINARY_OPERATIONS.keys()),), 'a': DEFAULT_VEC2, 'b': DEFAULT_VEC2}}
    RETURN_TYPES = ('VEC2',)
    FUNCTION = 'op'
    CATEGORY = 'math/vec2'

    def op(self, op: str, a: Vec2, b: Vec2) -> tuple[Vec2]:
        return (_vec2_from_numpy(VEC_BINARY_OPERATIONS[op](numpy.array(a), numpy.array(b))),)
```