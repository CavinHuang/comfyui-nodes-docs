# Documentation
- Class name: SDXLPromptStylerbyMileHigh
- Category: Style Prompts
- Output node: False
- Repo Ref: https://github.com/wolfden/ComfyUi_PromptStylers

SDXLPromptStylerbyMileHigh节点旨在根据预定义的样式对文本提示进行风格化。它接受正面和负面的文本输入以及所选的样式标识符，并据此生成风格化的提示。该节点还可以记录输入和输出以供审查，这对于调试或透明度目的非常有用。

# Input types
## Required
- text_positive
    - 正面文本输入对于定义提示的乐观方面至关重要。它显著影响风格化输出的语气和方向。
    - Comfy dtype: STRING
    - Python dtype: str
- text_negative
    - 负面文本输入与正面文本形成对比，提供了一个可以用于完善提示风格的对立面。
    - Comfy dtype: STRING
    - Python dtype: str
- style
    - 样式参数决定了应用于文本的风格模板。对于根据用户需求实现所需的提示风格至关重要。
    - Comfy dtype: STRING
    - Python dtype: str
- log_prompt
    - 当log_prompt参数设置为'Yes'时，将启用提示过程的记录。这对于监控和审查节点的操作可能很有益处。
    - Comfy dtype: COMBO['No', 'Yes']
    - Python dtype: str

# Output types
- positive_prompt_text_g
    - positive_prompt_text_g输出代表了风格化的正面文本提示，这是节点执行的关键结果。
    - Comfy dtype: STRING
    - Python dtype: str
- negative_prompt_text_g
    - negative_prompt_text_g输出提供了风格化的负面文本提示，与正面提示相辅相成，以给出完整的风格化输出。
    - Comfy dtype: STRING
    - Python dtype: str

# Usage tips
- Infra type: CPU

# Source code
```
class SDXLPromptStylerbyMileHigh:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(self):
        p = os.path.dirname(os.path.realpath(__file__))
        file_path = os.path.join(p, 'sdxl_styles_mh.json')
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