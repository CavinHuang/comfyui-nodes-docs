# Documentation
- Class name: INTtoSTRING
- Category: Mikey/Utils
- Output node: False
- Repo Ref: https://github.com/bash-j/mikey_nodes

INTtoSTRING节点旨在将整数值转换为它们的字符串表示形式。它提供格式化字符串的功能，可选择是否使用逗号，以适应不同的用例，为数值数据展示提供了一种多功能的方法。

# Input types
## Required
- int_
    - 参数'int_'是需要被转换为字符串的整数。它在节点的操作中起着关键作用，因为它是转换过程的主要输入。
    - Comfy dtype: INT
    - Python dtype: int
## Optional
- use_commas
    - 参数'use_commas'决定输出的字符串是否应该包含作为千位分隔符的逗号。它影响数字数据在字符串格式中的可读性。
    - Comfy dtype: COMBO['true', 'false']
    - Python dtype: str

# Output types
- STRING
    - INTtoSTRING节点的输出是输入整数的字符串表示。它很重要，因为它直接反映了节点主要功能的转换结果。
    - Comfy dtype: STRING
    - Python dtype: str

# Usage tips
- Infra type: CPU

# Source code
```
class INTtoSTRING:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'int_': ('INT', {'default': 0, 'min': 0, 'max': 18446744073709551615}), 'use_commas': (['true', 'false'], {'default': 'false'})}}
    RETURN_TYPES = ('STRING',)
    FUNCTION = 'convert'
    CATEGORY = 'Mikey/Utils'

    def convert(self, int_, use_commas):
        if use_commas == 'true':
            return (f'{int_:,}',)
        else:
            return (f'{int_}',)
```