# Documentation
- Class name: StringConstant
- Category: KJNodes/constants
- Output node: False
- Repo Ref: https://github.com/kijai/ComfyUI-KJNodes.git

StringConstant节点旨在数据处理工作流中提供一个固定的字符串值。它作为一个工具，用于那些需要一个固定字符串作为后续操作输入的情况，而不需要动态更改。

# Input types
## Required
- string
    - ‘string’参数对于定义节点将输出的常量字符串值至关重要。它在节点的操作中起着关键作用，因为它直接决定了将传递给下游流程的数据。
    - Comfy dtype: STRING
    - Python dtype: str

# Output types
- output
    - ‘output’参数代表节点返回的字符串值。它很重要，因为它是节点的唯一输出，确保所提供的字符串在工作流的后续步骤中被正确使用。
    - Comfy dtype: STRING
    - Python dtype: str

# Usage tips
- Infra type: CPU

# Source code
```
class StringConstant:

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'string': ('STRING', {'default': '', 'multiline': False})}}
    RETURN_TYPES = ('STRING',)
    FUNCTION = 'passtring'
    CATEGORY = 'KJNodes/constants'

    def passtring(self, string):
        return (string,)
```