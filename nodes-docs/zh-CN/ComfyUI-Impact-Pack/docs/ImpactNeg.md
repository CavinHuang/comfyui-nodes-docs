# Documentation
- Class name: ImpactNeg
- Category: ImpactPack/Logic
- Output node: False
- Repo Ref: https://github.com/ltdrdata/ComfyUI-Impact-Pack.git

ImpactNeg节点的'doit'方法旨在反转布尔输入的逻辑状态。它是逻辑操作中的基本构建块，在ImpactPack套件中提供了直接但至关重要的功能。此节点的作用是确保输出是输入的相反数，通过提供一种否定条件的方式来为更广泛的逻辑框架做出贡献。

# Input types
## Required
- value
    - ‘value’参数是ImpactNeg节点功能的核心组成部分。它代表了节点将要否定的布尔条件。这个参数的重要性在于它直接影响节点的输出，因为结果完全取决于输入值的逻辑状态。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool

# Output types
- result
    - ‘result’参数是ImpactNeg节点操作的结果。它是输入‘value’的逻辑非布尔值。这个输出很重要，因为它直接反映了节点的否定目的，为逻辑表达式或条件的进一步使用提供了一个清晰、简洁的布尔结果。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool

# Usage tips
- Infra type: CPU

# Source code
```
class ImpactNeg:

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'value': ('BOOLEAN', {'forceInput': True})}}
    FUNCTION = 'doit'
    CATEGORY = 'ImpactPack/Logic'
    RETURN_TYPES = ('BOOLEAN',)

    def doit(self, value):
        return (not value,)
```