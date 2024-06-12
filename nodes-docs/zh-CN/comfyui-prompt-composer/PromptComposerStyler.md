# Documentation
- Class name: PromptComposerStyler
- Category: AI WizArt/Prompt Composer Tools/Deprecated
- Output node: False
- Repo Ref: https://github.com/florestefano1975/comfyui-prompt-composer.git

PromptComposerStyler节点旨在通过应用风格元素来增强创意过程，它允许整合风格偏好和权重，使用户能够微调文本的艺术方向。该节点的功能集中在风格应用的概念上，旨在通过指定的美学增强原始文本，从而为作品的整体主题和音调质量做出贡献。

# Input types
## Required
- text_in_opt
    - ‘text_in_opt’参数是一个可选输入，允许用户提供将应用风格元素的基础文本。它的重要性在于作为节点操作的基础，决定了将被艺术化增强的内容。
    - Comfy dtype: STRING
    - Python dtype: str
- style
    - ‘style’参数对于定义将融入文本的艺术风格至关重要。它是一个必需的输入，决定了节点将应用于文本的审美特征，从而影响最终的创意输出。
    - Comfy dtype: STRING
    - Python dtype: str
- style_weight
    - ‘style_weight’参数对于调整应用风格的强度至关重要。它允许精细控制风格在文本中的反映程度，确保原始内容与风格覆盖之间的平衡。
    - Comfy dtype: FLOAT
    - Python dtype: float
- active
    - ‘active’参数是一个布尔标志，它决定了是否启动风格应用过程。当设置为True时，它激活了节点的功能，允许将风格应用到文本中。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool

# Output types
- text_out
    - ‘text_out’输出参数代表应用风格元素后的最终文本。它包含了节点的创意贡献，展示了风格应用过程的结果。
    - Comfy dtype: STRING
    - Python dtype: str

# Usage tips
- Infra type: CPU

# Source code
```
class PromptComposerStyler:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(s):
        return {'optional': {'text_in_opt': ('STRING', {'forceInput': True})}, 'required': {'style': (styles, {'default': styles[0]}), 'style_weight': ('FLOAT', {'default': 1, 'step': 0.05, 'min': 0, 'max': 1.95, 'display': 'slider'}), 'active': ('BOOLEAN', {'default': False})}}
    RETURN_TYPES = ('STRING',)
    RETURN_NAMES = ('text_out',)
    FUNCTION = 'promptComposerStyler'
    CATEGORY = 'AI WizArt/Prompt Composer Tools/Deprecated'

    def promptComposerStyler(self, text_in_opt='', style='-', style_weight=0, active=True):
        prompt = []
        if text_in_opt != '':
            prompt.append(text_in_opt)
        if style != '-' and style_weight > 0 and active:
            prompt.append(f'({style} style:{round(style_weight, 2)})')
        if len(prompt) > 0:
            prompt = ', '.join(prompt)
            prompt = prompt.lower()
            return (prompt,)
        else:
            return ('',)
```