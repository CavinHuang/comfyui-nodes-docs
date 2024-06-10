# Documentation
- Class name: CR_FloatToString
- Category: Comfyroll/Utils/Conversion
- Output node: False
- Repo Ref: https://github.com/RockOfFire/ComfyUI_Comfyroll_CustomNodes

CR_FloatToString节点旨在将浮点数转换为它们的字符串表示形式。这种转换对于各种需要以文本格式显示或处理数值数据的应用场景至关重要。该节点在数据预处理中扮演着核心角色，适用于生成报告、与需要文本输入的系统进行接口对接，或与存储数值数据为字符串的数据库进行集成等任务。

# Input types
## Required
- float_
    - 'float_'参数是一个浮点数，节点将将其转换为字符串。这是一个基本输入，因为节点的全部操作都围绕这个数值进行。转换过程确保数值数据可以在需要字符串格式的上下文中使用。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- STRING
    - 'STRING'输出提供了输入浮点数的字符串表示。这个输出很重要，因为它是节点操作的主要结果，允许用户在后续的流程或应用中使用转换后的字符串。
    - Comfy dtype: STRING
    - Python dtype: str
- show_help
    - 'show_help'输出是一个URL字符串，它将用户指向节点的帮助文档。它作为用户需要额外信息或有效使用节点的指导时的便捷参考。
    - Comfy dtype: STRING
    - Python dtype: str

# Usage tips
- Infra type: CPU

# Source code
```
class CR_FloatToString:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'float_': ('FLOAT', {'default': 0.0, 'min': 0.0, 'max': 1000000.0, 'forceInput': True})}}
    RETURN_TYPES = ('STRING', 'STRING')
    RETURN_NAMES = ('STRING', 'show_help')
    FUNCTION = 'convert'
    CATEGORY = icons.get('Comfyroll/Utils/Conversion')

    def convert(self, float_):
        show_help = 'https://github.com/Suzie1/ComfyUI_Comfyroll_CustomNodes/wiki/Conversion-Nodes#cr-float-to-string'
        return (f'{float_}', show_help)
```