# Documentation
- Class name: OutputString
- Category: utils
- Output node: True
- Repo Ref: https://github.com/adieyal/comfyui-dynamicprompts.git

该节点旨在处理和输出文本数据，在需要字符串操作或显示的各种工作流中充当重要的实用工具。

# Input types
## Required
- text
    - 文本输入至关重要，因为它是节点操作的主要数据。它影响节点的整个输出，决定了结果字符串的内容和结构。
    - Comfy dtype: STRING
    - Python dtype: str

# Output types
- ui.string
    - 输出代表处理后的文本数据，是节点对输入字符串操作的结果。它很重要，因为它传达了节点功能的最终结果。
    - Comfy dtype: STRING
    - Python dtype: str

# Usage tips
- Infra type: CPU

# Source code
```
class OutputString:

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'text': ('STRING', {})}}
    RETURN_TYPES = ()
    FUNCTION = 'output_string'
    OUTPUT_NODE = True
    CATEGORY = 'utils'

    def output_string(self, string):
        return ({'ui': {'string': string}},)
```