# Documentation
- Class name: CR_IntegerMultipleOf
- Category: Comfyroll/Utils/Other
- Output node: False
- Repo Ref: https://github.com/RockOfFire/ComfyUI_Comfyroll_CustomNodes

CR_IntegerMultipleOf 是一个设计用来将整数乘以指定的倍数，确保结果是给定因子的整数倍的节点。这个节点在需要保持一致的增量或缩放因子的情况下特别有用，例如在数学计算或数据处理任务中。它通过提供一种简单而有效的方式来根据预定义的倍数操作整数，从而为工作流程做出贡献。

# Input types
## Required
- integer
    - ‘integer’参数是要乘以‘multiple’参数的基数。它在节点的操作中扮演着基础角色，因为它决定了乘法过程的起点。节点的执行和结果直接受此参数的值影响。
    - Comfy dtype: INT
    - Python dtype: int
## Optional
- multiple
    - ‘multiple’参数定义了‘integer’将乘以的因子。它的重要性在于它决定了基数整数的缩放。节点的结果在很大程度上依赖于这个参数，它允许控制计算中所需增量级别。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- INT
    - ‘INT’输出代表输入整数乘以指定倍数的结果。它是节点的主要输出，反映了节点基于给定因子进行整数乘法的核心功能。
    - Comfy dtype: INT
    - Python dtype: int
- show_help
    - ‘show_help’输出提供了指向节点文档的URL链接，为用户提供了如何有效使用节点的额外信息和指导。这个辅助输出通过提供易于访问的帮助资源，增强了用户体验。
    - Comfy dtype: STRING
    - Python dtype: str

# Usage tips
- Infra type: CPU

# Source code
```
class CR_IntegerMultipleOf:

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'integer': ('INT', {'default': 1, 'min': -18446744073709551615, 'max': 18446744073709551615}), 'multiple': ('FLOAT', {'default': 8, 'min': 1, 'max': 18446744073709551615})}}
    RETURN_TYPES = ('INT', 'STRING')
    RETURN_NAMES = ('INT', 'show_help')
    FUNCTION = 'int_multiple_of'
    CATEGORY = icons.get('Comfyroll/Utils/Other')

    def int_multiple_of(self, integer, multiple=8):
        show_help = 'https://github.com/Suzie1/ComfyUI_Comfyroll_CustomNodes/wiki/Other-Nodes#cr-integer-multiple'
        if multiple == 0:
            return (int(integer), show_help)
        integer = integer * multiple
        return (int(integer), show_help)
```