# Documentation
- Class name: WLSH_String_Append
- Category: WLSH Nodes/text
- Output node: False
- Repo Ref: https://github.com/wallish77/wlsh_nodes

WLSH_String_Append节点旨在以指定方式连接字符串。它允许在现有字符串之前或之后添加文本，并可以选择两个段落之间的分隔符。节点的功能集中在通过智能放置和分隔文本，根据用户的需求创建一个无缝且连贯的文本输出。

# Input types
## Required
- addition
    - “addition”参数代表要附加到输入字符串的文本。它是节点操作的关键部分，因为它决定了将添加到现有文本中的内容。多行属性允许添加更长的文本段，增强了节点在处理各种文本场景时的灵活性。
    - Comfy dtype: STRING
    - Python dtype: str
- placement
    - “placement”参数指示“addition”文本相对于“input_string”的位置。它对于控制最终输出中文本段的顺序至关重要。节点能够将文本放置在输入字符串之前或之后，为用户提供了根据需要构建文本的灵活性。
    - Comfy dtype: COMBO['after', 'before']
    - Python dtype: Literal['after', 'before']
- separator
    - “separator”参数指定在'input_string'和'addition'之间的分隔符类型。它在定义组合文本的可读性和结构方面起着重要作用。分隔符的选择可以极大地影响文本的最终外观，允许定制以适应不同的上下文。
    - Comfy dtype: COMBO['comma', 'space', 'newline', 'none']
    - Python dtype: Literal['comma', 'space', 'newline', 'none']
## Optional
- input_string
    - “input_string”参数是要附加“addition”的现有文本。虽然它是可选的，但它是节点操作的基础。节点的功能旨在有无初始字符串的情况下工作，为用户提供了将文本附加到现有字符串的选项，或者仅从附加项创建新字符串的选项。
    - Comfy dtype: STRING
    - Python dtype: Optional[str]

# Output types
- combined
    - “combined”输出参数代表节点操作产生的最终连接字符串。它包含了将“addition”文本附加到“input_string”并使用所选的“separator”分隔的结果。这个输出很重要，因为它是节点主要功能的直接结果，为用户提供了他们旨在创建的连贯文本。
    - Comfy dtype: STRING
    - Python dtype: str

# Usage tips
- Infra type: CPU

# Source code
```
class WLSH_String_Append:
    location = ['after', 'before']
    separator = ['comma', 'space', 'newline', 'none']

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'addition': ('STRING', {'multiline': True}), 'placement': (s.location,), 'separator': (s.separator,)}, 'optional': {'input_string': ('STRING', {'multiline': True, 'forceInput': True})}}
    RETURN_TYPES = ('STRING',)
    RETURN_NAMES = ('combined',)
    FUNCTION = 'concat_string'
    CATEGORY = 'WLSH Nodes/text'

    def concat_string(self, placement, separator, addition='', input_string=''):
        sep = {'comma': ', ', 'space': ' ', 'newline': '\n', 'none': ''}
        if input_string is None:
            return (addition,)
        if placement == 'after':
            new_string = input_string + sep[separator] + addition
        else:
            new_string = addition + sep[separator] + input_string
        return (new_string,)
```