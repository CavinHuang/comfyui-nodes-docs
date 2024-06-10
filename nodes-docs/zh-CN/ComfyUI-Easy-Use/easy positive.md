# Documentation
- Class name: positivePrompt
- Category: EasyUse/Prompt
- Output node: False
- Repo Ref: https://github.com/yolain/ComfyUI-Easy-Use.git

此类节点封装了处理和生成积极提示的功能，旨在增强生成内容的创造力和积极性。它作为用户在其项目中引入积极语言的工具，从而影响输出的语气和情绪。

# Input types
## Required
- positive
    - “positive”参数至关重要，因为它定义了节点将关注的积极性消息或主题。它直接影响内容的性质，确保输出充满积极情绪。
    - Comfy dtype: STRING
    - Python dtype: str

# Output types
- positive
    - 输出'positive'代表经过精炼和处理的积极提示，可以在各种应用中使用，以促进乐观和建设性的信息传递。
    - Comfy dtype: STRING
    - Python dtype: str

# Usage tips
- Infra type: CPU

# Source code
```
class positivePrompt:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'positive': ('STRING', {'default': '', 'multiline': True, 'placeholder': 'Positive'})}}
    RETURN_TYPES = ('STRING',)
    RETURN_NAMES = ('positive',)
    FUNCTION = 'main'
    CATEGORY = 'EasyUse/Prompt'

    @staticmethod
    def main(positive):
        return (positive,)
```