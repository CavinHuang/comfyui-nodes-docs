# Documentation
- Class name: SDXLPromptStylerbySubject
- Category: Style Prompts
- Output node: False
- Repo Ref: https://github.com/wolfden/ComfyUi_PromptStylers

SDXLPromptStylerbySubject节点旨在根据给定的主题对提示进行风格化。它接受正面和负面的文本输入，并应用选定的风格来生成风格化的提示。该节点能够记录过程以供审查，增强提示的定制和个性化。

# Input types
## Required
- text_positive
    - text_positive参数是一个字符串，代表提示的积极方面。它对于定义风格化输出的乐观基调至关重要。
    - Comfy dtype: STRING
    - Python dtype: str
- text_negative
    - text_negative参数是一个字符串，代表提示的消极方面。它在塑造风格化输出的悲观基调中起着关键作用。
    - Comfy dtype: STRING
    - Python dtype: str
- style
    - style参数决定了应用于提示的风格化方法。它是风格化提示的整体风格和呈现方式的关键因素。
    - Comfy dtype: STRING
    - Python dtype: str
- log_prompt
    - log_prompt参数是一个可选选项，允许记录风格化过程。它可以设置为'Yes'，以便详细审查转换过程。
    - Comfy dtype: COMBO['No', 'Yes']
    - Python dtype: str

# Output types
- positive_prompt_text_g
    - positive_prompt_text_g输出是提示的风格化正面文本，反映了应用的风格和输入的乐观视角。
    - Comfy dtype: STRING
    - Python dtype: str
- negative_prompt_text_g
    - negative_prompt_text_g输出是提示的风格化负面文本，体现了应用的风格和输入的悲观视角。
    - Comfy dtype: STRING
    - Python dtype: str

# Usage tips
- Infra type: CPU

# Source code
```
class SDXLPromptStylerbySubject:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(self):
        p = os.path.dirname(os.path.realpath(__file__))
        file_path = os.path.join(p, 'sdxl_styles_subject.json')
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