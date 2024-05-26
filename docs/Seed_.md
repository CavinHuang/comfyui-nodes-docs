# Documentation
- Class name: CreateSeedNode
- Category: ♾️Mixlab/Utils
- Output node: True
- Repo Ref: https://github.com/shadowcz007/comfyui-mixlab-nodes.git

该节点用于生成用于各种随机化过程的种子值，确保随机性在需要时可以控制和复制。

# Input types
## Required
- seed
    - 种子参数对于初始化随机数生成器至关重要，可以在随机过程中产生可重复和可预测的结果。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- seed
    - 输出的种子值作为初始化的随机化过程的参考，指示从中派生随机性的特定状态。
    - Comfy dtype: INT
    - Python dtype: int

# Usage tips
- Infra type: CPU

# Source code
```
class CreateSeedNode:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'seed': ('INT', {'default': 0, 'min': 0, 'max': 18446744073709551615})}}
    RETURN_TYPES = ('INT',)
    RETURN_NAMES = ('seed',)
    OUTPUT_NODE = True
    FUNCTION = 'run'
    CATEGORY = '♾️Mixlab/Utils'

    def run(self, seed):
        return (seed,)
```