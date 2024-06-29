# Documentation
- Class name: CR_PromptMixPresets
- Category: Comfyroll/SDXL
- Output node: False
- Repo Ref: https://github.com/RockOfFire/ComfyUI_Comfyroll_CustomNodes

CR_PromptMixPresets是一个用于组合和操作生成模型的提示和风格的节点。它提供了多种预设选项来混合正面和负面提示以及风格文本，增强了对生成过程的控制，并允许对输出进行微调。

# Input types
## Optional
- prompt_positive
    - 正面提示是一个关键输入，它定义了生成内容的期望属性。它影响生成过程的总体方向，将输出引向指定的特征。
    - Comfy dtype: STRING
    - Python dtype: str
- prompt_negative
    - 负面提示用于从生成内容中排除某些元素。它通过指定不应包含的内容来细化生成，从而更精确地塑造最终输出。
    - Comfy dtype: STRING
    - Python dtype: str
- style_positive
    - 正面风格输入允许将风格元素融入正面提示中。它通过添加特定的风格特征，增强了生成内容的美学质量。
    - Comfy dtype: STRING
    - Python dtype: str
- style_negative
    - 负面风格输入通过提供要避免的风格元素来补充正面风格，确保生成的内容遵循所需的风格指南，同时不包含不希望的属性。
    - Comfy dtype: STRING
    - Python dtype: str
- preset
    - 预设参数决定了提示和风格的混合策略。它提供了不同的方法来组合输入，影响生成内容的平衡和重点。
    - Comfy dtype: COMBO['default with no style text', 'default with style text', 'style boost 1', 'style boost 2', 'style text to refiner']
    - Python dtype: str

# Output types
- pos_g
    - 生成的正面全局提示，包含了所需的属性和风格，准备在生成模型中使用以指导创作过程。
    - Comfy dtype: STRING
    - Python dtype: str
- pos_l
    - 生成的正面局部提示，专注于要在生成内容中包含的特定细节，为生成提供更细微的方向。
    - Comfy dtype: STRING
    - Python dtype: str
- pos_r
    - 生成的正面细化提示，进一步细化生成过程，为期望的输出添加一层细节。
    - Comfy dtype: STRING
    - Python dtype: str
- neg_g
    - 生成的负面全局提示，指定要从生成内容中排除的元素，确保最终输出与预期的愿景一致。
    - Comfy dtype: STRING
    - Python dtype: str
- neg_l
    - 生成的负面局部提示，针对生成中要避免的特定不需要的细节，提高了排除的精确度。
    - Comfy dtype: STRING
    - Python dtype: str
- neg_r
    - 生成的负面细化提示，为生成过程添加了进一步的排除，确保对最终输出有更高水平的控制。
    - Comfy dtype: STRING
    - Python dtype: str
- show_help
    - 一个URL链接，指向文档，用于获取有关有效使用节点的额外指导和信息。
    - Comfy dtype: STRING
    - Python dtype: str

# Usage tips
- Infra type: CPU

# Source code
```
class CR_PromptMixPresets:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {}, 'optional': {'prompt_positive': ('STRING', {'multiline': True, 'default': 'prompt_pos'}), 'prompt_negative': ('STRING', {'multiline': True, 'default': 'prompt_neg'}), 'style_positive': ('STRING', {'multiline': True, 'default': 'style_pos'}), 'style_negative': ('STRING', {'multiline': True, 'default': 'style_neg'}), 'preset': (['default with no style text', 'default with style text', 'style boost 1', 'style boost 2', 'style text to refiner'],)}}
    RETURN_TYPES = ('STRING', 'STRING', 'STRING', 'STRING', 'STRING', 'STRING', 'STRING')
    RETURN_NAMES = ('pos_g', 'pos_l', 'pos_r', 'neg_g', 'neg_l', 'neg_r', 'show_help')
    FUNCTION = 'mixer'
    CATEGORY = icons.get('Comfyroll/SDXL')

    def mixer(self, prompt_positive, prompt_negative, style_positive, style_negative, preset):
        if preset == 'default with no style text':
            pos_g = prompt_positive
            pos_l = prompt_positive
            pos_r = prompt_positive
            neg_g = prompt_negative
            neg_l = prompt_negative
            neg_r = prompt_negative
        elif preset == 'default with style text':
            pos_g = prompt_positive + style_positive
            pos_l = prompt_positive + style_positive
            pos_r = prompt_positive + style_positive
            neg_g = prompt_negative + style_negative
            neg_l = prompt_negative + style_negative
            neg_r = prompt_negative + style_negative
        elif preset == 'style boost 1':
            pos_g = prompt_positive
            pos_l = style_positive
            pos_r = prompt_positive
            neg_g = prompt_negative
            neg_l = style_negative
            neg_r = prompt_negative
        elif preset == 'style boost 2':
            pos_g = style_positive
            pos_l = prompt_positive
            pos_r = style_positive
            neg_g = style_negative
            neg_l = prompt_negative
            neg_r = style_negative
        elif preset == 'style text to refiner':
            pos_g = prompt_positive
            pos_l = prompt_positive
            pos_r = style_positive
            neg_g = prompt_negative
            neg_l = prompt_negative
            neg_r = style_negative
        show_help = 'https://github.com/Suzie1/ComfyUI_Comfyroll_CustomNodes/wiki/SDXL-Nodes#cr-sdxl-prompt-mix-presets'
        return (pos_g, pos_l, pos_r, neg_g, neg_l, neg_r, show_help)
```