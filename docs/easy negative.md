# Documentation
- Class name: negativePrompt
- Category: EasyUse/Prompt
- Output node: False
- Repo Ref: https://github.com/yolain/ComfyUI-Easy-Use.git

negativePrompt节点旨在系统内管理和处理负面提示。它通过排除某些不需要的元素或特征，在提炼输出方面发挥关键作用。该节点的功能以否定概念为中心，通过积极指定应避免的内容，旨在提高结果的精确度和相关性。

# Input types
## Required
- negative
    - ‘negative’参数对于定义应从最终输出中省略哪些方面至关重要。它允许用户指定他们希望排除的元素，从而引导系统生成更针对性和精细化的结果。
    - Comfy dtype: STRING
    - Python dtype: str

# Output types
- negative
    - 输出‘negative’代表已用于精炼系统输出的处理过的负面提示。它标志着用户指定的排除项已成功应用，确保最终结果符合所需的标准。
    - Comfy dtype: STRING
    - Python dtype: str

# Usage tips
- Infra type: CPU

# Source code
```
class negativePrompt:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'negative': ('STRING', {'default': '', 'multiline': True, 'placeholder': 'Negative'})}}
    RETURN_TYPES = ('STRING',)
    RETURN_NAMES = ('negative',)
    FUNCTION = 'main'
    CATEGORY = 'EasyUse/Prompt'

    @staticmethod
    def main(negative):
        return (negative,)
```