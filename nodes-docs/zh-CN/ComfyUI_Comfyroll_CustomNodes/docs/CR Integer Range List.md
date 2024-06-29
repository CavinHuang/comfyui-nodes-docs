# Documentation
- Class name: CR_IntegerRangeList
- Category: Comfyroll/List
- Output node: False
- Repo Ref: https://github.com/RockOfFire/ComfyUI_Comfyroll_CustomNodes

CR_IntegerRangeList节点旨在生成一个指定范围内的整数列表，具有可自定义的起始、结束和步长参数。它还可以适应“乒乓”行为，在交替迭代中反转范围，以获得更多样化的输出。此节点在需要序列整数值进行进一步处理或迭代的场景中扮演着关键角色。

# Input types
## Required
- start
    - ‘start’参数定义了整数范围的开始。它至关重要，因为它决定了节点生成的数字序列的起始点，影响着整体输出序列。
    - Comfy dtype: INT
    - Python dtype: int
- end
    - ‘end’参数指定了整数范围的终点。它很关键，因为它决定了生成序列中的最后一个数字，从而影响范围的长度和范围。
    - Comfy dtype: INT
    - Python dtype: int
- step
    - ‘step’参数设置了范围内每个整数之间的增量。它很重要，因为它控制数字之间的间距，影响生成序列的密度。
    - Comfy dtype: INT
    - Python dtype: int
- loops
    - ‘loops’参数决定了将重复或迭代范围的次数。它很重要，因为它影响节点产生的数字总数。
    - Comfy dtype: INT
    - Python dtype: int
- ping_pong
    - ‘ping_pong’参数引入了一个交替模式，在每次迭代中范围都会反转。它很重要，因为它可以在序列中引入变化性，这对于某些应用可能是必要的。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool

# Output types
- INT
    - ‘INT’输出提供了基于输入参数在指定范围内生成的整数值列表。它很重要，因为它代表了节点的主要输出，准备用于进一步使用或分析。
    - Comfy dtype: INT
    - Python dtype: List[int]
- show_help
    - ‘show_help’输出提供了一个URL链接，用于获取更多帮助的文档。对于寻求如何有效使用节点的额外信息或指导的用户来说，这是有用的。
    - Comfy dtype: STRING
    - Python dtype: str

# Usage tips
- Infra type: CPU

# Source code
```
class CR_IntegerRangeList:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'start': ('INT', {'default': 0, 'min': -99999, 'max': 99999}), 'end': ('INT', {'default': 0, 'min': -99999, 'max': 99999}), 'step': ('INT', {'default': 1, 'min': 1, 'max': 99999}), 'loops': ('INT', {'default': 1, 'min': 1, 'max': 999}), 'ping_pong': ('BOOLEAN', {'default': False})}}
    RETURN_TYPES = ('INT', 'STRING')
    RETURN_NAMES = ('INT', 'show_help')
    OUTPUT_IS_LIST = (True, False)
    FUNCTION = 'make_range'
    CATEGORY = icons.get('Comfyroll/List')

    def make_range(self, start, end, step, loops, ping_pong):
        show_help = 'https://github.com/Suzie1/ComfyUI_Comfyroll_CustomNodes/wiki/List-Nodes#cr-list-schedule'
        range_values = list()
        for i in range(loops):
            current_range = list(range(start, end, step))
            if ping_pong:
                if i % 2 == 1:
                    range_values += reversed(current_range)
                else:
                    range_values += current_range
            else:
                range_values += current_range
        return (range_values, show_help)
```