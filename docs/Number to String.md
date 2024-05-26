# Documentation
- Class name: WAS_Number_To_String
- Category: WAS Suite/Number/Operations
- Output node: False
- Repo Ref: https://github.com/WASasquatch/was-node-suite-comfyui

WAS_Number_To_String节点旨在将数值转换为相应的字符串表示形式。此节点在数据预处理和转换工作流程中起着至关重要的作用，使数值数据能够无缝集成到需要文本输入的系统中。

# Input types
## Required
- number
    - ‘number’参数对于节点的操作至关重要，因为它是需要转换成字符串的输入数值。它通过决定输出字符串的内容显著影响节点的执行。
    - Comfy dtype: NUMBER
    - Python dtype: Union[int, float]

# Output types
- string
    - ‘string’输出参数表示输入数字的文本形式。它很重要，因为它提供了可以用于各种下游应用或流程的转换后数据。
    - Comfy dtype: STRING
    - Python dtype: str

# Usage tips
- Infra type: CPU

# Source code
```
class WAS_Number_To_String:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'number': ('NUMBER',)}}
    RETURN_TYPES = ('STRING',)
    FUNCTION = 'number_to_string'
    CATEGORY = 'WAS Suite/Number/Operations'

    def number_to_string(self, number):
        return (str(number),)
```