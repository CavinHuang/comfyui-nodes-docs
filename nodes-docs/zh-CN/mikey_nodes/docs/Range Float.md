# Documentation
- Class name: RangeFloat
- Category: Mikey/Utils
- Output node: False
- Repo Ref: https://github.com/bash-j/mikey_nodes

RangeFloat节点旨在创建一个指定范围内的浮点数序列。它通过从一个起点到一个终点以给定的步长生成数字列表，然后根据种子值从这个列表中选择一个数字。这个节点在需要控制数字随机化的情境中特别有用，例如在模拟或数据处理任务中。

# Input types
## Required
- start
    - 参数'start'定义了生成数字的范围的开始。它至关重要，因为它设定了序列的初始点，并决定了范围的方向（无论是增加还是减少）。这个参数直接影响输出数字和节点的整体行为。
    - Comfy dtype: FLOAT
    - Python dtype: float
- end
    - 参数'end'指定了范围的终点。它至关重要，因为它决定了生成数字序列中的最终值。'end'值与'start'和'step'参数结合使用，决定了在范围内产生的数字总数。
    - Comfy dtype: FLOAT
    - Python dtype: float
## Optional
- step
    - 参数'step'决定了生成序列中每个连续数字之间的增量。它很重要，因为它控制了范围内数字的密度。较小的步长会产生更细粒度的输出，而较大的步长则会导致更粗略的分布。
    - Comfy dtype: FLOAT
    - Python dtype: float
- seed
    - 参数'seed'用于在从生成的列表中选择数字时引入可控的随机性元素。它很重要，因为它确保选择过程是可重复的，并且可以调整以获得不同的结果，而无需更改底层范围。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- selected_number
    - 输出'selected_number'代表从生成的序列中选择的浮点数。它很重要，因为它是节点操作的主要结果，并且可以用于进一步的处理或分析。
    - Comfy dtype: FLOAT
    - Python dtype: float
- representation
    - 输出'representation'提供了所选数字的字符串表示形式，这对于记录、显示或需要文本格式的场景非常有用。
    - Comfy dtype: STRING
    - Python dtype: str

# Usage tips
- Infra type: CPU

# Source code
```
class RangeFloat:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'start': ('FLOAT', {'default': 0, 'min': 0, 'step': 0.0001, 'max': 18446744073709551615}), 'end': ('FLOAT', {'default': 0, 'min': 0, 'step': 0.0001, 'max': 18446744073709551615}), 'step': ('FLOAT', {'default': 0, 'min': 0, 'step': 0.0001, 'max': 18446744073709551615}), 'seed': ('INT', {'default': 0, 'min': 0, 'max': 18446744073709551615})}}
    RETURN_TYPES = ('FLOAT', 'STRING')
    FUNCTION = 'generate'
    CATEGORY = 'Mikey/Utils'

    def generate(self, start, end, step, seed):
        range_ = np.arange(start, end, step)
        list_of_numbers = list(range_)
        offset = seed % len(list_of_numbers)
        return (list_of_numbers[offset], f'{list_of_numbers[offset]}')
```