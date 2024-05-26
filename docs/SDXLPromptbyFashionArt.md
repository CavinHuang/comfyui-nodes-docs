# Documentation
- Class name: SDXLPromptbyFashionArt
- Category: Style Prompts
- Output node: False
- Repo Ref: https://github.com/wolfden/ComfyUi_PromptStylers

该节点旨在通过基于正面和负面文本输入生成受时尚启发的提示来增强创作过程。它利用预定义的风格集来制作可以激发设计师和艺术家灵感的提示，旨在促进时尚创作中的创新和多样性。

# Input types
## Required
- text_positive
    - 正面文本输入作为创意提示的基础，提供了一个建设性和令人振奋的信息，将被整合到最终的风格化提示中。它对于设定时尚灵感的基调和方向至关重要。
    - Comfy dtype: STRING
    - Python dtype: str
- text_negative
    - 负面文本输入用于与正面信息形成对比，为最终提示增加深度和复杂性。它通过强调需要避免或克服的领域，有助于创建一个更加细致和吸引人的时尚概念。
    - Comfy dtype: STRING
    - Python dtype: str
- style
    - 风格参数对于引导文本输入转换为一个连贯和主题化的时尚提示至关重要。它影响输出的语言、语调和结构，确保最终的提示与选定的时尚美学相一致。
    - Comfy dtype: COMBO
    - Python dtype: str
## Optional
- log_prompt
    - 日志提示选项允许对生成的提示进行可选记录，这对于审查和改进非常有益处。它有助于跟踪创作过程，并确保节点的功能符合用户的期望。
    - Comfy dtype: COMBO
    - Python dtype: str

# Output types
- positive_prompt_text_g
    - 输出提供了一个经过精炼和风格化处理的正面提示，融合了用户的输入和选定的时尚风格。它是推动创意方向的关键组成部分，并作为进一步时尚设计探索的催化剂。
    - Comfy dtype: STRING
    - Python dtype: str
- negative_prompt_text_g
    - 负面提示输出通过提供对比点和额外考虑来补充正面提示。它通呈现更全面的时尚概念视图，丰富了整体的创意输出，鼓励对设计采取平衡和知情的方法。
    - Comfy dtype: STRING
    - Python dtype: str

# Usage tips
- Infra type: CPU

# Source code
```
class SDXLPromptbyFashionArt:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(self):
        p = os.path.dirname(os.path.realpath(__file__))
        file_path = os.path.join(p, 'sdxl_styles_fashion.json')
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