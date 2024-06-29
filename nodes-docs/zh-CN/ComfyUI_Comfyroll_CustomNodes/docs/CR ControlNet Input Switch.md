# Documentation
- Class name: CR_ControlNetInputSwitch
- Category: Comfyroll/Utils/Logic
- Output node: False
- Repo Ref: https://github.com/RockOfFire/ComfyUI_Comfyroll_CustomNodes

CR_ControlNetInputSwitch 节点旨在为控制网络提供条件切换机制。它允许用户根据输入值在两个控制网络之间进行选择，从而方便地将数据路由到所需的网络路径。

# Input types
## Required
- Input
    - ‘Input’参数对于决定使用哪个控制网络至关重要。它通过指定要选定的控制网络的索引，决定了节点内部的执行流程。
    - Comfy dtype: INT
    - Python dtype: int
## Optional
- control_net1
    - ‘control_net1’参数代表节点可以选择的第一个控制网络。当‘Input’参数设置为1时，它在节点的决策过程中扮演着重要角色。
    - Comfy dtype: CONTROL_NET
    - Python dtype: str
- control_net2
    - ‘control_net2’参数代表节点可以选择的第二个控制网络。当‘Input’参数设置为2时，它变得相关，指导节点的选择。
    - Comfy dtype: CONTROL_NET
    - Python dtype: str

# Output types
- CONTROL_NET
    - ‘CONTROL_NET’输出提供了基于输入值选定的控制网络。它是主要的输出，将节点做出的决策向前推进到工作流中。
    - Comfy dtype: CONTROL_NET
    - Python dtype: str
- show_help
    - ‘show_help’输出是一个URL，提供了如何有效使用节点的额外信息和指导。它是次要输出，为用户提供了访问节点文档的途径。
    - Comfy dtype: STRING
    - Python dtype: str

# Usage tips
- Infra type: CPU

# Source code
```
class CR_ControlNetInputSwitch:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'Input': ('INT', {'default': 1, 'min': 1, 'max': 2}), 'control_net1': ('CONTROL_NET',), 'control_net2': ('CONTROL_NET',)}, 'optional': {'control_net1': ('CONTROL_NET',), 'control_net2': ('CONTROL_NET',)}}
    RETURN_TYPES = ('CONTROL_NET', 'STRING')
    RETURN_NAMES = ('CONTROL_NET', 'show_help')
    FUNCTION = 'switch'
    CATEGORY = icons.get('Comfyroll/Utils/Logic')

    def switch(self, Input, control_net1=None, control_net2=None):
        show_help = 'https://github.com/Suzie1/ComfyUI_Comfyroll_CustomNodes/wiki/Logic-Nodes#cr-controlnet-input-switch'
        if Input == 1:
            return (control_net1, show_help)
        else:
            return (control_net2, show_help)
```