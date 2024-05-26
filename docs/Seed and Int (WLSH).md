# Documentation
- Class name: WLSH_Seed_and_Int
- Category: WLSH Nodes/number
- Output node: False
- Repo Ref: https://github.com/wallish77/wlsh_nodes

该节点根据给定的种子生成一个种子和整数值的配对，于在系统中创建和管理唯一标识符。

# Input types
## Required
- seed
    - 种子是启动生成唯一整数过程的基本参数。它对于确保结果的一致性和可重复性至关重要。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- seed
    - 输出种子是原始输入种子，标志着其在操作中作为标识符的角色。整型输出是种子的转换，表明其在过程中的重要性。
    - Comfy dtype: INT
    - Python dtype: int
- int_representation
    - 整型表示是从输入种子派生出来的，作为节点功能中不可或缺的唯一输出。
    - Comfy dtype: SEED
    - Python dtype: Dict[str, int]

# Usage tips
- Infra type: CPU

# Source code
```
class WLSH_Seed_and_Int:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'seed': ('INT', {'default': 0, 'min': 0, 'max': 18446744073709551615})}}
    RETURN_TYPES = ('INT', 'SEED')
    FUNCTION = 'seed_and_int'
    CATEGORY = 'WLSH Nodes/number'

    def seed_and_int(self, seed):
        return (seed, {'seed': seed})
```