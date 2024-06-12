# Documentation
- Class name: IntBinaryOperation
- Category: math/int
- Output node: False
- Repo Ref: https://github.com/evanspearman/ComfyMath

IntBinaryOperation节点旨在执行各种整数二元运算。它接收两个整数和一个表示要执行的操作的字符串，并返回操作的结果。此节点对于涉及整数的数学计算至关重要，为以编程方式执行基本算术运算提供了一种直接的方法。

# Input types
## Required
- op
    - 参数'op'是一个字符串，指定要在两个整数上执行的二元运算。它非常重要，因为它决定了将执行的算术运算类型。操作的选择直接影响节点执行的结果。
    - Comfy dtype: str
    - Python dtype: str
- a
    - 参数'a'代表二元运算中的第一个操作数。作为运算的一个整体部分，它在数学计算中扮演着重要角色。'a'的值直接影响操作的最终结果。
    - Comfy dtype: int
    - Python dtype: int
- b
    - 参数'b'表示二元运算中的第二个操作数。它对于完成运算并获得正确结果至关重要。'b'的值与'a'一样，在影响计算结果方面同样重要。
    - Comfy dtype: int
    - Python dtype: int

# Output types
- result
    - 参数'result'是节点执行的二元运算的结果。它包含了基于输入操作数和指定操作计算出的最终值，是节点的主要输出。
    - Comfy dtype: int
    - Python dtype: int

# Usage tips
- Infra type: CPU

# Source code
```
class IntBinaryOperation:

    @classmethod
    def INPUT_TYPES(cls) -> Mapping[str, Any]:
        return {'required': {'op': (list(INT_BINARY_OPERATIONS.keys()),), 'a': DEFAULT_INT, 'b': DEFAULT_INT}}
    RETURN_TYPES = ('INT',)
    FUNCTION = 'op'
    CATEGORY = 'math/int'

    def op(self, op: str, a: int, b: int) -> tuple[int]:
        return (INT_BINARY_OPERATIONS[op](a, b),)
```