# Documentation
- Class name: CR_ConditioningInputSwitch
- Category: Comfyroll/Utils/Logic
- Output node: False
- Repo Ref: https://github.com/RockOfFire/ComfyUI_Comfyroll_CustomNodes

CR_ConditioningInputSwitch 节点旨在根据条件输入管理数据流。它允许根据 'Input' 参数的值选择两个条件输入中的一个。该节点在复杂工作流中起着关键作用，可以指导数据流，实现条件逻辑，而无需使用嵌套结构。

# Input types
## Required
- Input
    - 'Input' 参数对于确定将选择哪个条件数据至关重要。它作为一个开关，其中值为 1 时选择 'conditioning1'，其他任何值则选择 'conditioning2'。此参数直接影响节点的输出，在工作流中促进决策过程。
    - Comfy dtype: INT
    - Python dtype: int
## Optional
- conditioning1
    - 'conditioning1' 参数是可选输入之一，当 'Input' 参数等于 1 时将使用它。它代表一组条件数据，当满足指定条件时可以使用，允许将特定于上下文的信息无缝集成到工作流中。
    - Comfy dtype: CONDITIONING
    - Python dtype: Any
- conditioning2
    - 'conditioning2' 参数是 'conditioning1' 的替代输入，当 'Input' 参数不等于 1 时将被调用。它允许根据不同的条件提供不同的条件数据，确保节点在不同场景中的灵活性和适应性。
    - Comfy dtype: CONDITIONING
    - Python dtype: Any

# Output types
- CONDITIONING
    - 'CONDITIONING' 输出是基于 'Input' 参数值选择的条件数据。它代表了节点条件逻辑的结果，为工作流中的后续步骤提供必要的信息。
    - Comfy dtype: CONDITIONING
    - Python dtype: Any
- show_help
    - 'show_help' 输出提供了指向节点文档的 URL 链接，使用户能够快速访问有关如何有效使用节点的附加信息和指导。
    - Comfy dtype: STRING
    - Python dtype: str

# Usage tips
- Infra type: CPU

# Source code
```
class CR_ConditioningInputSwitch:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'Input': ('INT', {'default': 1, 'min': 1, 'max': 2})}, 'optional': {'conditioning1': ('CONDITIONING',), 'conditioning2': ('CONDITIONING',)}}
    RETURN_TYPES = ('CONDITIONING', 'STRING')
    RETURN_NAMES = ('CONDITIONING', 'show_help')
    FUNCTION = 'switch'
    CATEGORY = icons.get('Comfyroll/Utils/Logic')

    def switch(self, Input, conditioning1=None, conditioning2=None):
        show_help = 'https://github.com/Suzie1/ComfyUI_Comfyroll_CustomNodes/wiki/Logic-Nodes#cr-conditioning-input-switch'
        if Input == 1:
            return (conditioning1, show_help)
        else:
            return (conditioning2, show_help)
```