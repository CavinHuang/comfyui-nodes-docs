# Documentation
- Class name: SDXLPromptStylerbyComposition
- Category: Style Prompts
- Output node: False
- Repo Ref: https://github.com/wolfden/ComfyUi_PromptStylers

SDXLPromptStylerbyComposition节点旨在通过应用风格组合来增强提示的呈现。它通过将正面和负面文本输入与选定的风格集成，生成适合所选审美的精细提示文本。该节点强调了风格表达在提示制定中的重要性，旨在提升提示的总体质量和影响力。

# Input types
## Required
- text_positive
    - text_positive参数是一个关键输入，它为提示提供了正面的上下文或肯定。它至关重要，因为它为风格化提示将要传达的正面特征设定了基调。这个输入直接影响节点的最终输出，塑造了正面提示文本。
    - Comfy dtype: STRING
    - Python dtype: str
- text_negative
    - text_negative参数作为提示旨在抵消或减轻的负面上下文或陈述的输入。它的包含很重要，因为它允许节点生成一个平衡的提示，同时考虑正面和负面的观点。text_negative输入在制作负面提示文本中起着至关重要的作用。
    - Comfy dtype: STRING
    - Python dtype: str
- style
    - style参数决定了将应用于提示的风格组合。它是一个关键输入，因为它决定了提示的美学和主题方向。风格的选择对最终输出有深远的影响，指导着风格化提示的整体呈现和感觉。
    - Comfy dtype: STRING
    - Python dtype: str
- log_prompt
    - log_prompt参数是一个可选的切换，当设置为'Yes'时，它在执行期间启用提示的详细信息记录。这对于调试或查看提示是如何被风格化的很有用。它提供了对节点操作的透明度，而不会改变主要功能。
    - Comfy dtype: COMBO['No', 'Yes']
    - Python dtype: str

# Output types
- positive_prompt_text_g
    - positive_prompt_text_g输出代表了应用选定风格到输入文本后生成的风格化正面提示文本。它包含了旨在传达提示正面特征的精炼和主题化表达。
    - Comfy dtype: STRING
    - Python dtype: str
- negative_prompt_text_g
    - negative_prompt_text_g输出提供了与正面提示相辅相成的风格化负面提示文本。它被制作出来是为了解决和减轻输入中概述的负面特征，有助于形成一个全面和平衡的提示呈现。
    - Comfy dtype: STRING
    - Python dtype: str

# Usage tips
- Infra type: CPU

# Source code
```
class SDXLPromptStylerbyComposition:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(self):
        p = os.path.dirname(os.path.realpath(__file__))
        file_path = os.path.join(p, 'sdxl_styles_composition.json')
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