# Documentation
- Class name: WAS_Text_To_Number
- Category: WAS Suite/Text/Operations
- Output node: False
- Repo Ref: https://github.com/WASasquatch/was-node-suite-comfyui

该节点将文本数据转换为数值，使其能够以数值格式进行进一步的处理和分析。

# Input types
## Required
- text
    - 文本参数是必需的，它提供了需要转换为数字格式的原始文本数据。它是决定节点输出的主要输入。
    - Comfy dtype: STRING
    - Python dtype: str

# Output types
- NUMBER
    - 输出是输入文本的数值表示，可以是整数或浮点数，这取决于文本内容。
    - Comfy dtype: NUMBER
    - Python dtype: Union[int, float]

# Usage tips
- Infra type: CPU

# Source code
```
class WAS_Text_To_Number:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'text': (TEXT_TYPE, {'forceInput': True if TEXT_TYPE == 'STRING' else False})}}
    RETURN_TYPES = ('NUMBER',)
    FUNCTION = 'text_to_number'
    CATEGORY = 'WAS Suite/Text/Operations'

    def text_to_number(self, text):
        if text.replace('.', '').isnumeric():
            number = float(text)
        else:
            number = int(text)
        return (number,)
```