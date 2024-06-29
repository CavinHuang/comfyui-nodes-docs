# Documentation
- Class name: WAS_Dictionary_Get
- Category: WAS Suite/Text
- Output node: False
- Repo Ref: https://github.com/WASasquatch/was-node-suite-comfyui

WAS_Dictionary_Get节点旨在根据给定的键从一个字典中检索特定的条目。它在数据提取和操作过程中扮演着至关重要的角色，提供了一种流线化的方式来访问和使用工作流中的字典值。

# Input types
## Required
- dictionary
    - 字典参数对于节点的操作至关重要，因为它是将检索键值的来源。这是一个关键组件，直接影响节点的输出。
    - Comfy dtype: DICT
    - Python dtype: Dict[Any, Any]
- key
    - 键参数用于指定节点将访问的字典中的特定条目。它的存在对于节点正确运行至关重要，并且可以确定所需的确切数据。
    - Comfy dtype: STRING
    - Python dtype: str
## Optional
- default_value
    - default_value参数被提供为在指定的键在字典中不存在的情况下的备选选项。它确保节点可以优雅地处理这种情况，并在不中断的情况下继续工作流程。
    - Comfy dtype: STRING
    - Python dtype: str

# Output types
- value
    - 值输出参数表示使用指定的键从字典中检索到的数据。它很重要，因为它是节点操作的直接结果，并且可以用于工作流中的进一步处理。
    - Comfy dtype: TEXT
    - Python dtype: str

# Usage tips
- Infra type: CPU

# Source code
```
class WAS_Dictionary_Get:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'dictionary': ('DICT',), 'key': ('STRING', {'default': '', 'multiline': False})}, 'optional': {'default_value': ('STRING', {'default': '', 'multiline': False})}}
    RETURN_TYPES = (TEXT_TYPE,)
    FUNCTION = 'dictionary_get'
    CATEGORY = 'WAS Suite/Text'

    def dictionary_get(self, dictionary, key, default_value=''):
        return (str(dictionary.get(key, default_value)),)
```