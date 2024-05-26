# Documentation
- Class name: SDXLPromptbyRomanticNationalismArt
- Category: Style Prompts
- Output node: False
- Repo Ref: https://github.com/wolfden/ComfyUi_PromptStylers

该节点根据浪漫民族主义艺术原则，将输入文本创造性地适配到指定风格，增强原始文本的主题内容和情感表达。

# Input types
## Required
- text_positive
    - 正面文本输入至关重要，因为它为风格转换设定了基础。这是将被增强并适配到所选风格的文本。
    - Comfy dtype: STRING
    - Python dtype: str
- text_negative
    - 负面文本输入作为正面文本的对比，提供了可以整合到最终风格化提示中的对照点。
    - Comfy dtype: STRING
    - Python dtype: str
- style
    - 风格参数至关重要，它决定了文本转换的主题和情感方向，指导节点产生风格一致的输出。
    - Comfy dtype: COMBO
    - Python dtype: str
## Optional
- log_prompt
    - 日志选项允许选择性地可视化转换过程，提供节点如何实现其风格适应的见解。
    - Comfy dtype: COMBO
    - Python dtype: str

# Output types
- positive_prompt_text_g
    - 输出展示了增强后的正面文本，现在融入了所选风格，准备进一步使用或分析。
    - Comfy dtype: STRING
    - Python dtype: str
- negative_prompt_text_g
    - 适应后的负面文本补充了正面输出，提供了对比视角，可以丰富整体的主题深度。
    - Comfy dtype: STRING
    - Python dtype: str

# Usage tips
- Infra type: CPU

# Source code
```
class SDXLPromptbyRomanticNationalismArt:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(self):
        p = os.path.dirname(os.path.realpath(__file__))
        file_path = os.path.join(p, 'sdxl_styles_romanticnat.json')
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