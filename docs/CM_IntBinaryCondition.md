# Documentation
- Class name: IntBinaryCondition
- Category: math/int
- Output node: False
- Repo Ref: https://github.com/evanspearman/ComfyMath

IntBinaryCondition节点旨在评估两个整数值之间的二元条件。它通过将指定的操作应用于输入并确定结果条件的真值来工作。该节点在数学计算中的决策过程至关重要，其中的结果是依赖于两个整数之间的关系。

# Input types
## Required
- op
    - 参数'op'定义了要在整数输入上执行的二元操作。它至关重要，因为它决定了正在评估的条件的性质。操作的选择直接影响节点在数学上下文中的决策能力。
    - Comfy dtype: str
    - Python dtype: str
- a
    - 参数'a'代表二元条件中的第一个整数。它的值很重要，因为它有助于条件评估的结果。整数'a'在节点的决策过程中起着关键作用。
    - Comfy dtype: int
    - Python dtype: int
- b
    - 参数'b'表示二元条件中涉及的第二个整数。它至关重要，因为它与'a'一起决定了条件的最终结果。整数'b'是节点评估过程中的一个关键因素。
    - Comfy dtype: int
    - Python dtype: int

# Output types
- result
    - 'result'输出表示节点评估的二元条件的布尔结果。它很重要，因为它代表了条件的真值，可以用于数学或逻辑工作流中的进一步处理或决策。
    - Comfy dtype: bool
    - Python dtype: bool

# Usage tips
- Infra type: CPU

# Source code
```
class IntBinaryCondition:

    @classmethod
    def INPUT_TYPES(cls) -> Mapping[str, Any]:
        return {'required': {'op': (list(INT_BINARY_CONDITIONS.keys()),), 'a': DEFAULT_INT, 'b': DEFAULT_INT}}
    RETURN_TYPES = ('BOOL',)
    FUNCTION = 'op'
    CATEGORY = 'math/int'

    def op(self, op: str, a: int, b: int) -> tuple[bool]:
        return (INT_BINARY_CONDITIONS[op](a, b),)
```