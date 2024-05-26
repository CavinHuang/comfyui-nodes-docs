# Documentation
- Class name: WAS_Text_List
- Category: WAS Suite/Text
- Output node: False
- Repo Ref: https://github.com/WASasquatch/was-node-suite-comfyui

该节点将输入的文本字符串组织并结构化为统一的列表格式，便于后续对文本数据的处理和分析。

# Input types
## Required
- text_a
    - 第一个文本输入对于节点的运行至关重要，因为它提供了列表形成的初始数据。
    - Comfy dtype: STRING
    - Python dtype: str
## Optional
- text_b
    - 额外的文本输入进一步丰富了列表，允许进行更全面的文本分析。
    - Comfy dtype: STRING
    - Python dtype: Optional[str]
- text_c
    - 后续的文本输入增加了文本列表的多样性，增强了其在各种文本处理场景中的实用性。
    - Comfy dtype: STRING
    - Python dtype: Optional[str]
- text_d
    - 更多的文本输入扩展了节点的能力，适应了更广泛的文本数据集。
    - Comfy dtype: STRING
    - Python dtype: Optional[str]
- text_e
    - 额外的文本输入确保节点可以处理多种多样的文本输入，增加了其灵活性。
    - Comfy dtype: STRING
    - Python dtype: Optional[str]
- text_f
    - 多个文本输入的存在突显了节点有效管理复杂文本数据的能力。
    - Comfy dtype: STRING
    - Python dtype: Optional[str]
- text_g
    - 包含更多的文本输入展示了节点扩展和适应各种文本处理需求的能力。
    - Comfy dtype: STRING
    - Python dtype: Optional[str]

# Output types
- list_of_texts
    - 输出是一个整合后的文本字符串列表，为进一步的分析和处理提供了结构化的格式。
    - Comfy dtype: LIST
    - Python dtype: List[str]

# Usage tips
- Infra type: CPU

# Source code
```
class WAS_Text_List:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {}, 'optional': {'text_a': ('STRING', {'forceInput': True}), 'text_b': ('STRING', {'forceInput': True}), 'text_c': ('STRING', {'forceInput': True}), 'text_d': ('STRING', {'forceInput': True}), 'text_e': ('STRING', {'forceInput': True}), 'text_f': ('STRING', {'forceInput': True}), 'text_g': ('STRING', {'forceInput': True})}}
    RETURN_TYPES = ('LIST',)
    FUNCTION = 'text_as_list'
    CATEGORY = 'WAS Suite/Text'

    def text_as_list(self, **kwargs):
        text_list: list[str] = []
        for k in sorted(kwargs.keys()):
            v = kwargs[k]
            if isinstance(v, str):
                text_list.append(v)
        return (text_list,)
```