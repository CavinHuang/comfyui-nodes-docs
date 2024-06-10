# Documentation
- Class name: WAS_Search_and_Replace_Input
- Category: WAS Suite/Text/Search
- Output node: False
- Repo Ref: https://github.com/WASasquatch/was-node-suite-comfyui

WAS_Search_and_Replace_Input节点旨在对给定文本执行搜索和替换操作。它高效地定位文本中所有指定子字符串的出现，并将其替换为新的子字符串。这个节点特别适用于预处理文本数据，其中更新或更正特定短语的需求很常见。它通过确保文本根据用户的需求准确修改，从而为整个工作流程做出贡献。

# Input types
## Required
- text
    - ‘text’参数是节点的主要输入，代表将要搜索并可能修改的文本。它至关重要，因为它决定了搜索和替换操作将发生的上下文。节点的结果严重依赖于‘text’参数的内容和结构。
    - Comfy dtype: STRING
    - Python dtype: str
- find
    - ‘find’参数指定了节点将在‘text’中搜索的子字符串。它在识别需要被替换的文本部分中起着关键作用。搜索和替换操作的有效性直接受到‘find’参数准确性的影响。
    - Comfy dtype: STRING
    - Python dtype: str
- replace
    - ‘replace’参数定义了将用于替换‘find’参数找到的出现的新的子字符串。它很重要，因为它决定了替换过程后文本的最终结果。‘replace’值的选择可以显著改变结果文本的含义或结构。
    - Comfy dtype: STRING
    - Python dtype: str

# Output types
- result_text
    - ‘result_text’输出包含所有替换完成后修改的文本。它是输入‘text’的直接反映，其中指定的‘find’子字符被‘replace’子字符串替换。这个输出很重要，因为它代表了文本处理后的最终状态。
    - Comfy dtype: STRING
    - Python dtype: str
- replacement_count_number
    - ‘replacement_count_number’输出提供了在文本中‘find’子字符串被‘replace’子字符串替换了多少次的计数。这个数值输出对于分析或记录目的很有用，提供了对文本修改程度的洞察。
    - Comfy dtype: NUMBER
    - Python dtype: float
- replacement_count_float
    - ‘replacement_count_float’输出与‘replacement_count_number’相同，但是以浮点数的形式表示计数。在需要对替换计数进行进一步计算或统计分析的情况下，这个输出非常有用。
    - Comfy dtype: FLOAT
    - Python dtype: float
- replacement_count_int
    - ‘replacement_count_int’输出以整数形式提供了替换的计数。当需要确切的替换次数用于操作整数的应用中，如数据记录或基于整数的计算时，这个输出特别有用。
    - Comfy dtype: INT
    - Python dtype: int

# Usage tips
- Infra type: CPU

# Source code
```
class WAS_Search_and_Replace_Input:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'text': (TEXT_TYPE, {'forceInput': True if TEXT_TYPE == 'STRING' else False}), 'find': (TEXT_TYPE, {'forceInput': True if TEXT_TYPE == 'STRING' else False}), 'replace': (TEXT_TYPE, {'forceInput': True if TEXT_TYPE == 'STRING' else False})}}
    RETURN_TYPES = (TEXT_TYPE, 'NUMBER', 'FLOAT', 'INT')
    RETURN_NAMES = ('result_text', 'replacement_count_number', 'replacement_count_float', 'replacement_count_int')
    FUNCTION = 'text_search_and_replace'
    CATEGORY = 'WAS Suite/Text/Search'

    def text_search_and_replace(self, text, find, replace):
        count = 0
        new_text = text
        while find in new_text:
            new_text = new_text.replace(find, replace, 1)
            count += 1
        return (new_text, count, float(count), int(count))

    @classmethod
    def IS_CHANGED(cls, **kwargs):
        return float('NaN')
```