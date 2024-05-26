# Documentation
- Class name: IntNumber
- Category: ♾️Mixlab/Utils
- Output node: False
- Repo Ref: https://github.com/shadowcz007/comfyui-mixlab-nodes.git

该节点对数字输入进行分类和限制，确保输出符合定义的范围和增量。

# Input types
## Required
- number
    - 节点评估的中心输入，确保它落在指定的最小和最大界限内。
    - Comfy dtype: INT
    - Python dtype: int
- min_value
    - 节点使用的下限，如果输入数字低于此阈值，则将其限制在此下限内。
    - Comfy dtype: INT
    - Python dtype: int
- max_value
    - 节点使用的上限，如果输入数字超过此限制，则将其限制在此上限内。
    - Comfy dtype: INT
    - Python dtype: int
- step
    - 节点在指定范围内调整输入数字时考虑的增量值。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- number
    - 受到限制并调整后的数字输出，它落在定义的范围内，并遵循指定的增量步骤。
    - Comfy dtype: INT
    - Python dtype: int

# Usage tips
- Infra type: CPU

# Source code
```
class IntNumber:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'number': ('INT', {'default': 0, 'min': -1, 'max': 18446744073709551615, 'step': 1, 'display': 'number'}), 'min_value': ('INT', {'default': 0, 'min': -18446744073709551615, 'max': 18446744073709551615, 'step': 1, 'display': 'number'}), 'max_value': ('INT', {'default': 1, 'min': -18446744073709551615, 'max': 18446744073709551615, 'step': 1, 'display': 'number'}), 'step': ('INT', {'default': 1, 'min': -18446744073709551615, 'max': 18446744073709551615, 'step': 1, 'display': 'number'})}}
    RETURN_TYPES = ('INT',)
    FUNCTION = 'run'
    CATEGORY = '♾️Mixlab/Utils'
    INPUT_IS_LIST = False
    OUTPUT_IS_LIST = (False,)

    def run(self, number, min_value, max_value, step):
        if number < min_value:
            number = min_value
        elif number > max_value:
            number = max_value
        return (number,)
```