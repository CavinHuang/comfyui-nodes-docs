# Documentation
- Class name: FloatBinaryOperation
- Category: math/float
- Output node: False
- Repo Ref: https://github.com/evanspearman/ComfyMath

FloatBinaryOperation节点旨在对浮点数执行二元运算。它接收两个输入'a'和'b'，应用指定的操作'op'以产生一个单一的浮点结果。此节点对于需要通过二元运算结合两个数字的数学计算至关重要。

# Input types
## Required
- op
    - 参数'op'指定了要在输入'a'和'b'上执行的二元运算。它至关重要，因为它决定了将应用于输入的数学函数，直接影响节点的输出。
    - Comfy dtype: str
    - Python dtype: str
- a
    - 参数'a'是二元运算中的第一个操作数。它是输入的重要组成部分，因为它与第二个操作数'b'结合时，对运算的最终结果有所贡献。
    - Comfy dtype: float
    - Python dtype: float
- b
    - 参数'b'是二元运算中的第二个操作数。它在计算中扮演重要角色，因为它与第一个操作数'a'结合以产生最终结果。
    - Comfy dtype: float
    - Python dtype: float

# Output types
- result
    - 参数'result'代表将二元运算'op'应用于输入'a'和'b'的结果。它是一个单一的浮点数，包含了两个操作数的联合效应。
    - Comfy dtype: float
    - Python dtype: float

# Usage tips
- Infra type: CPU

# Source code
```
class FloatBinaryOperation:

    @classmethod
    def INPUT_TYPES(cls) -> Mapping[str, Any]:
        return {'required': {'op': (list(FLOAT_BINARY_OPERATIONS.keys()),), 'a': DEFAULT_FLOAT, 'b': DEFAULT_FLOAT}}
    RETURN_TYPES = ('FLOAT',)
    FUNCTION = 'op'
    CATEGORY = 'math/float'

    def op(self, op: str, a: float, b: float) -> tuple[float]:
        return (FLOAT_BINARY_OPERATIONS[op](a, b),)
```