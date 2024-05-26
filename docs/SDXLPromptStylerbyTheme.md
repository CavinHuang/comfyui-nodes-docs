# Documentation
- Class name: SDXLPromptStylerbyTheme
- Category: Style Prompts
- Output node: False
- Repo Ref: https://github.com/wolfden/ComfyUi_PromptStylers

SDXLPromptStylerbyTheme 类旨在根据预定义的主题对提示进行风格化。它利用包含样式和模板的 JSON 文件来生成风格化的正面和负面提示，增强文本输入的主题一致性。

# Input types
## Required
- text_positive
    - text_positive 参数是一个字符串，代表提示的正面内容。它至关重要，因为它构成了风格化正面提示输出的基础。
    - Comfy dtype: STRING
    - Python dtype: str
- text_negative
    - text_negative 参数是一个字符串，代表提示的负面内容。它在塑造风格化负面提示输出中起着关键作用。
    - Comfy dtype: STRING
    - Python dtype: str
- style
    - style 参数决定了应用于提示的主题风格。它是提示外观和语调定制的关键因素。
    - Comfy dtype: STRING
    - Python dtype: str
- log_prompt
    - log_prompt 参数是可选设置，当设置为 'Yes' 时，可以启用提示风格化过程的日志记录，用于调试或审查目的。
    - Comfy dtype: COMBO['No', 'Yes']
    - Python dtype: str

# Output types
- positive_prompt_text_g
    - positive_prompt_text_g 输出是风格化的正面提示文本，旨在与指定的主题保持一致，并增强信息的整体吸引力。
    - Comfy dtype: STRING
    - Python dtype: str
- negative_prompt_text_g
    - negative_prompt_text_g 输出是风格化的负面提示文本，旨在反映指定的主题并保持信息的主题完整性。
    - Comfy dtype: STRING
    - Python dtype: str

# Usage tips
- Infra type: CPU

# Source code
```
class SDXLPromptStylerbyTheme:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(self):
        p = os.path.dirname(os.path.realpath(__file__))
        file_path = os.path.join(p, 'sdxl_styles_themes.json')
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