# Documentation
- Class name: SDXLPromptStylerHorror
- Category: Style Prompts
- Output node: False
- Repo Ref: https://github.com/wolfden/ComfyUi_PromptStylers

该节点旨在基于给定的恐怖主题来修饰文本提示，增强叙述时的特定情绪和氛围。

# Input types
## Required
- text_positive
    - 正面文本输入对于设定恐怖主题的基本情绪至关重要。它为风格化转换提供了起点。
    - Comfy dtype: STRING
    - Python dtype: str
- text_negative
    - 负面文本输入对于对比正面文本至关重要，通过增加紧张和冲突，为恐怖主题提供深度。
    - Comfy dtype: STRING
    - Python dtype: str
- style
    - 风格参数在确定将应用于文本的具体恐怖主题方面至关重要，指导输出的整体美学。
    - Comfy dtype: COMBO
    - Python dtype: str
## Optional
- log_prompt
    - 日志提示选项允许选择性地记录转换过程，这对于调试和理解节点的操作有益。
    - Comfy dtype: COMBO
    - Python dtype: str

# Output types
- positive_prompt_text_g
    - 输出提供了一个正面风格的恐怖主题文本，已经通过所选主题增强，以创造沉浸式体验。
    - Comfy dtype: STRING
    - Python dtype: str
- negative_prompt_text_g
    - 输出提供了一个负面风格的恐怖主题文本，与正面文本相辅相成，加深了整体的恐怖氛围。
    - Comfy dtype: STRING
    - Python dtype: str

# Usage tips
- Infra type: CPU

# Source code
```
class SDXLPromptStylerHorror:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(self):
        p = os.path.dirname(os.path.realpath(__file__))
        file_path = os.path.join(p, 'sdxl_styles_horror.json')
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