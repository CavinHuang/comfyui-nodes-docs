# Documentation
- Class name: SDXLPromptStylerAll
- Category: Style Prompts
- Output node: False
- Repo Ref: https://github.com/wolfden/ComfyUi_PromptStylers

该节点旨在通过应用各种样式模板来增强提示的呈现，确保提示具有吸引力且在情境上适当。

# Input types
## Required
- text_positive
    - 正面文本输入至关重要，因为它为提示设定了积极基调。它是将要被样式化并呈现给用户的基础内容。
    - Comfy dtype: STRING
    - Python dtype: str
- text_negative
    - 负面文本输入通过提供对比视角来补充正面文本。这对于创建一个平衡且全面的提示至关重要。
    - Comfy dtype: STRING
    - Python dtype: str
- style
    - 样式参数至关重要，因为它决定了应用于提示的审美和结构格式，显著影响用户的感知和参与度。
    - Comfy dtype: COMBO
    - Python dtype: str
## Optional
- log_prompt
    - 日志记录选项允许记录提示生成的详细信息，这对于调试和随时间改进节点的功能非常有用。
    - Comfy dtype: COMBO
    - Python dtype: str
- auto_select_style
    - 启用此功能后，它将自动化样式选择过程，确保将多样化的样式应用于提示，增强整体的多样性和吸引力。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool
- auto_refresh
    - 激活此参数后，它会触发节点刷新并生成新的提示，确保内容对用户保持新鲜和吸引力。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool

# Output types
- positive_prompt_text_g
    - 输出提供积极样式化的提示文本，已经格式化以有效地吸引和引导用户。
    - Comfy dtype: STRING
    - Python dtype: str
- negative_prompt_text_g
    - 输出提供负面样式化的提示文本，提供对比视角以平衡整体信息。
    - Comfy dtype: STRING
    - Python dtype: str

# Usage tips
- Infra type: CPU

# Source code
```
class SDXLPromptStylerAll:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        p = os.path.dirname(os.path.realpath(__file__))
        file_path = os.path.join(p, 'sdxl_styles_all.json')
        cls.json_data = read_json_file(file_path)
        styles = read_sdxl_styles(cls.json_data)
        return {'required': {'text_positive': ('STRING', {'default': '', 'multiline': True}), 'text_negative': ('STRING', {'default': '', 'multiline': True}), 'style': (styles,), 'log_prompt': (['No', 'Yes'], {'default': 'No'})}, 'optional': {'auto_select_style': ('BOOLEAN', {'default': False}), 'auto_refresh': ('BOOLEAN', {'default': False})}}

    @classmethod
    def IS_CHANGED(cls, text, autorefresh):
        if auto_refresh == 'True':
            return float('NaN')

    def get_prompt(self, text: str, autorefresh: str) -> tuple[str]:
        prompt = self.generate_prompt(text)
        print(f'Prompt: {prompt}')
        return (prompt,)

    @abstractmethod
    def generate_prompt(self, text: str) -> str:
        ...
    RETURN_TYPES = ('STRING', 'STRING')
    RETURN_NAMES = ('positive_prompt_text_g', 'negative_prompt_text_g')
    FUNCTION = 'prompt_styler'
    CATEGORY = 'Style Prompts'

    def prompt_styler(self, text_positive, text_negative, style, log_prompt, auto_select_style=False, auto_refresh=False):
        if auto_select_style or auto_refresh:
            style = random.choice([template['name'] for template in self.json_data])
        (positive_prompt, negative_prompt) = read_sdxl_templates_replace_and_combine(self.json_data, style, text_positive, text_negative)
        if log_prompt == 'Yes':
            print(f'style: {style}')
            print(f'text_positive: {text_positive}')
            print(f'text_negative: {text_negative}')
            print(f'positive_prompt: {positive_prompt}')
            print(f'negative_prompt: {negative_prompt}')
        current_time = int(time.time())
        dummy_change = current_time
        return (positive_prompt, negative_prompt, dummy_change)
        dummy_change = current_time
        return (positive_prompt, negative_prompt, dummy_change)
```