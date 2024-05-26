# Documentation
- Class name: Vec4BinaryOperation
- Category: math/vec4
- Output node: False
- Repo Ref: https://github.com/evanspearman/ComfyMath

Vec4BinaryOperation节点旨在对两个四维向量（Vec4）执行二元运算。它能够处理由'op'参数指定的各种运算，允许在向量'a'和'b'之间进行逐元素运算。此节点在数学和计算上下文中的向量代数中至关重要，使用户能够有效地操作和分析向量数据。

# Input types
## Required
- op
    - 参数'op'决定了要在输入向量上执行的二元运算类型。它至关重要，因为它决定了应用于向量的数学函数，从而影响节点执行的结果。
    - Comfy dtype: str
    - Python dtype: str
- a
    - 参数'a'表示二元运算中的第一个四维向量（Vec4）。它扮演着重要的角色，因为它是向量运算中的一个操作数，直接影响最终结果。
    - Comfy dtype: Vec4
    - Python dtype: Tuple[float, float, float, float]
- b
    - 参数'b'表示参与二元运算的第二个四维向量（Vec4）。它很重要，因为它是向量运算中的第二个操作数，影响着节点的输出。
    - Comfy dtype: Vec4
    - Python dtype: Tuple[float, float, float, float]

# Output types
- result
    - 参数'result'保存输入向量'a'和'b'之间二元运算的结果。它很重要，因为它代表了运算应用后计算出的最终向量。
    - Comfy dtype: Vec4
    - Python dtype: Tuple[float, float, float, float]

# Usage tips
- Infra type: CPU

# Source code
```
class Vec4BinaryOperation:

    @classmethod
    def INPUT_TYPES(cls) -> Mapping[str, Any]:
        return {'required': {'op': (list(VEC_BINARY_OPERATIONS.keys()),), 'a': DEFAULT_VEC4, 'b': DEFAULT_VEC4}}
    RETURN_TYPES = ('VEC4',)
    FUNCTION = 'op'
    CATEGORY = 'math/vec4'

    def op(self, op: str, a: Vec4, b: Vec4) -> tuple[Vec4]:
        return (_vec4_from_numpy(VEC_BINARY_OPERATIONS[op](numpy.array(a), numpy.array(b))),)
```