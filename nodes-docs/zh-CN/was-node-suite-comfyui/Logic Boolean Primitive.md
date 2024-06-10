# Documentation
- Class name: WAS_Boolean_Primitive
- Category: WAS Suite/Logic
- Output node: False
- Repo Ref: https://github.com/WASasquatch/was-node-suite-comfyui

WAS_Boolean_Primitive 节点的 `do` 方法旨在处理并返回一个布尔值。它作为逻辑操作中的基本构建块，确保了工作流程中布尔计算的完整性。

# Input types
## Required
- boolean
    - “boolean”参数对节点的操作至关重要，因为它直接影响“do”方法的逻辑结果。它是决定节点行为和结果布尔值的主要输入。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool

# Output types
- result
    - “result”输出参数代表了由“do”方法执行的布尔运算的结果。它很重要，因为它在处理输入后提供了最终的布尔值。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool

# Usage tips
- Infra type: CPU

# Source code
```
class WAS_Boolean_Primitive:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'boolean': ('BOOLEAN', {'default': False})}}
    RETURN_TYPES = ('BOOLEAN',)
    FUNCTION = 'do'
    CATEGORY = 'WAS Suite/Logic'

    def do(self, boolean):
        return (boolean,)
```