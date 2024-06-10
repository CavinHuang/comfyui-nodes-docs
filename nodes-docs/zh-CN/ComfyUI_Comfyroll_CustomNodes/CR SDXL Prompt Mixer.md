# Documentation
- Class name: CR_PromptMixer
- Category: Comfyroll/Essential/Legacy
- Output node: False
- Repo Ref: https://github.com/RockOfFire/ComfyUI_Comfyroll_CustomNodes

CR_PromptMixer 是一个旨在混合不同提示和风格以生成精炼输出的节点。它通过接收正面和负面提示以及风格输入，然后应用选定的预设来以特定的方式混合这些输入。该节点的功能集中在通过智能组合各种文本元素来提高生成文本的质量和一致性。

# Input types
## Optional
- prompt_positive
    - 正面提示是文本生成过程中的关键输入，它提供了一个建设性的例子或指导方针。它在引导输出朝着期望的质量和属性方向发展中起着至关重要的作用。
    - Comfy dtype: STRING
    - Python dtype: str
- prompt_negative
    - 负面提示用于提供文本生成中应避免的例子或指导方针。它在塑造输出方面起着重要作用，通过指定要排除的内容。
    - Comfy dtype: STRING
    - Python dtype: str
- style_positive
    - 正面风格输入用于通过添加被认为有利的风格元素来完善文本生成。它以特定的风格特征增强输出。
    - Comfy dtype: STRING
    - Python dtype: str
- style_negative
    - 负面风格输入允许指定应从文本生成中省略的风格元素。这对于确保最终输出与预期的风格一致非常重要。
    - Comfy dtype: STRING
    - Python dtype: str
- preset
    - 预设参数决定了应用于输入的特定混合策略。每个预设代表了一种不同的方法来组合正面和负面的提示和风格。
    - Comfy dtype: COMBO['preset 1', 'preset 2', 'preset 3', 'preset 4', 'preset 5']
    - Python dtype: str

# Output types
- pos_g
    - 'pos_g' 输出代表了根据所选预设生成的混合正面提示。它是最终输出的关键组成部分，反映了输入的组合效果。
    - Comfy dtype: STRING
    - Python dtype: str
- pos_l
    - 'pos_l' 输出是另一个混合正面提示，反映了输入混合过程的不同方面。它有助于整体的连贯性和生成文本的质量。
    - Comfy dtype: STRING
    - Python dtype: str
- pos_r
    - 'pos_r' 输出表示混合正面提示的进一步变化，为文本生成过程提供了额外的深度。
    - Comfy dtype: STRING
    - Python dtype: str
- neg_g
    - 'neg_g' 输出是一个混合负面提示，已被处理以排除最终文本生成中不需要的元素。
    - Comfy dtype: STRING
    - Python dtype: str
- neg_l
    - 'neg_l' 输出代表了另一个混合负面提示，确保从文本生成中排除特定的不需要的风格元素。
    - Comfy dtype: STRING
    - Python dtype: str
- neg_r
    - 'neg_r' 输出是混合负面提示的最终变化，为文本生成提供了全面排除不需要的元素。
    - Comfy dtype: STRING
    - Python dtype: str

# Usage tips
- Infra type: CPU

# Source code
```
class CR_PromptMixer:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {}, 'optional': {'prompt_positive': ('STRING', {'multiline': True, 'default': 'BASE_POSITIVE'}), 'prompt_negative': ('STRING', {'multiline': True, 'default': 'BASE_NEGATIVE'}), 'style_positive': ('STRING', {'multiline': True, 'default': 'REFINER_POSTIVE'}), 'style_negative': ('STRING', {'multiline': True, 'default': 'REFINER_NEGATIVE'}), 'preset': (['preset 1', 'preset 2', 'preset 3', 'preset 4', 'preset 5'],)}}
    RETURN_TYPES = ('STRING', 'STRING', 'STRING', 'STRING', 'STRING', 'STRING')
    RETURN_NAMES = ('pos_g', 'pos_l', 'pos_r', 'neg_g', 'neg_l', 'neg_r')
    FUNCTION = 'mixer'
    CATEGORY = icons.get('Comfyroll/Essential/Legacy')

    def mixer(self, prompt_positive, prompt_negative, style_positive, style_negative, preset):
        show_help = 'https://github.com/Suzie1/ComfyUI_Comfyroll_CustomNodes/wiki/Legacy-Nodes#cr-prompt-mixer'
        if preset == 'preset 1':
            pos_g = prompt_positive
            pos_l = prompt_positive
            pos_r = prompt_positive
            neg_g = prompt_negative
            neg_l = prompt_negative
            neg_r = prompt_negative
        elif preset == 'preset 2':
            pos_g = prompt_positive
            pos_l = style_positive
            pos_r = prompt_positive
            neg_g = prompt_negative
            neg_l = style_negative
            neg_r = prompt_negative
        elif preset == 'preset 3':
            pos_g = style_positive
            pos_l = prompt_positive
            pos_r = style_positive
            neg_g = style_negative
            neg_l = prompt_negative
            neg_r = style_negative
        elif preset == 'preset 4':
            pos_g = prompt_positive + style_positive
            pos_l = prompt_positive + style_positive
            pos_r = prompt_positive + style_positive
            neg_g = prompt_negative + style_negative
            neg_l = prompt_negative + style_negative
            neg_r = prompt_negative + style_negative
        elif preset == 'preset 5':
            pos_g = prompt_positive
            pos_l = prompt_positive
            pos_r = style_positive
            neg_g = prompt_negative
            neg_l = prompt_negative
            neg_r = style_negative
        return (pos_g, pos_l, pos_r, neg_g, neg_l, neg_r)
```