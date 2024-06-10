# Documentation
- Class name: CR_ImageInputSwitch
- Category: Comfyroll/Utils/Logic
- Output node: False
- Repo Ref: https://github.com/RockOfFire/ComfyUI_Comfyroll_CustomNodes

CR_ImageInputSwitch 节点旨在根据单个整数输入有条件地选择两个图像输入之一。它通过评估整数值并返回相应的图像来操作，确保输出与输入选择一致。该节点在需要根据用户输入或其他条件逻辑动态改变图像数据流的场景中特别有用。

# Input types
## Required
- Input
    - ‘Input’ 参数是一个关键的整数，它决定了将选择哪个图像作为输出。它直接影响节点的决策过程，允许有条件地路由图像数据。
    - Comfy dtype: INT
    - Python dtype: int
## Optional
- image1
    - ‘image1’ 参数表示节点可以选择的第一个图像选项。当‘Input’值使得‘image1’是指定的输出时，它扮演着重要的角色。
    - Comfy dtype: IMAGE
    - Python dtype: PIL.Image or numpy.ndarray
- image2
    - ‘image2’ 参数是节点可选择的第二个图像选项。当‘Input’值指示‘image2’应该是输出图像时，它变得重要。
    - Comfy dtype: IMAGE
    - Python dtype: PIL.Image or numpy.ndarray

# Output types
- IMAGE
    - ‘IMAGE’ 输出是基于 ‘Input’ 参数选择的图像。它代表了节点条件逻辑的结果，对工作流中的进一步处理至关重要。
    - Comfy dtype: IMAGE
    - Python dtype: PIL.Image or numpy.ndarray
- show_help
    - ‘show_help’ 输出提供了指向节点文档的 URL，为用户提供了如何有效使用该节点的指导。
    - Comfy dtype: STRING
    - Python dtype: str

# Usage tips
- Infra type: CPU

# Source code
```
class CR_ImageInputSwitch:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'Input': ('INT', {'default': 1, 'min': 1, 'max': 2})}, 'optional': {'image1': ('IMAGE',), 'image2': ('IMAGE',)}}
    RETURN_TYPES = ('IMAGE', 'STRING')
    RETURN_NAMES = ('IMAGE', 'show_help')
    FUNCTION = 'switch'
    CATEGORY = icons.get('Comfyroll/Utils/Logic')

    def switch(self, Input, image1=None, image2=None):
        show_help = 'https://github.com/Suzie1/ComfyUI_Comfyroll_CustomNodes/wiki/Logic-Nodes#cr-image-input-switch'
        if Input == 1:
            return (image1, show_help)
        else:
            return (image2, show_help)
```