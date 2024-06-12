# Documentation
- Class name: CR_TextList
- Category: Comfyroll/List
- Output node: False
- Repo Ref: https://github.com/RockOfFire/ComfyUI_Comfyroll_CustomNodes

CR_TextList节点旨在处理和操作文本数据，特别是用于从多行文本输入创建列表。它使用户能够根据起始索引和要包含的最大行数来选择文本行的子集，为Comfyroll框架内文本列表管理提供了一种简化的方法。

# Input types
## Required
- multiline_text
    - ‘multiline_text’参数是节点的主要输入，接受可能包含多行的文本块。它在确定将生成列表的源材料中起着关键作用。
    - Comfy dtype: STRING
    - Python dtype: str
## Optional
- start_index
    - ‘start_index’参数指定了文本中列表生成应开始的位置。它对于控制最终列表中包含的文本行的起始点很重要。
    - Comfy dtype: INT
    - Python dtype: int
- max_rows
    - ‘max_rows’参数设置了要包含在列表中的文本行数的限制。它对于定义节点处理和返回的文本数据的范围很重要。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- selected_rows
    - ‘selected_rows’输出包含根据输入参数选择的文本行。它代表了节点操作的核心结果，封装了处理后的文本数据。
    - Comfy dtype: STRING
    - Python dtype: List[str]
- show_help
    - ‘show_help’输出提供了一个URL链接到文档，以获取有关使用节点的进一步帮助或指导。对于寻求有关节点功能更多信息的用户来说，这是一个宝贵的资源。
    - Comfy dtype: STRING
    - Python dtype: str

# Usage tips
- Infra type: CPU

# Source code
```
class CR_TextList:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'multiline_text': ('STRING', {'multiline': True, 'default': 'text'}), 'start_index': ('INT', {'default': 0, 'min': 0, 'max': 9999}), 'max_rows': ('INT', {'default': 1000, 'min': 1, 'max': 9999})}}
    RETURN_TYPES = ('STRING', 'STRING')
    RETURN_NAMES = ('STRING', 'show_help')
    OUTPUT_IS_LIST = (True, False)
    FUNCTION = 'make_list'
    CATEGORY = icons.get('Comfyroll/List')

    def make_list(self, multiline_text, start_index, max_rows, loops):
        show_help = 'https://github.com/Suzie1/ComfyUI_Comfyroll_CustomNodes/wiki/Other-Nodes#cr-text-list'
        lines = multiline_text.split('\n')
        start_index = max(0, min(start_index, len(lines) - 1))
        end_index = min(start_index + max_rows, len(lines))
        selected_rows = lines[start_index:end_index]
        return (selected_rows, show_help)
```