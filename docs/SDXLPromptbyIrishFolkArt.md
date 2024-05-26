# Documentation
- Class name: SDXLPromptbyIrishFolkArt
- Category: Style Prompts
- Output node: False
- Repo Ref: https://github.com/wolfden/ComfyUi_PromptStylers

该节点创造性地将输入文本适配为爱尔兰民间艺术风格，增强文本的主题表达和文化共鸣。

# Input types
## Required
- text_positive
    - 正面文本输入对于生成风格增强的输出至关重要，能够捕捉到爱尔兰民间艺术的精髓。
    - Comfy dtype: STRING
    - Python dtype: str
- text_negative
    - 负面文本输入对于精炼输出非常关键，确保输出严格遵守爱尔兰民间艺术风格。
    - Comfy dtype: STRING
    - Python dtype: str
- style
    - 风格参数至关重要，它决定了艺术方向和将融入文本的文化元素。
    - Comfy dtype: COMBO
    - Python dtype: str
## Optional
- log_prompt
    - 日志选项允许选择性地可视化转换过程，有助于理解节点的功能。
    - Comfy dtype: COMBO
    - Python dtype: str

# Output types
- positive_prompt_text_g
    - 输出提供了一个体现爱尔兰民间艺术精神的正面风格化文本，可供进一步使用或分析。
    - Comfy dtype: STRING
    - Python dtype: str
- negative_prompt_text_g
    - 输出包括一个负面风格化的文本，为正面文本提供了对比元素，以便进行全面的风格评估。
    - Comfy dtype: STRING
    - Python dtype: str

# Usage tips
- Infra type: CPU

# Source code
```
class SDXLPromptbyIrishFolkArt:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(self):
        p = os.path.dirname(os.path.realpath(__file__))
        file_path = os.path.join(p, 'sdxl_styles_irishfolkart.json')
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