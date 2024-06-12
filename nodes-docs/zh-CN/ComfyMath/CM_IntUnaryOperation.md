# Documentation
- Class name: IntUnaryOperation
- Category: math/int
- Output node: False
- Repo Ref: https://github.com/evanspearman/ComfyMath

IntUnaryOperation节点旨在对整数输入执行多种一元运算，提供一种灵活高效的方式来操作数值数据。它强调了节点通过一组预定义的数学运算来转换整数值的能力，而不改变输入的基本性质。

# Input types
## Required
- op
    - 参数'op'至关重要，因为它决定了要应用于整数输入的特定一元运算。它通过指定将使用的数学函数，影响节点的执行，从而影响操作的结果。
    - Comfy dtype: str
    - Python dtype: str
- a
    - 参数'a'代表一元运算的整数输入。它的值直接影响操作的结果，因为它是所有数学函数将应用的操作数。
    - Comfy dtype: int
    - Python dtype: int

# Output types
- result
    - 输出参数'result'表示将一元运算应用于输入整数的结果。它封装了操作后转换的值，反映了节点的主要功能——数值操作。
    - Comfy dtype: int
    - Python dtype: int

# Usage tips
- Infra type: CPU

# Source code
```
class IntUnaryOperation:

    @classmethod
    def INPUT_TYPES(cls) -> Mapping[str, Any]:
        return {'required': {'op': (list(INT_UNARY_OPERATIONS.keys()),), 'a': DEFAULT_INT}}
    RETURN_TYPES = ('INT',)
    FUNCTION = 'op'
    CATEGORY = 'math/int'

    def op(self, op: str, a: int) -> tuple[int]:
        return (INT_UNARY_OPERATIONS[op](a),)
```