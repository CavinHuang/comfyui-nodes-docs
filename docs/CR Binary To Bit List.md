# Documentation
- Class name: CR_BinaryToBitList
- Category: Comfyroll/List
- Output node: False
- Repo Ref: https://github.com/RockOfFire/ComfyUI_Comfyroll_CustomNodes

CR_BinaryToBitList 节点旨在将二进制字符串转换为单个位的列表。它接受一个二进制字符串作为输入，输出一个列表，其中每个元素对应输入字符串中的一个位。这个节点特别适用于以更细致和易于访问的方式处理二进制数据。

# Input types
## Required
- bit_string
    - “bit_string”参数是一个必填输入，期望一个包含二进制数据的字符串。这个字符串是节点操作的主要数据源，将其转换为位列表是节点的核心功能。二进制字符串的正确格式化对于节点按预期工作至关重要。
    - Comfy dtype: STRING
    - Python dtype: str

# Output types
- list_out
    - “list_out”输出是一个字符串列表，其中每个字符串代表从输入的二进制字符串派生出的一位。此输出允许用户在位级别上操作和分析二进制数据，促进诸如数据编码、解码或转换等操作。
    - Comfy dtype: STRING
    - Python dtype: List[str]
- show_help
    - “show_help”输出提供了一个URL链接，用于获取更多帮助信息的文档。它将用户引导到GitHub wiki页面，在那里他们可以找到有关如何使用该节点及其相关特性的更多信息。
    - Comfy dtype: STRING
    - Python dtype: str

# Usage tips
- Infra type: CPU

# Source code
```
class CR_BinaryToBitList:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'bit_string': ('STRING', {'multiline': True, 'default': ''})}}
    RETURN_TYPES = ('STRING', 'STRING')
    RETURN_NAMES = ('STRING', 'show_help')
    OUTPUT_IS_LIST = (True, False)
    FUNCTION = 'make_list'
    CATEGORY = icons.get('Comfyroll/List')

    def make_list(self, bit_string):
        show_help = 'https://github.com/Suzie1/ComfyUI_Comfyroll_CustomNodes/wiki/List-Nodes#cr-binary-to-list'
        list_out = [str(bit) for bit in bit_string]
        return (list_out, show_help)
```