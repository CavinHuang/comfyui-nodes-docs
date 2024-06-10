# Documentation
- Class name: CR_SimpleList
- Category: Comfyroll/List
- Output node: False
- Repo Ref: https://github.com/RockOfFire/ComfyUI_Comfyroll_CustomNodes

CR_SimpleList 节点旨在处理和操作字符串列表。其主要功能是对提供的列表值执行交叉连接操作，有效地以各种方式组合元素。该节点旨在简化列表操作过程，为用户提供一个与列表数据交互的直接界面。

# Input types
## Required
- list_values
    - list_values 参数至关重要，因为它是节点处理的输入列表。它应该是一个包含多行的字符串，其中每一行代表列表中的一个单独元素。节点利用此参数执行其交叉连接功能。
    - Comfy dtype: STRING
    - Python dtype: str

# Output types
- LIST
    - LIST 输出参数代表由节点的 cross_join 函数处理后的列表。它是经过处理的字符串列表，已经去除了首尾空白字符，并过滤掉了任何空行。
    - Comfy dtype: STRING
    - Python dtype: List[str]
- show_help
    - show_help 输出提供了一个文档的 URL 链接以供进一步帮助。它是一个包含网址的字符串，用户可以在该网址找到有关如何使用 CR_SimpleList 节点及其特性的更多信息。
    - Comfy dtype: STRING
    - Python dtype: str

# Usage tips
- Infra type: CPU

# Source code
```
class CR_SimpleList:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'list_values': ('STRING', {'multiline': True, 'default': 'text'})}}
    RETURN_TYPES = (any_type, 'STRING')
    RETURN_NAMES = ('LIST', 'show_help')
    OUTPUT_IS_LIST = (True, False)
    FUNCTION = 'cross_join'
    CATEGORY = icons.get('Comfyroll/List')

    def cross_join(self, list_values):
        lines = list_values.split('\n')
        list_out = [i.strip() for i in lines if i.strip()]
        show_help = 'https://github.com/Suzie1/ComfyUI_Comfyroll_CustomNodes/wiki/List-Nodes#cr-simple-list'
        return (list_out, show_help)
```