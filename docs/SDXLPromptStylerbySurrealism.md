# Documentation
- Class name: SDXLPromptStylerbySurrealism
- Category: Style Prompts
- Output node: False
- Repo Ref: https://github.com/wolfden/ComfyUi_PromptStylers

该节点通过应用受超现实主义启发的风格模板，创造性地重新设计输入文本提示，增强生成内容的表达性和艺术品质。

# Input types
## Required
- text_positive
    - 正面文本输入作为风格化过程的基础，其内容被转换以反映所选的超现实主义风格。
    - Comfy dtype: STRING
    - Python dtype: str
- text_negative
    - 负面文本输入用于对比和完善风格化，确保最终输出连贯并与期望的审美相符。
    - Comfy dtype: STRING
    - Python dtype: str
- style
    - 选定的风格决定了应用于文本的超现实主义方法，指导转换过程并塑造创意方向。
    - Comfy dtype: COMBO
    - Python dtype: str
## Optional
- log_prompt
    - 此切换确定是否记录过程和结果，提供对风格化过程和生成提示的洞察。
    - Comfy dtype: COMBO
    - Python dtype: str

# Output types
- positive_prompt_text_g
    - 输出展示了积极风格化的文本，现在融入了所选的超现实主义元素，可供进一步使用或展示。
    - Comfy dtype: STRING
    - Python dtype: str
- negative_prompt_text_g
    - 输出包括负面风格化的文本，它补充了正面输出，并为风格化内容的整体连贯性和深度做出了贡献。
    - Comfy dtype: STRING
    - Python dtype: str

# Usage tips
- Infra type: CPU

# Source code
```
class SDXLPromptStylerbySurrealism:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(self):
        p = os.path.dirname(os.path.realpath(__file__))
        file_path = os.path.join(p, 'sdxl_styles_surrealism.json')
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