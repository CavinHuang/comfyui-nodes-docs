# Documentation
- Class name: SDXLPromptbyWildlifeArt
- Category: Style Prompts
- Output node: False
- Repo Ref: https://github.com/wolfden/ComfyUi_PromptStylers

该节点旨在根据选定的野生动物艺术风格来修饰文本提示，通过生成主题化的正面和负面提示来增强创作过程。

# Input types
## Required
- text_positive
    - 正面文本输入对于生成主题化的正面提示至关重要，它是风格化过程的基础。
    - Comfy dtype: STRING
    - Python dtype: str
- text_negative
    - 负面文本输入对于创建对比鲜明的负面提示至关重要，它补充了正面提示并丰富了整体主题表达。
    - Comfy dtype: STRING
    - Python dtype: str
- style
    - 风格选择参数至关重要，因为它决定了将应用于正面和负面提示的艺术主题，指导整体输出的美学。
    - Comfy dtype: COMBO
    - Python dtype: str
## Optional
- log_prompt
    - 日志参数通过可选地提供详细的样式化过程和结果的打印输出，便于调试和监督。
    - Comfy dtype: COMBO
    - Python dtype: str

# Output types
- positive_prompt_text_g
    - 输出的正面提示是一个创造性增强的文本，反映了所选择的野生动物艺术风格，作为进一步内容开发的 thematic 基础。
    - Comfy dtype: STRING
    - Python dtype: str
- negative_prompt_text_g
    - 输出的负面提示提供了一个对比鲜明的主题元素，为正面提示提供了一个对立面，丰富了叙述范围。
    - Comfy dtype: STRING
    - Python dtype: str

# Usage tips
- Infra type: CPU

# Source code
```
class SDXLPromptbyWildlifeArt:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(self):
        p = os.path.dirname(os.path.realpath(__file__))
        file_path = os.path.join(p, 'sdxl_styles_wildlife.json')
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