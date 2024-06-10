# Documentation
- Class name: CR_SetSwitchFromString
- Category: Comfyroll/Utils/Conditional
- Output node: False
- Repo Ref: https://github.com/RockOfFire/ComfyUI_Comfyroll_CustomNodes

CR_SetSwitchFromString 节点旨在将给定的文本输入与一组预定义的字符串选项进行评估，根据匹配项确定一个整数值开关。它作为工作流中的关键决策组件，允许根据输入字符串进行条件分支或触发特定动作。

# Input types
## Required
- text
    - ‘text’参数是节点与之比较的输入文本，对于提供的开关选项至关重要。它在确定节点输出中起着关键作用，因为匹配过程是节点功能的核心。
    - Comfy dtype: STRING
    - Python dtype: str
## Optional
- switch_1
    - ‘switch_1’参数代表节点可以与输入文本匹配的开关选项之一。它是决策过程的一部分，根据输入对结果产生影响。
    - Comfy dtype: STRING
    - Python dtype: str
- switch_2
    - ‘switch_2’参数是节点评估的另一个潜在开关选项。它对于扩展节点可以响应的条件范围至关重要。
    - Comfy dtype: STRING
    - Python dtype: str
- switch_3
    - ‘switch_3’参数作为节点决定其输出的另一个附加开关选项。它增强了节点在处理各种输入场景时的多功能性。
    - Comfy dtype: STRING
    - Python dtype: str
- switch_4
    - ‘switch_4’参数是节点考虑的最后一个开关选项。它完成了节点执行其比较和决策任务的选项集。
    - Comfy dtype: STRING
    - Python dtype: str

# Output types
- switch
    - ‘switch’输出代表节点在将输入文本与提供的开关选项进行比较后确定的整数值。它标志着节点决策过程的结果。
    - Comfy dtype: INT
    - Python dtype: int
- show_help
    - ‘show_help’输出提供指向节点文档页面的URL链接，为寻求了解节点功能的用户提供免费的指导和信息。
    - Comfy dtype: STRING
    - Python dtype: str

# Usage tips
- Infra type: CPU

# Source code
```
class CR_SetSwitchFromString:

    @classmethod
    def INPUT_TYPES(cls):
        methods = ['Fit', 'Crop']
        return {'required': {'text': ('STRING', {'multiline': False, 'default': '', 'forceInput': True})}, 'optional': {'switch_1': ('STRING', {'multiline': False, 'default': ''}), 'switch_2': ('STRING', {'multiline': False, 'default': ''}), 'switch_3': ('STRING', {'multiline': False, 'default': ''}), 'switch_4': ('STRING', {'multiline': False, 'default': ''})}}
    RETURN_TYPES = ('INT', 'STRING')
    RETURN_NAMES = ('switch', 'show_help')
    FUNCTION = 'set_switch'
    CATEGORY = icons.get('Comfyroll/Utils/Conditional')

    def set_switch(self, text, switch_1='', switch_2='', switch_3='', switch_4=''):
        show_help = 'https://github.com/Suzie1/ComfyUI_Comfyroll_CustomNodes/wiki/Other-Nodes#cr-set-switch-from-string'
        if text == switch_1:
            switch = 1
        elif text == switch_2:
            switch = 2
        elif text == switch_3:
            switch = 3
        elif text == switch_4:
            switch = 4
        else:
            pass
        return (switch, show_help)
```