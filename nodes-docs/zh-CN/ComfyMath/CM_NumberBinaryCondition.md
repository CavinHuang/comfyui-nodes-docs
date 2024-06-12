# Documentation
- Class name: NumberBinaryCondition
- Category: math/float
- Output node: False
- Repo Ref: https://github.com/evanspearman/ComfyMath

`NumberBinaryCondition` 节点旨在评估两个数字输入之间的二元条件。它执行用户指定的比较操作，并返回一个布尔结果，指示条件的结果。

# Input types
## Required
- op
    - 参数 'op' 定义了要评估的二元条件。它至关重要，因为它决定了两个数字之间执行的比较类型。
    - Comfy dtype: str
    - Python dtype: str
- a
    - 参数 'a' 表示二元条件中的第一个数字。它起着重要作用，因为它是比较操作中的一个操作数。
    - Comfy dtype: number
    - Python dtype: Union[int, float]
- b
    - 参数 'b' 表示二元条件中的第二个数字。它至关重要，因为它是另一个比较操作中的操作数。
    - Comfy dtype: number
    - Python dtype: Union[int, float]

# Output types
- result
    - 输出 'result' 提供了二元条件评估的布尔结果，指示条件是成立还是不成立。
    - Comfy dtype: bool
    - Python dtype: bool

# Usage tips
- Infra type: CPU

# Source code
```
class NumberBinaryCondition:

    @classmethod
    def INPUT_TYPES(cls) -> Mapping[str, Any]:
        return {'required': {'op': (list(FLOAT_BINARY_CONDITIONS.keys()),), 'a': DEFAULT_NUMBER, 'b': DEFAULT_NUMBER}}
    RETURN_TYPES = ('BOOL',)
    FUNCTION = 'op'
    CATEGORY = 'math/float'

    def op(self, op: str, a: number, b: number) -> tuple[bool]:
        return (FLOAT_BINARY_CONDITIONS[op](float(a), float(b)),)
```