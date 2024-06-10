# Documentation
- Class name: CR_ModelAndCLIPInputSwitch
- Category: Comfyroll/Utils/Logic
- Output node: False
- Repo Ref: https://github.com/RockOfFire/ComfyUI_Comfyroll_CustomNodes

CR_ModelAndCLIPInputSwitch 是一个用于基于二进制输入选择两组模型和CLIP输入的节点。它作为一个决策节点，允许用户在两种不同的模型及其对应的CLIP表示之间进行选择。在需要条件逻辑来确定在后续处理步骤中使用哪个模型和CLIP的场景中，该节点的功能至关重要。

# Input types
## Required
- Input
    - 'Input' 参数是一个关键的二进制选择器，它决定了节点将使用哪组模型和CLIP输入。它直接影响节点的决策过程，根据其值启用基于条件的输入路由。
    - Comfy dtype: INT
    - Python dtype: int
- model1
    - 'model1' 参数代表当 'Input' 参数设置为 1 时使用的第一种模型输入。它在节点的操作中扮演着重要角色，因为它定义了满足第一个条件时要处理的模型。
    - Comfy dtype: MODEL
    - Python dtype: Any
- clip1
    - 'clip1' 参数对应于与第一种模型相关联的CLIP输入。它是节点执行的关键，因为它提供了当选择第一种模型时所需的CLIP表示。
    - Comfy dtype: CLIP
    - Python dtype: Any
- model2
    - 'model2' 参数表示当 'Input' 参数设置为 2 时使用第二种模型输入。它对节点的功能至关重要，因为它决定了在满足第二个条件时需要处理的模型。
    - Comfy dtype: MODEL
    - Python dtype: Any
- clip2
    - 'clip2' 参数是与第二种模型配对的CLIP输入。它是节点功能不可或缺的一部分，因为它提供了当选择第二种模型时所需的CLIP表示。
    - Comfy dtype: CLIP
    - Python dtype: Any

# Output types
- MODEL
    - 'MODEL' 输出根据 'Input' 参数提供所选模型。它是节点输出的关键组成部分，确保适当的模型被转发以供进一步处理。
    - Comfy dtype: MODEL
    - Python dtype: Any
- CLIP
    - 'CLIP' 输出提供与所选模型相对应的CLIP表示。它在确保节点输出全面，包括模型及其相关联的CLIP方面发挥着重要作用。
    - Comfy dtype: CLIP
    - Python dtype: Any
- show_help
    - 'show_help' 输出提供了指向节点文档页面的URL链接，使用户能够轻松访问有关如何有效使用节点的额外信息和指导。
    - Comfy dtype: STRING
    - Python dtype: str

# Usage tips
- Infra type: CPU

# Source code
```
class CR_ModelAndCLIPInputSwitch:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'Input': ('INT', {'default': 1, 'min': 1, 'max': 2}), 'model1': ('MODEL',), 'clip1': ('CLIP',), 'model2': ('MODEL',), 'clip2': ('CLIP',)}}
    RETURN_TYPES = ('MODEL', 'CLIP', 'STRING')
    RETURN_NAMES = ('MODEL', 'CLIP', 'show_help')
    FUNCTION = 'switch'
    CATEGORY = icons.get('Comfyroll/Utils/Logic')

    def switch(self, Input, clip1, clip2, model1, model2):
        show_help = 'https://github.com/Suzie1/ComfyUI_Comfyroll_CustomNodes/wiki/Logic-Nodes#cr-switch-model-and-clip'
        if Input == 1:
            return (model1, clip1, show_help)
        else:
            return (model2, clip2, show_help)
```