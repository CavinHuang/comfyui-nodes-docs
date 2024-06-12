# Documentation
- Class name: NumberUnaryOperation
- Category: math/number
- Output node: False
- Repo Ref: https://github.com/evanspearman/ComfyMath

NumberUnaryOperation节点旨在对数值输入执行各种一元运算。它接受一个单一的操作标识符和一个数值，将相应的数学函数应用于生成结果。此节点在工作流程中简化数学计算中起着关键作用，提供了一种简洁高效的方式来处理数值数据。

# Input types
## Required
- op
    - 参数'op'是一个字符串，指定要执行的一元运算。它对于确定将应用于输入数字的数学函数至关重要。操作的选择直接影响节点执行的结果。
    - Comfy dtype: str
    - Python dtype: str
- a
    - 参数'a'代表将应用一元运算的数值。它是节点功能的重要组成部分，因为操作的结果取决于这个输入值。该参数确保节点可以处理广泛的数值数据类型。
    - Comfy dtype: number
    - Python dtype: Union[int, float]

# Output types
- result
    - 'result'输出参数代表将一元运算应用于输入数字的结果。它包含了操作执行后得到的最终数值，标志着节点对数据处理序列的贡献。
    - Comfy dtype: float
    - Python dtype: float

# Usage tips
- Infra type: CPU

# Source code
```
class NumberUnaryOperation:

    @classmethod
    def INPUT_TYPES(cls) -> Mapping[str, Any]:
        return {'required': {'op': (list(FLOAT_UNARY_OPERATIONS.keys()),), 'a': DEFAULT_NUMBER}}
    RETURN_TYPES = ('NUMBER',)
    FUNCTION = 'op'
    CATEGORY = 'math/number'

    def op(self, op: str, a: number) -> tuple[float]:
        return (FLOAT_UNARY_OPERATIONS[op](float(a)),)
```