# Documentation
- Class name: WAS_Image_Input_Switch
- Category: WAS Suite/Logic
- Output node: False
- Repo Ref: https://github.com/WASasquatch/was-node-suite-comfyui

方法 `image_input_switch` 旨在根据布尔标志有条件地在两个图像输入之间进行选择。它在图像处理工作流中充当逻辑开关，允许根据提供的布尔条件动态路由图像数据。

# Input types
## Required
- image_a
    - 当布尔标志为真时将返回的第一个图像输入。这是一个关键参数，因为它决定了开关处于“开”状态时的结果。
    - Comfy dtype: IMAGE
    - Python dtype: PIL.Image.Image
- image_b
    - 当布尔标志为假时将返回的第二个图像输入。当开关处于“关”状态时，它起着关键作用，决定了该情况下的输出。
    - Comfy dtype: IMAGE
    - Python dtype: PIL.Image.Image
## Optional
- boolean
    - 决定选择哪个图像输入的布尔标志。当为真时，返回 `image_a`；当为假时，返回 `image_b`。这个参数对节点的决策过程至关重要。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool

# Output types
- selected_image
    - 由布尔标志确定的输出图像。它代表了逻辑开关操作的结果，根据输入条件提供选定的图像。
    - Comfy dtype: IMAGE
    - Python dtype: PIL.Image.Image

# Usage tips
- Infra type: CPU

# Source code
```
class WAS_Image_Input_Switch:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'image_a': ('IMAGE',), 'image_b': ('IMAGE',), 'boolean': ('BOOLEAN', {'forceInput': True})}}
    RETURN_TYPES = ('IMAGE',)
    FUNCTION = 'image_input_switch'
    CATEGORY = 'WAS Suite/Logic'

    def image_input_switch(self, image_a, image_b, boolean=True):
        if boolean:
            return (image_a,)
        else:
            return (image_b,)
```