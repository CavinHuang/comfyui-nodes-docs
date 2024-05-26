# Documentation
- Class name: ImpactWildcardProcessor
- Category: ImpactPack/Prompt
- Output node: False
- Repo Ref: https://github.com/ltdrdata/ComfyUI-Impact-Pack.git

ImpactWildcardProcessor节点旨在管理和处理文本输入中的通配符。它基于给定模式促进通配符的动态插入或填充，增强了文本操作任务的灵活性。该节点在制作能够通过利用通配符概念适应各种输入的提示中发挥关键作用。

# Input types
## Required
- wildcard_text
    - 通配符文本参数对于定义文本中的占位符至关重要，这些占位符可以动态填充。它影响最终输出文本的结构，允许根据特定需求定制提示。
    - Comfy dtype: STRING
    - Python dtype: str
- populated_text
    - 填充后的文本作为可能包含通配符的初始输入文本。这个参数至关重要，因为它决定了将处理通配符的基础文本，影响通配符处理后文本的结果。
    - Comfy dtype: STRING
    - Python dtype: str
## Optional
- mode
    - 模式参数决定是否应该填充通配符或保持固定。它很重要，因为它控制了通配符处理的行为，允许动态内容生成或保留静态文本。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool
- seed
    - 种子参数用于初始化随机数生成器，确保在处理通配符时结果可重复。它在维护节点多次执行时的一致性方面发挥着重要作用，特别适用于调试和测试目的。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- processed_text
    - 处理后的文本是ImpactWildcardProcessor节点的主要输出，代表了在指定模式下所有通配符已被适当填充或保持原样后的最终文本。
    - Comfy dtype: STRING
    - Python dtype: str

# Usage tips
- Infra type: CPU

# Source code
```
class ImpactWildcardProcessor:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'wildcard_text': ('STRING', {'multiline': True, 'dynamicPrompts': False}), 'populated_text': ('STRING', {'multiline': True, 'dynamicPrompts': False}), 'mode': ('BOOLEAN', {'default': True, 'label_on': 'Populate', 'label_off': 'Fixed'}), 'seed': ('INT', {'default': 0, 'min': 0, 'max': 18446744073709551615}), 'Select to add Wildcard': (['Select the Wildcard to add to the text'],)}}
    CATEGORY = 'ImpactPack/Prompt'
    RETURN_TYPES = ('STRING',)
    FUNCTION = 'doit'

    @staticmethod
    def process(**kwargs):
        return impact.wildcards.process(**kwargs)

    def doit(self, *args, **kwargs):
        populated_text = kwargs['populated_text']
        return (populated_text,)
```