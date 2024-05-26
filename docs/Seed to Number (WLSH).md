# Documentation
- Class name: WLSH_Seed_to_Number
- Category: WLSH Nodes/number
- Output node: False
- Repo Ref: https://github.com/wallish77/wlsh_nodes

该节点旨在将输入数据转换为数字表示，便于在系统内处理和分析数据。

# Input types
## Required
- seed
    - 种子参数至关重要，因为它提供了节点执行转换功能所必需的原始数据。
    - Comfy dtype: SEED
    - Python dtype: Dict[str, Any]

# Output types
- number
    - 输出是从输入派生的数字表示，这对于系统内进一步的计算过程至关重要。
    - Comfy dtype: INT
    - Python dtype: int

# Usage tips
- Infra type: CPU

# Source code
```
class WLSH_Seed_to_Number:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'seed': ('SEED',)}}
    RETURN_TYPES = ('INT',)
    FUNCTION = 'number_to_seed'
    CATEGORY = 'WLSH Nodes/number'

    def number_to_seed(self, seed):
        return (int(seed['seed']),)
```