# Documentation
- Class name: FLOATtoSTRING
- Category: Mikey/Utils
- Output node: False
- Repo Ref: https://github.com/bash-j/mikey_nodes

FLOATtoSTRING节点旨在将浮点数转换为字符串表示形式。它提供了格式化数字的功能，可以选择是否使用逗号，这在显示数字数据时非常有用，可以使数据更易于阅读。

# Input types
## Required
- float_
    - 'float_'参数是需要被转换为字符串的浮点数。它在节点的操作中扮演着关键角色，因为它是转换过程的主要输入。
    - Comfy dtype: FLOAT
    - Python dtype: float
## Optional
- use_commas
    - 'use_commas'参数决定输出的字符串是否应该包含作为千位分隔符的逗号。这可以提高数字的可读性，特别是对于较大的数值。
    - Comfy dtype: COMBO['true', 'false']
    - Python dtype: str

# Output types
- STRING
    - FLOATtoSTRING节点的输出是输入浮点数的字符串表示。字符串的格式受'use_commas'参数的影响，如果设置为'true'，则可以包含作为千位分隔符的逗号。
    - Comfy dtype: STRING
    - Python dtype: str

# Usage tips
- Infra type: CPU

# Source code
```
class FLOATtoSTRING:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'float_': ('FLOAT', {'default': 0.0, 'min': 0.0, 'max': 1000000.0}), 'use_commas': (['true', 'false'], {'default': 'false'})}}
    RETURN_TYPES = ('STRING',)
    FUNCTION = 'convert'
    CATEGORY = 'Mikey/Utils'

    def convert(self, float_, use_commas):
        if use_commas == 'true':
            return (f'{float_:,}',)
        else:
            return (f'{float_}',)
```