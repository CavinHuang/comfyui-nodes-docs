# Documentation
- Class name: SDXLPromptStylerbyMood
- Category: Style Prompts
- Output node: False
- Repo Ref: https://github.com/wolfden/ComfyUi_PromptStylers

该节点旨在基于情绪来风格化提示，增强文本输入的主题表达。它利用预定义的风格来创造性地修改提供的文本的情感，旨在丰富内容的整体叙事和情感深度。

# Input types
## Required
- text_positive
    - 正面文本输入对于设定提示的基本情绪至关重要。它是情绪化风格增强的基础，显著影响最终输出的语气和情感共鸣。
    - Comfy dtype: STRING
    - Python dtype: str
- text_negative
    - 负面文本输入对于提供与正面文本对比的情绪至关重要。它允许节点创建更加细腻和平衡的情感表达，有助于风格化提示的复杂性和深度。
    - Comfy dtype: STRING
    - Python dtype: str
- style
    - 风格参数在确定风格化提示的审美和情感方向中起着关键作用。它指导节点选择适当的基于情绪的模板，这对于实现所需的主题和风格结果至关重要。
    - Comfy dtype: COMBO
    - Python dtype: str
## Optional
- log_prompt
    - 日志提示参数通过可选地启用提示生成过程的记录来促进调试和监督。这个功能有助于理解节点的操作，并确保风格转换的透明度。
    - Comfy dtype: COMBO
    - Python dtype: str

# Output types
- positive_prompt_text_g
    - 输出提供了输入文本的积极风格化版本，反映了所选情绪和风格增强。这个结果在传递情感共鸣和主题一致的叙事中非常重要。
    - Comfy dtype: STRING
    - Python dtype: str
- negative_prompt_text_g
    - 输出提供了输入文本的负面风格化版本，为正面提示提供了对比视角。它在建立风格化内容中全面的情感范围和深度方面起着至关重要的作用。
    - Comfy dtype: STRING
    - Python dtype: str

# Usage tips
- Infra type: CPU

# Source code
```
class SDXLPromptStylerbyMood:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(self):
        p = os.path.dirname(os.path.realpath(__file__))
        file_path = os.path.join(p, 'sdxl_styles_mood.json')
        self.json_data = read_json_file(file_path)
        styles = read_sdxl_styles(self.json_data)
        return {'required': {'text_positive': ('STRING', {'default': '', 'multiline': True}), 'text_negative': ('STRING', {'default': '', 'multiline': True}), 'style': (styles,), 'log_prompt': (['No', 'Yes'], {'default': 'No'})}}
    RETURN_TYPES = ('STRING', 'STRING')
    RETURN_NAMES = ('positive_prompt_text_g', 'negative_prompt_text_g')
    FUNCTION = 'prompt_styler'
    CATEGORY = 'Style Prompts'

    def prompt_styler(self, text_positive, text_negative, style, log_prompt):
        (positive_prompt, negative_prompt) = read_sdxl_templates_replace_and_combine(self.json_data, style, text_positive, text_negative)
        if log_prompt == 'Yes':
            print(f'style: {style}')
            print(f'text_positive: {text_positive}')
            print(f'text_negative: {text_negative}')
            print(f'positive_prompt: {positive_prompt}')
            print(f'negative_prompt: {negative_prompt}')
        return (positive_prompt, negative_prompt)
```