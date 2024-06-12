# Documentation
- Class name: CR_StringToBoolean
- Category: Comfyroll/Utils/Conversion
- Output node: False
- Repo Ref: https://github.com/RockOfFire/ComfyUI_Comfyroll_CustomNodes

CR_StringToBoolean 节点旨在将布尔值的字符串表示转换为相应的布尔数据类型。它在数据预处理中扮演着关键角色，通过确保工作流程中布尔信息的准确性，促进了文本输入与基于布尔的决策过程的无缝集成。

# Input types
## Required
- text
    - ‘text’参数对于节点的操作至关重要，因为它表示需要转换为布尔值的字符串。正确输入对于节点有效运行和产生准确的布尔输出至关重要。
    - Comfy dtype: STRING
    - Python dtype: str

# Output types
- BOOLEAN
    - ‘BOOLEAN’输出提供了从输入文本派生的转换后的布尔值。它很重要，因为它直接影响依赖工作流程中布尔逻辑的后续操作。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool
- show_help
    - ‘show_help’输出提供了指向节点文档页面的URL链接，这对于寻求如何有效使用节点的额外指导或信息的用户来说可能很有用。
    - Comfy dtype: STRING
    - Python dtype: str

# Usage tips
- Infra type: CPU

# Source code
```
class CR_StringToBoolean:

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'text': ('STRING', {'multiline': False, 'default': '', 'forceInput': True})}}
    RETURN_TYPES = ('BOOLEAN', 'STRING')
    RETURN_NAMES = ('BOOLEAN', 'show_help')
    FUNCTION = 'convert'
    CATEGORY = icons.get('Comfyroll/Utils/Conversion')

    def convert(self, text):
        show_help = 'https://github.com/Suzie1/ComfyUI_Comfyroll_CustomNodes/wiki/Conversion-Nodes#cr-string-to-boolean'
        if text == 'True' or text == 'true':
            boolean_out = True
        if text == 'False' or text == 'false':
            boolean_out = False
        else:
            pass
        return (boolean_out, show_help)
```