# Documentation
- Class name: SDXLPromptStylerbyFocus
- Category: Style Prompts
- Output node: False
- Repo Ref: https://github.com/wolfden/ComfyUi_PromptStylers

该节点旨在通过应用特定的样式模板来增强提示的呈现，从而通过量身定制和视觉上吸引人的文本格式提高用户体验和参与度。

# Input types
## Required
- text_positive
    - 正面文本输入至关重要，因为它为提示的积极方面设定了基础。这是将被风格化并呈现给用户的内容，旨在引发积极反应。
    - Comfy dtype: STRING
    - Python dtype: str
- text_negative
    - 负面文本输入对于提供提示的对比元素至关重要，允许更细致和平衡的呈现。它通过提供不同的视角来补充正面文本。
    - Comfy dtype: STRING
    - Python dtype: str
## Optional
- style
    - 样式输入是决定提示的审美和结构格式的关键组成部分。它指导文本转变为视觉上吸引人和连贯的信息。
    - Comfy dtype: COMBO
    - Python dtype: str
- log_prompt
    - 日志提示输入作为调试工具，用于记录提示的细节以供分析和审查。它有助于完善节点的功能并确保最佳输出。
    - Comfy dtype: COMBO
    - Python dtype: str

# Output types
- positive_prompt_text_g
    - 输出提供风格化的正面提示文本，根据选定的样式模板进行了格式化，增强了信息的可读性和吸引力。
    - Comfy dtype: STRING
    - Python dtype: str
- negative_prompt_text_g
    - 输出提供风格化的负面提示文本，通过提供对比视角来补充正面提示，从而有助于全面和平衡的沟通。
    - Comfy dtype: STRING
    - Python dtype: str

# Usage tips
- Infra type: CPU

# Source code
```
class SDXLPromptStylerbyFocus:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(self):
        p = os.path.dirname(os.path.realpath(__file__))
        file_path = os.path.join(p, 'sdxl_styles_focus.json')
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