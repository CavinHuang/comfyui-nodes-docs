# Documentation
- Class name: NumberUnaryCondition
- Category: math/number
- Output node: False
- Repo Ref: https://github.com/evanspearman/ComfyMath

`NumberUnaryCondition` 节点旨在评估单个操作数与一组一元条件之间的关系，确定在数学上下文中条件的有效性。它作为更复杂数值运算的基本构建块，确保在进行进一步计算之前满足数值条件。

# Input types
## Required
- op
    - 参数 'op' 定义了要应用于操作数 'a' 的一元条件。它至关重要，因为它决定了将执行的数学条件检查类型，直接影响节点的输出。
    - Comfy dtype: str
    - Python dtype: str
- a
    - 参数 'a' 表示将应用一元条件的操作数。它的值至关重要，因为它是条件检查的对象，决定了节点评估的结果。
    - Comfy dtype: number
    - Python dtype: Union[int, float]

# Output types
- result
    - 输出 'result' 表示一元条件检查的结果。它是一个布尔值，指示操作数 'a' 是否满足由 'op' 定义的条件。
    - Comfy dtype: bool
    - Python dtype: bool

# Usage tips
- Infra type: CPU

# Source code
```
class NumberUnaryCondition:

    @classmethod
    def INPUT_TYPES(cls) -> Mapping[str, Any]:
        return {'required': {'op': (list(FLOAT_UNARY_CONDITIONS.keys()),), 'a': DEFAULT_NUMBER}}
    RETURN_TYPES = ('BOOL',)
    FUNCTION = 'op'
    CATEGORY = 'math/number'

    def op(self, op: str, a: number) -> tuple[bool]:
        return (FLOAT_UNARY_CONDITIONS[op](float(a)),)
```