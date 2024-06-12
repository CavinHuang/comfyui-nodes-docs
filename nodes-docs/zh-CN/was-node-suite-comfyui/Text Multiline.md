# Documentation
- Class name: WAS_Text_Multiline
- Category: WAS Suite/Text
- Output node: False
- Repo Ref: https://github.com/WASasquatch/was-node-suite-comfyui

WAS_Text_Multiline节点旨在处理和格式化多行文本输入。它过滤掉注释和空行，然后用相应的值替换预定义和自定义的标记，为文本模板注入动态数据提供了一种多功能的方式。

# Input types
## Required
- text
    - ‘text’参数是节点的主要输入，接受可能包含注释和标记占位符的多行字符串。它对节点的操作至关重要，因为它定义了将被处理和格式化的基础文本。
    - Comfy dtype: STRING
    - Python dtype: str

# Output types
- new_text
    - ‘new_text’输出参数代表过滤和标记替换后处理过的文本。它很重要，因为它是节点的最终输出，为用户提供了准备好使用的格式化文本。
    - Comfy dtype: STRING
    - Python dtype: str

# Usage tips
- Infra type: CPU

# Source code
```
class WAS_Text_Multiline:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'text': ('STRING', {'default': '', 'multiline': True})}}
    RETURN_TYPES = (TEXT_TYPE,)
    FUNCTION = 'text_multiline'
    CATEGORY = 'WAS Suite/Text'

    def text_multiline(self, text):
        import io
        new_text = []
        for line in io.StringIO(text):
            if not line.strip().startswith('#'):
                if not line.strip().startswith('\n'):
                    line = line.replace('\n', '')
                new_text.append(line)
        new_text = '\n'.join(new_text)
        tokens = TextTokens()
        new_text = tokens.parseTokens(new_text)
        return (new_text,)
```