# Documentation
- Class name: CR_Trigger
- Category: Comfyroll/Utils/Index
- Output node: False
- Repo Ref: https://github.com/RockOfFire/ComfyUI_Comfyroll_CustomNodes

CR_Trigger节点旨在执行条件检查，确定给定的索引是否匹配指定的触发值。它在控制系统中的数据流和执行方面起着关键作用，允许基于索引条件进行选择性处理。

# Input types
## Required
- index
    - ‘index’参数对于节点的操作至关重要，因为它表示正在评估的序列中的当前位置或标识符。它用于建立一个条件，当该条件满足时，节点将触发响应。
    - Comfy dtype: INT
    - Python dtype: int
- trigger_value
    - ‘trigger_value’参数定义了索引必须匹配的特定值，以便节点将条件视为满足。它是节点决策过程中的关键决定因素，并直接影响节点的输出。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- index
    - ‘index’输出反映了节点评估的当前索引值。它很重要，因为它提供了被检查的序列中的位置的参考。
    - Comfy dtype: INT
    - Python dtype: int
- trigger
    - ‘trigger’输出是一个布尔值，指示索引是否与触发值匹配。对于依赖于知道条件是否满足的下游流程至关重要。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool
- show_help
    - ‘show_help’输出提供了指向节点文档的URL链接，为用户提供了直接参考该节点使用指南和额外信息的途径。
    - Comfy dtype: STRING
    - Python dtype: str

# Usage tips
- Infra type: CPU

# Source code
```
class CR_Trigger:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'index': ('INT', {'default': 0.0, 'min': 0.0, 'max': 9999.0, 'step': 1.0}), 'trigger_value': ('INT', {'default': 1, 'min': 0, 'max': 10000})}}
    RETURN_TYPES = ('INT', 'BOOLEAN', 'STRING')
    RETURN_NAMES = ('index', 'trigger', 'show_help')
    FUNCTION = 'trigger'
    CATEGORY = icons.get('Comfyroll/Utils/Index')

    def trigger(self, index, trigger_value):
        show_help = 'https://github.com/Suzie1/ComfyUI_Comfyroll_CustomNodes/wiki/Index-Nodes#cr-trigger'
        return (index, index == trigger_value, show_help)
```