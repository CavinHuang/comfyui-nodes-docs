# Documentation
- Class name: SDXLPromptStylerbyLighting
- Category: Style Prompts
- Output node: False
- Repo Ref: https://github.com/wolfden/ComfyUi_PromptStylers

该节点旨在通过应用样式模板来增强提示的展示，目的是提高文本的可读性和吸引力。

# Input types
## Required
- text_positive
    - 此参数是需要被节点样式化的正面文本，是增强展示的基础。
    - Comfy dtype: STRING
    - Python dtype: str
- text_negative
    - 此参数是需要与正面文本结合的负面文本，为最终样式化输出增加对比和深度。
    - Comfy dtype: STRING
    - Python dtype: str
- style
    - 此参数决定了要应用的样式模板，显著影响样式化提示的整体美学和语调。
    - Comfy dtype: COMBO
    - Python dtype: str
## Optional
- log_prompt
    - 此参数控制是否记录中间步骤和结果，有助于调试和理解节点的操作。
    - Comfy dtype: COMBO
    - Python dtype: str

# Output types
- positive_prompt_text_g
    - 输出是经过样式化的正面文本，通过所选模板增强了其视觉吸引力和有效性。
    - Comfy dtype: STRING
    - Python dtype: str
- negative_prompt_text_g
    - 输出是经过样式化的负面文本，补充正面文本，并为样式化信息的全面性做出贡献。
    - Comfy dtype: STRING
    - Python dtype: str

# Usage tips
- Infra type: CPU

# Source code
```
class SDXLPromptStylerbyLighting:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(self):
        p = os.path.dirname(os.path.realpath(__file__))
        file_path = os.path.join(p, 'sdxl_styles_lighting.json')
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