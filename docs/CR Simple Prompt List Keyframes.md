# Documentation
- Class name: CR_SimplePromptListKeyframes
- Category: Comfyroll/Animation/Legacy
- Output node: False
- Repo Ref: https://github.com/RockOfFire/ComfyUI_Comfyroll_CustomNodes

CR_SimplePromptListKeyframes 是一个用于从提示列表生成一系列关键帧的节点。它通过迭代提示列表并为每个关键帧应用指定的时间间隔来编排关键帧数据的创建。该节点能够处理多个循环和过渡，允许定制动画序列。

# Input types
## Required
- simple_prompt_list
    - simple_prompt_list 参数是一个提示集合，用于生成关键帧。列表中的每个提示对应最终输出中的一个关键帧。
    - Comfy dtype: STRING
    - Python dtype: List[str]
## Optional
- keyframe_interval
    - keyframe_interval 参数定义了每个关键帧之间的时间增量。它对控制动画序列的节奏至关重要，可以调整以控制过渡的速度。
    - Comfy dtype: INT
    - Python dtype: int
- loops
    - loops 参数指定关键帧序列应重复的次数。它是创建重复或循环动画的一个基本方面。
    - Comfy dtype: INT
    - Python dtype: int
- transition_type
    - transition_type 参数确定关键帧之间过渡的风格。它影响动画的视觉流动性，可以设置为 'Default' 或其他预定义选项。
    - Comfy dtype: COMBO['Default']
    - Python dtype: str
- transition_speed
    - transition_speed 参数指示关键帧之间过渡的速度。它可以设置为 'Default' 或其他选项，以控制过渡的快慢。
    - Comfy dtype: COMBO['Default']
    - Python dtype: str
- transition_profile
    - transition_profile 参数设置过渡的轮廓，这可以影响过渡随时间的显示方式。它设置为 'Default' 或其他轮廓以实现不同的效果。
    - Comfy dtype: COMBO['Default']
    - Python dtype: str
- keyframe_format
    - keyframe_format 参数指定关键帧的展示格式。'Deforum' 选项用于确保与某些动画系统的兼容性。
    - Comfy dtype: COMBO['Deforum']
    - Python dtype: str

# Output types
- keyframe_list
    - keyframe_list 输出是生成的关键帧的字符串表示。它的格式可以直接用于动画系统中。
    - Comfy dtype: STRING
    - Python dtype: str
- show_help
    - show_help 输出提供了一个文档的URL链接，以进一步协助和理解如何有效地使用该节点。
    - Comfy dtype: STRING
    - Python dtype: str

# Usage tips
- Infra type: CPU

# Source code
```
class CR_SimplePromptListKeyframes:

    @classmethod
    def INPUT_TYPES(s):
        transition_types = ['Default']
        transition_speeds = ['Default']
        transition_profiles = ['Default']
        return {'required': {'simple_prompt_list': ('SIMPLE_PROMPT_LIST',), 'keyframe_interval': ('INT', {'default': 30, 'min': 0, 'max': 999, 'step': 1}), 'loops': ('INT', {'default': 1, 'min': 1, 'max': 1000}), 'transition_type': (transition_types,), 'transition_speed': (transition_speeds,), 'transition_profile': (transition_profiles,), 'keyframe_format': (['Deforum'],)}}
    RETURN_TYPES = ('STRING', 'STRING')
    RETURN_NAMES = ('keyframe_list', 'show_help')
    FUNCTION = 'make_keyframes'
    CATEGORY = icons.get('Comfyroll/Animation/Legacy')

    def make_keyframes(self, simple_prompt_list, keyframe_interval, loops, transition_type, transition_speed, transition_profile, keyframe_format):
        keyframe_format = 'Deforum'
        keyframe_list = list()
        i = 0
        for j in range(1, loops + 1):
            for (index, prompt) in enumerate(simple_prompt_list):
                if i == 0:
                    keyframe_list.extend(['"0": "' + prompt + '",\n'])
                    i += keyframe_interval
                    continue
                new_keyframe = '"' + str(i) + '": "' + prompt + '",\n'
                keyframe_list.extend([new_keyframe])
                i += keyframe_interval
        keyframes_out = ' '.join(keyframe_list)[:-2]
        show_help = 'https://github.com/Suzie1/ComfyUI_Comfyroll_CustomNodes/wiki/Prompt-Nodes#cr-simple-prompt-list-keyframes'
        return (keyframes_out, show_help)
```