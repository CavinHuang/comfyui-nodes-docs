# Documentation
- Class name: CombineRegionalPrompts
- Category: ImpactPack/Regional
- Output node: False
- Repo Ref: https://github.com/ltdrdata/ComfyUI-Impact-Pack.git

CombineRegionalPrompts节点旨在将多组区域提示合并为一个统一的集合。它在简化区域数据输入流程中发挥关键作用，确保所有相关的提示都能高效地聚合在一起，没有冗余，从而促进对区域信息进行更连贯和全面的分析。

# Input types
## Required
- regional_prompts1
    - regional_prompts1参数对于CombineRegionalPrompts节点至关重要，因为它是主要输入，包含需要合并的区域提示。它对节点的执行至关重要，因为聚合提示的质量和相关性直接影响后续的分析和结果。
    - Comfy dtype: REGIONAL_PROMPTS
    - Python dtype: List[str]

# Output types
- combined_prompts
    - combined_prompts输出参数代表将多个区域提示合并为一个连贯列表的结果。这个输出很重要，因为它为ImpactPack/Regional类别内的进一步处理和分析奠定了基础，确保合并后的数据可供后续操作使用。
    - Comfy dtype: REGIONAL_PROMPTS
    - Python dtype: List[str]

# Usage tips
- Infra type: CPU

# Source code
```
class CombineRegionalPrompts:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'regional_prompts1': ('REGIONAL_PROMPTS',)}}
    RETURN_TYPES = ('REGIONAL_PROMPTS',)
    FUNCTION = 'doit'
    CATEGORY = 'ImpactPack/Regional'

    def doit(self, **kwargs):
        res = []
        for (k, v) in kwargs.items():
            res += v
        return (res,)
```