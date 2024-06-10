# Documentation
- Class name: CR_ClampValue
- Category: Comfyroll/Utils/Other
- Output node: False
- Repo Ref: https://github.com/RockOfFire/ComfyUI_Comfyroll_CustomNodes

CR_ClampValue节点旨在确保给定值保持在指定范围内。它通过将输入值'a'限制在'range_min'和'range_max'之间来操作，从而确保输出始终在用户定义的可接受限制范围内。此功能对于维护数值稳定性和防止可能导致后续操作中的错误或意外行为的极端值至关重要。

# Input types
## Required
- a
    - 参数'a'表示要被限制的值。这是一个关键的输入，因为节点的主要功能是确保这个值遵守指定的范围限制。节点的操作直接受到'a'的大小的影响，使其成为限制过程中的中心组件。
    - Comfy dtype: FLOAT
    - Python dtype: float
- range_min
    - 参数'range_min'定义了输入值'a'的可接受范围的下限。它在限制操作中起着重要作用，因为它设置了'a'可以达到的最小限制。这个参数对于防止输出低于期望的阈值至关重要。
    - Comfy dtype: FLOAT
    - Python dtype: float
- range_max
    - 参数'range_max'在限制操作中设定了输入值'a'的上限。它至关重要，因为它决定了'a'可以取的最大值，从而防止输出超出设定的限制，并控制节点的结果。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- a
    - 输出'a'是被限制的值，已被调整以落在指定范围内。它是节点限制功能的直接结果，代表了在被'range_min'和'range_max'限制之后的'a'的值。这个输出很重要，因为它是节点操作的主要成果。
    - Comfy dtype: FLOAT
    - Python dtype: float
- show_help
    - 输出'show_help'提供了一个URL链接到文档，以获取有关节点使用的进一步帮助或信息。它作为对可能需要额外指导以有效使用节点的用户的有用资源。
    - Comfy dtype: STRING
    - Python dtype: str

# Usage tips
- Infra type: CPU

# Source code
```
class CR_ClampValue:

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'a': ('FLOAT', {'default': 1, 'min': -18446744073709551615, 'max': 18446744073709551615}), 'range_min': ('FLOAT', {'default': 1, 'min': -18446744073709551615, 'max': 18446744073709551615}), 'range_max': ('FLOAT', {'default': 1, 'min': -18446744073709551615, 'max': 18446744073709551615})}}
    RETURN_TYPES = ('FLOAT', 'STRING')
    RETURN_NAMES = ('a', 'show_help')
    FUNCTION = 'clamp_value'
    CATEGORY = icons.get('Comfyroll/Utils/Other')

    def clamp_value(self, a, range_min, range_max):
        show_help = 'https://github.com/Suzie1/ComfyUI_Comfyroll_CustomNodes/wiki/Other-Nodes#cr-clamp-value'
        a = max(range_min, min(a, range_max))
        return (a, show_help)
```