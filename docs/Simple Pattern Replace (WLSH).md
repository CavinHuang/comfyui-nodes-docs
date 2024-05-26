# Documentation
- Class name: WLSH_Simple_Pattern_Replace
- Category: WLSH Nodes/text
- Output node: False
- Repo Ref: https://github.com/wallish77/wlsh_nodes

该节点能够在文本字符串中替换特定的模式为提供的列表中的条目，增强了文本处理操作的多样性。

# Input types
## Required
- input_string
    - input_string参数是需要识别和替换模式的文本。它对节点的运行至关重要，因为它是所有替换活动的基础。
    - Comfy dtype: STRING
    - Python dtype: str
- list_string
    - list_string参数提供了用于替换识别模式的字符串池。它在决定替换的多样性和随机性方面起着关键作用。
    - Comfy dtype: STRING
    - Python dtype: str
- pattern
    - pattern参数定义了文本中需要被替换的特定序列或结构。它对于指导节点的搜索和替换过程至关重要。
    - Comfy dtype: STRING
    - Python dtype: str
- delimiter
    - delimiter参数用于将list_string分割成单独的元素，这些元素随后可选用来替换识别到的模式。它在组织替换选项方面很重要。
    - Comfy dtype: STRING
    - Python dtype: str
## Optional
- seed
    - seed参数初始化替换过程中的随机数生成器，确保替换是可复现的。它有助于节点输出的可预测性和一致性。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- string
    - 节点的输出是输入字符串的修改版本，其中识别到的模式被list_string中的元素替换，反映了节点的文本转换能力。
    - Comfy dtype: STRING
    - Python dtype: str

# Usage tips
- Infra type: CPU

# Source code
```
class WLSH_Simple_Pattern_Replace:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'input_string': ('STRING', {'multiline': True, 'forceInput': True}), 'list_string': ('STRING', {'default': f''}), 'pattern': ('STRING', {'default': f'$var'}), 'delimiter': ('STRING', {'default': f','}), 'seed': ('INT', {'default': 0, 'min': 0, 'max': 18446744073709551615})}}
    RETURN_TYPES = ('STRING',)
    RETURN_NAMES = ('string',)
    FUNCTION = 'replace_string'
    CATEGORY = 'WLSH Nodes/text'

    def replace_string(self, input_string, list_string, pattern, delimiter, seed):
        pattern = re.escape(pattern).strip()
        regex = re.compile(pattern)
        matches = regex.findall(input_string)
        if not matches:
            return (input_string,)
        if seed is not None:
            random.seed(seed)
        if delimiter not in list_string:
            raise ValueError('Delimiter not found in list_string')

        def replace(match):
            return random.choice(list_string.split(delimiter))
        new_string = regex.sub(replace, input_string)
        return (new_string,)
```