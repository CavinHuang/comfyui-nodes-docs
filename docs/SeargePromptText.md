# Documentation
- Class name: SeargePromptText
- Category: Searge/_deprecated_/Prompting
- Output node: False
- Repo Ref: https://github.com/jobunk/SeargeSDXL.git

SeargePromptText节点旨在管理和处理文本提示。它在一个需要文本输入以生成或修改内容的系统中使用。该节点的主要功能是检索和提供提示，可以作为进一步处理的基础，或作为输入提供给系统中的其他节点。

# Input types
## Required
- prompt
    - 对于SeargePromptText节点来说，'prompt'参数是处理的关键元素，它定义了节点将处理的文本输入。预期它是一个字符串，可能包含多行文本，从而能够输入复杂和详细的指令或信息。
    - Comfy dtype: STRING
    - Python dtype: str

# Output types
- prompt
    - 输出'prompt'是输入到SeargePromptText节点的已处理或原始文本。它作为可以影响后续操作或被用作对查询的直接响应的基础数据片段。
    - Comfy dtype: STRING
    - Python dtype: str

# Usage tips
- Infra type: CPU

# Source code
```
class SeargePromptText:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'prompt': ('STRING', {'default': '', 'multiline': True})}}
    RETURN_TYPES = ('STRING',)
    RETURN_NAMES = ('prompt',)
    FUNCTION = 'get_value'
    CATEGORY = 'Searge/_deprecated_/Prompting'

    def get_value(self, prompt):
        return (prompt,)
```