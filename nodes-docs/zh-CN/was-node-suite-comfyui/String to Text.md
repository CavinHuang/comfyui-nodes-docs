# Documentation
- Class name: WAS_String_To_Text
- Category: WAS Suite/Text/Operations
- Output node: False
- Repo Ref: https://github.com/WASasquatch/was-node-suite-comfyui

方法 `string_to_text` 旨在将给定的字符串转换成可以进一步处理或分析的文本格式。它在文本操作中扮演着关键角色，确保输入字符串被正确格式化以便于后续任务，例如文本分析或需要文本数据的机器学习模型。

# Input types
## Required
- string
    - 参数 'string' 是必需的，因为它代表了节点将处理的原始文本输入。其适当的格式化和内容显著影响节点将其转换成可用文本格式的能力。
    - Comfy dtype: STRING
    - Python dtype: str

# Output types
- text
    - 输出 'text' 是节点操作的结果，提供了从输入字符串转换而来的文本格式。它很重要，因为它是下游文本相关流程中使用的主要输出。
    - Comfy dtype: TEXT
    - Python dtype: str

# Usage tips
- Infra type: CPU

# Source code
```
class WAS_String_To_Text:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'string': ('STRING', {})}}
    RETURN_TYPES = (TEXT_TYPE,)
    FUNCTION = 'string_to_text'
    CATEGORY = 'WAS Suite/Text/Operations'

    def string_to_text(self, string):
        return (string,)
```