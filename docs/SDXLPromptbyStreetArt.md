# Documentation
- Class name: SDXLPromptbyStreetArt
- Category: Style Prompts
- Output node: False
- Repo Ref: https://github.com/wolfden/ComfyUi_PromptStylers

该节点将输入文本与指定风格相匹配，通过从街头艺术中提取的风格元素增强主题内容。

# Input types
## Required
- text_positive
    - 该参数提供将根据所选街头艺术主题进行风格化的正面文本，作为创意改编过程的基础。
    - Comfy dtype: STRING
    - Python dtype: str
- text_negative
    - 该参数包含与正面文本形成对比的负面文本，使节点能够专注于所需的风格元素，不受干扰。
    - Comfy dtype: STRING
    - Python dtype: str
- style
    - 该参数定义了要应用的街头艺术风格，指导节点选择适当的模板和艺术元素进行文本转换。
    - Comfy dtype: COMBO
    - Python dtype: str
## Optional
- log_prompt
    - 该参数启用或禁用样式化过程的日志记录，提供了一种跟踪转换和调试可能出现的任何问题的方法。
    - Comfy dtype: COMBO
    - Python dtype: str

# Output types
- positive_prompt_text_g
    - 输出包含正面风格化的文本，转换为反映所选街头艺术风格，增强主题表达和艺术吸引力。
    - Comfy dtype: STRING
    - Python dtype: str
- negative_prompt_text_g
    - 输出提供负面风格化的文本，作为正面文本的对比元素，确保最终呈现的清晰度和专注度。
    - Comfy dtype: STRING
    - Python dtype: str

# Usage tips
- Infra type: CPU

# Source code
```
class SDXLPromptbyStreetArt:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(self):
        p = os.path.dirname(os.path.realpath(__file__))
        file_path = os.path.join(p, 'sdxl_styles_street.json')
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