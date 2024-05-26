# Documentation
- Class name: SeargePromptCombiner
- Category: Searge/_deprecated_/Prompting
- Output node: False
- Repo Ref: https://github.com/jobunk/SeargeSDXL.git

该节点促进了两个文本提示的连接，通过将其与所需格式对齐，增强了后续处理的输入数据。

# Input types
## Required
- prompt1
    - 第一个文本提示，作为组合过程的初始输入。
    - Comfy dtype: STRING
    - Python dtype: str
- separator
    - 用于区分两个提示之间的字符串，确保它们以结构化的方式结合。
    - Comfy dtype: STRING
    - Python dtype: str
- prompt2
    - 第二个文本提示，将与第一个提示连接，有助于形成最终的组合提示。
    - Comfy dtype: STRING
    - Python dtype: str

# Output types
- combined prompt
    - 两个输入组合后的最终提示，准备进行进一步处理。
    - Comfy dtype: STRING
    - Python dtype: str

# Usage tips
- Infra type: CPU

# Source code
```
class SeargePromptCombiner:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'prompt1': ('STRING', {'default': '', 'multiline': True}), 'separator': ('STRING', {'default': ', ', 'multiline': False}), 'prompt2': ('STRING', {'default': '', 'multiline': True})}}
    RETURN_TYPES = ('STRING',)
    RETURN_NAMES = ('combined prompt',)
    FUNCTION = 'get_value'
    CATEGORY = 'Searge/_deprecated_/Prompting'

    def get_value(self, prompt1, separator, prompt2):
        len1 = len(prompt1)
        len2 = len(prompt2)
        prompt = ''
        if len1 > 0 and len2 > 0:
            prompt = prompt1 + separator + prompt2
        elif len1 > 0:
            prompt = prompt1
        elif len2 > 0:
            prompt = prompt2
        return (prompt,)
```