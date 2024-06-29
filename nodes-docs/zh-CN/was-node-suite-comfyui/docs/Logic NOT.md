# Documentation
- Class name: WAS_Logical_NOT
- Category: WAS Suite/Logic
- Output node: False
- Repo Ref: https://github.com/WASasquatch/was-node-suite-comfyui

WAS_Logical_NOT节点旨在对布尔输入应用逻辑非操作。它反转真值，为工作流中否定布尔条件提供了一个简单的机制。在决策过程中，当需要反转布尔状态时，此节点发挥着关键作用。

# Input types
## Required
- boolean
    - “boolean”参数是WAS_Logical_NOT节点的关键输入。它是一个布尔值，节点将对其进行否定。这个参数的重要性在于它能够控制后续操作的逻辑状态，对于条件工作流至关重要。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool

# Output types
- result
    - WAS_Logical_NOT节点的'result'输出代表输入布尔值的逻辑非。它的重要性在于它直接影响系统中的逻辑流程，允许构建复杂的条件语句。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool

# Usage tips
- Infra type: CPU

# Source code
```
class WAS_Logical_NOT:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'boolean': ('BOOLEAN', {'default': False})}}
    RETURN_TYPES = ('BOOLEAN',)
    FUNCTION = 'do'
    CATEGORY = 'WAS Suite/Logic'

    def do(self, boolean):
        return (not boolean,)
```