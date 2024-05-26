# Documentation
- Class name: Vec2BinaryCondition
- Category: math/vec2
- Output node: False
- Repo Ref: https://github.com/evanspearman/ComfyMath

Vec2BinaryCondition节点旨在对二维向量执行二元运算，提供一种比较和评估基于指定条件的向量对的方法。它在数学运算中非常重要，其中结果是一个布尔值，表示应用的二元条件的结果。

# Input types
## Required
- op
    - 参数'op'定义了要应用于向量输入的二元条件。它至关重要，因为它决定了执行的比较或操作的性质，直接影响节点的输出。
    - Comfy dtype: str
    - Python dtype: str
- a
    - 参数'a'代表二元操作中的第一个向量。它至关重要，因为它构成了比较或操作的一半，节点的功能取决于此向量中的值。
    - Comfy dtype: Vec2
    - Python dtype: Vec2
- b
    - 参数'b'表示二元操作中涉及的第二个向量。它很重要，因为它完成了操作所需的配对，节点的有效性依赖于'a'和'b'之间的相互作用。
    - Comfy dtype: Vec2
    - Python dtype: Vec2

# Output types
- result
    - 输出'result'表示应用于输入向量的二元条件的结果。它是一个布尔值，包含了条件检查的成功或失败。
    - Comfy dtype: BOOL
    - Python dtype: bool

# Usage tips
- Infra type: CPU

# Source code
```
class Vec2BinaryCondition:

    @classmethod
    def INPUT_TYPES(cls) -> Mapping[str, Any]:
        return {'required': {'op': (list(VEC_BINARY_CONDITIONS.keys()),), 'a': DEFAULT_VEC2, 'b': DEFAULT_VEC2}}
    RETURN_TYPES = ('BOOL',)
    FUNCTION = 'op'
    CATEGORY = 'math/vec2'

    def op(self, op: str, a: Vec2, b: Vec2) -> tuple[bool]:
        return (VEC_BINARY_CONDITIONS[op](numpy.array(a), numpy.array(b)),)
```