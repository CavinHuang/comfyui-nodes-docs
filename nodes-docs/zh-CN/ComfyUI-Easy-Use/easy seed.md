# Documentation
- Class name: easySeed
- Category: EasyUse/Seed
- Output node: True
- Repo Ref: https://github.com/yolain/ComfyUI-Easy-Use.git

该节点旨在为各种流程生成随机种子，确保系统在随机元素中具有一定的可复现性和可控性。

# Input types
## Required
- seed
    - 种子参数对节点的运行至关重要，因为它决定了随机数生成的起点，从而影响随机过程的结果。
    - Comfy dtype: INT
    - Python dtype: int
## Optional
- prompt
    - 虽然提示不是必需的，但它可以为节点的操作提供额外的上下文或指导，有可能使随机性更加精细，以符合特定的目标。
    - Comfy dtype: PROMPT
    - Python dtype: str
- extra_pnginfo
    - 这个参数虽然是可选的，但可以提供额外的信息，这些信息可能用于增强功能或调整节点在图像处理任务中的行为。
    - Comfy dtype: EXTRA_PNGINFO
    - Python dtype: str
- my_unique_id
    - 提供唯一ID参数有助于跟踪和管理节点的多个实例的执行，有助于整个工作流的组织。
    - Comfy dtype: UNIQUE_ID
    - Python dtype: str

# Output types
- seed
    - 输出的种子代表了生成的随机数，作为后续依赖于此初始随机点的操作的参考。
    - Comfy dtype: INT
    - Python dtype: int

# Usage tips
- Infra type: CPU

# Source code
```
class easySeed:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'seed': ('INT', {'default': 0, 'min': 0, 'max': MAX_SEED_NUM})}, 'hidden': {'prompt': 'PROMPT', 'extra_pnginfo': 'EXTRA_PNGINFO', 'my_unique_id': 'UNIQUE_ID'}}
    RETURN_TYPES = ('INT',)
    RETURN_NAMES = ('seed',)
    FUNCTION = 'doit'
    CATEGORY = 'EasyUse/Seed'
    OUTPUT_NODE = True

    def doit(self, seed=0, prompt=None, extra_pnginfo=None, my_unique_id=None):
        return (seed,)
```