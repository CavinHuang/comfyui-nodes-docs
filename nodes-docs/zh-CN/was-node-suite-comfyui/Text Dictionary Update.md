# Documentation
- Class name: WAS_Dictionary_Update
- Category: WAS Suite/Text
- Output node: False
- Repo Ref: https://github.com/WASasquatch/was-node-suite-comfyui

‘dictionary_update’方法旨在将多个字典合并为一个。它接受字典作为输入，并将它们的键值对组合起来，确保生成的字典是所有输入的全面表示。此方法对于需要将不同来源的数据聚合到一个统一结构中应用程序至关重要。

# Input types
## Required
- dictionary_a
    - ‘dictionary_a’参数是要合并的第一个字典。它在结果字典的初始形成中起着关键作用。这个字典的内容与其他字典结合，以实现最终输出。
    - Comfy dtype: DICT
    - Python dtype: Dict[Any, Any]
- dictionary_b
    - ‘dictionary_b’参数是要合并的第二个字典。它通过将其键值对添加到聚合过程中，从而为结果字典的全面性做出贡献。
    - Comfy dtype: DICT
    - Python dtype: Dict[Any, Any]
## Optional
- dictionary_c
    - ‘dictionary_c’参数是可选的，可以包含在合并过程中的字典。如果提供，它的内容也被整合到最终字典中，通过额外的数据增强聚合。
    - Comfy dtype: DICT
    - Python dtype: Optional[Dict[Any, Any]]
- dictionary_d
    - ‘dictionary_d’参数是另一个可选字典，可用于进一步丰富合并后的字典。其包含基于应用程序的具体需求和所需的数据聚合级别。
    - Comfy dtype: DICT
    - Python dtype: Optional[Dict[Any, Any]]

# Output types
- return_dictionary
    - 'return_dictionary'是'dictionary_update'方法的输出，代表了所有输入字典的合并结果。在需要统一视图的组合数据源的应用程序中，它是关键组件。
    - Comfy dtype: DICT
    - Python dtype: Dict[Any, Any]

# Usage tips
- Infra type: CPU

# Source code
```
class WAS_Dictionary_Update:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'dictionary_a': ('DICT',), 'dictionary_b': ('DICT',)}, 'optional': {'dictionary_c': ('DICT',), 'dictionary_d': ('DICT',)}}
    RETURN_TYPES = ('DICT',)
    FUNCTION = 'dictionary_update'
    CATEGORY = 'WAS Suite/Text'

    def dictionary_update(self, dictionary_a, dictionary_b, dictionary_c=None, dictionary_d=None):
        return_dictionary = {**dictionary_a, **dictionary_b}
        if dictionary_c is not None:
            return_dictionary = {**return_dictionary, **dictionary_c}
        if dictionary_d is not None:
            return_dictionary = {**return_dictionary, **dictionary_d}
        return (return_dictionary,)
```