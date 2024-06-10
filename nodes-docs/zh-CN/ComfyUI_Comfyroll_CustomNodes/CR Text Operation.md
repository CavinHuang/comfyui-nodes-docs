# Documentation
- Class name: CR_TextOperation
- Category: Comfyroll/Utils/Text
- Output node: False
- Repo Ref: https://github.com/RockOfFire/ComfyUI_Comfyroll_CustomNodes

CR_TextOperation 节点旨在执行多种文本操作。它接受一个字符串输入，并应用指定的操作，例如将文本转换为大写、小写或首字母大写。该节点还处理更复杂的操作，如反转大小写、反转文本、修剪空白和完全删除空格。它是工作流中预处理和转换文本数据的多功能工具。

# Input types
## Required
- text
    - ‘text’参数是节点的主要输入，对于所有文本操作都是必不可少的。它决定了将根据所选操作进行操作的数据。节点的功能直接与所提供文本的内容和格式相关联。
    - Comfy dtype: STRING
    - Python dtype: str
- operation
    - ‘operation’参数指示要执行的特定文本操作。它是一个关键组件，因为它定义了将应用于输入文本的转换类型，影响节点的最终输出。
    - Comfy dtype: COMBO['uppercase', 'lowercase', 'capitalize', 'invert_case', 'reverse', 'trim', 'remove_spaces']
    - Python dtype: str

# Output types
- STRING
    - ‘STRING’输出参数表示文本操作的结果。它是在应用了指定操作之后转换后的文本，展示了节点的操作能力。
    - Comfy dtype: STRING
    - Python dtype: str
- show_help
    - ‘show_help’输出提供文档的URL链接，以供进一步帮助。对于寻求有关节点操作或故障排除的更多信息的用户来说，它特别有用。
    - Comfy dtype: STRING
    - Python dtype: str

# Usage tips
- Infra type: CPU

# Source code
```
class CR_TextOperation:

    @classmethod
    def INPUT_TYPES(cls):
        operations = ['uppercase', 'lowercase', 'capitalize', 'invert_case', 'reverse', 'trim', 'remove_spaces']
        return {'required': {'text': ('STRING', {'multiline': False, 'default': '', 'forceInput': True}), 'operation': (operations,)}}
    RETURN_TYPES = (any_type, 'STRING')
    RETURN_NAMES = ('STRING', 'show_help')
    FUNCTION = 'text_operation'
    CATEGORY = icons.get('Comfyroll/Utils/Text')

    def text_operation(self, text, operation):
        show_help = 'https://github.com/Suzie1/ComfyUI_Comfyroll_CustomNodes/wiki/List-Nodes#cr-text_operation'
        if operation == 'uppercase':
            text_out = text.upper()
        elif operation == 'lowercase':
            text_out = text.lower()
        elif operation == 'capitalize':
            text_out = text.capitalize()
        elif operation == 'invert_case':
            text_out = text.swapcase()
        elif operation == 'reverse':
            text_out = text[::-1]
        elif operation == 'trim':
            text_out = text.strip()
        elif operation == 'remove_spaces':
            text_out = text.replace(' ', '')
        else:
            return 'CR Text Operation: Invalid operation.'
        return (text_out, show_help)
```