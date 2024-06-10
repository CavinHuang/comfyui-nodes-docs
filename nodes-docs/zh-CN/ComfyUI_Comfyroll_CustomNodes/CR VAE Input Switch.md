# Documentation
- Class name: CR_VAEInputSwitch
- Category: Comfyroll/Utils/Logic
- Output node: False
- Repo Ref: https://github.com/RockOfFire/ComfyUI_Comfyroll_CustomNodes

CR_VAEInputSwitch 是一个用于根据指定的选择输入在两个不同的变分自编码器（VAE）模型之间有条件地路由输入的节点。它通过评估 'Input' 参数并相应地引导流程来操作，从而实现两个不同VAE配置之间的无缝集成和切换。

# Input types
## Required
- Input
    - ‘Input’ 参数在确定节点将使用哪个 VAE 模型中起着关键作用。它作为一个开关，决定了数据在可用选项之间的流动，其中‘1’对应于 VAE1，‘2’对应于 VAE2。
    - Comfy dtype: INT
    - Python dtype: int
## Optional
- VAE1
    - ‘VAE1’ 参数表示节点可以选择的第一个 VAE 模型。当‘Input’参数设置为‘1’时，它是一个可选输入，允许在工作流程中使用这个特定的模型。
    - Comfy dtype: VAE
    - Python dtype: VAE model object
- VAE2
    - ‘VAE2’ 参数表示节点可以选择的第二个 VAE 模型。当‘Input’参数设置为‘2’时，它是一个可选输入，允许在这个过程中使用这个替代模型。
    - Comfy dtype: VAE
    - Python dtype: VAE model object

# Output types
- VAE
    - ‘VAE’ 输出根据 ‘Input’ 参数提供所选的 VAE 模型，允许在下游节点中进行进一步的处理或分析。
    - Comfy dtype: VAE
    - Python dtype: VAE model object
- show_help
    - ‘show_help’ 输出提供了一个 URL 链接到文档页面，以获取有关节点功能的额外指导或信息。
    - Comfy dtype: STRING
    - Python dtype: str

# Usage tips
- Infra type: CPU

# Source code
```
class CR_VAEInputSwitch:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'Input': ('INT', {'default': 1, 'min': 1, 'max': 2})}, 'optional': {'VAE1': ('VAE', {'forceInput': True}), 'VAE2': ('VAE', {'forceInput': True})}}
    RETURN_TYPES = ('VAE', 'STRING')
    RETURN_NAMES = ('VAE', 'show_help')
    FUNCTION = 'switch'
    CATEGORY = icons.get('Comfyroll/Utils/Logic')

    def switch(self, Input, VAE1=None, VAE2=None):
        show_help = 'https://github.com/Suzie1/ComfyUI_Comfyroll_CustomNodes/wiki/Logic-Nodes#cr-vae-input-switch'
        if Input == 1:
            return (VAE1, show_help)
        else:
            return (VAE2, show_help)
```