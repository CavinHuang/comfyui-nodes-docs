# Documentation
- Class name: IntUnaryCondition
- Category: math/int
- Output node: False
- Repo Ref: https://github.com/evanspearman/ComfyMath

IntUnaryCondition节点旨在根据一组一元条件评估单个整数。它是更复杂数学操作的基本构建块，允许确定一个整数是否满足特定条件，而不会改变其值。

# Input types
## Required
- op
    - 参数'op'是一个字符串，定义了要检查整数'a'的一元条件。它对节点的操作至关重要，因为它决定了要评估的具体条件。
    - Comfy dtype: STRING
    - Python dtype: str
- a
    - 参数'a'表示将根据参数'op'指定的一元条件进行评估的整数。它是节点的一个基本输入，因为它是条件检查的对象。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- BOOL
    - IntUnaryCondition节点的输出是一个布尔值，指示整数'a'是否满足由'op'指定的一元条件。这个结果对于后续操作中的决策过程很重要。
    - Comfy dtype: BOOL
    - Python dtype: bool

# Usage tips
- Infra type: CPU

# Source code
```
class IntUnaryCondition:

    @classmethod
    def INPUT_TYPES(cls) -> Mapping[str, Any]:
        return {'required': {'op': (list(INT_UNARY_CONDITIONS.keys()),), 'a': DEFAULT_INT}}
    RETURN_TYPES = ('BOOL',)
    FUNCTION = 'op'
    CATEGORY = 'math/int'

    def op(self, op: str, a: int) -> tuple[bool]:
        return (INT_UNARY_CONDITIONS[op](a),)
```