# Documentation
- Class name: FloatBinaryCondition
- Category: math/float
- Output node: False
- Repo Ref: https://github.com/evanspearman/ComfyMath

这个节点提供了一个对浮点数执行二元运算的机制。它旨在基于两个浮点数的比较结果确定一个布尔输出。节点的功能集中在评估数学条件上，从而支持依赖数值阈值的决策过程。

# Input types
## Required
- op
    - 操作参数定义了要评估的二元条件类型。它是一个关键元素，因为它决定了将在输入浮点数上执行的具体比较或操作。操作的选择直接影响节点的决策能力。
    - Comfy dtype: str
    - Python dtype: str
- a
    - 参数 'a' 表示二元条件中的第一个操作数。它对节点的操作至关重要，因为它是将被比较或操作的两个值之一。'a' 的值在确定条件检查的结果中起着重要作用。
    - Comfy dtype: float
    - Python dtype: float
- b
    - 参数 'b' 是二元条件中的第二个操作数。它的重要性与 'a' 相当，因为它是参与比较或操作的第二个值。节点的功能依赖于 'a' 和 'b' 来产生正确的布尔结果。
    - Comfy dtype: float
    - Python dtype: float

# Output types
- result
    - 节点的输出是一个布尔值，代表二元条件操作的结果。它表示由 'op' 参数指定的条件对于给定的输入浮点数 'a' 和 'b' 是否成立。
    - Comfy dtype: bool
    - Python dtype: bool

# Usage tips
- Infra type: CPU

# Source code
```
class FloatBinaryCondition:

    @classmethod
    def INPUT_TYPES(cls) -> Mapping[str, Any]:
        return {'required': {'op': (list(FLOAT_BINARY_CONDITIONS.keys()),), 'a': DEFAULT_FLOAT, 'b': DEFAULT_FLOAT}}
    RETURN_TYPES = ('BOOL',)
    FUNCTION = 'op'
    CATEGORY = 'math/float'

    def op(self, op: str, a: float, b: float) -> tuple[bool]:
        return (FLOAT_BINARY_CONDITIONS[op](a, b),)
```