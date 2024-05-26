# Documentation
- Class name: LimitNumber
- Category: ♾️Mixlab/Utils
- Output node: False
- Repo Ref: https://github.com/shadowcz007/comfyui-mixlab-nodes.git

该节点将给定的数字限制在指定的范围内，确保其不会超出定义的最小和最大边界。它主要用于保持数字的完整性，防止无效值影响下游流程。

# Input types
## Required
- number
    - 需要被限制在指定范围内的输入数字。这是一个关键参数，因为它是节点操作的核心值，以确保其保持在可接受的范围内。
    - Comfy dtype: any_type
    - Python dtype: Union[int, float]
- min_value
    - 输入数字可接受范围的下限。它在设置输入值不允许低于的最小限制方面起着关键作用。
    - Comfy dtype: INT
    - Python dtype: int
- max_value
    - 输入数字可接受范围的上限。它在定义输入值不得超过的最大上限方面至关重要。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- number
    - 已被限制在指定范围内的输出数字。它是节点操作的结果，确保该值在输入参数定义的可接受边界内。
    - Comfy dtype: any_type
    - Python dtype: Union[int, float]

# Usage tips
- Infra type: CPU

# Source code
```
class LimitNumber:

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'number': (any_type,), 'min_value': ('INT', {'default': 0, 'min': 0, 'max': 18446744073709551615, 'step': 1, 'display': 'number'}), 'max_value': ('INT', {'default': 1, 'min': 1, 'max': 18446744073709551615, 'step': 1, 'display': 'number'})}}
    RETURN_TYPES = (any_type,)
    RETURN_NAMES = ('number',)
    FUNCTION = 'run'
    CATEGORY = '♾️Mixlab/Utils'
    INPUT_IS_LIST = False
    OUTPUT_IS_LIST = (False,)

    def run(self, number, min_value, max_value):
        nn = number
        if isinstance(number, int):
            min_value = int(min_value)
            max_value = int(max_value)
        if isinstance(number, float):
            min_value = float(min_value)
            max_value = float(max_value)
        if number < min_value:
            nn = min_value
        elif number > max_value:
            nn = max_value
        return (nn,)
```