# Documentation
- Class name: SDXLPromptStylerbyOriginal
- Category: Style Prompts
- Output node: False
- Repo Ref: https://github.com/wolfden/ComfyUi_PromptStylers

该节点旨在基于预定义模板来美化提示，增强内容的展示效果和吸引力。

# Input types
## Required
- text_positive
    - 正面文本输入至关重要，因为它构成了美化提示的基础。这是将根据所选样式进行格式化的内容。
    - Comfy dtype: STRING
    - Python dtype: str
- text_negative
    - 负面文本输入对于提供与正面文本对比的元素至关重要，允许更细致和全面的提示。
    - Comfy dtype: STRING
    - Python dtype: str
- style
    - 样式参数在确定将应用于提示的审美和结构元素方面至关重要，指导整体的外观和感觉。
    - Comfy dtype: COMBO
    - Python dtype: str
## Optional
- log_prompt
    - 日志记录选项允许选择性记录提示生成过程，这对于调试和审查目的非常有益。
    - Comfy dtype: COMBO
    - Python dtype: str

# Output types
- positive_prompt_text_g
    - 输出提供美化后的正面提示，这是原始输入文本的格式化和增强版本。
    - Comfy dtype: STRING
    - Python dtype: str
- negative_prompt_text_g
    - 输出提供美化后的负面提示，为正面提示提供补充视角，丰富整体信息。
    - Comfy dtype: STRING
    - Python dtype: str

# Usage tips
- Infra type: CPU

# Source code
```
class SDXLPromptStylerbyOriginal:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(self):
        p = os.path.dirname(os.path.realpath(__file__))
        file_path = os.path.join(p, 'sdxl_styles_original.json')
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