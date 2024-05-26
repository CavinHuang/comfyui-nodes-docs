# Documentation
- Class name: CR_ImageInputSwitch4way
- Category: Comfyroll/Utils/Logic
- Output node: False
- Repo Ref: https://github.com/RockOfFire/ComfyUI_Comfyroll_CustomNodes

CR_ImageInputSwitch4way 节点旨在根据整数输入条件性地选择图像输入。它通过逻辑开关机制促进图像数据的路由，确保选择并传递适当的图像。在需要动态选择图像且不希望增加额外条件逻辑的情境中，此节点至关重要。

# Input types
## Required
- Input
    - ‘Input’ 参数至关重要，因为它决定了将选择四个可能的图像输入中的哪一个。它作为一个开关操作，整数值对应于要通过节点路由的图像的索引。
    - Comfy dtype: INT
    - Python dtype: int
## Optional
- image1
    - ‘image1’ 参数表示第一个可选图像输入，根据‘Input’参数，可以被节点选择。当‘Input’设置为1时，它在节点的操作中扮演重要角色，成为主要的输出图像。
    - Comfy dtype: IMAGE
    - Python dtype: Union[str, torch.Tensor]
- image2
    - ‘image2’ 参数是节点根据‘Input’值可以选择的第二个可选图像输入。当‘Input’为2时，它变得相关，此时它是节点输出的图像。
    - Comfy dtype: IMAGE
    - Python dtype: Union[str, torch.Tensor]
- image3
    - ‘image3’ 参数是节点选择过程中的第三个可选图像输入。当‘Input’值为3时，它被使用，成为通过节点的选定图像。
    - Comfy dtype: IMAGE
    - Python dtype: Union[str, torch.Tensor]
- image4
    - ‘image4’ 参数是节点可以输出的第四个也是最后一个可选图像输入。仅当‘Input’设置为4时，它才被考虑，在这种情况下，它成为节点的输出图像。
    - Comfy dtype: IMAGE
    - Python dtype: Union[str, torch.Tensor]

# Output types
- IMAGE
    - ‘IMAGE’ 输出参数代表基于输入整数值选择的图像。它是节点操作的主要结果，对于继续图像处理工作流程至关重要。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- show_help
    - ‘show_help’ 输出提供了指向节点文档的URL，为用户提供了如何有效使用该节点的指导。它是了解节点功能和目的的有用资源。
    - Comfy dtype: STRING
    - Python dtype: str

# Usage tips
- Infra type: CPU

# Source code
```
class CR_ImageInputSwitch4way:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'Input': ('INT', {'default': 1, 'min': 1, 'max': 4})}, 'optional': {'image1': ('IMAGE',), 'image2': ('IMAGE',), 'image3': ('IMAGE',), 'image4': ('IMAGE',)}}
    RETURN_TYPES = ('IMAGE', 'STRING')
    RETURN_NAMES = ('IMAGE', 'show_help')
    FUNCTION = 'switch'
    CATEGORY = icons.get('Comfyroll/Utils/Logic')

    def switch(self, Input, image1=None, image2=None, image3=None, image4=None):
        show_help = 'https://github.com/Suzie1/ComfyUI_Comfyroll_CustomNodes/wiki/Logic-Nodes#cr-text-input-switch-4-way'
        if Input == 1:
            return (image1, show_help)
        elif Input == 2:
            return (image2, show_help)
        elif Input == 3:
            return (image3, show_help)
        else:
            return (image4, show_help)
```