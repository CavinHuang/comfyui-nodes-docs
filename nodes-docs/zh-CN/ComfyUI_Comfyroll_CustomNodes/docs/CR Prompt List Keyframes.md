# Documentation
- Class name: CR_PromptListKeyframes
- Category: Comfyroll/Animation/Legacy
- Output node: False
- Repo Ref: https://github.com/RockOfFire/ComfyUI_Comfyroll_CustomNodes

CR_PromptListKeyframes 节点旨在从提示列表生成关键帧。它处理输入的提示列表，遵循特定的关键帧格式，以创建可以在动画工作流中使用的关键帧序列。此节点对于自动化关键帧创建过程至关重要，确保在生成动画序列时保持一致性和效率。

# Input types
## Required
- prompt_list
    - 提示列表是节点的重要输入，因为它包含将被转换为关键帧的提示。列表中的每个提示都是关键帧的一部分，节点通过这个列表迭代以生成最终的关键帧序列。
    - Comfy dtype: PROMPT_LIST
    - Python dtype: List[Tuple[str, str, str, str, int, int]]
## Optional
- keyframe_format
    - 关键帧格式参数决定了生成的关键帧的结构和样式。尽管节点默认使用 'Deforum' 格式，但这个参数允许在未来需要支持其他格式时具有灵活性。
    - Comfy dtype: COMBO['Deforum']
    - Python dtype: Literal['Deforum']

# Output types
- keyframe_list
    - 关键帧列表是节点的主要输出，表示格式化后的关键帧字符串。这个输出可以直接用于动画软件中定义动画关键帧的序列。
    - Comfy dtype: STRING
    - Python dtype: str
- show_help
    - 显示帮助输出提供了一个指向与节点相关联的文档或帮助页面的URL链接。这对于寻求更多信息或指导如何有效使用节点的用户来说非常有用。
    - Comfy dtype: STRING
    - Python dtype: str

# Usage tips
- Infra type: CPU

# Source code
```
class CR_PromptListKeyframes:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'prompt_list': ('PROMPT_LIST',), 'keyframe_format': (['Deforum'],)}}
    RETURN_TYPES = ('STRING', 'STRING')
    RETURN_NAMES = ('keyframe_list', 'show_help')
    FUNCTION = 'make_keyframes'
    CATEGORY = icons.get('Comfyroll/Animation/Legacy')

    def make_keyframes(self, prompt_list, keyframe_format):
        keyframe_format = 'Deforum'
        keyframe_list = list()
        i = 0
        for (index, prompt_tuple) in enumerate(prompt_list):
            (prompt, transition_type, transition_speed, transition_profile, keyframe_interval, loops) = prompt_tuple
            if i == 0:
                keyframe_list.extend(['"0": "' + prompt + '",\n'])
                i += keyframe_interval
                continue
            new_keyframe = '"' + str(i) + '": "' + prompt + '",\n'
            keyframe_list.extend([new_keyframe])
            i += keyframe_interval
        keyframes_out = ''.join(keyframe_list)[:-2]
        show_help = 'https://github.com/Suzie1/ComfyUI_Comfyroll_CustomNodes/wiki/Prompt-Nodes#cr-prompt-list-keyframes'
        return (keyframes_out, show_help)
```