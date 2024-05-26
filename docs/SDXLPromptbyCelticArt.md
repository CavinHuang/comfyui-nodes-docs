# Documentation
- Class name: SDXLPromptbyCelticArt
- Category: Style Prompts
- Output node: False
- Repo Ref: https://github.com/wolfden/ComfyUi_PromptStylers

SDXLPromptbyCelticArt节点旨在基于凯尔特艺术主题生成风格化文本提示。它创造性地结合正面和负面文本输入以及所选风格，以产生主题化提示。该节点在增强各种应用的文本输出的主题丰富性方面发挥着关键作用，例如艺术生成或主题文本样式化。

# Input types
## Required
- text_positive
    - text_positive参数对于定义提示的积极方面至关重要。它显著影响最终风格化提示的语气和内容，确保输出与所需的积极主题元素一致。
    - Comfy dtype: STRING
    - Python dtype: str
- text_negative
    - text_negative参数允许在提示中包含负面方面。对于提供对比和深度至风格化文本至关重要，丰富了整体的主题表达。
    - Comfy dtype: STRING
    - Python dtype: str
- style
    - style参数决定了要应用于提示的凯尔特艺术的主题风格。它是形成文本审美和主题结果的关键因素，确保它与所选择的艺术主题产生共鸣。
    - Comfy dtype: STRING
    - Python dtype: str
- log_prompt
    - log_prompt参数是可选的，控制是否记录提示样式化过程的中间步骤。这对于调试或希望查看转换过程的用户来说可能是有用的。
    - Comfy dtype: COMBO['No', 'Yes']
    - Python dtype: str

# Output types
- positive_prompt_text_g
    - positive_prompt_text_g输出代表最终的风格化正面提示文本，是节点功能的关键元素。它包含了输入文本与所选风格的创造性融合，产生了主题丰富的文本输出。
    - Comfy dtype: STRING
    - Python dtype: str
- negative_prompt_text_g
    - negative_prompt_text_g输出提供了最终的风格化负面提示文本，补充了正面提示。它在为整体提示增加复杂性和细微差别方面发挥着重要作用，有助于更全面的主题表现。
    - Comfy dtype: STRING
    - Python dtype: str

# Usage tips
- Infra type: CPU

# Source code
```
class SDXLPromptbyCelticArt:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(self):
        p = os.path.dirname(os.path.realpath(__file__))
        file_path = os.path.join(p, 'sdxl_styles_celticart.json')
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