# Documentation
- Class name: WAS_Constant_Number
- Category: WAS Suite/Number
- Output node: False
- Repo Ref: https://github.com/WASasquatch/was-node-suite-comfyui

WAS_Constant_Number节点旨在根据指定的类型生成一个常数。它提供了一种灵活的方式，可以根据输入参数以不同的格式（如整数、浮点数或布尔值）返回一个数字。这个节点特别适用于需要一个常数值进行进一步处理或分析的场景。

# Input types
## Required
- number_type
    - 参数'number_type'定义了要生成的常数的类型。它至关重要，因为它决定了输出的格式。节点将根据此参数生成整数、浮点数或布尔值。
    - Comfy dtype: COMBO['integer', 'float', 'bool']
    - Python dtype: str
- number
    - 参数'number'是节点用来生成常数的基础数值。它在确定节点的最终输出中起着重要作用，因为返回的值是从这个输入派生出来的。
    - Comfy dtype: FLOAT
    - Python dtype: float
## Optional
- number_as_text
    - 可选参数'number_as_text'允许节点将输入解释为数字的文本表示，然后可以将其转换为指定的数字类型。这为数字输入提供了灵活性。
    - Comfy dtype: str
    - Python dtype: Optional[str]

# Output types
- constant_number
    - 输出'constant_number'表示以指定类型生成的常数。它是节点操作的主要结果，对于任何需要这个常数值的后续任务都很重要。
    - Comfy dtype: COMBO[INT, FLOAT, NUMBER]
    - Python dtype: Union[int, float, bool]

# Usage tips
- Infra type: CPU

# Source code
```
class WAS_Constant_Number:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'number_type': (['integer', 'float', 'bool'],), 'number': ('FLOAT', {'default': 0, 'min': -18446744073709551615, 'max': 18446744073709551615})}, 'optional': {'number_as_text': (TEXT_TYPE, {'forceInput': True if TEXT_TYPE == 'STRING' else False})}}
    RETURN_TYPES = ('NUMBER', 'FLOAT', 'INT')
    FUNCTION = 'return_constant_number'
    CATEGORY = 'WAS Suite/Number'

    def return_constant_number(self, number_type, number, number_as_text=None):
        if number_as_text:
            if number_type == 'integer':
                number = int(number_as_text)
            elif number_type == 'float':
                number = float(number_as_text)
            else:
                number = bool(number_as_text)
        if number_type:
            if number_type == 'integer':
                return (int(number), float(number), int(number))
            elif number_type == 'integer':
                return (float(number), float(number), int(number))
            elif number_type == 'bool':
                boolean = 1 if float(number) > 0.5 else 0
                return (int(boolean), float(boolean), int(boolean))
            else:
                return (number, float(number), int(number))
```