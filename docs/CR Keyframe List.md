# Documentation
- Class name: CR_KeyframeList
- Category: Comfyroll/Animation/Prompt
- Output node: False
- Repo Ref: https://github.com/RockOfFire/ComfyUI_Comfyroll_CustomNodes

CR_KeyframeList 节点旨在管理和处理关键帧列表，这些是定义动画时间线的帧序列。它通过允许用户输入关键帧数据并指定格式以进行正确解释，在动画工作流程中发挥着关键作用。

# Input types
## Required
- keyframe_list
    - 关键帧列表是一个包含定义动画的帧序列的字符串。它对节点至关重要，因为它直接影响输出的动画序列。
    - Comfy dtype: STRING
    - Python dtype: str
- keyframe_format
    - 关键帧格式参数决定了如何解释关键帧列表。它对于确保节点正确理解并处理关键帧数据很重要。
    - Comfy dtype: COMBO['Deforum', 'CR']
    - Python dtype: str

# Output types
- keyframe_list
    - 已根据指定的关键帧格式格式化的已处理关键帧列表，准备用于动画序列。
    - Comfy dtype: STRING
    - Python dtype: str
- show_help
    - 一个链接到文档页面的URL，提供有关使用关键帧列表功能的额外信息和指导。
    - Comfy dtype: STRING
    - Python dtype: str

# Usage tips
- Infra type: CPU

# Source code
```
class CR_KeyframeList:

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'keyframe_list': ('STRING', {'multiline': True, 'default': 'keyframes'}), 'keyframe_format': (['Deforum', 'CR'],)}}
    RETURN_TYPES = ('STRING', 'STRING')
    RETURN_NAMES = ('keyframe_list', 'show_help')
    FUNCTION = 'keyframelist'
    CATEGORY = icons.get('Comfyroll/Animation/Prompt')

    def keyframelist(self, keyframe_list, keyframe_format):
        show_help = 'https://github.com/Suzie1/ComfyUI_Comfyroll_CustomNodes/wiki/Prompt-Nodes#cr-keyframe-list'
        return (keyframe_list, show_help)
```