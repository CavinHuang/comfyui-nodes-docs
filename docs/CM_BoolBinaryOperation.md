# Documentation
- Class name: BoolBinaryOperation
- Category: math/bool
- Output node: False
- Repo Ref: https://github.com/evanspearman/ComfyMath

BoolBinaryOperation节点旨在对布尔值执行二元运算。它接受两个布尔输入和一个表示要执行操作的字符串，并返回操作的结果。此节点对于系统中的逻辑计算和决策过程至关重要。

# Input types
## Required
- op
    - ‘op’参数是一个字符串，用于指定要对布尔输入执行的二元运算。它对于确定操作的逻辑和最终结果至关重要。
    - Comfy dtype: str
    - Python dtype: str
- a
    - ‘a’参数是二元运算中的第一个操作数。它是一个布尔值，在计算过程中起着重要作用。
    - Comfy dtype: bool
    - Python dtype: bool
- b
    - ‘b’参数是二元运算中的第二个操作数。它也是一个布尔值，对计算结果有贡献。
    - Comfy dtype: bool
    - Python dtype: bool

# Output types
- result
    - 布尔二元运算的结果，是一个单一的布尔值，代表操作的结果。
    - Comfy dtype: bool
    - Python dtype: bool

# Usage tips
- Infra type: CPU

# Source code
```
class BoolBinaryOperation:

    @classmethod
    def INPUT_TYPES(cls) -> Mapping[str, Any]:
        return {'required': {'op': (list(BOOL_BINARY_OPERATIONS.keys()),), 'a': DEFAULT_BOOL, 'b': DEFAULT_BOOL}}
    RETURN_TYPES = ('BOOL',)
    FUNCTION = 'op'
    CATEGORY = 'math/bool'

    def op(self, op: str, a: bool, b: bool) -> tuple[bool]:
        return (BOOL_BINARY_OPERATIONS[op](a, b),)
```