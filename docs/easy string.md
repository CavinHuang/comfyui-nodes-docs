# Documentation
- Class name: String
- Category: EasyUse/Logic/Type
- Output node: False
- Repo Ref: https://github.com/yolain/ComfyUI-Easy-Use.git

该节点便于对字符串数据进行处理和操作，使用户能够对文本输入执行各种操作。它旨在以直接的方式处理字符串的转换、变换和分析，使其成为涉及文本数据任务的基本组件。

# Input types
## Required
- value
    - ‘value’参数对于节点的操作至关重要，它代表将要处理的文本输入。它是所有字符串操作和转换的基础，直接影响输出结果和节点执行的有效性。
    - Comfy dtype: STRING
    - Python dtype: str

# Output types
- string
    - 输出‘string’代表节点执行的字符串处理的结果。它包含了对输入文本执行的操作的结果，标志着节点的主要功能及其对工作流的贡献。
    - Comfy dtype: STRING
    - Python dtype: str

# Usage tips
- Infra type: CPU

# Source code
```
class String:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'value': ('STRING', {'default': ''})}}
    RETURN_TYPES = ('STRING',)
    RETURN_NAMES = ('string',)
    FUNCTION = 'execute'
    CATEGORY = 'EasyUse/Logic/Type'

    def execute(self, value):
        return (value,)
```