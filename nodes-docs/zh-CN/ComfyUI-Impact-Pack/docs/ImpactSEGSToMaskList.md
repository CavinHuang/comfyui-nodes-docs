# Documentation
- Class name: SEGSToMaskList
- Category: ImpactPack/Util
- Output node: False
- Repo Ref: https://github.com/ltdrdata/ComfyUI-Impact-Pack.git

SEGSToMaskList节点旨在将分割对象转换为掩码列表。它作为ImpactPack/Util类别中的一个工具，帮助将分割数据转换为更易于用于可视化或进一步分析的格式。

# Input types
## Required
- segs
    - 参数'segs'对于节点的操作至关重要，因为它提供了需要转换为掩码的分割数据。此参数的重要性在于其作为主要输入的角色，决定了节点的输出。
    - Comfy dtype: SEGS
    - Python dtype: List[core.SEG]

# Output types
- masks
    - 输出'masks'是来自输入分割数据的掩码列表。每个掩码代表一个不同的段，这个输出很重要，因为它使得对分割区域进行进一步处理或分析成为可能。
    - Comfy dtype: MASK
    - Python dtype: List[torch.Tensor]

# Usage tips
- Infra type: CPU

# Source code
```
class SEGSToMaskList:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'segs': ('SEGS',)}}
    RETURN_TYPES = ('MASK',)
    OUTPUT_IS_LIST = (True,)
    FUNCTION = 'doit'
    CATEGORY = 'ImpactPack/Util'

    def doit(self, segs):
        masks = core.segs_to_masklist(segs)
        if len(masks) == 0:
            empty_mask = torch.zeros(segs[0], dtype=torch.float32, device='cpu')
            masks = [empty_mask]
        masks = [utils.make_3d_mask(mask) for mask in masks]
        return (masks,)
```