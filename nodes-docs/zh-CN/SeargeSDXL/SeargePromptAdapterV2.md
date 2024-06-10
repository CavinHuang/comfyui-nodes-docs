# Documentation
- Class name: SeargePromptAdapterV2
- Category: UI_PROMPTING
- Output node: False
- Repo Ref: https://github.com/jobunk/SeargeSDXL.git

该节点有助于构建和检索提示数据，通过整合主要提示、次要提示、风格提示及其负面对应物，能够为不同场景生成多样化的提示。

# Input types
## Optional
- main_prompt
    - 主要提示是设置提示生成的主要上下文或主题的关键元素。它在指导输出的方向和内容方面至关重要。
    - Comfy dtype: SRG_PROMPT_TEXT
    - Python dtype: str
- secondary_prompt
    - 次要提示为主提示提供额外信息或上下文，丰富了生成内容的复杂性和深度。
    - Comfy dtype: SRG_PROMPT_TEXT
    - Python dtype: str
- style_prompt
    - 风格提示用于定义内容应该呈现的特定语气或方式，为输出增加了一个创造性的层次。
    - Comfy dtype: SRG_PROMPT_TEXT
    - Python dtype: str
- negative_main_prompt
    - 负面主要提示通过引入相反的观点来平衡主要提示，增强了生成内容的细微差别和健全性。
    - Comfy dtype: SRG_PROMPT_TEXT
    - Python dtype: str
- negative_secondary_prompt
    - 这些提示通过提供一个次要的反对观点来补充负面主要提示，进一步多样化内容的可能性。
    - Comfy dtype: SRG_PROMPT_TEXT
    - Python dtype: str
- negative_style_prompt
    - 负面风格提示引入了一种替代的语气或呈现方式，确保输出包含更广泛的风格选择。
    - Comfy dtype: SRG_PROMPT_TEXT
    - Python dtype: str
- data
    - 数据是节点操作的基础输入，可能包含以前的提示结果或其他可能影响生成过程的相关信。
    - Comfy dtype: SRG_DATA_STREAM
    - Python dtype: Dict[str, Any]

# Output types
- data
    - 输出数据流包含结构化的提示信息，可以作为后续流程的输入或用于分析。
    - Comfy dtype: SRG_DATA_STREAM
    - Python dtype: Dict[str, Any]

# Usage tips
- Infra type: CPU

# Source code
```
class SeargePromptAdapterV2:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {}, 'optional': {'data': ('SRG_DATA_STREAM',), 'main_prompt': ('SRG_PROMPT_TEXT',), 'secondary_prompt': ('SRG_PROMPT_TEXT',), 'style_prompt': ('SRG_PROMPT_TEXT',), 'negative_main_prompt': ('SRG_PROMPT_TEXT',), 'negative_secondary_prompt': ('SRG_PROMPT_TEXT',), 'negative_style_prompt': ('SRG_PROMPT_TEXT',)}}
    RETURN_TYPES = ('SRG_DATA_STREAM', 'SRG_DATA_STREAM')
    RETURN_NAMES = ('data', UI.S_PROMPTS)
    FUNCTION = 'get_value'
    CATEGORY = UI.CATEGORY_UI_PROMPTING

    @staticmethod
    def create_dict(main_prompt=None, secondary_prompt=None, style_prompt=None, negative_main_prompt=None, negative_secondary_prompt=None, negative_style_prompt=None):
        return {UI.F_MAIN_PROMPT: main_prompt, UI.F_SECONDARY_PROMPT: secondary_prompt, UI.F_STYLE_PROMPT: style_prompt, UI.F_NEGATIVE_MAIN_PROMPT: negative_main_prompt, UI.F_NEGATIVE_SECONDARY_PROMPT: negative_secondary_prompt, UI.F_NEGATIVE_STYLE_PROMPT: negative_style_prompt}

    def get_value(self, main_prompt=None, secondary_prompt=None, style_prompt=None, negative_main_prompt=None, negative_secondary_prompt=None, negative_style_prompt=None, data=None):
        if data is None:
            data = {}
        data[UI.S_PROMPTS] = self.create_dict(main_prompt, secondary_prompt, style_prompt, negative_main_prompt, negative_secondary_prompt, negative_style_prompt)
        return (data, data[UI.S_PROMPTS])
```