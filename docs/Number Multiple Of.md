# Documentation
- Class name: WAS_Number_Multiple_Of
- Category: WAS Suite/Number/Functions
- Output node: False
- Repo Ref: https://github.com/WASasquatch/was-node-suite-comfyui

方法 'number_multiple_of' 旨在确定给定的数字是否为另一个指定数字的倍数。如果不是，该方法会计算最近的倍数。这种功能在需要进行进一步处理或数学运算的倍数场景中至关重要。

# Input types
## Required
- number
    - 参数 'number' 是要检查是否为 'multiple' 的倍数的值。它在节点的操作中起着关键作用，因为它是倍数检查和随后计算的主题。
    - Comfy dtype: NUMBER
    - Python dtype: Union[int, float]
## Optional
- multiple
    - 参数 'multiple' 定义了用于确定 'number' 是否为倍数的除数。它很重要，因为它决定了 'number' 要比较的具体倍数。默认值为 8，确保了在不指定此参数的情况下可以使用节点。
    - Comfy dtype: INT
    - Python dtype: Optional[int]

# Output types
- result
    - 参数 'result' 表示 'number_multiple_of' 方法的结果。如果输入的 'number' 原本不是 'multiple' 的倍数，它就是最接近的倍数。这个结果对于任何需要倍数的后续操作都很重要。
    - Comfy dtype: COMBO[NUMBER, FLOAT, INT]
    - Python dtype: Union[int, float]

# Usage tips
- Infra type: CPU

# Source code
```
class WAS_Number_Multiple_Of:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'number': ('NUMBER',), 'multiple': ('INT', {'default': 8, 'min': -18446744073709551615, 'max': 18446744073709551615})}}
    RETURN_TYPES = ('NUMBER', 'FLOAT', 'INT')
    FUNCTION = 'number_multiple_of'
    CATEGORY = 'WAS Suite/Number/Functions'

    def number_multiple_of(self, number, multiple=8):
        if number % multiple != 0:
            return (number // multiple * multiple + multiple,)
        return (number, number, int(number))
```