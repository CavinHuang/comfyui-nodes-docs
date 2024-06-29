# Documentation
- Class name: WAS_Number_To_Text
- Category: WAS Suite/Number/Operations
- Output node: False
- Repo Ref: https://github.com/WASasquatch/was-node-suite-comfyui

该节点将数字输入转换为文本表示，使得数字可以被下游节点或应用程序更容易理解和使用。

# Input types
## Required
- number
    - ‘number’参数对于节点的操作至关重要，因为它作为将被转换为文本的输入。这是节点执行其主要功能的必要条件。
    - Comfy dtype: NUMBER
    - Python dtype: Union[int, float, complex]

# Output types
- text
    - 输出‘text’表示输入数字的文本表示形式，是节点转换过程的结果。
    - Comfy dtype: TEXT
    - Python dtype: str

# Usage tips
- Infra type: CPU

# Source code
```
class WAS_Number_To_Text:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'number': ('NUMBER',)}}
    RETURN_TYPES = (TEXT_TYPE,)
    FUNCTION = 'number_to_text'
    CATEGORY = 'WAS Suite/Number/Operations'

    def number_to_text(self, number):
        return (str(number),)
```