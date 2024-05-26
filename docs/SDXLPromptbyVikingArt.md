# Documentation
- Class name: SDXLPromptbyVikingArt
- Category: Style Prompts
- Output node: False
- Repo Ref: https://github.com/wolfden/ComfyUi_PromptStylers

该节点基于给定的正面和负面文本输入，利用来自维京艺术主题的指定风格动态生成风格化提示。它旨在通过将主题元素整合到生成的内容中来增强创作过程。

# Input types
## Required
- text_positive
    - 正面文本输入对于设定生成提示的肯定基调至关重要。它提供了将被风格化增强的基础内容，以符合所选的维京艺术主题。
    - Comfy dtype: STRING
    - Python dtype: str
- text_negative
    - 负面文本输入对于定义生成提示中应避免的方面至关重要。它有助于优化输出，确保其遵循期望的主题方向，而不包含不想要的元素。
    - Comfy dtype: STRING
    - Python dtype: str
- style
    - 风格参数在确定提示的主题方向中起着关键作用。它指导节点选择与所选维京艺术风格相呼应的适当模板和语言元素。
    - Comfy dtype: COMBO
    - Python dtype: str
## Optional
- log_prompt
    - 日志提示参数允许对提示生成过程进行可选记录。启用后，它提供了有关节点如何运作以及应用于输入文本的转换的有价值的见解。
    - Comfy dtype: COMBO
    - Python dtype: str

# Output types
- positive_prompt_text_g
    - 输出包含正面风格化的提示文本，已经通过维京艺术风格的主题元素进行了增强，提供了一个创造性和引人入胜的结果。
    - Comfy dtype: STRING
    - Python dtype: str
- negative_prompt_text_g
    - 输出呈现负面风格化的提示文本，已经调整以排除不需要的元素，确保最终输出符合指定的主题要求。
    - Comfy dtype: STRING
    - Python dtype: str

# Usage tips
- Infra type: CPU

# Source code
```
class SDXLPromptbyVikingArt:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(self):
        p = os.path.dirname(os.path.realpath(__file__))
        file_path = os.path.join(p, 'sdxl_styles_viking.json')
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