# Documentation
- Class name: SDXLPromptStylerbyFilter
- Category: Style Prompts
- Output node: False
- Repo Ref: https://github.com/wolfden/ComfyUi_PromptStylers

该节点基于提供的正面和负面文本输入，动态地对提示进行样式设计，使用指定的样式模板生成精炼且针对性的消息。

# Input types
## Required
- text_positive
    - 正面文本输入非常重要，因为它设定了期望消息的基调。它被用来创建一个精炼且针对性的正面提示。
    - Comfy dtype: STRING
    - Python dtype: str
- text_negative
    - 负面文本输入对于定义消息中应避免的对比元素至关重要。它有助于创建一个平衡正面和负面方面的细致提示。
    - Comfy dtype: STRING
    - Python dtype: str
- style
    - 样式参数在确定生成提示的整体美学和传达方式方面至关重要。它指导输入文本的转换，使其成为一个连贯且风格一致的输出。
    - Comfy dtype: COMBO
    - Python dtype: str
## Optional
- log_prompt
    - 日志提示选项允许对提示生成过程进行可选的日志记录，提供透明度和对提示样式和构建方式的洞察。
    - Comfy dtype: COMBO
    - Python dtype: str

# Output types
- positive_prompt_text_g
    - 输出的正面提示文本是样式设计过程的结果，以精炼和引人入胜的方式封装了期望的消息。
    - Comfy dtype: STRING
    - Python dtype: str
- negative_prompt_text_g
    - 输出的负面提示文本为正面提示提供了平衡，确保消息全面且解决了潜在的关注点或异议。
    - Comfy dtype: STRING
    - Python dtype: str

# Usage tips
- Infra type: CPU

# Source code
```
class SDXLPromptStylerbyFilter:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(self):
        p = os.path.dirname(os.path.realpath(__file__))
        file_path = os.path.join(p, 'sdxl_styles_filter.json')
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