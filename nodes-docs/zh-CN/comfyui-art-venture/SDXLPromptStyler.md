# Documentation
- Class name: SDXLPromptStyler
- Category: utils
- Output node: False
- Repo Ref: https://github.com/twri/sdxl_prompt_styler

SDXLPromptStyler节点旨在通过应用预定义的样式来美化文本输入。它处理正面和负面提示，允许通过样式选择和日志记录选项进行定制。该节点的主要目标是在保持原始信息意图的同时增强文本的呈现效果。

# Input types
## Required
- text_positive
    - text_positive参数对于定义输入文本的正面方面至关重要。它通过决定将被正面风格化的文本内容来影响节点的执行。
    - Comfy dtype: STRING
    - Python dtype: str
- text_negative
    - text_negative参数指定了输入文本的负面方面。它对节点的操作至关重要，因为它决定了将被负面风格化的文本内容。
    - Comfy dtype: STRING
    - Python dtype: str
- style
    - style参数在确定应用于输入文本的风格转换中起着关键作用。它指示节点使用可用选项中的特定样式。
    - Comfy dtype: STRING
    - Python dtype: str
## Optional
- log_prompt
    - log_prompt参数控制节点是否应该记录其操作。这对于调试或跟踪节点的处理步骤非常有用。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool
- style_positive
    - style_positive参数允许用户启用或禁用文本的正面风格化。它在最终输出的外观中起着重要作用。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool
- style_negative
    - style_negative参数用于切换文本的负面风格化。这是节点在文本呈现功能中的一个重要方面。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool

# Output types
- text_positive
    - text_positive输出代表处理后的样式化正面文本。它是将选定的样式应用于输入文本的结果。
    - Comfy dtype: STRING
    - Python dtype: str
- text_negative
    - text_negative输出在节点操作后提供样式化的负面文本。它反映了节点对具有负面含义的文本进行风格化的能力。
    - Comfy dtype: STRING
    - Python dtype: str

# Usage tips
- Infra type: CPU

# Source code
```
class SDXLPromptStyler:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(self):
        current_directory = os.path.dirname(os.path.realpath(__file__))
        (self.json_data, styles) = load_styles_from_directory(current_directory)
        return {'required': {'text_positive': ('STRING', {'default': '', 'multiline': True}), 'text_negative': ('STRING', {'default': '', 'multiline': True}), 'style': (styles,), 'log_prompt': ('BOOLEAN', {'default': True, 'label_on': 'yes', 'label_off': 'no'}), 'style_positive': ('BOOLEAN', {'default': True, 'label_on': 'yes', 'label_off': 'no'}), 'style_negative': ('BOOLEAN', {'default': True, 'label_on': 'yes', 'label_off': 'no'})}}
    RETURN_TYPES = ('STRING', 'STRING')
    RETURN_NAMES = ('text_positive', 'text_negative')
    FUNCTION = 'prompt_styler'
    CATEGORY = 'utils'

    def prompt_styler(self, text_positive, text_negative, style, log_prompt, style_positive, style_negative):
        (text_positive_styled, text_negative_styled) = read_sdxl_templates_replace_and_combine(self.json_data, style, text_positive, text_negative)
        if not style_positive:
            text_positive_styled = text_positive
            if log_prompt:
                print(f'style_positive: disabled')
        if not style_negative:
            text_negative_styled = text_negative
            if log_prompt:
                print(f'style_negative: disabled')
        if log_prompt:
            print(f'style: {style}')
            print(f'text_positive: {text_positive}')
            print(f'text_negative: {text_negative}')
            print(f'text_positive_styled: {text_positive_styled}')
            print(f'text_negative_styled: {text_negative_styled}')
        return (text_positive_styled, text_negative_styled)
```