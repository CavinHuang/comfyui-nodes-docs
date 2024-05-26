# Documentation
- Class name: PromptBuilder
- Category: InspirePack/Prompt
- Output node: False
- Repo Ref: https://github.com/ltdrdata/ComfyUI-Inspire-Pack.git

PromptBuilder节点旨在为各种应用方便地构建和操作提示。它根据预设配置或用户定义的参数对输入文本进行处理，并输出精炼后的提示。

# Input types
## Required
- category
    - ‘category’参数至关重要，因为它决定了提示构建器可用的预设类别。它影响构建提示时可以使用的选项范围，从而影响最终输出。
    - Comfy dtype: COMBO[category]
    - Python dtype: List[str]
- text
    - ‘text’参数是PromptBuilder的主要输入。它是节点将根据指定的配置进行处理和塑造的原始材料，对操作结果产生重大影响。
    - Comfy dtype: STRING
    - Python dtype: str

# Output types
- output
    - ‘output’代表PromptBuilder操作产生的最终处理过的提示。它包含了应用于输入文本的转换和精炼，反映了节点的核心功能。
    - Comfy dtype: STRING
    - Python dtype: str

# Usage tips
- Infra type: CPU

# Source code
```
class PromptBuilder:

    @classmethod
    def INPUT_TYPES(s):
        global prompt_builder_preset
        presets = ['#PRESET']
        return {'required': {'category': (list(prompt_builder_preset.keys()) + ['#PLACEHOLDER'],), 'preset': (presets,), 'text': ('STRING', {'multiline': True})}}
    RETURN_TYPES = ('STRING',)
    FUNCTION = 'doit'
    CATEGORY = 'InspirePack/Prompt'

    def doit(self, **kwargs):
        return (kwargs['text'],)
```