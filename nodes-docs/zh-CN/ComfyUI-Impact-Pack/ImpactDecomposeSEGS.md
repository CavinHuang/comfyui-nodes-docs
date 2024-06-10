# Documentation
- Class name: DecomposeSEGS
- Category: ImpactPack/Util
- Output node: False
- Repo Ref: https://github.com/ltdrdata/ComfyUI-Impact-Pack.git

DecomposeSEGS节点旨在将复杂的SEGS数据分解为更易于管理的组件。它的目的是简化SEGS数据结构，便于分析和操作。该节点在数据预处理流程中扮演着重要角色，确保SEGS数据被正确分解以供后续处理阶段使用。

# Input types
## Required
- segs
    - 'segs'参数对于DecomposeSEGS节点至关重要，因为它代表了需要被分解的输入数据。这是一个关键组件，直接影响节点的操作和输出质量。
    - Comfy dtype: SEGS
    - Python dtype: Type[impact.core.SEG]

# Output types
- SEGS_HEADER
    - SEGS_HEADER输出提供了从SEGS数据中提取的头部信息的结构化表示。它对于理解SEGS数据相关的上下文和元数据非常重要。
    - Comfy dtype: SEGS_HEADER
    - Python dtype: Dict[str, Any]
- SEG_ELT
    - SEG_ELT输出包含SEGS数据的分解元素。它是进一步分析的关键输出，对于需要详细段信息的下游任务至关重要。
    - Comfy dtype: SEG_ELT
    - Python dtype: List[impact.core.SEG]

# Usage tips
- Infra type: CPU

# Source code
```
class DecomposeSEGS:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'segs': ('SEGS',)}}
    RETURN_TYPES = ('SEGS_HEADER', 'SEG_ELT')
    OUTPUT_IS_LIST = (False, True)
    FUNCTION = 'doit'
    CATEGORY = 'ImpactPack/Util'

    def doit(self, segs):
        return segs
```