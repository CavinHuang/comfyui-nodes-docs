# Documentation
- Class name: WAS_Text_Parse_Tokens
- Category: WAS Suite/Text/Tokens
- Output node: False
- Repo Ref: https://github.com/WASasquatch/was-node-suite-comfyui

WAS_Text_Parse_Tokens节点旨在处理和替换给定文本字符串中的令牌。它通过识别预定义的和自定义的令牌，并将它们替换为相应的值来操作，从而实现了基于当前时间、主机名和用户信息等上下文数据的动态文本生成。

# Input types
## Required
- text
    - ‘text’参数对于节点的操作至关重要，因为它提供了将被扫描以替换令牌的输入文本。节点的功能在很大程度上依赖于这个输入来执行其替换任务，使其成为整体执行中的关键组成部分。
    - Comfy dtype: STRING
    - Python dtype: str

# Output types
- parsed_text
    - ‘parsed_text’输出包含完成令牌替换过程后的文本。它标志着节点的成功执行以及基于预定义和自定义令牌对输入文本的转换。
    - Comfy dtype: STRING
    - Python dtype: str

# Usage tips
- Infra type: CPU

# Source code
```
class WAS_Text_Parse_Tokens:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'text': (TEXT_TYPE, {'forceInput': True if TEXT_TYPE == 'STRING' else False})}}
    RETURN_TYPES = (TEXT_TYPE,)
    FUNCTION = 'text_parse_tokens'
    CATEGORY = 'WAS Suite/Text/Tokens'

    def text_parse_tokens(self, text):
        tokens = TextTokens()
        return (tokens.parseTokens(text),)

    @classmethod
    def IS_CHANGED(cls, **kwargs):
        return float('NaN')
```