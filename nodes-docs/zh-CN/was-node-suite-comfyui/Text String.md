# Documentation
- Class name: WAS_Text_String
- Category: WAS Suite/Text
- Output node: False
- Repo Ref: https://github.com/WASasquatch/was-node-suite-comfyui

`text_string` 方法旨在处理和标记输入字符串，将预定义和自定义的标记替换为它们的相应值。它在动态文本生成中扮演着关键角色，允许将时间戳和系统信息等上下文元素纳入其中。

# Input types
## Required
- text
    - 'text' 参数对于节点的操作至关重要，因为它是将要被标记化和处理的主要输入。它通过确定将用实际值替换标记的基础文本来影响执行。
    - Comfy dtype: STRING
    - Python dtype: str
## Optional
- text_b
    - 'text_b' 参数是可选的，作为节点的额外文本输入。它允许更复杂的标记替换和文本操作，增强了节点功能的灵活性。
    - Comfy dtype: STRING
    - Python dtype: str
- text_c
    - 'text_c' 参数与 'text_b' 类似，是另一个可选的文本输入，可以由节点处理。它扩展了节点处理多个文本输入以进行更复杂的标记化任务的能力。
    - Comfy dtype: STRING
    - Python dtype: str
- text_d
    - 'text_d' 参数也是可选的，提供了进一步的文本输入以供处理。它有助于节点管理更多的文本输入，满足更复杂的标记化需求。
    - Comfy dtype: STRING
    - Python dtype: str

# Output types
- text_output
    - 'text_output' 参数代表标记替换后的已处理文本。它很重要，因为它反映了节点文本操作和标记化过程的结果。
    - Comfy dtype: STRING
    - Python dtype: str

# Usage tips
- Infra type: CPU

# Source code
```
class WAS_Text_String:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'text': ('STRING', {'default': '', 'multiline': False})}, 'optional': {'text_b': ('STRING', {'default': '', 'multiline': False}), 'text_c': ('STRING', {'default': '', 'multiline': False}), 'text_d': ('STRING', {'default': '', 'multiline': False})}}
    RETURN_TYPES = (TEXT_TYPE, TEXT_TYPE, TEXT_TYPE, TEXT_TYPE)
    FUNCTION = 'text_string'
    CATEGORY = 'WAS Suite/Text'

    def text_string(self, text='', text_b='', text_c='', text_d=''):
        tokens = TextTokens()
        text = tokens.parseTokens(text)
        text_b = tokens.parseTokens(text_b)
        text_c = tokens.parseTokens(text_c)
        text_d = tokens.parseTokens(text_d)
        return (text, text_b, text_c, text_d)
```