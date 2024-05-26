# Documentation
- Class name: SDXLPromptStylerMisc
- Category: Style Prompts
- Output node: False
- Repo Ref: https://github.com/wolfden/ComfyUi_PromptStylers

该节点旨在通过应用预定义的样式来增强提示的呈现，确保提示具有吸引力且在上下文中合适。

# Input types
## Required
- text_positive
    - 正面文本输入至关重要，因为它为提示设定了积极基调。它将是按照选定模板进行样式化和格式化的基础文本。
    - Comfy dtype: STRING
    - Python dtype: str
- text_negative
    - 负面文本输入对于提供提示的对比元素至关重要，允许更细致和平衡的呈现。
    - Comfy dtype: STRING
    - Python dtype: str
## Optional
- style
    - 样式输入决定了提示的审美和结构特征，影响其整体吸引力和有效性。
    - Comfy dtype: COMBO
    - Python dtype: str
- log_prompt
    - 日志提示输入是启用日志记录的切换，这对于调试和理解节点的操作和生成的提示非常有用。
    - Comfy dtype: COMBO
    - Python dtype: str

# Output types
- positive_prompt_text_g
    - 输出提供了经过样式化的正面提示文本，它已根据选定的样式进行了格式化，增强了其影响力和可读性。
    - Comfy dtype: STRING
    - Python dtype: str
- negative_prompt_text_g
    - 输出提供了经过样式化的负面提示文本，它通过提供对比视角来补充正面文本，丰富了整体信息。
    - Comfy dtype: STRING
    - Python dtype: str

# Usage tips
- Infra type: CPU

# Source code
```
class SDXLPromptStylerMisc:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(self):
        p = os.path.dirname(os.path.realpath(__file__))
        file_path = os.path.join(p, 'sdxl_styles_misc.json')
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