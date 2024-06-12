# Documentation
- Class name: WAS_Dictionary_to_Text
- Category: WAS Suite/Text
- Output node: False
- Repo Ref: https://github.com/WASasquatch/was-node-suite-comfyui

WAS_Dictionary_to_Text节点旨在将给定的字典转换为文本表示。它在将结构化数据转换为可读格式中发挥关键作用，这对于数据分析、报告和用户界面等多种应用至关重要。该节点简化了从复杂字典结构生成人类可读文本的过程，增强了数据呈现的整体工作流程。

# Input types
## Required
- dictionary
    - ‘dictionary’参数对于节点的操作至关重要，因为它是节点处理以生成文本的主要输入。它是数据的结构化表示，节点将解释并将其转换为文本格式。输出文本的质量严重依赖于输入字典的结构和内容。
    - Comfy dtype: DICT
    - Python dtype: Dict[str, Any]

# Output types
- text
    - ‘text’输出是节点转换过程的结果，它接收输入字典并生成文本表示。这个输出很重要，因为它提供了一个易于理解且可以在各种情境下使用的人类可读格式，如文档、通信或进一步数据处理。
    - Comfy dtype: TEXT_TYPE
    - Python dtype: str

# Usage tips
- Infra type: CPU

# Source code
```
class WAS_Dictionary_to_Text:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'dictionary': ('DICT',)}, 'optional': {}}
    RETURN_TYPES = (TEXT_TYPE,)
    FUNCTION = 'dictionary_to_text'
    CATEGORY = 'WAS Suite/Text'

    def dictionary_to_text(self, dictionary):
        return (str(dictionary),)
```