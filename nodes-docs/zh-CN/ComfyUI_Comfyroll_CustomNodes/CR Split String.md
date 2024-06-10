# Documentation
- Class name: CR_SplitString
- Category: Comfyroll/Utils/Text
- Output node: False
- Repo Ref: https://github.com/RockOfFire/ComfyUI_Comfyroll_CustomNodes

CR_SplitString 节点旨在根据指定的分隔符将给定的文本字符串分割成多个子字符串。它特别适用于处理和组织由一致的字符或字符序列分隔的文本数据。该节点的功能在于其能够通过将复杂的文本结构分解为更易于管理的组件来简化复杂文本的处理。

# Input types
## Required
- text
    - 'text' 参数是节点的主要输入，表示将要被分割的字符串。它是核心组件，因为节点的所有操作都围绕着将这段文本分割成子字符串进行。
    - Comfy dtype: STRING
    - Python dtype: str
## Optional
- delimiter
    - 'delimiter' 参数定义了用于分割输入文本的字符或字符序列。虽然它是可选的，但在确定如何将文本分割为子字符串方面起着关键作用，从而影响节点的输出。
    - Comfy dtype: STRING
    - Python dtype: str

# Output types
- string_1
    - 'string_1' 输出包含分割操作得到的第一个子字符串。它代表原始文本的一部分，作为节点功能的主要结果之一，具有重要意义。
    - Comfy dtype: STRING
    - Python dtype: str
- string_2
    - 'string_2' 输出保存了分割操作得到的第二个子字符串。它是原始文本的另一个片段，对于提供输入文本的详细分解很重要。
    - Comfy dtype: STRING
    - Python dtype: str
- string_3
    - 'string_3' 输出在文本被分割后提供第三个子字符串。它延续了分割文本部分的序列，是节点全面文本处理能力的一部分。
    - Comfy dtype: STRING
    - Python dtype: str
- string_4
    - 'string_4' 输出包括从分割操作中得到的第四个子字符串。它是分割文本的另一部分，有助于节点的整体文本操作功能。
    - Comfy dtype: STRING
    - Python dtype: str
- show_help
    - 'show_help' 输出提供了指向节点文档页面的 URL 链接，为用户提供了如何有效使用该节点的额外信息和指导。
    - Comfy dtype: STRING
    - Python dtype: str

# Usage tips
- Infra type: CPU

# Source code
```
class CR_SplitString:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'text': ('STRING', {'multiline': False, 'default': 'text'})}, 'optional': {'delimiter': ('STRING', {'multiline': False, 'default': ','})}}
    RETURN_TYPES = (any_type, any_type, any_type, any_type, 'STRING')
    RETURN_NAMES = ('string_1', 'string_2', 'string_3', 'string_4', 'show_help')
    FUNCTION = 'split'
    CATEGORY = icons.get('Comfyroll/Utils/Text')

    def split(self, text, delimiter=''):
        parts = text.split(delimiter)
        strings = [part.strip() for part in parts[:4]]
        (string_1, string_2, string_3, string_4) = strings + [''] * (4 - len(strings))
        show_help = 'https://github.com/Suzie1/ComfyUI_Comfyroll_CustomNodes/wiki/Other-Nodes#cr-split-string'
        return (string_1, string_2, string_3, string_4, show_help)
```