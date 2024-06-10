# Documentation
- Class name: FloatUnaryOperation
- Category: math/float
- Output node: False
- Repo Ref: https://github.com/evanspearman/ComfyMath

FloatUnaryOperation节点对单个浮点数应用数学运算，将其转换为另一个浮点值。它旨在处理各种一元运算，使其在数据处理流程中用于数学计算非常灵活。

# Input types
## Required
- op
    - 参数'op'指定要执行的一元数学运算。它至关重要，因为它决定了应用于输入浮点值的转换类型。
    - Comfy dtype: str
    - Python dtype: str
- a
    - 参数'a'表示将应用一元运算的输入浮点值。它是节点操作的基本组成部分，因为它是数学变换的主题。
    - Comfy dtype: float
    - Python dtype: float

# Output types
- result
    - 输出'result'提供了应用指定一元运算后的转换浮点值。它很重要，因为它代表了节点执行的数学计算的结果。
    - Comfy dtype: float
    - Python dtype: float

# Usage tips
- Infra type: CPU

# Source code
```
class FloatUnaryOperation:

    @classmethod
    def INPUT_TYPES(cls) -> Mapping[str, Any]:
        return {'required': {'op': (list(FLOAT_UNARY_OPERATIONS.keys()),), 'a': DEFAULT_FLOAT}}
    RETURN_TYPES = ('FLOAT',)
    FUNCTION = 'op'
    CATEGORY = 'math/float'

    def op(self, op: str, a: float) -> tuple[float]:
        return (FLOAT_UNARY_OPERATIONS[op](a),)
```