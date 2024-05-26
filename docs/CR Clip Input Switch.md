# Documentation
- Class name: CR_ClipInputSwitch
- Category: Comfyroll/Utils/Logic
- Output node: False
- Repo Ref: https://github.com/RockOfFire/ComfyUI_Comfyroll_CustomNodes

CR_ClipInputSwitch 是一个实用工具节点，旨在提供两个输入剪辑之间的条件切换机制。它基于单个输入参数运行，允许用户根据输入的值在两个提供的剪辑之间进行选择。该节点的功能集中在其能力上，通过智能选择适当的剪辑来简化工作流程，以进行进一步的处理或展示。

# Input types
## Required
- Input
    - ‘Input’参数对于节点的操作至关重要，因为它决定了将返回哪个剪辑。当‘Input’的值为1时，选择‘clip1’；否则，选择‘clip2’。这个参数的作用在根据用户的特定需求确定节点输出时至关重要。
    - Comfy dtype: INT
    - Python dtype: int
## Optional
- clip1
    - ‘clip1’参数是一个可选输入，代表节点可以选择的第一个剪辑。当‘Input’参数设置为1时，它在进一步处理中扮演重要角色，因为它是被选择的输出。
    - Comfy dtype: CLIP
    - Python dtype: Clip
- clip2
    - ‘clip2’参数是另一个可选输入，代表节点可以选择的第二个剪辑。当‘Input’参数不为1时，它的重要性显现出来，使‘clip2’成为后续操作的输出。
    - Comfy dtype: CLIP
    - Python dtype: Clip

# Output types
- CLIP
    - ‘CLIP’输出基于‘Input’参数的值代表所选择的剪辑。它是节点的主要输出，并用于进一步的视频处理或展示。
    - Comfy dtype: CLIP
    - Python dtype: Clip
- show_help
    - ‘show_help’输出提供了指向节点文档的URL链接，以提供额外的指导。它是一个次要输出，为用户提供了轻松访问有关节点使用和功能更多信息的途径。
    - Comfy dtype: STRING
    - Python dtype: str

# Usage tips
- Infra type: CPU

# Source code
```
class CR_ClipInputSwitch:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'Input': ('INT', {'default': 1, 'min': 1, 'max': 2})}, 'optional': {'clip1': ('CLIP',), 'clip2': ('CLIP',)}}
    RETURN_TYPES = ('CLIP', 'STRING')
    RETURN_NAMES = ('CLIP', 'show_help')
    FUNCTION = 'switch'
    CATEGORY = icons.get('Comfyroll/Utils/Logic')

    def switch(self, Input, clip1=None, clip2=None):
        show_help = 'https://github.com/Suzie1/ComfyUI_Comfyroll_CustomNodes/wiki/Logic-Nodes#cr-clip-input-switch'
        if Input == 1:
            return (clip1, show_help)
        else:
            return (clip2, show_help)
```