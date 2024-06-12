# Documentation
- Class name: WAS_Text_List_to_Text
- Category: WAS Suite/Text
- Output node: False
- Repo Ref: https://github.com/WASasquatch/was-node-suite-comfyui

WAS_Text_List_to_Text节点旨在将一系列文本字符串合并为单个文本字符串。它通过在列表的每个元素之间插入指定的分隔符来实现这一点，有效地将它们合并为一个连贯的序列。在需要将多个文本输入汇总成统一格式的文本处理工作流程中，该节点发挥着关键作用。

# Input types
## Required
- delimiter
    - 分隔符参数定义了在将文本列表的元素连接在一起时使用的字符或字符串。它对于确定最终合并文本的格式至关重要，并且可以显著影响输出的可读性和结构。
    - Comfy dtype: STRING
    - Python dtype: str
- text_list
    - text_list参数是节点将处理的一系列文本字符串的集合。这是一个强制性输入，表明节点需要这些数据来执行其功能。节点的操作直接依赖于text_list的内容和结构，这将决定连接过程后的最终输出。
    - Comfy dtype: LIST
    - Python dtype: List[str]

# Output types
- merged_text
    - merged_text输出是使用指定的分隔符连接输入text_list的结果。它表示将组合文本作为单个字符串，可以用于下游任务中的进一步处理或分析。
    - Comfy dtype: TEXT
    - Python dtype: str

# Usage tips
- Infra type: CPU

# Source code
```
class WAS_Text_List_to_Text:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'delimiter': ('STRING', {'default': ', '}), 'text_list': ('LIST', {'forceInput': True})}}
    RETURN_TYPES = (TEXT_TYPE,)
    FUNCTION = 'text_list_to_text'
    CATEGORY = 'WAS Suite/Text'

    def text_list_to_text(self, delimiter, text_list):
        if delimiter == '\\n':
            delimiter = '\n'
        merged_text = delimiter.join(text_list)
        return (merged_text,)
```