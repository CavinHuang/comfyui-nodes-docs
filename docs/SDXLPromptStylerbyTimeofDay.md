# Documentation
- Class name: SDXLPromptStylerbyTimeofDay
- Category: Style Prompts
- Output node: False
- Repo Ref: https://github.com/wolfden/ComfyUi_PromptStylers

该节点根据当前的时辰动态地对提示进行样式设计，通过根据当前时间的上下文来定制信息的展示，增强用户交互体验。

# Input types
## Required
- text_positive
    - 正面文本输入非常重要，因为它设定了根据所选时间定制和展示的正面情绪的基线。
    - Comfy dtype: STRING
    - Python dtype: str
- text_negative
    - 负面文本输入对于提供与正面文本对比的情绪至关重要，使节点能够平衡风格化提示的整体语气。
    - Comfy dtype: STRING
    - Python dtype: str
- style
    - 样式参数在决定根据时间定制提示的样式方面起着关键作用，影响输出的整体美学和情绪。
    - Comfy dtype: COMBO
    - Python dtype: str
## Optional
- log_prompt
    - 记录提示参数是开发人员和测试人员的实用工具，使他们能够输出有关样式化过程的详细信息，以便进行调试和验证。
    - Comfy dtype: COMBO
    - Python dtype: str

# Output types
- positive_prompt_text_g
    - 输出包含正面风格的文本，已经格式化以与所选时间相匹配，通过定制的消息传递增强用户的体验。
    - Comfy dtype: STRING
    - Python dtype: str
- negative_prompt_text_g
    - 输出包括负面风格的文本，通过提供对比情绪来补充正面文本，有助于细致入微地展示提示。
    - Comfy dtype: STRING
    - Python dtype: str

# Usage tips
- Infra type: CPU

# Source code
```
class SDXLPromptStylerbyTimeofDay:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(self):
        p = os.path.dirname(os.path.realpath(__file__))
        file_path = os.path.join(p, 'sdxl_styles_tod.json')
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