# Documentation
- Class name: SDXLPromptStylerbyCamera
- Category: Style Prompts
- Output node: False
- Repo Ref: https://github.com/wolfden/ComfyUi_PromptStylers

该节点旨在通过动态生成基于给定正面和负面文本输入的风格化提示，利用预定义的风格集来增强创作过程。它旨在激发和引导用户创作更具吸引力和针对性的内容。

# Input types
## Required
- text_positive
    - 正面文本输入对于设定生成提示的期望基调和方向至关重要。它是应用风格化元素的基础，确保输出与预期的信息和情感保持一致。
    - Comfy dtype: STRING
    - Python dtype: str
- text_negative
    - 负面文本输入对于定义生成提示中应避免的方面至关重要。它通过排除可能削弱预期信息或语气的元素来帮助完善输出。
    - Comfy dtype: STRING
    - Python dtype: str
- style
    - 风格参数对于从可用选项中选择适当的风格模板至关重要。它影响提示的整体美学和主题方向，确保生成的内容与所选风格保持一致。
    - Comfy dtype: COMBO
    - Python dtype: str
## Optional
- log_prompt
    - 日志提示参数允许用户选择性地启用提示生成过程的日志记录。这个功能对于调试和理解节点的内部工作机制有益，提供了对最终输出如何形成的洞察。
    - Comfy dtype: COMBO
    - Python dtype: str

# Output types
- positive_prompt_text_g
    - 输出提供了一个精炼的正面提示文本，结合了选定的风格并排除了负面文本输入指定的不需要的元素。这个结果旨在用作创建与期望的语气和信息相一致内容的指南。
    - Comfy dtype: STRING
    - Python dtype: str
- negative_prompt_text_g
    - 输出提供了一个经过修改的负面提示文本，已调整以适应所选风格，确保最终内容不受削弱预期信息或语气的元素的影响。
    - Comfy dtype: STRING
    - Python dtype: str

# Usage tips
- Infra type: CPU

# Source code
```
class SDXLPromptStylerbyCamera:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(self):
        p = os.path.dirname(os.path.realpath(__file__))
        file_path = os.path.join(p, 'sdxl_styles_camera.json')
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