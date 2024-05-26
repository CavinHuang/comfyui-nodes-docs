# Documentation
- Class name: SDXLPromptbySportsArt
- Category: Style Prompts
- Output node: False
- Repo Ref: https://github.com/wolfden/ComfyUi_PromptStylers

该节点旨在基于体育主题来风格化文本提示，增强提示的主题内容和参与度。

# Input types
## Required
- text_positive
    - 正面文本输入非常重要，因为它设定了体育主题积极方面的基调，这些方面将被融入风格化的提示中。
    - Comfy dtype: STRING
    - Python dtype: str
- text_negative
    - 负面文本输入对于提供一个与正面文本对比的元素至关重要，允许风格化的提示更加细致和平衡。
    - Comfy dtype: STRING
    - Python dtype: str
- style
    - 风格参数在确定与体育相关的提示的主题方向上起着关键作用，确保内容与选定的体育主题保持一致。
    - Comfy dtype: COMBO
    - Python dtype: str
## Optional
- log_prompt
    - 日志参数允许在节点执行期间选择性地输出详细信息，提供模板替换过程的洞察。
    - Comfy dtype: COMBO
    - Python dtype: str

# Output types
- positive_prompt_text_g
    - 输出提供了一个融入了选定体育主题的正面风格化提示，增强了用户与内容的互动。
    - Comfy dtype: STRING
    - Python dtype: str
- negative_prompt_text_g
    - 输出提供了一个与正面文本对比的负面风格化提示，提供了体育主题的全面视角。
    - Comfy dtype: STRING
    - Python dtype: str

# Usage tips
- Infra type: CPU

# Source code
```
class SDXLPromptbySportsArt:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(self):
        p = os.path.dirname(os.path.realpath(__file__))
        file_path = os.path.join(p, 'sdxl_styles_sports.json')
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