# Documentation
- Class name: CR_FloatRangeList
- Category: Comfyroll/List
- Output node: False
- Repo Ref: https://github.com/RockOfFire/ComfyUI_Comfyroll_CustomNodes

CR_FloatRangeList 节点旨在生成指定范围内的浮点数列表，可应用可选的数学运算和格式化。它通过参数如开始值、结束值、步长和操作提供了定制化选项，为用户提供了一个多功能工具，用于创建特定需求的数值序列。

# Input types
## Required
- start
    - 开始值参数定义了范围的初始值。它非常重要，因为它为节点生成的数字序列设定了起始点，对整体输出有显著影响。
    - Comfy dtype: FLOAT
    - Python dtype: float
- end
    - 结束值参数指定了范围的最终值。它很关键，因为它决定了序列的终点，直接影响生成列表的长度和最后一个值。
    - Comfy dtype: FLOAT
    - Python dtype: float
- step
    - 步长参数决定了范围内每个值之间的增量。它在数值序列的密度中起着重要作用，控制生成的值的数量及其分布。
    - Comfy dtype: FLOAT
    - Python dtype: float
- operation
    - 操作参数允许对范围内的每个值应用三角函数。这可以转换序列，引入非线性特征，并启用更复杂的模式。
    - Comfy dtype: COMBO[none, sin, cos, tan]
    - Python dtype: str
- decimal_places
    - 小数位数参数通过指定小数点后的位数来控制浮点数的精度。它对控制输出值的粒度非常重要。
    - Comfy dtype: INT
    - Python dtype: int
- ignore_first_value
    - 忽略第一个值参数决定是否从输出中排除范围的初始值。当起始点不感兴趣或需要在后续处理中省略时，这可能很重要。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool
- max_values_per_loop
    - 每个循环的最大值参数设置每个循环迭代生成的最大值数量。它是控制节点产生值的总数的关键因素。
    - Comfy dtype: INT
    - Python dtype: int
- loops
    - 循环次数参数指定应重复执行范围操作的次数。对于创建多个序列或扩展输出列表很重要。
    - Comfy dtype: INT
    - Python dtype: int
- ping_pong
    - 乒乓参数引入了一种行为，即每隔一个循环序列就反向，产生“乒乓”效果。这可以用来生成对称或振荡模式。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool

# Output types
- FLOAT
    - FLOAT 输出提供了应用了指定操作和格式化后的生成浮点数列表。它代表了节点功能的主要结果。
    - Comfy dtype: FLOAT
    - Python dtype: List[float]
- show_help
    - show_help 输出提供了指向节点文档页面的 URL，为用户提供了关于如何有效使用节点的额外信息和指导。
    - Comfy dtype: STRING
    - Python dtype: str

# Usage tips
- Infra type: CPU

# Source code
```
class CR_FloatRangeList:

    @classmethod
    def INPUT_TYPES(s):
        operations = ['none', 'sin', 'cos', 'tan']
        return {'required': {'start': ('FLOAT', {'default': 0.0, 'min': -99999.99, 'max': 99999.99, 'step': 0.01}), 'end': ('FLOAT', {'default': 1.0, 'min': -99999.99, 'max': 99999.99, 'step': 0.01}), 'step': ('FLOAT', {'default': 1.0, 'min': -99999.99, 'max': 99999.99, 'step': 0.01}), 'operation': (operations,), 'decimal_places': ('INT', {'default': 2, 'min': 0, 'max': 10}), 'ignore_first_value': ('BOOLEAN', {'default': True}), 'max_values_per_loop': ('INT', {'default': 128, 'min': 1, 'max': 99999}), 'loops': ('INT', {'default': 1, 'min': 1, 'max': 999}), 'ping_pong': ('BOOLEAN', {'default': False})}}
    RETURN_TYPES = ('FLOAT', 'STRING')
    RETURN_NAMES = ('FLOAT', 'show_help')
    OUTPUT_IS_LIST = (True, False)
    FUNCTION = 'make_range'
    CATEGORY = icons.get('Comfyroll/List')

    def make_range(self, start, end, step, max_values_per_loop, operation, decimal_places, ignore_first_value, loops, ping_pong):
        show_help = 'https://github.com/Suzie1/ComfyUI_Comfyroll_CustomNodes/wiki/List-Nodes#cr-float-range-list'
        range_values = list()
        for i in range(loops):
            if end < start and step > 0:
                step = -step
            current_range = list(np.arange(start, end + step, step))
            if operation == 'sin':
                current_range = [math.sin(value) for value in current_range]
            elif operation == 'cos':
                current_range = [math.cos(value) for value in current_range]
            elif operation == 'tan':
                current_range = [math.tan(value) for value in current_range]
            current_range = [round(value, decimal_places) for value in current_range]
            if ping_pong:
                if i % 2 == 1:
                    if ignore_first_value:
                        current_range = current_range[:-1]
                    current_range = current_range[:max_values_per_loop]
                    range_values += reversed(current_range)
                else:
                    if ignore_first_value:
                        current_range = current_range[1:]
                    current_range = current_range[:max_values_per_loop]
                    range_values += current_range
            else:
                if ignore_first_value:
                    current_range = current_range[1:]
                current_range = current_range[:max_values_per_loop]
                range_values += current_range
        return (range_values, show_help)
```