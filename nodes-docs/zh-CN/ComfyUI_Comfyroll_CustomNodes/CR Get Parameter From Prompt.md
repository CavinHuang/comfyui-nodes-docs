# Documentation
- Class name: CR_GetParameterFromPrompt
- Category: Comfyroll/Utils/Other
- Output node: False
- Repo Ref: https://github.com/RockOfFire/ComfyUI_Comfyroll_CustomNodes

CR_GetParameterFromPrompt 节点旨在从给定的提示字符串中提取特定参数。它在提示中搜索指定的搜索字符串，并在找到它时尝试解析随后的值。该节点特别适用于处理嵌入在文本字符串中的配置设置或参数，提供了一种灵活的方式来管理和检索信息。

# Input types
## Required
- prompt
    - prompt 参数是一个包含节点将搜索并提取参数的文本的字符串。它对节点的操作至关重要，因为它定义了要解析的数据的上下文和来源。
    - Comfy dtype: STRING
    - Python dtype: str
## Optional
- search_string
    - search_string 参数定义了节点将在提示中查找的特定关键字或模式。它在识别要提取的参数中起着关键作用，允许进行有针对性的数据检索。
    - Comfy dtype: STRING
    - Python dtype: str

# Output types
- prompt
    - 修改后的提示，已识别的参数及其值已被移除，允许输出一个没有被搜索参数的清洁文本。
    - Comfy dtype: STRING
    - Python dtype: str
- text
    - 与搜索字符串关联的提取值，可以是字符串、数字或布尔值，具体取决于在提示中找到的格式。
    - Comfy dtype: STRING
    - Python dtype: Union[str, int, float, bool]
- float
    - 如果提取的值是数值，则将其转换为浮点数，以便进行进一步的数值运算或分析。
    - Comfy dtype: FLOAT
    - Python dtype: float
- boolean
    - 提取值的布尔表示，根据找到的内容提供直接的真或假解释。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool
- show_help
    - 指向节点文档或帮助页面的 URL 链接，为用户提供有关如何有效使用节点的额外信息或指导。
    - Comfy dtype: STRING
    - Python dtype: str

# Usage tips
- Infra type: CPU

# Source code
```
class CR_GetParameterFromPrompt:

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'prompt': ('STRING', {'multiline': True, 'default': 'prompt', 'forceInput': True}), 'search_string': ('STRING', {'multiline': False, 'default': '!findme'})}}
    RETURN_TYPES = ('STRING', any_type, 'FLOAT', 'BOOLEAN', 'STRING')
    RETURN_NAMES = ('prompt', 'text', 'float', 'boolean', 'show_help')
    FUNCTION = 'get_string'
    CATEGORY = icons.get('Comfyroll/Utils/Other')

    def get_string(self, prompt, search_string):
        show_help = 'https://github.com/Suzie1/ComfyUI_Comfyroll_CustomNodes/wiki/Other-Nodes#cr-find-string-in-prompt'
        return_string = ''
        return_value = 0
        return_boolean = False
        return_prompt = prompt
        index = prompt.find(search_string)
        if index != -1:
            if prompt[index + len(search_string)] == '=':
                if prompt[index + len(search_string) + 1] == '"':
                    start_quote = index + len(search_string) + 2
                    end_quote = prompt.find('"', start_quote + 1)
                    if end_quote != -1:
                        return_string = prompt[start_quote:end_quote]
                        print(return_string)
                else:
                    space_index = prompt.find(' ', index + len(search_string))
                    if space_index != -1:
                        return_string = prompt[index + len(search_string):space_index]
                    else:
                        return_string = prompt[index + len(search_string):]
            else:
                return_string = search_string[1:]
        if return_string == '':
            return (return_prompt, return_string, return_value, return_boolean, show_help)
        if return_string.startswith('='):
            return_string = return_string[1:]
        return_boolean = return_string.lower() == 'true'
        try:
            return_value = int(return_string)
        except ValueError:
            try:
                return_value = float(return_string)
            except ValueError:
                return_value = 0
        remove_string = ' ' + search_string + '=' + return_string
        return_prompt = prompt.replace(remove_string, '')
        return (return_prompt, return_string, return_value, return_boolean, show_help)
```