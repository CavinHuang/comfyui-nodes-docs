# Documentation
- Class name: WAS_Text_To_String
- Category: WAS Suite/Text/Operations
- Output node: False
- Repo Ref: https://github.com/WASasquatch/was-node-suite-comfyui

WAS_Text_To_String节点的'text_to_string'方法旨在将输入文本转换为标准化的字符串格式。它确保文本被处理并以一种一致且可用于工作流后续操作的形式返回。

# Input types
## Required
- text
    - 'text'参数对于节点的操作至关重要，因为它定义了需要被转换为字符串的内容。它的作用是为节点提供待处理的原始材料，这对于节点的执行和结果至关重要。
    - Comfy dtype: STRING
    - Python dtype: Union[str, List[str]]

# Output types
- output
    - 'output'参数代表'text_to_string'方法的结果，即转换后的字符串。它很重要，因为它是节点的主要输出，包含了处理后的文本。
    - Comfy dtype: STRING
    - Python dtype: str

# Usage tips
- Infra type: CPU

# Source code
```
class WAS_Text_To_String:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'text': (TEXT_TYPE, {'forceInput': True if TEXT_TYPE == 'STRING' else False})}}
    RETURN_TYPES = ('STRING',)
    FUNCTION = 'text_to_string'
    CATEGORY = 'WAS Suite/Text/Operations'

    def text_to_string(self, text):
        return (text,)
```