# Documentation
- Class name: ImpactConvertDataType
- Category: ImpactPack/Logic
- Output node: False
- Repo Ref: https://github.com/ltdrdata/ComfyUI-Impact-Pack.git

ImpactConvertDataType节点旨在将输入数据转换为各种数据类型。它智能地判断输入是否可以解释为数字，并将其转换为字符串、浮点数、整数和布尔值表示。该节点在数据预处理中扮演着关键角色，适用于需要不同输入之间保持一致数据类型的应用程序。

# Input types
## Required
- value
    - ‘value’参数是ImpactConvertDataType节点的核心输入。它可以是任何数据类型，对于节点的操作至关重要，因为它决定了转换过程的源材料。节点的功能在很大程度上依赖于这个输入，以准确地执行其类型转换。
    - Comfy dtype: any
    - Python dtype: Any

# Output types
- converted_value
    - ‘converted_value’输出来自ImpactConvertDataType节点，提供了一个包含原始字符串值及其转换形式（浮点数、整数和布尔值）的元组。这种全面的输出满足了各种下游处理需求，确保数据被适当地格式化以供进一步分析或操作。
    - Comfy dtype: COMBO[string, float, int, boolean]
    - Python dtype: Tuple[str, float, int, bool]

# Usage tips
- Infra type: CPU

# Source code
```
class ImpactConvertDataType:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'value': (any_typ,)}}
    RETURN_TYPES = ('STRING', 'FLOAT', 'INT', 'BOOLEAN')
    FUNCTION = 'doit'
    CATEGORY = 'ImpactPack/Logic'

    @staticmethod
    def is_number(string):
        pattern = re.compile('^[-+]?[0-9]*\\.?[0-9]+$')
        return bool(pattern.match(string))

    def doit(self, value):
        if self.is_number(str(value)):
            num = value
        elif str.lower(str(value)) != 'false':
            num = 1
        else:
            num = 0
        return (str(value), float(num), int(float(num)), bool(float(num)))
```