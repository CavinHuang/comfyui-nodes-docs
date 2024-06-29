# Documentation
- Class name: WAS_Search_and_Replace
- Category: WAS Suite/Text/Search
- Output node: False
- Repo Ref: https://github.com/WASasquatch/was-node-suite-comfyui

此节点旨在对给定文本执行搜索和替换操作。它识别文本中指定子字符串的出现次数，并将其替换为不同的子字符串。节点的功能旨在通过提供直接的字符串替换接口，促进文本操作和数据清洗任务。

# Input types
## Required
- text
    - 文本参数是节点的主要输入，包含要处理的文本。它至关重要，因为它决定了搜索和替换操作将发生的上下文。节点的执行和结果直接受所提供文本的内容和结构的影响。
    - Comfy dtype: STRING
    - Python dtype: str
## Optional
- find
    - 查找参数指定了节点将在文本中搜索的子字符串。它在确定操作范围方面起着重要作用，因为节点将针对此子字符串进行替换。节点的有效性取决于在此参数中提供的子字符串的准确性。
    - Comfy dtype: STRING
    - Python dtype: str
- replace
    - 替换参数定义了将用于替换文本中查找参数出现次数的子字符串。它对于转换过程至关重要，因为它决定了替换后新内容将是什么。节点修改文本的能力直接与分配给此参数的值有关。
    - Comfy dtype: STRING
    - Python dtype: str

# Output types
- result_text
    - result_text输出参数保存了搜索和替换操作完成后的修改文本。它代表了节点功能的主要结果，展示了应用了指定替换后的文本的最终状态。
    - Comfy dtype: STRING
    - Python dtype: str
- replacement_count_number
    - replacement_count_number输出参数提供了在文本中查找子字符串被替换了多少次的计数。这个数值很重要，因为它量化了节点执行的替换操作的范围。
    - Comfy dtype: NUMBER
    - Python dtype: int
- replacement_count_float
    - replacement_count_float输出参数以浮点数的形式提供替换计数。在需要对替换计数进行进一步计算或分析的情况下，使用小数表示的替换计数可能会很有用。
    - Comfy dtype: FLOAT
    - Python dtype: float
- replacement_count_int
    - replacement_count_int输出参数以整数形式呈现替换计数。它作为总替换次数的直接数值表示，在各种计算或统计上下文中都可以使用。
    - Comfy dtype: INT
    - Python dtype: int

# Usage tips
- Infra type: CPU

# Source code
```
class WAS_Search_and_Replace:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'text': (TEXT_TYPE, {'forceInput': True if TEXT_TYPE == 'STRING' else False}), 'find': ('STRING', {'default': '', 'multiline': False}), 'replace': ('STRING', {'default': '', 'multiline': False})}}
    RETURN_TYPES = (TEXT_TYPE, 'NUMBER', 'FLOAT', 'INT')
    RETURN_NAMES = ('result_text', 'replacement_count_number', 'replacement_count_float', 'replacement_count_int')
    FUNCTION = 'text_search_and_replace'
    CATEGORY = 'WAS Suite/Text/Search'

    def text_search_and_replace(self, text, find, replace):
        (modified_text, count) = self.replace_substring(text, find, replace)
        return (modified_text, count, float(count), int(count))

    def replace_substring(self, text, find, replace):
        (modified_text, count) = re.subn(find, replace, text)
        return (modified_text, count)
```