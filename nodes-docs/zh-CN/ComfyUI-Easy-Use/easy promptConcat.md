# Documentation
- Class name: promptConcat
- Category: EasyUse/Prompt
- Output node: False
- Repo Ref: https://github.com/yolain/ComfyUI-Easy-Use.git

该节点便于文本输入的拼接，提供了一个简单的方法来将字符串组合成一个单一的输出。它强调简单易用性，非常适合在不需要复杂处理的情况下进行文本操作的场景。

# Input types
## Required
- prompt1
    - 第一个文本输入，在拼接过程中作为初始段。它至关重要，因为它为组合文本输出设定了起始点。
    - Comfy dtype: STRING
    - Python dtype: str
- prompt2
    - 第二个文本输入，跟随第一个输入进行拼接。它对于完成文本序列和形成最终输出至关重要。
    - Comfy dtype: STRING
    - Python dtype: str
## Optional
- separator
    - 一个插入在两个文本输入之间的字符串，用于在最终输出中分隔它们。它在构建拼接文本和提高可读性方面发挥作用。
    - Comfy dtype: STRING
    - Python dtype: str

# Output types
- prompt
    - 两个输入拼接后的结果文本输出，可能包含分隔符。它代表了输入中的合并和结构化信息。
    - Comfy dtype: STRING
    - Python dtype: str

# Usage tips
- Infra type: CPU

# Source code
```
class promptConcat:

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {}, 'optional': {'prompt1': ('STRING', {'multiline': False, 'default': '', 'forceInput': True}), 'prompt2': ('STRING', {'multiline': False, 'default': '', 'forceInput': True}), 'separator': ('STRING', {'multiline': False, 'default': ''})}}
    RETURN_TYPES = ('STRING',)
    RETURN_NAMES = ('prompt',)
    FUNCTION = 'concat_text'
    CATEGORY = 'EasyUse/Prompt'

    def concat_text(self, prompt1='', prompt2='', separator=''):
        return (prompt1 + separator + prompt2,)
```