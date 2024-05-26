# Documentation
- Class name: SDXLPromptStylerbyImpressionism
- Category: Style Prompts
- Output node: False
- Repo Ref: https://github.com/wolfden/ComfyUi_PromptStylers

该节点通过应用受印象派启发的风格模板，创造性地转换输入文本，增强文本的审美和主题深度。

# Input types
## Required
- text_positive
    - 正面文本输入作为风格转换的基础，提供了将被赋予印象派特质的内容。
    - Comfy dtype: STRING
    - Python dtype: str
- text_negative
    - 负面文本输入用于与正面文本形成对比，可能会为最终的风格化输出增加深度和复杂性。
    - Comfy dtype: STRING
    - Python dtype: str
- style
    - 从预定义的印象派风格模板中选择的样式决定了文本转换的整体基调和方向。
    - Comfy dtype: COMBO
    - Python dtype: str
## Optional
- log_prompt
    - 此参数控制是否记录样式化过程的中间步骤和结果，有助于理解节点的操作和输出。
    - Comfy dtype: COMBO
    - Python dtype: str

# Output types
- positive_prompt_text_g
    - 输出展示了积极风格化的文本，现在融入了所选的印象派风格，可供进一步使用或展示。
    - Comfy dtype: STRING
    - Python dtype: str
- negative_prompt_text_g
    - 输出包括负面风格化的文本，它补充了正面输出，并可能提供对比视角或额外上下文。
    - Comfy dtype: STRING
    - Python dtype: str

# Usage tips
- Infra type: CPU

# Source code
```
class SDXLPromptStylerbyImpressionism:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(self):
        p = os.path.dirname(os.path.realpath(__file__))
        file_path = os.path.join(p, 'sdxl_styles_impressionism.json')
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