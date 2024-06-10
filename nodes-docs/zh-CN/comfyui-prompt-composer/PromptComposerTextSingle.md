# Documentation
- Class name: PromptComposerTextSingle
- Category: AI WizArt/Prompt Composer Tools
- Output node: False
- Repo Ref: https://github.com/florestefano1975/comfyui-prompt-composer.git

该节点创造性地组合文本输入，根据给定的权重和条件进行调整，以生成精炼的输出。它是用于打造定制文本内容的工具，强调每个输入在塑造最终作品方面的重要性。

# Input types
## Required
- text
    - 主要的文本输入对节点的操作至关重要。它构成了组合的核心内容，并且对于生成最终输出是必不可少的。
    - Comfy dtype: STRING
    - Python dtype: str
- weight
    - 这个参数影响文本在组合中的调整方式。更高的权重意味着对相应文本片段的更大强调。
    - Comfy dtype: FLOAT
    - Python dtype: float
- active
    - 这个标志决定了是否应用权重参数到文本上。它控制权重调整功能的激活。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool
## Optional
- text_in_opt
    - 这个可选输入作为初始元素可以包含在组合中。它的存在丰富了文本的基础，可能为输出增加深度。
    - Comfy dtype: STRING
    - Python dtype: str

# Output types
- text_out
    - 输出代表最终组合的文本，反映了所有输入及其相应调整的整合。
    - Comfy dtype: STRING
    - Python dtype: str

# Usage tips
- Infra type: CPU

# Source code
```
class PromptComposerTextSingle:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(s):
        return {'optional': {'text_in_opt': ('STRING', {'forceInput': True})}, 'required': {'text': ('STRING', {'multiline': True}), 'weight': ('FLOAT', {'default': 1, 'min': 0, 'max': 1.95, 'step': 0.05, 'display': 'slider'}), 'active': ('BOOLEAN', {'default': False})}}
    RETURN_TYPES = ('STRING',)
    RETURN_NAMES = ('text_out',)
    FUNCTION = 'promptComposerTextSingle'
    CATEGORY = 'AI WizArt/Prompt Composer Tools'

    def promptComposerTextSingle(self, text_in_opt='', text='', weight=0, active=True):
        prompt = []
        if text_in_opt != '':
            prompt.append(text_in_opt)
        if text != '' and weight > 0 and active:
            prompt.append(applyWeight(text, weight))
        if len(prompt) > 0:
            prompt = ', '.join(prompt)
            prompt = prompt.lower()
            return (prompt,)
        else:
            return ('',)
```