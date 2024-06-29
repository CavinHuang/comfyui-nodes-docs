# Documentation
- Class name: WAS_CLIP_Vision_Input_Switch
- Category: WAS Suite/Logic
- Output node: False
- Repo Ref: https://github.com/WASasquatch/was-node-suite-comfyui

方法'clip_vision_switch'旨在基于布尔标志有条件地选择两个输入图像。它在工作流程中充当决策节点，允许根据提供的布尔值将图像数据路由到系统的不同部分。

# Input types
## Required
- clip_vision_a
    - 参数'clip_vision_a'表示节点可以选择的第一个图像选项。它对于决策过程至关重要，因为它根据布尔标志决定了潜在输出之一。
    - Comfy dtype: CLIP_VISION
    - Python dtype: Union[Image.Image, PIL.PngImagePlugin.PngImageFile]
- clip_vision_b
    - 参数'clip_vision_b'是当布尔标志为false时节点可能选择的替代图像选项。它在节点的功能中扮演重要角色，通过提供次要的输出选项。
    - Comfy dtype: CLIP_VISION
    - Python dtype: Union[Image.Image, PIL.PngImagePlugin.PngImageFile]
## Optional
- boolean
    - 参数'boolean'充当开关，决定节点返回哪张图像。它对于控制系统中图像数据的流向至关重要。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool

# Output types
- CLIP_VISION
    - 方法'clip_vision_switch'的输出是由布尔标志确定的单个图像。它代表了节点决策过程的结果，对下游处理至关重要。
    - Comfy dtype: CLIP_VISION
    - Python dtype: Union[Image.Image, PIL.PngImagePlugin.PngImageFile]

# Usage tips
- Infra type: CPU

# Source code
```
class WAS_CLIP_Vision_Input_Switch:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'clip_vision_a': ('CLIP_VISION',), 'clip_vision_b': ('CLIP_VISION',), 'boolean': ('BOOLEAN', {'forceInput': True})}}
    RETURN_TYPES = ('CLIP_VISION',)
    FUNCTION = 'clip_vision_switch'
    CATEGORY = 'WAS Suite/Logic'

    def clip_vision_switch(self, clip_vision_a, clip_vision_b, boolean=True):
        if boolean:
            return (clip_vision_a,)
        else:
            return clip_vision_b
```