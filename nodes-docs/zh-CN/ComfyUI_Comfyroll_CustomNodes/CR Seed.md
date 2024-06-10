# Documentation
- Class name: CR_Seed
- Category: Essential/Core
- Output node: True
- Repo Ref: https://github.com/RockOfFire/ComfyUI_Comfyroll_CustomNodes

CR_Seed节点旨在初始化和管理计算过程中用于随机数生成的种子。通过设置特定的种子值，它确保结果是可重现的，这对于调试和不同运行之间的一致性测试至关重要。

# Input types
## Required
- seed
    - 种子参数对于初始化随机数生成器至关重要。它决定了随机数生成的起始点，从而影响结果的可重复性。种子值应该是指定范围内的非负整数。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- seed
    - 输出种子与输入种子相同，表示用于初始化随机数生成器的值。它对于跟踪和确保过程的可重复性很重要。
    - Comfy dtype: INT
    - Python dtype: int
- show_help
    - show_help输出提供了一个指向与节点相关联的文档或帮助页面的URL链接。这对于需要关于如何有效使用节点的额外指导或信息的用户来说可能很有用。
    - Comfy dtype: STRING
    - Python dtype: str

# Usage tips
- Infra type: CPU

# Source code
```
class CR_Seed:

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'seed': ('INT', {'default': 0, 'min': 0, 'max': 18446744073709551615})}}
    RETURN_TYPES = ('INT', 'STRING')
    RETURN_NAMES = ('seed', 'show_help')
    FUNCTION = 'seedint'
    OUTPUT_NODE = True
    CATEGORY = icons.get('Comfyroll/Essential/Core')

    @staticmethod
    def seedint(seed):
        show_help = 'https://github.com/Suzie1/ComfyUI_Comfyroll_CustomNodes/wiki/Core-Nodes#cr-seed'
        return (seed, show_help)
```