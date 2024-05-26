# Documentation
- Class name: CR_IndexReset
- Category: Comfyroll/Utils/Index
- Output node: False
- Repo Ref: https://github.com/RockOfFire/ComfyUI_Comfyroll_CustomNodes

CR_IndexReset 节点旨在将给定的索引重置为指定的值，确保系统内索引操作的连续性和正确性。它通过提供一种直接的机制来重新初始化索引计数器，在维护数据序列的完整性中发挥着关键作用。

# Input types
## Required
- index
    - ‘index’参数对于识别需要在数据集或操作中重置的特定位置或序列号至关重要。它通过确定将哪个索引重新分配给‘reset_to’值，直接影响节点的执行。
    - Comfy dtype: INT
    - Python dtype: int
- reset_to
    - ‘reset_to’参数定义了重置操作后索引的新起始点。它对于设置‘index’在重置后将被分配到的正确初始值至关重要，从而影响系统随后的行为。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- index
    - ‘index’输出反映了重置操作后更新的索引值，表示数据集或操作中的新位置或序列号。
    - Comfy dtype: INT
    - Python dtype: int
- reset_to
    - ‘reset_to’输出是索引被重置到的值，指示了系统内索引的新初始点。
    - Comfy dtype: INT
    - Python dtype: int
- show_help
    - ‘show_help’输出提供了一个URL链接到文档，以获取有关节点操作的进一步帮助或信息。这对于寻求如何有效使用节点的额外指导的用户来说尤其有用。
    - Comfy dtype: STRING
    - Python dtype: str

# Usage tips
- Infra type: CPU

# Source code
```
class CR_IndexReset:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'index': ('INT', {'default': 1, 'min': 0, 'max': 10000, 'forceInput': True}), 'reset_to': ('INT', {'default': 1, 'min': 0, 'max': 10000})}}
    RETURN_TYPES = ('INT', 'INT', 'STRING')
    RETURN_NAMES = ('index', 'reset_to', 'show_help')
    FUNCTION = 'reset'
    CATEGORY = icons.get('Comfyroll/Utils/Index')

    def reset(self, index, reset_to):
        index = reset_to
        show_help = 'https://github.com/Suzie1/ComfyUI_Comfyroll_CustomNodes/wiki/Index-Nodes#cr-index-reset'
        return (index, reset_to, show_help)
```