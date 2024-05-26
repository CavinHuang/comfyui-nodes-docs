# Documentation
- Class name: CharacterInText
- Category: ♾️Mixlab/GPT
- Output node: False
- Repo Ref: https://github.com/shadowcz007/comfyui-mixlab-nodes.git

该节点便于识别文本中特定字符的存在，并计算其出现索引。它处理文本数据以确定给定字符的频率，从指定的索引开始，并通过对字符出现频率提供简单而有效的度量，为文本分析任务做出贡献。

# Input types
## Required
- text
    - 文本参数至关重要，因为它是要验证字符存在的来源。它是节点处理的主要输入，用于实现其目的。
    - Comfy dtype: STRING
    - Python dtype: str
- character
    - 字符参数对于节点来说至关重要，它决定了节点在文本中寻找哪个特定的字符。它决定了搜索的重点，并影响节点操作的结果。
    - Comfy dtype: STRING
    - Python dtype: str
## Optional
- start_index
    - 起始索引参数定义了节点在文本中开始搜索字符的起点。它影响了搜索的范围和结果索引值。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- result
    - 结果输出代表指定字符在文本中的出现索引，从给定的起始索引开始。它是直接输出，反映了节点的主要功能，并提供了字符存在的定量度量。
    - Comfy dtype: INT
    - Python dtype: int

# Usage tips
- Infra type: CPU

# Source code
```
class CharacterInText:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'text': ('STRING', {'multiline': True, 'dynamicPrompts': False}), 'character': ('STRING', {'multiline': True, 'dynamicPrompts': False}), 'start_index': ('INT', {'default': 1, 'min': 0, 'max': 1024, 'step': 1, 'display': 'number'})}}
    INPUT_IS_LIST = False
    RETURN_TYPES = ('INT',)
    FUNCTION = 'run'
    OUTPUT_IS_LIST = (False,)
    CATEGORY = '♾️Mixlab/GPT'

    def run(self, text, character, start_index):
        b = 1 if character.lower() in text.lower() else 0
        return (b + start_index,)
```