# Documentation
- Class name: Vec3ScalarOperation
- Category: math/vec3
- Output node: False
- Repo Ref: https://github.com/evanspearman/ComfyMath

Vec3ScalarOperation节点旨在对三维向量执行各种标量运算。它通过将指定的操作应用于向量的每个元素与给定的标量值来实现这一点。该节点对于涉及三维空间中向量的数学运算至关重要，提供了一种简单直接的方式来操作向量分量。

# Input types
## Required
- op
    - 参数'op'定义了要在向量上执行的特定标量操作。它至关重要，因为它决定了将对向量的分量执行的数学操作类型。操作的选择直接影响节点执行的结果。
    - Comfy dtype: str
    - Python dtype: str
- a
    - 参数'a'表示将应用操作的三维向量。作为核心输入，它对节点的功能至关重要，节点的输出取决于此向量内的值。
    - Comfy dtype: Vec3
    - Python dtype: Tuple[float, float, float]
- b
    - 参数'b'是在操作期间与向量'a'相互作用的标量值。它的作用至关重要，因为它是将与向量的每个元素一起用于指定操作的数值。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- result
    - 输出'result'是已经进行了指定标量操作的三维向量。它包含了节点计算的结果，反映了通过操作对原始向量'a'所做的更改。
    - Comfy dtype: VEC3
    - Python dtype: Tuple[float, float, float]

# Usage tips
- Infra type: CPU

# Source code
```
class Vec3ScalarOperation:

    @classmethod
    def INPUT_TYPES(cls) -> Mapping[str, Any]:
        return {'required': {'op': (list(VEC_SCALAR_OPERATION.keys()),), 'a': DEFAULT_VEC3, 'b': ('FLOAT',)}}
    RETURN_TYPES = ('VEC3',)
    FUNCTION = 'op'
    CATEGORY = 'math/vec3'

    def op(self, op: str, a: Vec3, b: float) -> tuple[Vec3]:
        return (_vec3_from_numpy(VEC_SCALAR_OPERATION[op](numpy.array(a), b)),)
```