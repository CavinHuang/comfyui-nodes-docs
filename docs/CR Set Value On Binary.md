# Documentation
- Class name: CR_SetValueOnBinary
- Category: Comfyroll/Utils/Conditional
- Output node: False
- Repo Ref: https://github.com/RockOfFire/ComfyUI_Comfyroll_CustomNodes

CR_SetValueOnBinary节点旨在根据二进制输入的状态条件性地分配一个值。它的工作原理非常简单：如果二进制输入为真（1），它将返回为真情况指定的值；如果为假（0），它将返回假情况的值。此功能对于在工作流中实现条件逻辑至关重要，允许基于二进制条件对数据流进行简单的操作。

# Input types
## Required
- binary
    - ‘binary’参数是一个关键输入，它决定了节点的行为。它作为节点决定返回哪个值的条件。二进制输入必须是一个整数，可以是0或1，不接受其他值，确保了一个清晰且明确的条件检查。
    - Comfy dtype: INT
    - Python dtype: int
- value_if_1
    - ‘value_if_1’参数定义了当二进制输入为真时将返回的值。它是一个浮点数，可以表示广泛的值，允许在基于二进制条件进行条件分配时具有灵活性。
    - Comfy dtype: FLOAT
    - Python dtype: float
- value_if_0
    - ‘value_if_0’参数设定了当二进制输入为假时要返回的值。像‘value_if_1’一样，它也是一个浮点数，确保了节点可以返回的值的类型一致性，无论二进制条件如何。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- INT
    - ‘INT’输出提供了二进制输入值的整数表示，作为条件结果的直接和明确的反映。
    - Comfy dtype: INT
    - Python dtype: int
- FLOAT
    - ‘FLOAT’输出返回与二进制输入条件相关联的值。它是基于二进制输入为真或假而在工作流下游使用的值。
    - Comfy dtype: FLOAT
    - Python dtype: float
- show_help
    - ‘show_help’输出提供了指向节点文档页面的URL链接，使用户能够轻松访问有关如何有效使用该节点的更详细信息。
    - Comfy dtype: STRING
    - Python dtype: str

# Usage tips
- Infra type: CPU

# Source code
```
class CR_SetValueOnBinary:

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'binary': ('INT', {'default': 1, 'min': 0, 'max': 1, 'forceInput': True}), 'value_if_1': ('FLOAT', {'default': 1, 'min': -18446744073709551615, 'max': 18446744073709551615}), 'value_if_0': ('FLOAT', {'default': 0, 'min': -18446744073709551615, 'max': 18446744073709551615})}}
    RETURN_TYPES = ('INT', 'FLOAT', 'STRING')
    RETURN_NAMES = ('INT', 'FLOAT', 'show_help')
    FUNCTION = 'set_value'
    CATEGORY = icons.get('Comfyroll/Utils/Conditional')

    def set_value(self, binary, value_if_1, value_if_0):
        show_help = 'https://github.com/Suzie1/ComfyUI_Comfyroll_CustomNodes/wiki/Other-Nodes#cr-set-value-on-boolean'
        if binary == 1:
            return (int(value_if_1), value_if_1, show_help)
        else:
            return (int(value_if_0), value_if_0, show_help)
```