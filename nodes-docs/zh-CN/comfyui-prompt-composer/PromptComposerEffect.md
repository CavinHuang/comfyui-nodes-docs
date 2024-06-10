# Documentation
- Class name: PromptComposerEffect
- Category: AI WizArt/Prompt Composer Tools/Deprecated
- Output node: False
- Repo Ref: https://github.com/florestefano1975/comfyui-prompt-composer.git

该节点旨在通过应用风格化效果来增强文本输入，允许创建更具吸引力和多样性的内容。它强调节点在文本转换中的作用，而不深入具体实施细节。

# Input types
## Required
- effect
    - 该参数决定了要应用于文本的效果类型，从根本上改变了输出的风格和语调。
    - Comfy dtype: COMBO[effects]
    - Python dtype: str
- effect_weight
    - 该参数调整应用效果的强度，影响转换的程度和最终结果的特点。
    - Comfy dtype: FLOAT
    - Python dtype: float
- active
    - 该参数控制是否应用效果，决定节点的功能是否在文本处理中处于活跃状态。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool
## Optional
- text_in_opt
    - 该参数作为应用风格化效果的基础文本。它的重要性在于提供了节点将要转换的内容。
    - Comfy dtype: STRING
    - Python dtype: str

# Output types
- text_out
    - 输出代表应用了效果的转换文本，展示了节点对内容增强的贡献。
    - Comfy dtype: STRING
    - Python dtype: str

# Usage tips
- Infra type: CPU

# Source code
```
class PromptComposerEffect:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(s):
        return {'optional': {'text_in_opt': ('STRING', {'forceInput': True})}, 'required': {'effect': (effects, {'default': effects[0]}), 'effect_weight': ('FLOAT', {'default': 1, 'step': 0.05, 'min': 0, 'max': 1.95, 'display': 'slider'}), 'active': ('BOOLEAN', {'default': False})}}
    RETURN_TYPES = ('STRING',)
    RETURN_NAMES = ('text_out',)
    FUNCTION = 'promptComposerEffect'
    CATEGORY = 'AI WizArt/Prompt Composer Tools/Deprecated'

    def promptComposerEffect(self, text_in_opt='', effect='-', effect_weight=0, active=True):
        prompt = []
        if text_in_opt != '':
            prompt.append(text_in_opt)
        if effect != '-' and effect_weight > 0 and active:
            prompt.append(f'({effect} effect:{round(effect_weight, 2)})')
        if len(prompt) > 0:
            prompt = ', '.join(prompt)
            prompt = prompt.lower()
            return (prompt,)
        else:
            return ('',)
```