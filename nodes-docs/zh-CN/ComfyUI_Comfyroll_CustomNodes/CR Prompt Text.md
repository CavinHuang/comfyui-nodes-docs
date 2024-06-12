# Documentation
- Class name: CR_PromptText
- Category: Comfyroll/Essential/Core
- Output node: False
- Repo Ref: https://github.com/RockOfFire/ComfyUI_Comfyroll_CustomNodes

CR_PromptText节点旨在通过提示框简化获取用户输入的过程。它是交互式应用程序中的基本组件，对于引导应用程序行为至关重要。该节点的主要功能是向用户展示提示，并返回输入以及一个用于获取更多帮助的URL，通过提供上下文帮助来增强用户体验。

# Input types
## Required
- prompt
    - 参数'prompt'对于定义向用户显示的查询或语句至关重要。它为用户的输入设定了上下文，对节点的操作至关重要，因为它直接影响与用户的交互。
    - Comfy dtype: STRING
    - Python dtype: str

# Output types
- prompt
    - 输出参数'prompt'代表用户对初始查询的响应。它很重要，因为它捕获了用户的输入，然后可以由应用程序进一步处理。
    - Comfy dtype: STRING
    - Python dtype: str
- show_help
    - 输出参数'show_help'提供了一个链接到wiki页面的URL，用户可以在该页面上找到与提示相关的更多信息或帮助。这对于指导用户完成复杂或不熟悉的任务特别有用。
    - Comfy dtype: STRING
    - Python dtype: str

# Usage tips
- Infra type: CPU

# Source code
```
class CR_PromptText:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'prompt': ('STRING', {'default': 'prompt', 'multiline': True})}}
    RETURN_TYPES = ('STRING', 'STRING')
    RETURN_NAMES = ('prompt', 'show_help')
    FUNCTION = 'get_value'
    CATEGORY = icons.get('Comfyroll/Essential/Core')

    def get_value(self, prompt):
        show_help = 'https://github.com/Suzie1/ComfyUI_Comfyroll_CustomNodes/wiki/Core-Nodes#cr-prompt-text'
        return (prompt, show_help)
```