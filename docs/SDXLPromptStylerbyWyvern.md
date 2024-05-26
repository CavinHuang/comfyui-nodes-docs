# Documentation
- Class name: SDXLPromptStylerbyWyvern
- Category: Style Prompts
- Output node: False
- Repo Ref: https://github.com/wolfden/ComfyUi_PromptStylers

该节点旨在基于预定义模板对提示进行样式化，增强内容的展示和吸引力。它通过将正面和负面文本输入与选定的样式相结合，旨在创建一个连贯且主题一致的输出。

# Input types
## Required
- text_positive
    - 正面文本输入对于设定提示的肯定基调至关重要。它是风格化元素从选定模板中应用的基础，显著影响最终输出的有效性。
    - Comfy dtype: STRING
    - Python dtype: str
- text_negative
    - 负面文本输入通过提供对比内容来补充正面文本。它与风格模板的整合对于创建一个平衡且细致的提示至关重要，能够解决潜在的反驳点或限制。
    - Comfy dtype: STRING
    - Python dtype: str
- style
    - 样式参数在确定提示的整体美学和主题方向上起着关键作用。它指导模板的选择，并决定正面和负面文本的格式化和呈现方式。
    - Comfy dtype: COMBO
    - Python dtype: str
## Optional
- log_prompt
    - 日志提示参数允许对样式化过程进行可选的日志记录。启用后，它提供了节点操作的透明度，有助于调试并确保实现所需的样式。
    - Comfy dtype: COMBO
    - Python dtype: str

# Output types
- positive_prompt_text_g
    - 输出代表经过样式化的正面提示文本，已根据选定的样式模板和输入的正面文本进行格式化。这个输出对于节点增强内容展示的目的至关重要。
    - Comfy dtype: STRING
    - Python dtype: str
- negative_prompt_text_g
    - 输出包括经过样式化的负面提示文本，通过解决潜在的反驳或限制来补充正面输出。它是节点功能的关键组成部分，确保全面且平衡的展示。
    - Comfy dtype: STRING
    - Python dtype: str

# Usage tips
- Infra type: CPU

# Source code
```
class SDXLPromptStylerbyWyvern:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(self):
        p = os.path.dirname(os.path.realpath(__file__))
        file_path = os.path.join(p, 'sdxl_styles_wyvern.json')
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