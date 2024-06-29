# Documentation
- Class name: FloatUnaryCondition
- Category: math/float
- Output node: False
- Repo Ref: https://github.com/evanspearman/ComfyMath

该节点旨在对浮点数评估一个单操作数数学条件。它提供了一种执行条件检查的方法，例如检查一个数字是否为正数、负数或零，而无需在代码中直接实现逻辑。

# Input types
## Required
- op
    - 操作参数定义了要应用于输入浮点数的单操作数条件。它至关重要，因为它决定了将对输入值执行的检查类型。
    - Comfy dtype: str
    - Python dtype: str
- a
    - 'a' 参数代表将评估单操作数条件的浮点数。它至关重要，因为整个操作都围绕这个值进行。
    - Comfy dtype: float
    - Python dtype: float

# Output types
- result
    - 操作的结果是一个布尔值，指示应用于输入浮点数的单操作数条件是真还是假。
    - Comfy dtype: bool
    - Python dtype: bool

# Usage tips
- Infra type: CPU

# Source code
```
class FloatUnaryCondition:

    @classmethod
    def INPUT_TYPES(cls) -> Mapping[str, Any]:
        return {'required': {'op': (list(FLOAT_UNARY_CONDITIONS.keys()),), 'a': DEFAULT_FLOAT}}
    RETURN_TYPES = ('BOOL',)
    FUNCTION = 'op'
    CATEGORY = 'math/float'

    def op(self, op: str, a: float) -> tuple[bool]:
        return (FLOAT_UNARY_CONDITIONS[op](a),)
```