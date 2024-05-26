# Documentation
- Class name: WAS_Dictionary_New
- Category: WAS Suite/Text
- Output node: False
- Repo Ref: https://github.com/WASasquatch/was-node-suite-comfyui

WAS_Dictionary_New节点旨在高效地创建和管理字典。它便于向字典中添加键值对，并确保只有非空键被添加。此节点对于需要结构化数据表示和操作的应用程序至关重要。

# Input types
## Required
- key_1
    - 'key_1'参数是一个字符串，用作字典中的第一个键。它在定义字典结构中起着关键作用，对节点的操作至关重要，因为它决定了与之关联值的唯一标识符。
    - Comfy dtype: STRING
    - Python dtype: str
- value_1
    - 'value_1'参数保存字典中'key_1'对应的值。它很重要，因为它存储与键关联的数据，并且它的包含为字典增添了有意义的内容。
    - Comfy dtype: STRING
    - Python dtype: str
## Optional
- key_2
    - 'key_2'参数是一个可选的字符串，可以用作字典中的另一个键。它在数据结构化中提供灵活性，并允许字典内更复杂的数据关系。
    - Comfy dtype: STRING
    - Python dtype: str
- value_2
    - 'value_2'参数是字典中'key_2'对应的值。它很重要，因为它有助于字典中存储的总体数据，增强了其在各种应用中的实用性。
    - Comfy dtype: STRING
    - Python dtype: str
- key_3
    - 'key_3'参数是另一个可选的键，可以包含在字典中。它扩展了字典存储不同信息的能力，满足了更复杂的数据管理需求。
    - Comfy dtype: STRING
    - Python dtype: str
- value_3
    - 'value_3'参数对应于字典中'key_3'的值。它的存在增加了字典内容的丰富性，允许对数据进行更详细的表示。
    - Comfy dtype: STRING
    - Python dtype: str
- key_4
    - 'key_4'参数是另一个可以添加到字典中的可选键。它增强了节点处理各种数据输入的能力，适应了多样化的数据集。
    - Comfy dtype: STRING
    - Python dtype: str
- value_4
    - 'value_4'参数是字典中'key_4'的关联值。对于完成数据对并确保字典能够表示广泛的信息至关重要。
    - Comfy dtype: STRING
    - Python dtype: str
- key_5
    - 'key_5'参数是可以提供给字典的最后一个可选键。它为字典内的数据分类提供了额外的选项，支持全面的数据组织。
    - Comfy dtype: STRING
    - Python dtype: str
- value_5
    - 'value_5'参数是与字典中'key_5'相关联的值。它对数据对的完整性很重要，并在字典的整体数据完整性中发挥作用。
    - Comfy dtype: STRING
    - Python dtype: str

# Output types
- dictionary
    - 'dictionary'输出是通过节点操作添加到字典中的键值对集合。它代表了由输入参数产生的结构化数据，对于进一步的数据处理和分析至关重要。
    - Comfy dtype: DICT
    - Python dtype: Dict[str, str]

# Usage tips
- Infra type: CPU

# Source code
```
class WAS_Dictionary_New:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'key_1': ('STRING', {'default': '', 'multiline': False}), 'value_1': ('STRING', {'default': '', 'multiline': False})}, 'optional': {'key_2': ('STRING', {'default': '', 'multiline': False}), 'value_2': ('STRING', {'default': '', 'multiline': False}), 'key_3': ('STRING', {'default': '', 'multiline': False}), 'value_3': ('STRING', {'default': '', 'multiline': False}), 'key_4': ('STRING', {'default': '', 'multiline': False}), 'value_4': ('STRING', {'default': '', 'multiline': False}), 'key_5': ('STRING', {'default': '', 'multiline': False}), 'value_5': ('STRING', {'default': '', 'multiline': False})}}
    RETURN_TYPES = ('DICT',)
    FUNCTION = 'dictionary_new'
    CATEGORY = 'WAS Suite/Text'

    def append_to_dictionary(self, dictionary, key, value):
        if key is not None and key != '':
            dictionary[key] = value
        return dictionary

    def dictionary_new(self, key_1, value_1, key_2, value_2, key_3, value_3, key_4, value_4, key_5, value_5):
        dictionary = {}
        dictionary = self.append_to_dictionary(dictionary, key_1, value_1)
        dictionary = self.append_to_dictionary(dictionary, key_2, value_2)
        dictionary = self.append_to_dictionary(dictionary, key_3, value_3)
        dictionary = self.append_to_dictionary(dictionary, key_4, value_4)
        dictionary = self.append_to_dictionary(dictionary, key_5, value_5)
        return (dictionary,)
```