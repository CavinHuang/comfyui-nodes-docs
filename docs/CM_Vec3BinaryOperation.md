# Documentation
- Class name: Vec3BinaryOperation
- Category: math/vec3
- Output node: False
- Repo Ref: https://github.com/evanspearman/ComfyMath

Vec3BinaryOperation节点旨在对两个三维向量执行二元运算。它是向量数学的基础构建块，允许执行加法、减法和标量乘法等操作。在几何计算中，该节点对于建模和分析至关重要，其中向量运算是必不可少的。

# Input types
## Required
- op
    - 参数'op'指定在输入向量上执行的二元运算。它是一组预定义的向量操作中的一个键，对于确定节点将执行的计算类型至关重要。
    - Comfy dtype: str
    - Python dtype: str
- a
    - 参数'a'表示操作中的第一个三维向量。它是一个基本输入，直接影响节点执行的二元运算的结果。
    - Comfy dtype: tuple[float, float, float]
    - Python dtype: Tuple[float, float, float]
- b
    - 参数'b'表示参与二元运算的第二个三维向量。它是一个关键输入，与'a'一起决定了计算的最终结果。
    - Comfy dtype: tuple[float, float, float]
    - Python dtype: Tuple[float, float, float]

# Output types
- result
    - 输出'result'是从输入向量'a'和'b'上执行的二元运算得到的三维向量。它包含了向量计算的结果，并且是指定操作'op'的直接反映。
    - Comfy dtype: tuple[float, float, float]
    - Python dtype: Tuple[float, float, float]

# Usage tips
- Infra type: CPU

# Source code
```
class Vec3BinaryOperation:

    @classmethod
    def INPUT_TYPES(cls) -> Mapping[str, Any]:
        return {'required': {'op': (list(VEC_BINARY_OPERATIONS.keys()),), 'a': DEFAULT_VEC3, 'b': DEFAULT_VEC3}}
    RETURN_TYPES = ('VEC3',)
    FUNCTION = 'op'
    CATEGORY = 'math/vec3'

    def op(self, op: str, a: Vec3, b: Vec3) -> tuple[Vec3]:
        return (_vec3_from_numpy(VEC_BINARY_OPERATIONS[op](numpy.array(a), numpy.array(b))),)
```