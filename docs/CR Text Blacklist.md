# Documentation
- Class name: CR_TextBlacklist
- Category: Comfyroll/Utils/Text
- Output node: False
- Repo Ref: https://github.com/RockOfFire/ComfyUI_Comfyroll_CustomNodes

CR_TextBlacklist 是一个文本处理工具节点，用于通过替换指定的黑名单词汇来净化文本内容，使其符合内容规范或个人偏好。

# Input types
## Required
- text
    - 参数 'text' 是节点要处理的输入文本。它至关重要，因为它是将被扫描以查找黑名单词汇并可能被修改的内容。
    - Comfy dtype: STRING
    - Python dtype: str
- blacklist_words
    - 参数 'blacklist_words' 包含输入文本中需要被替换的词汇。参数中的每行代表一个要加入黑名单的单独词汇。
    - Comfy dtype: STRING
    - Python dtype: str
## Optional
- replacement_text
    - 参数 'replacement_text' 指定了将用于替换输入中发现的任何黑名单词汇的文本。它提供了一种自定义输出文本以满足特定需求的方式。
    - Comfy dtype: STRING
    - Python dtype: str

# Output types
- STRING
    - CR_TextBlacklist 节点的输出是已修改的文本，其中黑名单词汇已被指定替换。它代表了文本处理操作的最终结果。
    - Comfy dtype: STRING
    - Python dtype: str
- show_help
    - 参数 'show_help' 提供了一个文档的 URL 链接，以获取关于节点使用方面的进一步帮助或信息。
    - Comfy dtype: STRING
    - Python dtype: str

# Usage tips
- Infra type: CPU

# Source code
```
class CR_TextBlacklist:

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'text': ('STRING', {'multiline': True, 'default': '', 'forceInput': True}), 'blacklist_words': ('STRING', {'multiline': True, 'default': ''})}, 'optional': {'replacement_text': ('STRING', {'multiline': False, 'default': ''})}}
    RETURN_TYPES = (any_type, 'STRING')
    RETURN_NAMES = ('STRING', 'show_help')
    FUNCTION = 'replace_text'
    CATEGORY = icons.get('Comfyroll/Utils/Text')

    def replace_text(self, text, blacklist_words, replacement_text=''):
        show_help = 'https://github.com/Suzie1/ComfyUI_Comfyroll_CustomNodes/wiki/List-Nodes#cr-text-blacklist'
        text_out = text
        for line in blacklist_words.split('\n'):
            if line.strip():
                text_out = text_out.replace(line.strip(), replacement_text)
        return (text_out, show_help)
```