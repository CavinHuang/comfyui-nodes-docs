# Documentation
- Class name: SDXLPromptbyGothicRevival
- Category: Style Prompts
- Output node: False
- Repo Ref: https://github.com/wolfden/ComfyUi_PromptStylers

该节点旨在基于预定义的哥特复兴风格集对文本提示进行风格化，增强输入文本的主题和审美元素。它将风格整合到文本中，创造出独特且文化共鸣的输出，反映出所选历史美学。

# Input types
## Required
- text_positive
    - 正面文本输入至关重要，因为它设定了风格化转换的基础。它是将根据所选的哥特复兴风格进行增强和塑造的文本，确保最终输出与期望的主题方向一致。
    - Comfy dtype: STRING
    - Python dtype: str
- text_negative
    - 负面文本输入作为正面文本的平衡，为风格化过程提供对比和深度。它确保最终输出不仅美观，而且在主题上也是健全和多面的。
    - Comfy dtype: STRING
    - Python dtype: str
- style
    - 风格参数是节点功能的核心，决定了风格化的审美和主题方向。它是将输入文本转换为体现所选哥特复兴风格本质的作品的参考点。
    - Comfy dtype: COMBO
    - Python dtype: str
## Optional
- log_prompt
    - 日志提示参数对于风格化过程中的调试和透明度至关重要。启用时，它提供转换过程的详细日志，确保每一步都被记录并可以进行质量和准确性的审查。
    - Comfy dtype: COMBO
    - Python dtype: str

# Output types
- positive_prompt_text_g
    - 正面提示文本，现已根据所选的哥特复兴美学风格进行了风格化，是节点的主要输出。它是节点将输入文本转换和提升到新的理论和风格意义水平的直接反映。
    - Comfy dtype: STRING
    - Python dtype: str
- negative_prompt_text_g
    - 同样风格化的负面提示文本，通过提供对比视角来补充正面输出。它是节点输出的一个不可或缺的部分，展示了风格化转换的深度和广度。
    - Comfy dtype: STRING
    - Python dtype: str

# Usage tips
- Infra type: CPU

# Source code
```
class SDXLPromptbyGothicRevival:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(self):
        p = os.path.dirname(os.path.realpath(__file__))
        file_path = os.path.join(p, 'sdxl_styles_gothrev.json')
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