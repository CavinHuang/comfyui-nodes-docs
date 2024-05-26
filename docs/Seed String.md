# Documentation
- Class name: IntegerAndString
- Category: Mikey/Utils
- Output node: False
- Repo Ref: https://github.com/bash-j/mikey_nodes

IntegerAndString节点旨在将整数输入转换为其对应的字符串表示形式。它强调将数值数据转换为更易于人类阅读的格式的实用性，便于进行需要字符串操作或数值与文本数据之间交互的操作。

# Input types
## Required
- seed
    - 参数'seed'对节点至关重要，因为它是将被转换成字符串的初始整数值。它在确定输出中起着关键作用，因为节点的功能围绕这个转换过程展开。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- seed
    - 输出参数'seed'代表提供给节点的原始整数值。它标志着整数值在节点操作过程中的连续性，确保初始数值输入被保留。
    - Comfy dtype: INT
    - Python dtype: int
- seed_string
    - 输出参数'seed_string'是输入整数的字符串表示。它突出了节点的主要转换功能，展示了将数值数据转换为更易访问的文本格式的结果。
    - Comfy dtype: STRING
    - Python dtype: str

# Usage tips
- Infra type: CPU

# Source code
```
class IntegerAndString:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'seed': ('INT', {'default': 0, 'min': 0, 'max': 18446744073709551615})}}
    RETURN_TYPES = ('INT', 'STRING')
    RETURN_NAMES = ('seed', 'seed_string')
    FUNCTION = 'output'
    CATEGORY = 'Mikey/Utils'

    def output(self, seed):
        seed_string = str(seed)
        return (seed, seed_string)
```