# Documentation
- Class name: WAS_Number_To_Int
- Category: WAS Suite/Number/Operations
- Output node: False
- Repo Ref: https://github.com/WASasquatch/was-node-suite-comfyui

WAS_Number_To_Int节点的'number_to_int'方法旨在将输入的数字转换为它们的整数等价物。它在数据预处理中扮演着关键角色，通过确保数值一致性并促进进一步的数值运算来发挥作用。

# Input types
## Required
- number
    - “number”参数对于节点的操作至关重要，因为它是要被转换为整数的输入。它之所以重要，是因为转换的准确性和完整性取决于此输入的质量。
    - Comfy dtype: NUMBER
    - Python dtype: Union[int, float, str]

# Output types
- int_value
    - 'int_value'输出代表了输入数字的整数转换结果。它之所以重要，是因为它直接反映了节点的主要功能的结果，为后续流程提供了一致且可用的格式。
    - Comfy dtype: INT
    - Python dtype: int

# Usage tips
- Infra type: CPU

# Source code
```
class WAS_Number_To_Int:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'number': ('NUMBER',)}}
    RETURN_TYPES = ('INT',)
    FUNCTION = 'number_to_int'
    CATEGORY = 'WAS Suite/Number/Operations'

    def number_to_int(self, number):
        return (int(number),)
```