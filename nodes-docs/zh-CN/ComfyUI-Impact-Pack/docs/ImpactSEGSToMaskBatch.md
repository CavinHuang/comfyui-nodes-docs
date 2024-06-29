# Documentation
- Class name: SEGSToMaskBatch
- Category: ImpactPack/Util
- Output node: False
- Repo Ref: https://github.com/ltdrdata/ComfyUI-Impact-Pack.git

SEGSToMaskBatch节点旨在将分割数据转换为一批掩码。它在图像处理流程中充当重要的中间体，将分割输出转换为后续操作可以高效处理的格式。该节点抽象了处理单个分割的复杂性，允许掩码的批量处理流程化。

# Input types
## Required
- segs
    - 'segs'参数对于节点的操作至关重要，因为它提供了需要转换为掩码的分割数据。这个输入显著影响节点的执行和生成的掩码的质量。
    - Comfy dtype: SEGS
    - Python dtype: List[NamedTuple]

# Output types
- mask_batch
    - 'mask_batch'输出是由输入分割数据派生的掩码集合。它代表了节点的主要输出，对于工作流程中的进一步分析或处理具有重要意义。
    - Comfy dtype: MASK
    - Python dtype: torch.Tensor

# Usage tips
- Infra type: CPU

# Source code
```
class SEGSToMaskBatch:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'segs': ('SEGS',)}}
    RETURN_TYPES = ('MASK',)
    FUNCTION = 'doit'
    CATEGORY = 'ImpactPack/Util'

    def doit(self, segs):
        masks = core.segs_to_masklist(segs)
        masks = [utils.make_3d_mask(mask) for mask in masks]
        mask_batch = torch.concat(masks)
        return (mask_batch,)
```