# Documentation
- Class name: WAS_Text_Add_Token_Input
- Category: WAS Suite/Text/Tokens
- Output node: True
- Repo Ref: https://github.com/WASasquatch/was-node-suite-comfyui

WAS_Text_Add_Token_Input节点旨在管理和操作文本处理工作流中的自定义标记。它允许用户添加或删除标记，并提供打印当前标记列表的功能。该节点在根据预定义或用户提供的标记定制和个性化文本输出中发挥着关键作用。

# Input types
## Required
- token_name
    - token_name参数对于标识要添加或操作的标记的唯一名称至关重要。它直接影响节点在文本处理系统中正确引用和修改所需标记的能力。
    - Comfy dtype: STRING
    - Python dtype: str
- token_value
    - token_value参数指定要与token_name关联的值。它是一个关键输入，因为它决定了在处理期间将替换文本中标记占位符的实际内容。
    - Comfy dtype: STRING
    - Python dtype: str
## Optional
- print_current_tokens
    - 当print_current_tokens参数设置为'true'时，会触发节点输出当前的自定义标记列表。这个特性对于调试和验证修改后标记列表的状态非常有用。
    - Comfy dtype: COMBO['false', 'true']
    - Python dtype: Union[str, None]

# Output types
- token_name_output
    - token_name_output提供了由节点添加或操作的标记名称。它很重要，因为它确认了处理的标记的身份。
    - Comfy dtype: STRING
    - Python dtype: str
- token_value_output
    - token_value_output返回与token_name关联的值。这个输出对于验证文本处理系统中为标记设置的正确值非常重要。
    - Comfy dtype: STRING
    - Python dtype: str

# Usage tips
- Infra type: CPU

# Source code
```
class WAS_Text_Add_Token_Input:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'token_name': (TEXT_TYPE, {'forceInput': True if TEXT_TYPE == 'STRING' else False}), 'token_value': (TEXT_TYPE, {'forceInput': True if TEXT_TYPE == 'STRING' else False}), 'print_current_tokens': (['false', 'true'],)}}
    RETURN_TYPES = ()
    FUNCTION = 'text_add_token'
    OUTPUT_NODE = True
    CATEGORY = 'WAS Suite/Text/Tokens'

    def text_add_token(self, token_name, token_value, print_current_tokens='false'):
        if token_name.strip() == '':
            cstr(f'A `token_name` is required for a token; token name provided is empty.').error.print()
            pass
        tk = TextTokens()
        tk.addToken(token_name, token_value)
        if print_current_tokens == 'true':
            cstr(f'Current Custom Tokens:').msg.print()
            print(json.dumps(tk.custom_tokens, indent=4))
        return (token_name, token_value)

    @classmethod
    def IS_CHANGED(cls, **kwargs):
        return float('NaN')
```