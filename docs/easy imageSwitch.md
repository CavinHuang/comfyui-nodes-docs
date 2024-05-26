# Documentation
- Class name: imageSwitch
- Category: EasyUse/Logic/Switch
- Output node: False
- Repo Ref: https://github.com/yolain/ComfyUI-Easy-Use.git

imageSwitch节点旨在根据布尔值在两张图像之间进行条件选择。它是图像处理工作流中的基本组件，用于在某些条件下做出决策。该节点通过评估布尔输入，然后返回相应的图像来操作。

# Input types
## Required
- image_a
    - image_a参数是节点可能返回的第一张图像。它在节点的操作中起着关键作用，因为它是布尔输入将决定的两个选项之一。
    - Comfy dtype: IMAGE
    - Python dtype: Union[str, torch.Tensor]
- image_b
    - image_b参数代表节点可能输出的第二张图像选项。它的重要性与image_a相当，因为它取决于布尔输入以被节点返回。
    - Comfy dtype: IMAGE
    - Python dtype: Union[str, torch.Tensor]
- boolean
    - 布尔参数对于节点的决策过程至关重要。它直接影响着两张图像中的哪一张，image_a或image_b，将成为节点的输出。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool

# Output types
- selected_image
    - selected_image输出代表基于布尔输入选择的图像。它是节点功能的最终体现，包含了应用的条件逻辑的结果。
    - Comfy dtype: IMAGE
    - Python dtype: Union[str, torch.Tensor]

# Usage tips
- Infra type: CPU

# Source code
```
class imageSwitch:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'image_a': ('IMAGE',), 'image_b': ('IMAGE',), 'boolean': ('BOOLEAN', {'default': False})}}
    RETURN_TYPES = ('IMAGE',)
    FUNCTION = 'image_switch'
    CATEGORY = 'EasyUse/Logic/Switch'

    def image_switch(self, image_a, image_b, boolean):
        if boolean:
            return (image_a,)
        else:
            return (image_b,)
```