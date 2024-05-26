# Documentation
- Class name: CR_Repeater
- Category: Comfyroll/List/Utils
- Output node: False
- Repo Ref: https://github.com/RockOfFire/ComfyUI_Comfyroll_CustomNodes

CR_Repeater 是一个实用工具节点，旨在将列表中的项重复指定的次数。它接收一个项列表和一个表示重复次数的整数，然后输出一个新列表，其中每个项根据给定的计数重复。这个节点特别适用于需要多次处理相同数据而不改变原始列表的场景。

# Input types
## Required
- input_data
    - ‘input_data’参数代表要重复的项列表。它是节点操作的基本部分，因为它决定了将要生成的新列表的内容。这个参数的影响是直接的，因为它决定了将重复什么，从而影响最终的输出列表。
    - Comfy dtype: any_type
    - Python dtype: List[Any]
- repeats
    - ‘repeats’参数指定‘input_data’列表中每个项应该重复的次数。它是一个关键元素，因为它直接影响输出列表的长度。‘repeats’的值必须是一个正整数，确保重复过程是有意义的，并且输出列表正确形成。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- list
    - ‘list’输出参数是重复过程的结果，包含从‘input_data’重复‘repeats’次的每个项。它很重要，因为它代表了原始列表的转换版本，这是节点功能的主要目标。
    - Comfy dtype: STRING
    - Python dtype: List[str]
- show_help
    - ‘show_help’输出提供了一个URL链接到与CR_Repeater节点相关联的文档或帮助页面。它作为用户寻求有关如何有效使用节点的更多信息或帮助的快速参考。
    - Comfy dtype: STRING
    - Python dtype: str

# Usage tips
- Infra type: CPU

# Source code
```
class CR_Repeater:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'input_data': (any_type,), 'repeats': ('INT', {'default': 1, 'min': 1, 'max': 99999})}}
    RETURN_TYPES = (any_type, 'STRING')
    RETURN_NAMES = ('list', 'show_help')
    OUTPUT_IS_LIST = (True, False)
    FUNCTION = 'repeat_list_items'
    CATEGORY = icons.get('Comfyroll/List/Utils')

    def repeat_list_items(self, input_data, repeats):
        show_help = 'https://github.com/Suzie1/ComfyUI_Comfyroll_CustomNodes/wiki/List-Nodes#cr-repeater'
        new_list = []
        if isinstance(input_data, list):
            new_list = []
            for item in input_data:
                new_list.extend([item] * repeats)
            return (new_list, show_help)
        else:
            return ([input_data] * repeats, show_help)
```