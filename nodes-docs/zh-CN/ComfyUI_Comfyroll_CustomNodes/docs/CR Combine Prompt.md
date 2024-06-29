# Documentation
- Class name: CR_CombinePrompt
- Category: Essential
- Output node: False
- Repo Ref: https://github.com/RockOfFire/ComfyUI_Comfyroll_CustomNodes

CR_CombinePrompt节点用于将多个字符串输入连接成一个单一的输出字符串。它旨在通过使用指定的分隔符结合各种文本元素，简化复杂提示的创建过程。

# Input types
## Optional
- part1
    - 最终输出中要结合的第一个文本段。它是构成提示整体结构的基本组成部分。
    - Comfy dtype: STRING
    - Python dtype: str
- part2
    - 输出字符串中包含的第二个文本段。它在塑造提示的细节方面发挥作用。
    - Comfy dtype: STRING
    - Python dtype: str
- part3
    - 构成提示的第三个文本段。这是一个可选元素，可以根据用户的需求包含在内。
    - Comfy dtype: STRING
    - Python dtype: str
- part4
    - 合并到提示中的第四个也是最后一个文本段。它完成了信息的传递，并为整体提示结构提供了闭合。
    - Comfy dtype: STRING
    - Python dtype: str
- separator
    - 用于分隔提示的各个部分的字符或字符串。它决定了组合输出的结构和可读性。
    - Comfy dtype: STRING
    - Python dtype: str

# Output types
- prompt
    - 通过使用指定的分隔符结合输入部分形成的字符串。它代表节点的最终输出，准备好进行进一步的处理或显示。
    - Comfy dtype: STRING
    - Python dtype: str
- show_help
    - 一个指向节点使用帮助文档页面的URL链接。它为用户提供了一个参考资源，以便在需要时进行咨询。
    - Comfy dtype: STRING
    - Python dtype: str

# Usage tips
- Infra type: CPU

# Source code
```
class CR_CombinePrompt:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {}, 'optional': {'part1': ('STRING', {'default': '', 'multiline': True}), 'part2': ('STRING', {'default': '', 'multiline': True}), 'part3': ('STRING', {'default': '', 'multiline': True}), 'part4': ('STRING', {'default': '', 'multiline': True}), 'separator': ('STRING', {'default': ',', 'multiline': False})}}
    RETURN_TYPES = ('STRING', 'STRING')
    RETURN_NAMES = ('prompt', 'show_help')
    FUNCTION = 'get_value'
    CATEGORY = icons.get('Comfyroll/Essential/Core')

    def get_value(self, part1='', part2='', part3='', part4='', separator=''):
        show_help = 'https://github.com/Suzie1/ComfyUI_Comfyroll_CustomNodes/wiki/Core-Nodes#cr-prompt-parts'
        prompt = part1 + separator + part2 + separator + part3 + separator + part4
        return (prompt, show_help)
```