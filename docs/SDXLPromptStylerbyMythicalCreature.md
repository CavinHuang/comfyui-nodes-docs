# Documentation
- Class name: SDXLPromptStylerbyMythicalCreature
- Category: Style Prompts
- Output node: False
- Repo Ref: https://github.com/wolfden/ComfyUi_PromptStylers

该节点通过应用风格化模板来增强提示的呈现，旨在提高用户参与度和响应质量。

# Input types
## Required
- text_positive
    - 正面文本输入对于生成乐观和鼓励性的提示至关重要，它显著影响输出的语气和有效性。
    - Comfy dtype: STRING
    - Python dtype: str
- text_negative
    - 负面文本输入对于提供对比视角至关重要，有助于打造平衡且细腻的提示。
    - Comfy dtype: STRING
    - Python dtype: str
- style
    - 风格选择参数至关重要，因为它决定了提示的主题框架，指导整体美学和信息传递。
    - Comfy dtype: COMBO
    - Python dtype: str
## Optional
- log_prompt
    - 日志记录偏好允许对节点处理进行可选的可见性，有助于调试和理解节点的操作。
    - Comfy dtype: COMBO
    - Python dtype: str

# Output types
- positive_prompt_text_g
    - 输出提供一个积极风格的提示，旨在提升和激励，代表节点功能的关键组成部分。
    - Comfy dtype: STRING
    - Python dtype: str
- negative_prompt_text_g
    - 输出提供一个负面风格的提示，提供对比点并促进与内容的全面互动。
    - Comfy dtype: STRING
    - Python dtype: str

# Usage tips
- Infra type: CPU

# Source code
```
class SDXLPromptStylerbyMythicalCreature:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(self):
        p = os.path.dirname(os.path.realpath(__file__))
        file_path = os.path.join(p, 'sdxl_styles_mc.json')
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