# Documentation
- Class name: SDXLPromptStylerbyCyberpunkSurrealism
- Category: Style Prompts
- Output node: False
- Repo Ref: https://github.com/wolfden/ComfyUi_PromptStylers

该节点通过应用从精选集合中选择的模板，将输入文本创造性地转换为风格增强的提示，从而生成美学一致且主题丰富的内容。

# Input types
## Required
- text_positive
    - 正面文本输入作为风格化转换的基础，提供了将被所选模板增强和塑造的内容。
    - Comfy dtype: STRING
    - Python dtype: str
- text_negative
    - 负面文本输入用于补充正面文本，为最终的风格化提示提供对比和深度。
    - Comfy dtype: STRING
    - Python dtype: str
- style
    - 风格选择至关重要，因为它决定了提示样式化的主题和美学方向，指导转换过程。
    - Comfy dtype: COMBO
    - Python dtype: str
## Optional
- log_prompt
    - 日志记录偏好决定了是否输出中间步骤和结果，有助于理解节点的运作和样式化过程。
    - Comfy dtype: COMBO
    - Python dtype: str

# Output types
- positive_prompt_text_g
    - 输出展示了正面风格化的文本，这是将所选模板应用于原始输入的结果，现在增强了主题和风格元素。
    - Comfy dtype: STRING
    - Python dtype: str
- negative_prompt_text_g
    - 输出包括负面风格化的文本，为正面文本提供了对比元素，丰富了整体的风格化输出。
    - Comfy dtype: STRING
    - Python dtype: str

# Usage tips
- Infra type: CPU

# Source code
```
class SDXLPromptStylerbyCyberpunkSurrealism:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(self):
        p = os.path.dirname(os.path.realpath(__file__))
        file_path = os.path.join(p, 'sdxl_styles_cs.json')
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