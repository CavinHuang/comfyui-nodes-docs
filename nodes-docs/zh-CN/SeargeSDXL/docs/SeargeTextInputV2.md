# Documentation
- Class name: SeargeTextInputV2
- Category: UI_PROMPTING
- Output node: False
- Repo Ref: https://github.com/jobunk/SeargeSDXL.git

该节点便于系统从用户那里收集文本输入，支持系统内的交互式通信。它旨在向用户提出问题并捕获他们的回应，作为用户参与和数据收集的基本组件。

# Input types
## Required
- prompt
    - 提示参数至关重要，因为它定义了向用户展示的问题或陈述，引导他们的输入。它是节点与用户交流的主要方式，影响着收集到的回应的性质和质量。
    - Comfy dtype: STRING
    - Python dtype: str

# Output types
- prompt_text
    - 输出代表了用户对提示的回应，这是进一步处理或分析的宝贵信息源。它是用户输入的直接反映，标志着交互的成功。
    - Comfy dtype: SRG_PROMPT_TEXT
    - Python dtype: str

# Usage tips
- Infra type: CPU

# Source code
```
class SeargeTextInputV2:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'prompt': ('STRING', {'default': '', 'multiline': True})}}
    RETURN_TYPES = ('SRG_PROMPT_TEXT',)
    RETURN_NAMES = ('prompt_text',)
    FUNCTION = 'get_value'
    CATEGORY = UI.CATEGORY_UI_PROMPTING

    def get_value(self, prompt):
        return (prompt,)
```