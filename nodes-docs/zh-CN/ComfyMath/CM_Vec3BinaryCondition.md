# Documentation
- Class name: Vec3BinaryCondition
- Category: math/vec3
- Output node: False
- Repo Ref: https://github.com/evanspearman/ComfyMath

Vec3BinaryCondition节点旨在对两个三维向量执行二元运算。它评估由'op'参数指定的条件，并返回一个布尔结果，指示给定向量'a'和'b'的条件是否成立。

# Input types
## Required
- op
    - 参数'op'定义了要评估的二元条件类型。它至关重要，因为它决定了将在输入向量上执行的具体操作。
    - Comfy dtype: str
    - Python dtype: str
- a
    - 参数'a'代表参与二元运算的第一个三维向量。它的值对条件评估的结果有显著影响。
    - Comfy dtype: Vec3
    - Python dtype: numpy.ndarray
- b
    - 参数'b'代表二元运算中的第二个三维向量。它与'a'一起工作，以确定条件检查的结果。
    - Comfy dtype: Vec3
    - Python dtype: numpy.ndarray

# Output types
- result
    - 'result'输出是一个布尔值，表示由'op'参数指定的二元条件是否由输入向量'a'和'b'满足。
    - Comfy dtype: BOOL
    - Python dtype: bool

# Usage tips
- Infra type: CPU

# Source code
```
class Vec3BinaryCondition:

    @classmethod
    def INPUT_TYPES(cls) -> Mapping[str, Any]:
        return {'required': {'op': (list(VEC_BINARY_CONDITIONS.keys()),), 'a': DEFAULT_VEC3, 'b': DEFAULT_VEC3}}
    RETURN_TYPES = ('BOOL',)
    FUNCTION = 'op'
    CATEGORY = 'math/vec3'

    def op(self, op: str, a: Vec3, b: Vec3) -> tuple[bool]:
        return (VEC_BINARY_CONDITIONS[op](numpy.array(a), numpy.array(b)),)
```