# Documentation
- Class name: CR_ModelInputSwitch
- Category: Comfyroll/Utils/Logic
- Output node: False
- Repo Ref: https://github.com/RockOfFire/ComfyUI_Comfyroll_CustomNodes

CR_ModelInputSwitch 节点旨在根据输入值在两个提供的模型之间进行选择。它在工作流中简化模型选择过程方面发挥关键作用，允许在没有复杂分支逻辑的情况下进行条件模型署。

# Input types
## Required
- Input
    - ‘Input’ 参数对于决定选择哪个模型至关重要。它指导节点的逻辑根据其值选择 ‘model1’ 或 ‘model2’，从而影响节点的输出。
    - Comfy dtype: INT
    - Python dtype: int
## Optional
- model1
    - ‘model1’ 参数代表节点可以选择的第一个模型。当 ‘Input’ 参数设置为 1 时，它是一个可选输入，变得重要。
    - Comfy dtype: MODEL
    - Python dtype: Any
- model2
    - ‘model2’ 参数代表节点可以选择的第二个模型。当 ‘Input’ 参数不等于 1 时，它被考虑，在这种情况下决定输出。
    - Comfy dtype: MODEL
    - Python dtype: Any

# Output types
- MODEL
    - ‘MODEL’ 输出是基于 ‘Input’ 参数选择的模型。它代表了节点关于提供哪个模型的决策过程的结果。
    - Comfy dtype: MODEL
    - Python dtype: Any
- show_help
    - ‘show_help’ 输出提供了指向节点文档的 URL，提供关于如何有效使用节点的额外信息和指导。
    - Comfy dtype: STRING
    - Python dtype: str

# Usage tips
- Infra type: CPU

# Source code
```
class CR_ModelInputSwitch:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'Input': ('INT', {'default': 1, 'min': 1, 'max': 2})}, 'optional': {'model1': ('MODEL',), 'model2': ('MODEL',)}}
    RETURN_TYPES = ('MODEL', 'STRING')
    RETURN_NAMES = ('MODEL', 'show_help')
    FUNCTION = 'switch'
    CATEGORY = icons.get('Comfyroll/Utils/Logic')

    def switch(self, Input, model1=None, model2=None):
        show_help = 'https://github.com/Suzie1/ComfyUI_Comfyroll_CustomNodes/wiki/Logic-Nodes#cr-model-input-switch'
        if Input == 1:
            return (model1, show_help)
        else:
            return (model2, show_help)
```