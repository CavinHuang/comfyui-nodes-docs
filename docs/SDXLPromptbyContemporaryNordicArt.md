# Documentation
- Class name: SDXLPromptbyContemporaryNordicArt
- Category: Style Prompts
- Output node: False
- Repo Ref: https://github.com/wolfden/ComfyUi_PromptStylers

SDXLPromptbyContemporaryNordicArt节点旨在基于当代北欧艺术风格生成和风格化提示。它创造性地结合了积极和消极的文本输入以及选定的艺术风格，以产生可以用于各种创意或描述性目的的审美启发式提示。

# Input types
## Required
- text_positive
    - text_positive参数是节点的关键输入，提供了将被艺术性整合到提示中的积极背景或肯定。它显著影响生成提示的基调和内容，确保其与所需的积极信息一致。
    - Comfy dtype: STRING
    - Python dtype: str
- text_negative
    - text_negative参数允许包含消极背景，这可以在提示中进行艺术性的对比或转换。虽然不是必需的，但它可以通过提供与积极文本相对的观点，为最终输出增加深度。
    - Comfy dtype: STRING
    - Python dtype: str
- style
    - style参数是必需的，因为它决定了将应用于提示的特定当代北欧艺术风格。风格选择直接影响生成提示的美学和主题元素，指导其整体艺术方向。
    - Comfy dtype: STRING
    - Python dtype: str
- log_prompt
    - log_prompt参数是一个可选的切换，当设置为'Yes'时，启用提示生成过程的记录。这对于调试或查看创建最终提示所采取的中间步骤非常有用。
    - Comfy dtype: COMBO['No', 'Yes']
    - Python dtype: str

# Output types
- positive_prompt_text_g
    - positive_prompt_text_g输出包含由节点生成的风格化的积极提示文本。它代表了输入文本与所选北欧艺术风格的艺术融合，可供各种应用使用。
    - Comfy dtype: STRING
    - Python dtype: str
- negative_prompt_text_g
    - negative_prompt_text_g输出提供了风格化的消极提示文本，通过提供对比或转换的视角来补充积极提示。它是节点输出的一个组成部分，有助于生成提示的全面性。
    - Comfy dtype: STRING
    - Python dtype: str

# Usage tips
- Infra type: CPU

# Source code
```
class SDXLPromptbyContemporaryNordicArt:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(self):
        p = os.path.dirname(os.path.realpath(__file__))
        file_path = os.path.join(p, 'sdxl_styles_contempnordic.json')
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