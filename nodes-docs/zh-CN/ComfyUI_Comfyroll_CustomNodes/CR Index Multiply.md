# Documentation
- Class name: CR_MultiplyIndex
- Category: Comfyroll/Utils/Index
- Output node: False
- Repo Ref: https://github.com/RockOfFire/ComfyUI_Comfyroll_CustomNodes

CR_MultiplyIndex节点旨在对索引值进行乘法操作，通过给定的因子进行计算。这是一个实用工具节点，它增强了工作流程中索引操作的功能，提供了一种直接的方法来按需扩展或调整索引值。

# Input types
## Required
- index
    - ‘index’参数是将乘以‘factor’的基数。它在确定节点的最终输出中起着关键作用，因为它是乘法操作的起点。
    - Comfy dtype: INT
    - Python dtype: int
- factor
    - ‘factor’参数是将应用于‘index’的乘数。它对节点的操作至关重要，因为它决定了乘法对索引值的影响程度。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- index
    - ‘index’输出代表了输入‘index’和‘factor’之间乘法操作的结果。它表示乘法过程后新的缩放索引值。
    - Comfy dtype: INT
    - Python dtype: int
- factor
    - ‘factor’输出是在乘法操作中使用的乘数。它被包含在输出中，以保持与输入参数的一致性，并提供对执行操作的透明度。
    - Comfy dtype: INT
    - Python dtype: int
- show_help
    - ‘show_help’输出提供了一个URL链接到文档，以获取有关节点使用情况的额外指导或帮助。对于寻求有关节点功能更多信息的用户来说，这是一个有用的资源。
    - Comfy dtype: STRING
    - Python dtype: str

# Usage tips
- Infra type: CPU

# Source code
```
class CR_MultiplyIndex:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'index': ('INT', {'default': 1, 'min': 0, 'max': 10000, 'forceInput': True}), 'factor': ('INT', {'default': 1, 'min': 0, 'max': 10000})}}
    RETURN_TYPES = ('INT', 'INT', 'STRING')
    RETURN_NAMES = ('index', 'factor', 'show_help')
    FUNCTION = 'multiply'
    CATEGORY = icons.get('Comfyroll/Utils/Index')

    def multiply(self, index, factor):
        index = index * factor
        show_help = 'https://github.com/Suzie1/ComfyUI_Comfyroll_CustomNodes/wiki/Index-Nodes#cr-index-multiply'
        return (index, factor, show_help)
```