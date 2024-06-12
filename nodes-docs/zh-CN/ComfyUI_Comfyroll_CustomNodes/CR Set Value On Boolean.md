# Documentation
- Class name: CR_SetValueOnBoolean
- Category: Comfyroll/Utils/Conditional
- Output node: False
- Repo Ref: https://github.com/RockOfFire/ComfyUI_Comfyroll_CustomNodes

CR_SetValueOnBoolean节点旨在根据布尔条件的评估来分配一个值。它提供了一个简单的机制，根据输入布尔值为真或假，返回两个值中的一个，从而在工作流中促进条件逻辑。

# Input types
## Required
- boolean
    - “boolean”参数至关重要，因为它决定了节点逻辑的流程。它根据其真值来决定将返回哪个值。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool
- value_if_true
    - “value_if_true”参数定义了当“boolean”参数被评估为真时返回的值。它在节点的条件输出中扮演着关键角色。
    - Comfy dtype: FLOAT
    - Python dtype: float
- value_if_false
    - “value_if_false”参数设定了当“boolean”参数被评估为假时返回的值。它对于节点的替代条件输出至关重要。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- INT
    - “INT”输出代表了根据布尔条件对应的“value_if_true”或“value_if_false”参数的整数值。
    - Comfy dtype: INT
    - Python dtype: int
- FLOAT
    - “FLOAT”输出提供了基于布尔条件返回值的浮点表示。
    - Comfy dtype: FLOAT
    - Python dtype: float
- show_help
    - “show_help”输出提供了指向节点文档的URL链接，以供进一步指导和信息。
    - Comfy dtype: STRING
    - Python dtype: str

# Usage tips
- Infra type: CPU

# Source code
```
class CR_SetValueOnBoolean:

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'boolean': ('BOOLEAN', {'default': True, 'forceInput': True}), 'value_if_true': ('FLOAT', {'default': 1, 'min': -18446744073709551615, 'max': 18446744073709551615}), 'value_if_false': ('FLOAT', {'default': 0, 'min': -18446744073709551615, 'max': 18446744073709551615})}}
    RETURN_TYPES = ('INT', 'FLOAT', 'STRING')
    RETURN_NAMES = ('INT', 'FLOAT', 'show_help')
    FUNCTION = 'set_value'
    CATEGORY = icons.get('Comfyroll/Utils/Conditional')

    def set_value(self, boolean, value_if_true, value_if_false):
        show_help = 'https://github.com/Suzie1/ComfyUI_Comfyroll_CustomNodes/wiki/Other-Nodes#cr-set-value-on-boolean'
        if boolean == True:
            return (int(value_if_true), value_if_true, show_help)
        else:
            return (int(value_if_false), value_if_false, show_help)
```