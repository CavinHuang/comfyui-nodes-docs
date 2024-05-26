# Documentation
- Class name: SDXLPromptStylerbyEnvironment
- Category: Style Prompts
- Output node: False
- Repo Ref: https://github.com/wolfden/ComfyUi_PromptStylers

SDXLPromptStylerbyEnvironment 类旨在根据预定义的风格和模板集对提示进行风格化。它接受正面和负面的文本输入以及选定的风格，并据此生成风格化的提示。该节点还提供了一个选项来记录提示以供审查。

# Input types
## Required
- text_positive
    - text_positive 参数是一个字符串，代表提示的正面内容。它对于节点生成风格化的正面提示至关重要，并在整体输出中扮演重要角色。
    - Comfy dtype: STRING
    - Python dtype: str
- text_negative
    - text_negative 参数是一个字符串，代表提示的负面内容。它用于创建风格化的负面提示，对节点的功能至关重要。
    - Comfy dtype: STRING
    - Python dtype: str
- style
    - style 参数决定了应用于提示的风格化方法。它是一个字符串，从列表中选择一个预定义的风格，对节点的运行至关重要。
    - Comfy dtype: STRING
    - Python dtype: str
- log_prompt
    - log_prompt 参数是一个可选选项，允许用户决定是否记录生成的提示。它通过启用或禁用记录功能来影响节点的行为。
    - Comfy dtype: COMBO['No', 'Yes']
    - Python dtype: str

# Output types
- positive_prompt_text_g
    - positive_prompt_text_g 输出是由节点生成的风格化的正面提示文本。它是节点执行的重要结果，反映了输入的正面内容。
    - Comfy dtype: STRING
    - Python dtype: str
- negative_prompt_text_g
    - negative_prompt_text_g 输出是由节点生成的风格化的负面提示文本。它代表了节点对输入提示负面内容的输出。
    - Comfy dtype: STRING
    - Python dtype: str

# Usage tips
- Infra type: CPU

# Source code
```
class SDXLPromptStylerbyEnvironment:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(self):
        p = os.path.dirname(os.path.realpath(__file__))
        file_path = os.path.join(p, 'sdxl_styles_environment.json')
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