# Documentation
- Class name: BoolUnaryOperation
- Category: math/bool
- Output node: False
- Repo Ref: https://github.com/evanspearman/ComfyMath

BoolUnaryOperation节点旨在对布尔值执行一元操作。它接受一个布尔输入，应用指定的一元操作，并产生一个布尔输出。该节点对于以一种流线化和高效的方式操纵布尔逻辑至关重要。

# Input types
## Required
- op
    - 参数'op'指定将应用于布尔输入的一元操作。它对于确定节点将处理的逻辑至关重要。
    - Comfy dtype: str
    - Python dtype: str
- a
    - 参数'a'表示将应用一元操作的布尔值。它在节点的执行中扮演中心角色，因为它是操作的对象。
    - Comfy dtype: bool
    - Python dtype: bool

# Output types
- result
    - 参数'result'是输入布尔值执行的一元操作的输出。它标志着节点内逻辑操作的结果。
    - Comfy dtype: bool
    - Python dtype: bool

# Usage tips
- Infra type: CPU

# Source code
```
class BoolUnaryOperation:

    @classmethod
    def INPUT_TYPES(cls) -> Mapping[str, Any]:
        return {'required': {'op': (list(BOOL_UNARY_OPERATIONS.keys()),), 'a': DEFAULT_BOOL}}
    RETURN_TYPES = ('BOOL',)
    FUNCTION = 'op'
    CATEGORY = 'math/bool'

    def op(self, op: str, a: bool) -> tuple[bool]:
        return (BOOL_UNARY_OPERATIONS[op](a),)
```