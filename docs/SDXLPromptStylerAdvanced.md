# Documentation
- Class name: SDXLPromptStylerAdvanced
- Category: utils
- Output node: False
- Repo Ref: https://github.com/twri/sdxl_prompt_styler

该节点旨在通过基于一组预定义模板的高级样式技术来增强文本的呈现。它将正面和负面提示集成到一个连贯的格式中，允许根据特定风格定制文本。

# Input types
## Required
- text_positive_g
    - 主要的正面提示作为需要强调的核心信息。它对于设定风格化文本的基调和方向至关重要。
    - Comfy dtype: STRING
    - Python dtype: str
- text_positive_l
    - 辅助性的正面提示提供额外的上下文或细节，以补充主要信息，丰富整体内容。
    - Comfy dtype: STRING
    - Python dtype: str
- text_negative
    - 负面提示用于引入对比元素或对立观点，这可以增加风格化文本的深度和吸引力。
    - Comfy dtype: STRING
    - Python dtype: str
- style
    - 样式参数决定了应用于文本的审美和结构格式，指导输出的整体外观和感觉。
    - Comfy dtype: STYLE
    - Python dtype: dict
- negative_prompt_to
    - 该参数决定了负面提示的应用目标，无论是应用于主要和辅助提示还是选择性地应用。
    - Comfy dtype: COMBO
    - Python dtype: str
- copy_to_l
    - 启用时，此标志确保主要正面提示被复制到辅助提示，提供一致性并强化主要信息。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool
- log_prompt
    - 此切换启用或禁用提示和风格化文本的记录，这对于调试和审查目的非常有用。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool

# Output types
- text_positive_g
    - 主要的风格化文本，在应用所选样式后反映了主要的正面信息。
    - Comfy dtype: STRING
    - Python dtype: str
- text_positive_l
    - 辅助性的风格化文本，为主信息提供额外的上下文，体现在最终输出中。
    - Comfy dtype: STRING
    - Python dtype: str
- text_positive
    - 主要和辅助正面提示的结合，集成到一个连贯且风格一致的输出中。
    - Comfy dtype: STRING
    - Python dtype: str
- text_negative_g
    - 根据所选模板样式化的主要负面提示，通过对比元素平衡整体呈现。
    - Comfy dtype: STRING
    - Python dtype: str
- text_negative_l
    - 辅助性的负面提示进行样式化，以补充主要负面文本，增强最终输出的深度。
    - Comfy dtype: STRING
    - Python dtype: str
- text_negative
    - 组合的负面提示作为一个整体进行样式化，为内容的全面和引人入胜的呈现做出贡献。
    - Comfy dtype: STRING
    - Python dtype: str

# Usage tips
- Infra type: CPU

# Source code
```
class SDXLPromptStylerAdvanced:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(self):
        current_directory = os.path.dirname(os.path.realpath(__file__))
        (self.json_data, styles) = load_styles_from_directory(current_directory)
        return {'required': {'text_positive_g': ('STRING', {'default': '', 'multiline': True}), 'text_positive_l': ('STRING', {'default': '', 'multiline': True}), 'text_negative': ('STRING', {'default': '', 'multiline': True}), 'style': (styles,), 'negative_prompt_to': (['Both', 'G only', 'L only'], {'default': 'Both'}), 'copy_to_l': ('BOOLEAN', {'default': False, 'label_on': 'yes', 'label_off': 'no'}), 'log_prompt': ('BOOLEAN', {'default': False, 'label_on': 'yes', 'label_off': 'no'})}}
    RETURN_TYPES = ('STRING', 'STRING', 'STRING', 'STRING', 'STRING', 'STRING')
    RETURN_NAMES = ('text_positive_g', 'text_positive_l', 'text_positive', 'text_negative_g', 'text_negative_l', 'text_negative')
    FUNCTION = 'prompt_styler_advanced'
    CATEGORY = 'utils'

    def prompt_styler_advanced(self, text_positive_g, text_positive_l, text_negative, style, negative_prompt_to, copy_to_l, log_prompt):
        (text_positive_g_styled, text_positive_l_styled, text_positive_styled, text_negative_g_styled, text_negative_l_styled, text_negative_styled) = read_sdxl_templates_replace_and_combine_advanced(self.json_data, style, text_positive_g, text_positive_l, text_negative, negative_prompt_to, copy_to_l)
        if log_prompt:
            print(f'style: {style}')
            print(f'text_positive_g: {text_positive_g}')
            print(f'text_positive_l: {text_positive_l}')
            print(f'text_negative: {text_negative}')
            print(f'text_positive_g_styled: {text_positive_g_styled}')
            print(f'text_positive_l_styled: {text_positive_l_styled}')
            print(f'text_positive_styled: {text_positive_styled}')
            print(f'text_negative_g_styled: {text_negative_g_styled}')
            print(f'text_negative_l_styled: {text_negative_l_styled}')
            print(f'text_negative_styled: {text_negative_styled}')
        return (text_positive_g_styled, text_positive_l_styled, text_positive_styled, text_negative_g_styled, text_negative_l_styled, text_negative_styled)
```