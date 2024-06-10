# Documentation
- Class name: WAS_Text_String_Truncate
- Category: WAS Suite/Text/Operations
- Output node: False
- Repo Ref: https://github.com/WASasquatch/was-node-suite-comfyui

WAS_Text_String_Truncate节点的`truncate_string`方法旨在将输入字符串缩减到指定的长度，可以按字符或单词从字符串的开头或结尾进行缩减。该方法用于以一种保持信息完整性的方式管理文本长度，确保截断后的文本适应所需的限制条件，同时不会丢失重要内容。

# Input types
## Required
- text
    - 参数'text'是节点的主要输入，表示将要被截断的字符串。这是一个关键元素，因为节点的操作重点是在保留其核心信息的同时减少这段文本的长度。
    - Comfy dtype: STRING
    - Python dtype: str
- truncate_by
    - 参数'truncate_by'决定截断的单位，可以是字符或单词。这个选择显著影响文本的缩减方式以及保留文本的哪一部分。
    - Comfy dtype: COMBO['characters', 'words']
    - Python dtype: str
- truncate_from
    - 参数'truncate_from'决定截断应该从文本的末尾还是开头开始。这个决定直接影响了截断后剩余文本的可见性和上下文。
    - Comfy dtype: COMBO['end', 'beginning']
    - Python dtype: str
- truncate_to
    - 参数'truncate_to'指定了文本应该被截断到的最大长度。这是一个关键的设置，因为它定义了截断过程后字符串的最终长度。
    - Comfy dtype: INT
    - Python dtype: int
## Optional
- text_b
    - 参数'text_b'是可选的附加字符串，可以提供用于截断。它提供了同时处理多个字符串的灵活性，增强了节点在文本管理场景中的实用性。
    - Comfy dtype: STRING
    - Python dtype: str
- text_c
    - 参数'text_c'是另一个用于截断的可选字符串，与'text_b'的功能相似。它扩展了节点在单个操作中处理更多文本数据的能力。
    - Comfy dtype: STRING
    - Python dtype: str
- text_d
    - 参数'text_d'是节点截断过程中的最后一个可选字符串。它进一步扩展了节点同时管理更多文本的能力。
    - Comfy dtype: STRING
    - Python dtype: str

# Output types
- truncated_text
    - 输出参数'truncated_text'代表截断过程的结果。它是符合指定限制条件的输入文本的缩短版本，确保输出文本简洁且相关。
    - Comfy dtype: TEXT_TYPE
    - Python dtype: str
- truncated_text_b
    - 输出参数'truncated_text_b'对应于可选输入'text_b'的截断版本。它提供与'truncated_text'相同的功能，但适用于第二个可选字符串。
    - Comfy dtype: TEXT_TYPE
    - Python dtype: str
- truncated_text_c
    - 输出参数'truncated_text_c'类似于'truncated_text_b'，提供第三个可选字符串'text_c'的结果。它确保节点可以在单个调用中处理多个字符串。
    - Comfy dtype: TEXT_TYPE
    - Python dtype: str
- truncated_text_d
    - 输出参数'truncated_text_d'是可选字符串'text_d'的最终输出。它完成了节点一次性截断多个字符串的能力，提供了一个全面的文本管理解决方案。
    - Comfy dtype: TEXT_TYPE
    - Python dtype: str

# Usage tips
- Infra type: CPU

# Source code
```
class WAS_Text_String_Truncate:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'text': ('STRING', {'forceInput': True}), 'truncate_by': (['characters', 'words'],), 'truncate_from': (['end', 'beginning'],), 'truncate_to': ('INT', {'default': 10, 'min': -99999999, 'max': 99999999, 'step': 1})}, 'optional': {'text_b': ('STRING', {'forceInput': True}), 'text_c': ('STRING', {'forceInput': True}), 'text_d': ('STRING', {'forceInput': True})}}
    RETURN_TYPES = (TEXT_TYPE, TEXT_TYPE, TEXT_TYPE, TEXT_TYPE)
    FUNCTION = 'truncate_string'
    CATEGORY = 'WAS Suite/Text/Operations'

    def truncate_string(self, text, truncate_by, truncate_from, truncate_to, text_b='', text_c='', text_d=''):
        return (self.truncate(text, truncate_to, truncate_from, truncate_by), self.truncate(text_b, truncate_to, truncate_from, truncate_by), self.truncate(text_c, truncate_to, truncate_from, truncate_by), self.truncate(text_d, truncate_to, truncate_from, truncate_by))

    def truncate(self, string, max_length, mode='end', truncate_by='characters'):
        if mode not in ['beginning', 'end']:
            cstr("Invalid mode. 'mode' must be either 'beginning' or 'end'.").error.print()
            mode = 'end'
        if truncate_by not in ['characters', 'words']:
            cstr("Invalid truncate_by. 'truncate_by' must be either 'characters' or 'words'.").error.print()
        if truncate_by == 'characters':
            if mode == 'beginning':
                return string[:max_length] if max_length >= 0 else string[max_length:]
            else:
                return string[-max_length:] if max_length >= 0 else string[:max_length]
        words = string.split()
        if mode == 'beginning':
            return ' '.join(words[:max_length]) if max_length >= 0 else ' '.join(words[max_length:])
        else:
            return ' '.join(words[-max_length:]) if max_length >= 0 else ' '.join(words[:max_length])
```