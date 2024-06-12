# Documentation
- Class name: Int
- Category: EasyUse/Logic/Type
- Output node: False
- Repo Ref: https://github.com/yolain/ComfyUI-Easy-Use.git

该节点通过将输入转换为整数来促进算术运算的执行，确保计算过程中的数据完整性和类型一致性。

# Input types
## Required
- value
    - ‘value’参数至关重要，因为它是节点操作的主要输入。它通过确定将被转换为整数的数据来影响节点的处理。
    - Comfy dtype: INT
    - Python dtype: Union[int, float, str, Decimal]

# Output types
- int
    - 输出‘int’代表整数转换过程的结果，这对于确保在后续操作中使用正确的数据类型至关重要。
    - Comfy dtype: INT
    - Python dtype: int

# Usage tips
- Infra type: CPU

# Source code
```
class Int:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'value': ('INT', {'default': 0})}}
    RETURN_TYPES = ('INT',)
    RETURN_NAMES = ('int',)
    FUNCTION = 'execute'
    CATEGORY = 'EasyUse/Logic/Type'

    def execute(self, value):
        return (value,)
```