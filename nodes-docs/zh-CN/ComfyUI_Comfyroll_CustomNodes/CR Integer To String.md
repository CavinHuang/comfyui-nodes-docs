# Documentation
- Class name: CR_IntegerToString
- Category: Comfyroll/Utils/Conversion
- Output node: False
- Repo Ref: https://github.com/RockOfFire/ComfyUI_Comfyroll_CustomNodes

CR_IntegerToString节点旨在将整数值无缝转换为相应的字符串表示形式。在需要将数值数据以文本格式解释或显示的场景中，此转换过程至关重要。该节点在数据操作和转换任务中发挥关键作用，确保从数值到文本形式的转换准确可靠。

# Input types
## Required
- int_
    - ‘int_’参数是节点的核心输入，代表需要转换为字符串的整数值。它的转换对节点的操作至关重要，因为它直接影响输出和数据的后续处理。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- STRING
    - ‘STRING’输出参数代表输入整数的字符串形式。它是节点转换过程的主要结果，标志着数值数据成功转换为人类可读的格式。
    - Comfy dtype: STRING
    - Python dtype: str
- show_help
    - ‘show_help’输出提供文档的URL链接，以供进一步帮助。它是用户寻求有关节点功能和用法的更多信息的有用资源。
    - Comfy dtype: STRING
    - Python dtype: str

# Usage tips
- Infra type: CPU

# Source code
```
class CR_IntegerToString:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'int_': ('INT', {'default': 0, 'min': 0, 'max': 18446744073709551615, 'forceInput': True})}}
    RETURN_TYPES = ('STRING', 'STRING')
    RETURN_NAMES = ('STRING', 'show_help')
    FUNCTION = 'convert'
    CATEGORY = icons.get('Comfyroll/Utils/Conversion')

    def convert(self, int_):
        show_help = 'https://github.com/Suzie1/ComfyUI_Comfyroll_CustomNodes/wiki/Conversion-Nodes#cr-integer-to-string'
        return (f'{int_}', show_help)
```