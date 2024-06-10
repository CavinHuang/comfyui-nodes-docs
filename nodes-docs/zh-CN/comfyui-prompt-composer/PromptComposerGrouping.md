# Documentation
- Class name: PromptComposerGrouping
- Category: AI WizArt/Prompt Composer Tools
- Output node: False
- Repo Ref: https://github.com/florestefano1975/comfyui-prompt-composer.git

该节点通过调整输入文本的权重和结构，创造性地处理文本，为各种AI应用生成修改后的提示。

# Input types
## Required
- text_in
    - 输入文本是节点操作的基础，其内容和结构直接影响输出结果。
    - Comfy dtype: STRING
    - Python dtype: str
## Optional
- weight
    - 权重参数微调应用于输入文本的转换，影响生成提示的强调和呈现。
    - Comfy dtype: FLOAT
    - Python dtype: float
- active
    - 激活标志决定了节点的处理是否应用于输入文本，从而控制节点的执行。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool

# Output types
- text_out
    - 输出文本是节点处理的结果，包含了准备用于AI应用的修改后的提示。
    - Comfy dtype: STRING
    - Python dtype: str

# Usage tips
- Infra type: CPU

# Source code
```
class PromptComposerGrouping:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'text_in': ('STRING', {'forceInput': True}), 'weight': ('FLOAT', {'default': 1, 'step': 0.05, 'min': 0, 'max': 1.95, 'display': 'slider'}), 'active': ('BOOLEAN', {'default': False})}}
    RETURN_TYPES = ('STRING',)
    RETURN_NAMES = ('text_out',)
    FUNCTION = 'promptComposerGrouping'
    CATEGORY = 'AI WizArt/Prompt Composer Tools'

    def promptComposerGrouping(self, text_in='', weight=0, active=True):
        prompt = text_in
        if text_in != '' and weight > 0 and active:
            prompt = applyWeight(text_in, weight)
        return (prompt,)
```