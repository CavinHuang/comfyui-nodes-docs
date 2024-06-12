# Documentation
- Class name: MaqueradeIncrementerNode
- Category: Masquerade Nodes
- Output node: False
- Repo Ref: https://github.com/BadCafeCode/masquerade-nodes-comfyui

伪装增量节点旨在数据处理流程中执行一个简单但至关重要的操作。它接受一个种子值和一个上限值，通过应用模运算确保输出值保持在指定范围内。此节点在维护数据序列的完整性和顺序方面至关重要，特别是在循环模式或有界数值至关重要的场景中。

# Input types
## Required
- seed
    - “种子”参数是增量操作的起始点。它至关重要，因为它决定了节点开始计算的初始值。种子对于确保输出的可重复性和一致性至关重要，特别是在迭代过程或模拟中。
    - Comfy dtype: INT
    - Python dtype: int
- max_value
    - “最大值”参数定义了增量操作的上限。它之所以重要，是因为它确保输出不会超过某个阈值，这对于保持数据在预期范围内的有效性至关重要。此参数在控制节点输出范围方面发挥着关键作用。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- result
    - “结果”输出是将模运算应用于输入种子和最大值的结果。它表示一个被限制在指定范围内的值，适用于需要循环或有界数值数据的应用。
    - Comfy dtype: INT
    - Python dtype: int

# Usage tips
- Infra type: CPU

# Source code
```
class MaqueradeIncrementerNode:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'seed': ('INT', {'default': 0, 'min': -1, 'max': 18446744073709551615, 'step': 1}), 'max_value': ('INT', {'default': 1, 'min': 1, 'max': 18446744073709551615, 'step': 1})}}
    RETURN_TYPES = ('INT',)
    FUNCTION = 'increment'
    CATEGORY = 'Masquerade Nodes'

    def increment(self, seed, max_value):
        return (seed % max_value,)
```