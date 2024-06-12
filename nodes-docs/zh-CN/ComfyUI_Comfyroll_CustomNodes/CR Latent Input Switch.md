# Documentation
- Class name: CR_LatentInputSwitch
- Category: Comfyroll/Utils/Logic
- Output node: False
- Repo Ref: https://github.com/RockOfFire/ComfyUI_Comfyroll_CustomNodes

CR_LatentInputSwitch 节点旨在根据输入值管理两种潜在状态之间的选择。它在工作流中作为一个决策组件，允许数据通过系统进行条件路由。在需要动态选择不同的潜在表示的场景中，该节点的功能至关重要。

# Input types
## Required
- Input
    - ‘Input’参数至关重要，因为它决定了节点将选择哪个潜在状态。它是一个整数，范围应在1到2之间，其中1对应第一个潜在状态，2对应第二个。这个决策变量对节点的操作至关重要，因为它直接影响输出选择。
    - Comfy dtype: INT
    - Python dtype: int
## Optional
- latent1
    - ‘latent1’参数代表节点可以选择的第一个潜在状态。它是可选的，并且当‘Input’参数设置为1时变得重要，在这种情况下，‘latent1’是节点将返回的输出。
    - Comfy dtype: LATENT
    - Python dtype: Union[torch.Tensor, None]
- latent2
    - ‘latent2’参数表示可供选择的第二个潜在状态。它也是可选的，当‘Input’参数设置为2时被考虑，导致‘latent2’成为节点返回的输出。
    - Comfy dtype: LATENT
    - Python dtype: Union[torch.Tensor, None]

# Output types
- LATENT
    - ‘LATENT’输出代表了基于‘Input’参数选择的潜在状态。它是节点的主要输出，并携带了从‘latent1’或‘latent2’中条件选择的潜在数据。
    - Comfy dtype: LATENT
    - Python dtype: torch.Tensor
- show_help
    - ‘show_help’输出提供了一个URL链接到节点的文档页面，以获得更多帮助。它作为次要输出被包含，以指导用户寻求有关节点使用和功能的更多信息。
    - Comfy dtype: STRING
    - Python dtype: str

# Usage tips
- Infra type: CPU

# Source code
```
class CR_LatentInputSwitch:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'Input': ('INT', {'default': 1, 'min': 1, 'max': 2})}, 'optional': {'latent1': ('LATENT',), 'latent2': ('LATENT',)}}
    RETURN_TYPES = ('LATENT', 'STRING')
    RETURN_NAMES = ('LATENT', 'show_help')
    FUNCTION = 'switch'
    CATEGORY = icons.get('Comfyroll/Utils/Logic')

    def switch(self, Input, latent1=None, latent2=None):
        show_help = 'https://github.com/Suzie1/ComfyUI_Comfyroll_CustomNodes/wiki/Logic-Nodes#cr-latent-input-switch'
        if Input == 1:
            return (latent1, show_help)
        else:
            return (latent2, show_help)
```