# Documentation
- Class name: JoinWithDelimiter
- Category: ♾️Mixlab/Prompt
- Output node: False
- Repo Ref: https://github.com/shadowcz007/comfyui-mixlab-nodes.git

该节点将文本字符串列表连接成单个字符串，并使用指定的分隔符来分隔各个项目。它旨在简化文本组合过程，为从多个输入创建统一的文本输出提供直接的解决方案。

# Input types
## Required
- text_list
    - 要连接的文本字符串列表。此参数至关重要，因为它构成了节点操作的基础，决定了将要合并的文本的内容和数量。
    - Comfy dtype: ANY
    - Python dtype: List[str]
- delimiter
    - 用于分隔text_list中元素的字符或字符串。分隔符的选择影响结果字符串的可读性和结构。
    - Comfy dtype: COMBO
    - Python dtype: str

# Output types
- result
    - 最终连接的字符串，其中所有的text_list元素都使用指定的分隔符连接在一起。
    - Comfy dtype: STRING
    - Python dtype: str

# Usage tips
- Infra type: CPU

# Source code
```
class JoinWithDelimiter:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'text_list': (any_type,), 'delimiter': (['newline', 'comma', 'backslash', 'space'],)}}
    RETURN_TYPES = ('STRING',)
    FUNCTION = 'run'
    CATEGORY = '♾️Mixlab/Prompt'
    INPUT_IS_LIST = True
    OUTPUT_IS_LIST = (False,)

    def run(self, text_list, delimiter):
        delimiter = delimiter[0]
        if delimiter == 'newline':
            delimiter = '\n'
        elif delimiter == 'comma':
            delimiter = ','
        elif delimiter == 'backslash':
            delimiter = '\\'
        elif delimiter == 'space':
            delimiter = ' '
        t = ''
        if isinstance(text_list, list):
            t = join_with_(text_list, delimiter)
        return (t,)
```