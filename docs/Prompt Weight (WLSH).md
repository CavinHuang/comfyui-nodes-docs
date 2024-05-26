# Documentation
- Class name: WLSH_Prompt_Weight
- Category: WLSH Nodes/text
- Output node: False
- Repo Ref: https://github.com/wallish77/wlsh_nodes

该节点旨在通过应用权重来调整提示的影响，这对于微调生成模型的输出非常关键。它允许用户在一组提示中强调或减弱某些提示，从而控制生成内容的总体方向。

# Input types
## Required
- prompt
    - 提示是指导生成模型输出的文本输入。它至关重要，因为它为生成的内容设置了上下文和主题。
    - Comfy dtype: STRING
    - Python dtype: str
## Optional
- weight
    - 权重参数调节提示的影响，允许对模型响应进行细微控制。它影响提示在输出中反映的显著程度。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- prompt
    - 带有应用权重的修改后的提示，可以用作后续节点或模型的输入，现在携带调整后的影响。
    - Comfy dtype: STRING
    - Python dtype: str

# Usage tips
- Infra type: CPU

# Source code
```
class WLSH_Prompt_Weight:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'prompt': ('STRING', {'multiline': True, 'forceInput': True}), 'weight': ('FLOAT', {'default': 1.0, 'min': 0.1, 'max': 5.0, 'step': 0.1})}}
    RETURN_TYPES = ('STRING',)
    RETURN_NAMES = ('prompt',)
    FUNCTION = 'add_weight'
    CATEGORY = 'WLSH Nodes/text'

    def add_weight(self, prompt, weight):
        if weight == 1.0:
            new_string = prompt
        else:
            new_string = '(' + prompt + ':' + str(weight) + ')'
        return (new_string,)
```