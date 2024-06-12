# Documentation
- Class name: RangeInteger
- Category: Mikey/Utils
- Output node: False
- Repo Ref: https://github.com/bash-j/mikey_nodes

RangeInteger节点旨在生成指定范围内的整数序列。它提供功能以自定义序列的起始点、结束点和步长，以及使用种子选项来复现序列。在需要对整数序列进行进一步处理或分析的场景中，此节点至关重要。

# Input types
## Required
- start
    - ‘start’参数定义了整数序列的开始。它至关重要，因为它设置了序列生成的初始值。此参数直接影响节点产生的序列的范围和第一个元素。
    - Comfy dtype: INT
    - Python dtype: int
- end
    - ‘end’参数指定整数序列的排他上限。它很重要，因为它决定了序列的终点，即最后一个元素之后的值。此参数对于定义序列的范围至关重要。
    - Comfy dtype: INT
    - Python dtype: int
## Optional
- step
    - ‘step’参数指示序列中每个整数之间的增量。它很重要，因为它控制序列内数字的间距，允许定制进度速率。默认值为0，如果未指定，则意味着步长为1。
    - Comfy dtype: INT
    - Python dtype: int
- seed
    - ‘seed’参数用于在序列生成过程中引入一定程度的随机性控制。它对于确保序列的可复现性很重要，在需要一致结果的实验或模拟中至关重要。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- integer
    - ‘integer’输出提供了生成序列中的一个整数，由输入参数和种子值确定。它很重要，因为它代表了节点操作的主要结果，作为后续计算或分析的基础。
    - Comfy dtype: INT
    - Python dtype: int
- string
    - ‘string’输出返回序列中选定整数的字符串表示。当需要整数的文本表示时，如日志记录或显示目的，此输出非常有用。
    - Comfy dtype: STRING
    - Python dtype: str

# Usage tips
- Infra type: CPU

# Source code
```
class RangeInteger:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'start': ('INT', {'default': 0, 'min': 0, 'max': 18446744073709551615}), 'end': ('INT', {'default': 0, 'min': 0, 'max': 18446744073709551615}), 'step': ('INT', {'default': 0, 'min': 0, 'max': 18446744073709551615}), 'seed': ('INT', {'default': 0, 'min': 0, 'max': 18446744073709551615})}}
    RETURN_TYPES = ('INT', 'STRING')
    FUNCTION = 'generate'
    CATEGORY = 'Mikey/Utils'

    def generate(self, start, end, step, seed):
        range_ = np.arange(start, end, step)
        list_of_numbers = list(range_)
        offset = seed % len(list_of_numbers)
        return (list_of_numbers[offset], f'{list_of_numbers[offset]}')
```