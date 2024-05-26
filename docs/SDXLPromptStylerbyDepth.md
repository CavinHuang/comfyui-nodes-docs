# Documentation
- Class name: SDXLPromptStylerbyDepth
- Category: Style Prompts
- Output node: False
- Repo Ref: https://github.com/wolfden/ComfyUi_PromptStylers

SDXLPromptStylerbyDepth节点旨在通过基于深度的风格化提示来增强用户体验。它智能地结合正面和负面文本输入以及所选风格，旨在生成更具吸引力和针对性的提示。该节点在创建与目标受众产生共鸣的提示中发挥着至关重要的作用，从而提高沟通的有效性。

# Input types
## Required
- text_positive
    - text_positive参数至关重要，因为它提供了将由节点风格化的正面文本内容。它直接影响最终提示的语气和信息，是节点操作的关键组成部分。
    - Comfy dtype: STRING
    - Python dtype: str
- text_negative
    - text_negative参数对于提供与正面文本形成对比的负面文本内容很重要。它有助于塑造提示的整体情感，是节点执行的重要因素。
    - Comfy dtype: STRING
    - Python dtype: str
- style
    - style参数至关重要，因为它决定了应用于文本的风格化方法。它决定了模板的选择和生成提示的整体美感，是节点功能的关键要素。
    - Comfy dtype: STRING
    - Python dtype: str
- log_prompt
    - log_prompt参数是可选的，用于控制节点在执行期间是否应该记录提示信息。这对于调试和监控节点的行为很有用，且不影响主要功能。
    - Comfy dtype: COMBO['No', 'Yes']
    - Python dtype: str

# Output types
- positive_prompt_text_g
    - positive_prompt_text_g输出代表了节点处理后的样式化正面文本。它是节点操作的关键结果，对随后在各种应用中的使用具有重要意义。
    - Comfy dtype: STRING
    - Python dtype: str
- negative_prompt_text_g
    - negative_prompt_text_g输出代表了由节点生成的样式化负面文本。它补充了正面文本，是创建平衡和细腻提示的节点输出的重要方面。
    - Comfy dtype: STRING
    - Python dtype: str

# Usage tips
- Infra type: CPU

# Source code
```
class SDXLPromptStylerbyDepth:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(self):
        p = os.path.dirname(os.path.realpath(__file__))
        file_path = os.path.join(p, 'sdxl_styles_depth.json')
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