# Documentation
- Class name: WAS_Integer_Place_Counter
- Category: WAS Suite/Integer
- Output node: False
- Repo Ref: https://github.com/WASasquatch/was-node-suite-comfyui

该节点旨在计算一个整数值中的位数。它作为基础工具，用于需要进行位数计数操作的应用，例如数值分析或数据处理。

# Input types
## Required
- int_input
    - 要确定位数的整数输入。它是节点操作的主要数据元素，直接影响结果。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- INT_PLACES
    - 输出代表提供的整数中的位数计数。对于需要知道数字位数长度的应用来说，它是重要的。
    - Comfy dtype: INT
    - Python dtype: int

# Usage tips
- Infra type: CPU

# Source code
```
class WAS_Integer_Place_Counter:

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'int_input': ('INT', {'default': 0, 'min': 0, 'max': 10000000, 'step': 1})}}
    RETURN_TYPES = ('INT',)
    RETURN_NAMES = ('INT_PLACES',)
    FUNCTION = 'count_places'
    CATEGORY = 'WAS Suite/Integer'

    def count_places(self, int_input):
        output = len(str(int_input))
        cstr('\nInteger Places Count: ' + str(output)).msg.print()
        return (output,)
```