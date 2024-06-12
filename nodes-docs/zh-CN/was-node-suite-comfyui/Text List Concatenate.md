# Documentation
- Class name: WAS_Text_List_Concatenate
- Category: WAS Suite/Text
- Output node: False
- Repo Ref: https://github.com/WASasquatch/was-node-suite-comfyui

WAS_Text_List_Concatenate节点旨在高效地将多个字符串列表合并为一个单一的统一列表。它在简化数据预处理工作流程中发挥着关键作用，特别是当处理来自不同来源且需要聚合以进行进一步处理或分析的文本数据时。

# Input types
## Required
- list_a
    - 'list_a'参数是一个字符串列表，它将与其他列表合并。它是节点的基本输入，因为它直接促成了最终合并列表的形成。
    - Comfy dtype: LIST
    - Python dtype: List[str]
## Optional
- list_b
    - 'list_b'参数是一个可选的字符串列表，它可以与主列表连接。它通过允许在最终列表中包含额外数据，增强了节点的灵活性。
    - Comfy dtype: LIST
    - Python dtype: Optional[List[str]]
- list_c
    - 'list_c'参数是用于连接的另一个可选字符串列表。它为节点提供了进一步的定制选项，使用户能够更精确地控制输出列表的组成。
    - Comfy dtype: LIST
    - Python dtype: Optional[List[str]]
- list_d
    - 'list_d'参数是另一个可以连接到合并列表的可选列表。它为用户提供了包括更多字符串的能力，进一步根据特定要求定制最终输出。
    - Comfy dtype: LIST
    - Python dtype: Optional[List[str]]

# Output types
- merged_list
    - 'merged_list'输出是连接所有输入列表的结果。它代表了可以用于后续操作或分析的组合文本数据。
    - Comfy dtype: LIST
    - Python dtype: List[str]

# Usage tips
- Infra type: CPU

# Source code
```
class WAS_Text_List_Concatenate:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {}, 'optional': {'list_a': ('LIST', {'forceInput': True}), 'list_b': ('LIST', {'forceInput': True}), 'list_c': ('LIST', {'forceInput': True}), 'list_d': ('LIST', {'forceInput': True})}}
    RETURN_TYPES = ('LIST',)
    FUNCTION = 'text_concatenate_list'
    CATEGORY = 'WAS Suite/Text'

    def text_concatenate_list(self, **kwargs):
        merged_list: list[str] = []
        for k in sorted(kwargs.keys()):
            v = kwargs[k]
            if isinstance(v, list):
                merged_list += v
        return (merged_list,)
```