# Documentation
- Class name: CR_CurrentFrame
- Category: Comfyroll/Animation/Utils
- Output node: False
- Repo Ref: https://github.com/RockOfFire/ComfyUI_Comfyroll_CustomNodes

CR_CurrentFrame 节点旨在便于在控制台环境中记录和显示当前帧索引。它为开发者提供了一个工具，用于追踪动画或一系列帧的进度。

# Input types
## Required
- index
    - ‘index’参数表示动画序列中的当前帧索引。它对节点至关重要，因为它决定了正在记录或监控的特定帧。
    - Comfy dtype: INT
    - Python dtype: int
- print_to_console
    - ‘print_to_console’参数决定是否应将当前帧索引打印到控制台。它是控制节点输出可见性的重要开关。
    - Comfy dtype: COMBO['Yes', 'No']
    - Python dtype: str

# Output types
- index
    - ‘index’输出提供了节点处理的当前帧索引，可以在动画工作流程中用于进一步的操作或分析。
    - Comfy dtype: INT
    - Python dtype: int

# Usage tips
- Infra type: CPU

# Source code
```
class CR_CurrentFrame:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'index': ('INT', {'default': 1, 'min': -10000, 'max': 10000}), 'print_to_console': (['Yes', 'No'],)}}
    RETURN_TYPES = ('INT',)
    RETURN_NAMES = ('index',)
    FUNCTION = 'to_console'
    CATEGORY = icons.get('Comfyroll/Animation/Utils')

    def to_console(self, index, print_to_console):
        if print_to_console == 'Yes':
            print(f'[Info] CR Current Frame:{index}')
        return (index,)
```