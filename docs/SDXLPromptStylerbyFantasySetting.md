# Documentation
- Class name: SDXLPromptStylerbyFantasySetting
- Category: Style Prompts
- Output node: False
- Repo Ref: https://github.com/wolfden/ComfyUi_PromptStylers

SDXLPromptStylerbyFantasySetting节点旨在基于幻想设定来风格化提示。它创造性地结合了积极和消极的文本输入以及所选的风格，生成与所选幻想主题一致的风格化提示。该节点在增强幻想背景下提示的主题一致性和参与度方面发挥着至关重要的作用。

# Input types
## Required
- text_positive
    - text_positive参数是提供要风格化的积极上下文或肯定的关键元素。它对于设定最终提示的基调至关重要，并显著影响主题结果。
    - Comfy dtype: STRING
    - Python dtype: str
- text_negative
    - text_negative参数是可选的，允许包含可以与积极文本创造性对比的负面上下文。这可以为风格化的提示增添深度和复杂性。
    - Comfy dtype: STRING
    - Python dtype: str
- style
    - style参数决定了提示将与之风格化的幻想设定。它是一个关键输入，定义了风格化过程的主题方向。
    - Comfy dtype: STRING
    - Python dtype: str
- log_prompt
    - log_prompt参数是一个可选的切换，当设置为'Yes'时，将启用对风格、文本输入和生成的风格化提示的记录。这对于调试或审查风格化过程非常有用。
    - Comfy dtype: COMBO['No', 'Yes']
    - Python dtype: str

# Output types
- positive_prompt_text_g
    - positive_prompt_text_g输出代表了已风格化的积极性提示文本，它已被创造性地调整以适应所选的幻想设定，增强了主题吸引力。
    - Comfy dtype: STRING
    - Python dtype: str
- negative_prompt_text_g
    - negative_prompt_text_g输出提供了风格化的消极提示文本，它通过在幻想设定中提供对比元素来补充积极提示。
    - Comfy dtype: STRING
    - Python dtype: str

# Usage tips
- Infra type: CPU

# Source code
```
class SDXLPromptStylerbyFantasySetting:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(self):
        p = os.path.dirname(os.path.realpath(__file__))
        file_path = os.path.join(p, 'sdxl_styles_fs.json')
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