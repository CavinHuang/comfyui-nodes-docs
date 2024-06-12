# Documentation
- Class name: CR_SeedToInt
- Category: Comfyroll/Essential/Legacy
- Output node: False
- Repo Ref: https://github.com/RockOfFire/ComfyUI_Comfyroll_CustomNodes

CR_SeedToInt节点旨在将种子对象转换为整数。它在转换过程中扮演着关键角色，确保数据的完整性和可用性。该节点抽象了种子转换的复杂性，为进一步的数据操作和分析提供了一个简单的接口。

# Input types
## Required
- seed
    - 种子参数对节点的操作至关重要，因为它是节点处理的原始输入。它直接影响节点的输出，通过确定转换为整数的初始值。
    - Comfy dtype: SEED
    - Python dtype: Dict[str, Any]

# Output types
- INT
    - INT输出代表从输入种子派生的转换后的整数值。它很重要，因为它是节点功能的主要结果，可用于后续的计算任务。
    - Comfy dtype: INT
    - Python dtype: int
- show_help
    - show_help输出提供了一个URL链接到文档，以供进一步帮助。对于寻求有关节点操作及其在更广泛系统中上下文的更多信息的用户来说，这是有用的。
    - Comfy dtype: STRING
    - Python dtype: str

# Usage tips
- Infra type: CPU

# Source code
```
class CR_SeedToInt:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'seed': ('SEED',)}}
    RETURN_TYPES = ('INT', 'STRING')
    RETURN_NAMES = ('INT', 'show_help')
    FUNCTION = 'seed_to_int'
    CATEGORY = icons.get('Comfyroll/Essential/Legacy')

    def seed_to_int(self, seed):
        show_help = 'https://github.com/Suzie1/ComfyUI_Comfyroll_CustomNodes/wiki/Conversion-Nodes#cr-seed-to-int'
        return (seed.get('seed'), show_help)
```