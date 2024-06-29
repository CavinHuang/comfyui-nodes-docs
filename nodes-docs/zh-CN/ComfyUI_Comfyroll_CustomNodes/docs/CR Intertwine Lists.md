# Documentation
- Class name: CR_IntertwineLists
- Category: Comfyroll/List/Utils
- Output node: False
- Repo Ref: https://github.com/RockOfFire/ComfyUI_Comfyroll_CustomNodes

CR_IntertwineLists 是一个实用工具节点，旨在将两个列表组合成单个列表，其中每个元素是输入列表中对应元素的连接。它用于将多个数据流交织成连贯的结构，促进复杂的数据操作和分析。

# Input types
## Required
- list1
    - list1 是将与第二个列表组合的第一个输入列表。它在节点的操作中起着至关重要的作用，因为它构成了最终组合列表的一半。
    - Comfy dtype: STRING
    - Python dtype: List[str]
- list2
    - list2 是将与第一个列表交织的第二个输入列表。它的重要性与 list1 相等，因为它补充了 list1，以创建一个具有组合元素的新列表。
    - Comfy dtype: STRING
    - Python dtype: List[str]

# Output types
- combined_list
    - 组合列表是节点的输出，它包含通过交织输入列表得到的元素。它很重要，因为它代表了用于进一步处理的综合数据结构。
    - Comfy dtype: STRING
    - Python dtype: List[str]
- show_help
    - show_help 输出提供了一个 URL 链接到文档，以获得进一步的帮助和指导，了解如何有效地使用该节点。
    - Comfy dtype: STRING
    - Python dtype: str

# Usage tips
- Infra type: CPU

# Source code
```
class CR_IntertwineLists:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'list1': ('STRING', {'multiline': True, 'default': '', 'forceInput': True}), 'list2': ('STRING', {'multiline': True, 'default': '', 'forceInput': True})}}
    RETURN_TYPES = ('STRING', 'STRING')
    RETURN_NAMES = ('STRING', 'show_help')
    OUTPUT_IS_LIST = (True, False)
    FUNCTION = 'make_list'
    CATEGORY = icons.get('Comfyroll/List/Utils')

    def make_list(self, list1, list2):
        show_help = 'https://github.com/Suzie1/ComfyUI_Comfyroll_CustomNodes/wiki/List-Nodes#cr-intertwine-lists'
        min_length = min(len(list1), len(list2))
        combined_list = []
        combined_element = str(list1) + ', ' + str(list2)
        combined_list.append(combined_element)
        return (combined_list, show_help)
```