# Documentation
- Class name: SDXLPromptStylerbyArtist
- Category: Style Prompts
- Output node: False
- Repo Ref: https://github.com/wolfden/ComfyUi_PromptStylers

该节点旨在根据选定艺术家的风格来修饰文本提示，通过将艺术细微差别整合到生成内容中，增强创作过程。

# Input types
## Required
- text_positive
    - 正面文本输入至关重要，因为它为节点设定了基础内容，确保生成的提示与期望的主题保持一致。
    - Comfy dtype: STRING
    - Python dtype: str
- text_negative
    - 负面文本输入作为正面文本的对比，允许节点通过排除不需要的元素来细化风格。
    - Comfy dtype: STRING
    - Python dtype: str
- style
    - 风格参数至关重要，因为它决定了应用于文本的艺术影响，塑造输出的整体美学。
    - Comfy dtype: COMBO
    - Python dtype: str
## Optional
- log_prompt
    - 日志选项允许监控节点的内部过程，提供关于如何将风格应用到提示的见解。
    - Comfy dtype: COMBO
    - Python dtype: str

# Output types
- positive_prompt_text_g
    - 输出提供了一个积极风格的文本提示，反映了所选艺术家的风格，并增强了创意信息。
    - Comfy dtype: STRING
    - Python dtype: str
- negative_prompt_text_g
    - 输出提供了一个负面风格的文本提示，通过提供对比视角来补充正面输出。
    - Comfy dtype: STRING
    - Python dtype: str

# Usage tips
- Infra type: CPU

# Source code
```
class SDXLPromptStylerbyArtist:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(self):
        p = os.path.dirname(os.path.realpath(__file__))
        file_path = os.path.join(p, 'sdxl_styles_artists.json')
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