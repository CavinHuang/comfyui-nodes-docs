# Documentation
- Class name: SeedEverywhere
- Category: Initialization
- Output node: True
- Repo Ref: https://github.com/chrisgoringe/cg-use-everywhere

SeedEverywhere节点旨在确保系统不同部分的随机操作的可重复性。它通过为随机数生成器设置种子来实现这一点，这对于需要一致结果的科学实验和模拟至关重要。

# Input types
## Required
- seed
    - “seed”参数对于将随机数生成器初始化为已知状态至关重要。这确保了每次执行节点时，随后的随机操作将产生相同的结果，这对于在各种应用中获得一致和可比较的结果至关重要。
    - Comfy dtype: INT
    - Python dtype: int
## Optional
- id
    - “id”参数虽然不是必需的，但作为节点发送的消息的标识符。在同时运行节点的多个实例的系统中，这可能特别有用，因为它有助于跟踪和管理来自不同实例的消息。
    - Comfy dtype: UNIQUE_ID
    - Python dtype: str

# Output types
- seed
    - 输出的“seed”与提供给节点的输入相同，表示节点执行后随机数生成器的状态。这可以用于需要一致随机状态的进一步操作，确保随机过程的连续性。
    - Comfy dtype: INT
    - Python dtype: int

# Usage tips
- Infra type: CPU

# Source code
```
class SeedEverywhere(Base):

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'seed': ('INT', {'default': 0, 'min': 0, 'max': 18446744073709551615})}, 'hidden': {'id': 'UNIQUE_ID'}}
    RETURN_TYPES = ('INT',)

    def func(self, seed, id):
        message(id, seed)
        return (seed,)
```