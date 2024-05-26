# Documentation
- Class name: CR_TextInputSwitch4way
- Category: Logic
- Output node: False
- Repo Ref: https://github.com/RockOfFire/ComfyUI_Comfyroll_CustomNodes

CR_TextInputSwitch4way 是一个实用工具节点，旨在根据输入选择管理条件性文本输出。它允许从四个提供的文本字符串中选择一个，从而在工作流中促进基于文本的信息流分支。节点通过评估 'Input' 参数来确定要输出的文本字符串，从而实现动态内容展示。

# Input types
## Required
- Input
    - 'Input' 参数至关重要，因为它决定了四个文本字符串中哪一个将被选择用于输出。它作为节点内的决策因素，根据其整数值指导文本信息的流向。
    - Comfy dtype: INT
    - Python dtype: int
## Optional
- text1
    - 'text1' 参数是节点可以使用的可选文本输入之一。它代表当 'Input' 设置为 1 时输出的文本字符串，允许根据用户定义的标准提供定制内容。
    - Comfy dtype: STRING
    - Python dtype: str
- text2
    - 'text2' 参数是节点的另一个可选文本输入。当 'Input' 设置为 2 时使用，确保节点可以作为条件输出的一部分提供不同的文本字符串。
    - Comfy dtype: STRING
    - Python dtype: str
- text3
    - 'text3' 参数作为节点的另一个可选文本输入。当 'Input' 设置为 3 时变得相关，使节点能够在工作流中展示一个不同的文本片段。
    - Comfy dtype: STRING
    - Python dtype: str
- text4
    - 'text4' 参数是节点的最后一个可选文本输入。当 'Input' 设置为 4 时被选择用于输出，完成了节点内可用的条件文本选项集。
    - Comfy dtype: STRING
    - Python dtype: str

# Output types
- STRING
    - 节点的主要输出是一个文本字符串，由 'Input' 参数决定。它代表了基于用户选择的选定文本，提供了节点操作的清晰和直接结果。
    - Comfy dtype: STRING
    - Python dtype: str
- show_help
    - 次要输出 'show_help' 提供指向节点文档页面的 URL 链接。这对于寻求有关如何有效使用节点的额外信息或指导的用户非常有用。
    - Comfy dtype: STRING
    - Python dtype: str

# Usage tips
- Infra type: CPU

# Source code
```
class CR_TextInputSwitch4way:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'Input': ('INT', {'default': 1, 'min': 1, 'max': 4})}, 'optional': {'text1': ('STRING', {'forceInput': True}), 'text2': ('STRING', {'forceInput': True}), 'text3': ('STRING', {'forceInput': True}), 'text4': ('STRING', {'forceInput': True})}}
    RETURN_TYPES = ('STRING', 'STRING')
    RETURN_NAMES = ('STRING', 'show_help')
    FUNCTION = 'switch'
    CATEGORY = icons.get('Comfyroll/Utils/Logic')

    def switch(self, Input, text1=None, text2=None, text3=None, text4=None):
        show_help = 'https://github.com/Suzie1/ComfyUI_Comfyroll_CustomNodes/wiki/Logic-Nodes#cr-text-input-switch-4-way'
        if Input == 1:
            return (text1, show_help)
        elif Input == 2:
            return (text2, show_help)
        elif Input == 3:
            return (text3, show_help)
        else:
            return (text4, show_help)
```