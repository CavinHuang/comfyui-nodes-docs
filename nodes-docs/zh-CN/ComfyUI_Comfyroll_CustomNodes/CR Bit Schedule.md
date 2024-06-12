# Documentation
- Class name: CR_BitSchedule
- Category: Comfyroll/Animation/Schedule
- Output node: False
- Repo Ref: https://github.com/RockOfFire/ComfyUI_Comfyroll_CustomNodes

CR_BitSchedule 节点旨在根据二进制字符串输入生成一个时间表，能够指定间隔和循环次数。它处理二进制字符串以创建一系列预定事件，这在项目中的动画和时间安排上特别有用。

# Input types
## Required
- binary_string
    - 二进制字符串是节点用来创建时间表的二进制数字（0和1）序列。字符串中的每个位对应时间表中的一个事件，时间表将根据指定的循环次数重复。
    - Comfy dtype: STRING
    - Python dtype: str
- interval
    - 间隔参数决定了序列中预定事件之间的间距。它是一个直接影响时间表时间的整数值。
    - Comfy dtype: INT
    - Python dtype: int
## Optional
- loops
    - 循环参数指定时间表应该重复多少次。它是一个可选的整数，允许定制时间表的持续时间。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- SCHEDULE
    - 输出时间表是一个字符串，代表基于输入的二进制字符串、间隔和循环生成的预定事件序列。它用于应用内的进一步处理或显示。
    - Comfy dtype: STRING
    - Python dtype: str
- show_text
    - show_text 输出提供了一个指向帮助文档的 URL，该文档提供了关于如何使用节点生成的时间表的额外信息和指导。
    - Comfy dtype: STRING
    - Python dtype: str

# Usage tips
- Infra type: CPU

# Source code
```
class CR_BitSchedule:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'binary_string': ('STRING', {'multiline': True, 'default': ''}), 'interval': ('INT', {'default': 1, 'min': 1, 'max': 99999}), 'loops': ('INT', {'default': 1, 'min': 1, 'max': 99999})}}
    RETURN_TYPES = ('STRING', 'STRING')
    RETURN_NAMES = ('SCHEDULE', 'show_text')
    FUNCTION = 'bit_schedule'
    CATEGORY = icons.get('Comfyroll/Animation/Schedule')

    def bit_schedule(self, binary_string, interval, loops=1):
        show_help = 'https://github.com/Suzie1/ComfyUI_Comfyroll_CustomNodes/wiki/Schedule-Nodes#cr-bit-schedule'
        schedule = []
        binary_string = binary_string.replace(' ', '').replace('\n', '')
        '\n        for i in range(len(binary_string) * loops):\n            index = i % len(binary_string)  # Use modulo to ensure the index continues in a single sequence\n            bit = int(binary_string[index])\n            schedule.append(f"{i},{bit}")\n        '
        for i in range(len(binary_string) * loops):
            schedule_index = i * interval
            bit_index = i % len(binary_string)
            bit = int(binary_string[bit_index])
            schedule.append(f'{schedule_index},{bit}')
        schedule_out = '\n'.join(schedule)
        return (schedule_out, show_help)
```