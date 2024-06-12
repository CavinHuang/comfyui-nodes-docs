# Documentation
- Class name: Vec4BinaryCondition
- Category: math/vec4
- Output node: False
- Repo Ref: https://github.com/evanspearman/ComfyMath

Vec4BinaryCondition节点旨在对四个分量的向量执行二元运算。它对两个输入向量应用指定的操作，产生一个布尔结果，指示条件的有效性。此节点在数学领域的向量分析和比较中起着关键作用。

# Input types
## Required
- op
    - 参数'op'定义了要应用于输入向量的二元条件。它对于确定节点执行的比较或操作的性质至关重要，直接影响过程的结果。
    - Comfy dtype: str
    - Python dtype: str
- a
    - 参数'a'表示二元操作中的第一个向量。作为基本输入，它在节点的执行中扮演重要角色，根据'op'指定的条件影响最终的布尔结果。
    - Comfy dtype: Vec4
    - Python dtype: Vec4
- b
    - 参数'b'表示参与二元操作的第二个向量。它对于节点计算与'a'一起的比较或操作至关重要，其值对节点的输出至关重要。
    - Comfy dtype: Vec4
    - Python dtype: Vec4

# Output types
- result
    - 'result'输出是一个布尔值，代表应用于输入向量的二元条件的结果。它表示由'op'参数指定的条件对于给定向量是否成立。
    - Comfy dtype: BOOL
    - Python dtype: bool

# Usage tips
- Infra type: CPU

# Source code
```
class Vec4BinaryCondition:

    @classmethod
    def INPUT_TYPES(cls) -> Mapping[str, Any]:
        return {'required': {'op': (list(VEC_BINARY_CONDITIONS.keys()),), 'a': DEFAULT_VEC4, 'b': DEFAULT_VEC4}}
    RETURN_TYPES = ('BOOL',)
    FUNCTION = 'op'
    CATEGORY = 'math/vec4'

    def op(self, op: str, a: Vec4, b: Vec4) -> tuple[bool]:
        return (VEC_BINARY_CONDITIONS[op](numpy.array(a), numpy.array(b)),)
```