# Documentation
- Class name: WAS_Text_Add_Tokens
- Category: WAS Suite/Text/Tokens
- Output node: True
- Repo Ref: https://github.com/WASasquatch/was-node-suite-comfyui

WAS_Text_Add_Tokens节点旨在处理和操作文本标记。它通过添加自定义标记来增强输入文本，这些标记可以用于各种目的，如时间戳、用户识别或设备信息。该节点的功能集中在将动态元素注入到静态文本中，从而为文本处理任务提供了一种多功能工具。

# Input types
## Required
- tokens
    - ‘tokens’参数对节点的操作至关重要，因为它定义了要添加到文本中的自定义标记。这些标记可以表示当前时间、主机名或其他系统特定信息等动态数据。包含这些标记允许创建内容丰富的文本，可以用于各种应用程序。
    - Comfy dtype: STRING
    - Python dtype: str
## Optional
- print_current_tokens
    - ‘print_current_tokens’参数是一个可选开关，当设置为‘true’时，指示节点打印当前的自定义标记状态。这个特性对于调试和验证正在应用于文本的标记非常有用。
    - Comfy dtype: COMBO['false', 'true']
    - Python dtype: Union[str, None]

# Output types
- tokens
    - 输出的‘tokens’参数表示带有新添加或更新的自定义标记的修改后的文本。这个输出可以用于下游任务的进一步处理或分析，允许将动态文本元素无缝集成到各种工作流程中。
    - Comfy dtype: STRING
    - Python dtype: str

# Usage tips
- Infra type: CPU

# Source code
```
class WAS_Text_Add_Tokens:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'tokens': ('STRING', {'default': '[hello]: world', 'multiline': True}), 'print_current_tokens': (['false', 'true'],)}}
    RETURN_TYPES = ()
    FUNCTION = 'text_add_tokens'
    OUTPUT_NODE = True
    CATEGORY = 'WAS Suite/Text/Tokens'

    def text_add_tokens(self, tokens, print_current_tokens='false'):
        import io
        tk = TextTokens()
        for line in io.StringIO(tokens):
            parts = line.split(':')
            token = parts[0].strip()
            token_value = parts[1].strip()
            tk.addToken(token, token_value)
        if print_current_tokens == 'true':
            cstr(f'Current Custom Tokens:').msg.print()
            print(json.dumps(tk.custom_tokens, indent=4))
        return tokens

    @classmethod
    def IS_CHANGED(cls, **kwargs):
        return float('NaN')
```