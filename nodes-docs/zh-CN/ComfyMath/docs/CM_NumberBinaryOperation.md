# Documentation
- Class name: NumberBinaryOperation
- Category: math/number
- Output node: False
- Repo Ref: https://github.com/evanspearman/ComfyMath

NumberBinaryOperation 节点旨在对数值输入执行二元运算。它封装了各种可以在两个数字之间应用的算术运算，在一个简化的接口中促进复杂的数学计算。

# Input types
## Required
- op
    - 参数 'op' 决定了要执行的具体二元运算。它至关重要，因为它决定了节点将执行的数学函数，从而影响计算的结果。
    - Comfy dtype: str
    - Python dtype: str
- a
    - 参数 'a' 表示二元运算中的第一个操作数。它至关重要，因为它构成了算术计算所需的一半输入。
    - Comfy dtype: number
    - Python dtype: Union[int, float]
- b
    - 参数 'b' 表示二元运算中的第二个操作数。它至关重要，因为它完成了算术过程所需的输入集。
    - Comfy dtype: number
    - Python dtype: Union[int, float]

# Output types
- result
    - 输出 'result' 提供了在输入 'a' 和 'b' 上执行的二元运算的结果。它很重要，因为它代表了从指定操作派生的最终计算值。
    - Comfy dtype: float
    - Python dtype: float

# Usage tips
- Infra type: CPU

# Source code
```
class NumberBinaryOperation:

    @classmethod
    def INPUT_TYPES(cls) -> Mapping[str, Any]:
        return {'required': {'op': (list(FLOAT_BINARY_OPERATIONS.keys()),), 'a': DEFAULT_NUMBER, 'b': DEFAULT_NUMBER}}
    RETURN_TYPES = ('NUMBER',)
    FUNCTION = 'op'
    CATEGORY = 'math/number'

    def op(self, op: str, a: number, b: number) -> tuple[float]:
        return (FLOAT_BINARY_OPERATIONS[op](float(a), float(b)),)
```