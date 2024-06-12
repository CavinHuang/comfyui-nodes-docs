# Documentation
- Class name: CR_FloatToInteger
- Category: Comfyroll/Utils/Conversion
- Output node: False
- Repo Ref: https://github.com/RockOfFire/ComfyUI_Comfyroll_CustomNodes

CR_FloatToInteger节点旨在将浮点数转换为它们的整数等价物。它通过确保不同计算任务中的数值一致性和兼容性，在数据处理中发挥关键作用。当只有整数值是可接受或必需的情况下，这个节点尤其有用。

# Input types
## Required
- _float
    - _float参数对于节点的操作至关重要，因为它是需要被转换为整数的输入浮点数。它的转换对于需要整数输入的各种数学和逻辑操作是必不可少的。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- INT
    - INT输出代表了输入浮点数的整数转换。它是重要的，因为它提供了一个离散的数值，可以用于只有整数值才允许的计算中。
    - Comfy dtype: INT
    - Python dtype: int
- show_help
    - show_help输出提供了一个URL链接到文档，以供进一步帮助。它作为用户寻求有关节点功能和用法的更多信息的有用资源。
    - Comfy dtype: STRING
    - Python dtype: str

# Usage tips
- Infra type: CPU

# Source code
```
class CR_FloatToInteger:

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'_float': ('FLOAT', {'default': 0.0, 'forceInput': True, 'forceInput': True})}}
    RETURN_TYPES = ('INT', 'STRING')
    RETURN_NAMES = ('INT', 'show_help')
    FUNCTION = 'convert'
    CATEGORY = icons.get('Comfyroll/Utils/Conversion')

    def convert(self, _float):
        show_help = 'https://github.com/Suzie1/ComfyUI_Comfyroll_CustomNodes/wiki/Conversion-Nodes#cr-float-to-integer'
        return (int(_float), show_help)
```