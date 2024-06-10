# Documentation
- Class name: CR_Value
- Category: Comfyroll/Utils/Other
- Output node: False
- Repo Ref: https://github.com/RockOfFire/ComfyUI_Comfyroll_CustomNodes

CR_Value节点旨在提供一个多功能的接口，用于将输入值转换为不同的数据类型。它强调数据操作的灵活性和实用性，允许用户从单一输入中提取数值和文本表示，从而增强节点在各种工作流程中的适应性。

# Input types
## Required
- value
    - ‘value’参数至关重要，因为它是节点转换过程的主要输入。它是派生浮点数和整数表示的来源，使其成为节点操作中的基本元素。
    - Comfy dtype: FLOAT
    - Python dtype: Union[float, str]

# Output types
- FLOAT
    - ‘FLOAT’输出提供了输入值的浮点表示，这对于需要精确小数值的数值计算和分析非常有用。
    - Comfy dtype: FLOAT
    - Python dtype: float
- INT
    - ‘INT’输出提供了输入值的整数形式，适用于只需要整数的情况，从而简化了计算并降低了复杂性。
    - Comfy dtype: INT
    - Python dtype: int
- show_help
    - ‘show_help’输出提供了指向节点文档的URL链接，对于寻求有关节点功能额外指导或信息的用户来说非常有用。
    - Comfy dtype: STRING
    - Python dtype: str

# Usage tips
- Infra type: CPU

# Source code
```
class CR_Value:

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'value': ('FLOAT', {'default': 1.0})}}
    RETURN_TYPES = ('FLOAT', 'INT', 'STRING')
    RETURN_NAMES = ('FLOAT', 'INT', 'show_help')
    CATEGORY = icons.get('Comfyroll/Utils/Other')
    FUNCTION = 'get_value'

    def get_value(self, value):
        show_help = 'https://github.com/Suzie1/ComfyUI_Comfyroll_CustomNodes/wiki/Other-Nodes#cr-value'
        return (float(value), int(value), show_help)
```