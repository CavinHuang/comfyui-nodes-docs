# Documentation
- Class name: SDXLPromptStylerbySteamPunkRealism
- Category: Style Prompts
- Output node: False
- Repo Ref: https://github.com/wolfden/ComfyUi_PromptStylers

该节点旨在基于预定义的蒸汽朋克现实主义风格集对提示进行风格化，通过整合蒸汽朋克流派特有的风格元素和叙事主题，增强输入文本的主题内容。

# Input types
## Required
- text_positive
    - 正面文本输入至关重要，因为它提供了节点应用蒸汽朋克现实主义风格的基本内容。这是将被增强和转换以反映所需主题风格的文本。
    - Comfy dtype: STRING
    - Python dtype: str
- text_negative
    - 负面文本输入作为正面文本的对比，允许节点通过整合特定不希望出现在最终输出中的元素来微调风格化转换。
    - Comfy dtype: STRING
    - Python dtype: str
- style
    - 风格参数至关重要，因为它决定了节点将应用于输入文本的主题方向和审美选择。它是风格化转换过程背后的指导力量。
    - Comfy dtype: COMBO
    - Python dtype: str
## Optional
- log_prompt
    - 日志提示参数是一个可选设置，允许用户记录转换过程，提供节点如何将蒸汽朋克现实主义风格应用于输入文本的见解。
    - Comfy dtype: COMBO
    - Python dtype: str

# Output types
- positive_prompt_text_g
    - 输出是积极风格化的文本，已经转换为体现蒸汽朋克现实主义风格，准备用于各种创意应用。
    - Comfy dtype: STRING
    - Python dtype: str
- negative_prompt_text_g
    - 输出是负面风格化的文本，通过提供与正面输出形成对比的元素，有助于完善最终产品的主题内容和美学。
    - Comfy dtype: STRING
    - Python dtype: str

# Usage tips
- Infra type: CPU

# Source code
```
class SDXLPromptStylerbySteamPunkRealism:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(self):
        p = os.path.dirname(os.path.realpath(__file__))
        file_path = os.path.join(p, 'sdxl_styles_sr.json')
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