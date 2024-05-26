# Documentation
- Class name: WLSH_Int_Multiply
- Category: WLSH Nodes/number
- Output node: False
- Repo Ref: https://github.com/wallish77/wlsh_nodes

该节点执行整数乘法，这是一种基本的算术运算，它通过指定的乘数来放大给定的数字，便于工作流中进行各种数学和数据处理任务。

# Input types
## Required
- number
    - ‘number’参数是要乘以‘multiplier’的基础整数值。它对节点的操作至关重要，因为它定义了乘法过程中的初始值。
    - Comfy dtype: INT
    - Python dtype: int
- multiplier
    - ‘multiplier’参数决定了‘number’参数放大的倍数。这对节点的功能至关重要，因为它决定了应用于初始值的放大程度。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- result
    - ‘result’输出代表‘number’和‘multiplier’的乘积，有效地展示了整数乘法操作的结果。
    - Comfy dtype: INT
    - Python dtype: int

# Usage tips
- Infra type: CPU

# Source code
```
class WLSH_Int_Multiply:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'number': ('INT', {'default': 2, 'min': 1, 'max': 10000, 'forceInput': True}), 'multiplier': ('INT', {'default': 2, 'min': 1, 'max': 10000})}}
    RETURN_TYPES = ('INT',)
    FUNCTION = 'multiply'
    CATEGORY = 'WLSH Nodes/number'

    def multiply(self, number, multiplier):
        result = number * multiplier
        return (int(result),)
```