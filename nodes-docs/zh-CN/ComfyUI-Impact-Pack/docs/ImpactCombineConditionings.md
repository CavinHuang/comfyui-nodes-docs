# Documentation
- Class name: CombineConditionings
- Category: ImpactPack/Util
- Output node: False
- Repo Ref: https://github.com/ltdrdata/ComfyUI-Impact-Pack.git

CombineConditionings是一个实用工具节点，旨在将多个条件输入合并为单个输出。它在简化将各种条件因素整合到复杂数据操作任务中的过程中发挥关键作用。此节点确保不同的条件输入被有效整合，从而促进下游应用中的无缝工作流程。

# Input types
## Required
- conditioning1
    - 参数'conditioning1'是节点结合其他输入的主要条件输入。它对节点的操作至关重要，因为它构成了最终组合条件输出的基础。节点的有效性在很大程度上依赖于所提供的条件数据的相关性和质量。
    - Comfy dtype: CONDITIONING
    - Python dtype: Any

# Output types
- combined_conditioning
    - 输出'combined_conditioning'表示将所有输入条件聚合到一个统一的结构中。它包含了各个条件的集体影响，使其适合在工作流程的后续阶段进行进一步处理。
    - Comfy dtype: CONDITIONING
    - Python dtype: Any

# Usage tips
- Infra type: CPU

# Source code
```
class CombineConditionings:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'conditioning1': ('CONDITIONING',)}}
    RETURN_TYPES = ('CONDITIONING',)
    FUNCTION = 'doit'
    CATEGORY = 'ImpactPack/Util'

    def doit(self, **kwargs):
        res = []
        for (k, v) in kwargs.items():
            res += v
        return (res,)
```