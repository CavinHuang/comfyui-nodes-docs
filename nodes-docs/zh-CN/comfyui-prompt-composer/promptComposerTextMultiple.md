# Documentation
- Class name: promptComposerTextMultiple
- Category: AI WizArt/Prompt Composer Tools
- Output node: False
- Repo Ref: https://github.com/florestefano1975/comfyui-prompt-composer.git

promptComposerTextMultiple节点旨在将多个文本输入合成为单一的、连贯的提示。它智能地对每个文本条目应用权重，允许对每个组成部分的影响进行细微控制。这个节点特别擅长制作平衡各种文本元素重要性的提示，确保输出是一个精心制作的聚合体，服务于预期的目的。

# Input types
## Required
- text_in_opt
    - 可选文本输入作为可以包含在最终提示组合中的额外信息。它在提供补充上下文或细节方面发挥作用，这些信息可能会丰富整个提示。
    - Comfy dtype: STRING
    - Python dtype: str
- text_1
    - 主要文本输入是节点操作的必需组件。它是对最终提示有重大贡献的关键元素。文本的内容和结构对于定义提示的方向和焦点至关重要。
    - Comfy dtype: STRING
    - Python dtype: str
- weight_1
    - 第一个文本输入的权重参数允许调整其在提示中的相对重要性。它是决定组合提示的整体平衡和重点的关键因素。
    - Comfy dtype: FLOAT
    - Python dtype: float
- active
    - 激活标志确定是否在提示组合中考虑文本输入及其关联的权重。它作为一个切换，根据节点的执行上下文包括或排除输入数据的某些部分。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool

# Output types
- text_out
    - 输出文本是由加权文本输入组合生成的综合提示。它包含了所提供文本的精髓，反映了带有期望的强调和平衡的意图信息。
    - Comfy dtype: STRING
    - Python dtype: str

# Usage tips
- Infra type: CPU

# Source code
```
class promptComposerTextMultiple:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(s):
        return {'optional': {'text_in_opt': ('STRING', {'forceInput': True})}, 'required': {'text_1': ('STRING', {'multiline': True}), 'weight_1': ('FLOAT', {'default': 1, 'min': 0, 'max': 1.95, 'step': 0.05, 'display': 'slider'}), 'text_2': ('STRING', {'multiline': True}), 'weight_2': ('FLOAT', {'default': 1, 'min': 0, 'max': 1.95, 'step': 0.05, 'display': 'slider'}), 'text_3': ('STRING', {'multiline': True}), 'weight_3': ('FLOAT', {'default': 1, 'min': 0, 'max': 1.95, 'step': 0.05, 'display': 'slider'}), 'text_4': ('STRING', {'multiline': True}), 'weight_4': ('FLOAT', {'default': 1, 'min': 0, 'max': 1.95, 'step': 0.05, 'display': 'slider'}), 'text_5': ('STRING', {'multiline': True}), 'weight_5': ('FLOAT', {'default': 1, 'min': 0, 'max': 1.95, 'step': 0.05, 'display': 'slider'}), 'text_6': ('STRING', {'multiline': True}), 'weight_6': ('FLOAT', {'default': 1, 'min': 0, 'max': 1.95, 'step': 0.05, 'display': 'slider'}), 'text_7': ('STRING', {'multiline': True}), 'weight_7': ('FLOAT', {'default': 1, 'min': 0, 'max': 1.95, 'step': 0.05, 'display': 'slider'}), 'text_8': ('STRING', {'multiline': True}), 'weight_8': ('FLOAT', {'default': 1, 'min': 0, 'max': 1.95, 'step': 0.05, 'display': 'slider'}), 'text_9': ('STRING', {'multiline': True}), 'weight_9': ('FLOAT', {'default': 1, 'min': 0, 'max': 1.95, 'step': 0.05, 'display': 'slider'}), 'text_10': ('STRING', {'multiline': True}), 'weight_10': ('FLOAT', {'default': 1, 'min': 0, 'max': 1.95, 'step': 0.05, 'display': 'slider'}), 'active': ('BOOLEAN', {'default': False})}}
    RETURN_TYPES = ('STRING',)
    RETURN_NAMES = ('text_out',)
    FUNCTION = 'promptComposerTextMultiple'
    CATEGORY = 'AI WizArt/Prompt Composer Tools'

    def promptComposerTextMultiple(self, text_in_opt='', text_1='', weight_1=0, text_2='', weight_2=0, text_3='', weight_3=0, text_4='', weight_4=0, text_5='', weight_5=0, text_6='', weight_6=0, text_7='', weight_7=0, text_8='', weight_8=0, text_9='', weight_9=0, text_10='', weight_10=0, active=True):
        prompt = []
        if text_in_opt != '':
            prompt.append(text_in_opt)
        if text_1 != '' and weight_1 > 0 and active:
            prompt.append(applyWeight(text_1, weight_1))
        if text_2 != '' and weight_2 > 0 and active:
            prompt.append(applyWeight(text_2, weight_2))
        if text_3 != '' and weight_3 > 0 and active:
            prompt.append(applyWeight(text_3, weight_3))
        if text_4 != '' and weight_4 > 0 and active:
            prompt.append(applyWeight(text_4, weight_4))
        if text_5 != '' and weight_5 > 0 and active:
            prompt.append(applyWeight(text_5, weight_5))
        if text_6 != '' and weight_6 > 0 and active:
            prompt.append(applyWeight(text_6, weight_6))
        if text_7 != '' and weight_7 > 0 and active:
            prompt.append(applyWeight(text_7, weight_7))
        if text_8 != '' and weight_8 > 0 and active:
            prompt.append(applyWeight(text_8, weight_8))
        if text_9 != '' and weight_9 > 0 and active:
            prompt.append(applyWeight(text_9, weight_9))
        if text_10 != '' and weight_10 > 0 and active:
            prompt.append(applyWeight(text_10, weight_10))
        if len(prompt) > 0:
            prompt = ', '.join(prompt)
            prompt = prompt.lower()
            return (prompt,)
        else:
            return ('',)
```