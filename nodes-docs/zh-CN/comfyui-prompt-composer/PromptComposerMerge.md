# Documentation
- Class name: PromptComposerMerge
- Category: AI WizArt/Prompt Composer Tools
- Output node: False
- Repo Ref: https://github.com/florestefano1975/comfyui-prompt-composer.git

PromptComposerMerge 节点旨在将两个不同的文本输入无缝整合并合并为一个连贯的输出。它是那些需要将不同来源的文本信息组合成统一格式的应用中的关键工具。该节点在文本合并流程中表现出色，确保生成的文本保持逻辑流畅和可读性。

# Input types
## Required
- text_a
    - 参数 'text_a' 表示将与另一个文本合并的第一个文本输入。它在节点的操作中起着关键作用，因为它构成了最终输出的初始部分。'text_a' 的质量和内容对合并文本的整体连贯性和上下文有显著影响。
    - Comfy dtype: STRING
    - Python dtype: str
- text_b
    - 参数 'text_b' 是将与 'text_a' 连接的第二个文本输入。虽然不是必需的，但它通常用于向合并的文本中添加额外的上下文或信息。包含 'text_b' 可以增强最终输出的全面性。
    - Comfy dtype: STRING
    - Python dtype: str

# Output types
- text_out
    - 参数 'text_out' 表示 'text_a' 和 'text_b' 输入的合并输出。它是节点合并过程的最终成果，以单一、连贯的格式反映了合并后的文本信息。
    - Comfy dtype: STRING
    - Python dtype: str

# Usage tips
- Infra type: CPU

# Source code
```
class PromptComposerMerge:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'text_a': ('STRING', {'forceInput': True}), 'text_b': ('STRING', {'forceInput': True})}}
    RETURN_TYPES = ('STRING',)
    RETURN_NAMES = ('text_out',)
    FUNCTION = 'promptComposerMerge'
    CATEGORY = 'AI WizArt/Prompt Composer Tools'

    def promptComposerMerge(self, text_a='', text_b=''):
        return (text_a + ', ' + text_b,)
```