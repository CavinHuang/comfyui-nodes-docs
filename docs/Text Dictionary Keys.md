# Documentation
- Class name: WAS_Dictionary_Keys
- Category: WAS Suite/Text
- Output node: False
- Repo Ref: https://github.com/WASasquatch/was-node-suite-comfyui

WAS_Dictionary_Keys节点旨在从一个给定的字典中提取键。它在数据处理工作流中作为一个基本组件，用于在进一步分析或操作数据结构之前识别字典键。

# Input types
## Required
- dictionary
    - 参数'dictionary'对于节点的运行至关重要，因为它是将从中提取键的来源。这是一个关键的输入，它通过确定被识别的键集直接影响节点的输出。
    - Comfy dtype: DICT
    - Python dtype: Dict[Any, Any]

# Output types
- keys
    - 输出参数'keys'代表从输入字典中提取的键集合。它很重要，因为它为任何需要了解字典结构而不涉及相关值的后续操作提供了基础。
    - Comfy dtype: LIST
    - Python dtype: List[Any]

# Usage tips
- Infra type: CPU

# Source code
```
class WAS_Dictionary_Keys:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'dictionary': ('DICT',)}, 'optional': {}}
    RETURN_TYPES = ('LIST',)
    FUNCTION = 'dictionary_keys'
    CATEGORY = 'WAS Suite/Text'

    def dictionary_keys(self, dictionary):
        return (dictionary.keys(),)
```