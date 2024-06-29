# Documentation
- Class name: WAS_Boolean
- Category: WAS Suite/Logic
- Output node: False
- Repo Ref: https://github.com/WASasquatch/was-node-suite-comfyui

WAS_Boolean节点是逻辑操作中的基本组件，旨在处理并返回布尔值。它在工作流的决策过程中扮演着关键角色，确保根据逻辑条件的结果执行后续步骤。

# Input types
## Required
- boolean_number
    - 参数'boolean_number'对于确定布尔结果是至关重要的。它通过提供一个四舍五入到最近整数的数值来影响节点的执行，从而定义布尔状态。
    - Comfy dtype: FLOAT
    - Python dtype: Union[float, int]

# Output types
- result
    - 'result'输出表示从输入派生的布尔值。它很重要，因为它根据评估的逻辑条件决定了后续操作的流程。
    - Comfy dtype: INT
    - Python dtype: Tuple[int, int]

# Usage tips
- Infra type: CPU

# Source code
```
class WAS_Boolean:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'boolean_number': ('FLOAT', {'default': 1, 'min': 0, 'max': 1, 'step': 1})}}
    RETURN_TYPES = ('NUMBER', 'INT')
    FUNCTION = 'return_boolean'
    CATEGORY = 'WAS Suite/Logic'

    def return_boolean(self, boolean_number=True):
        return (int(round(boolean_number)), int(round(boolean_number)))
```