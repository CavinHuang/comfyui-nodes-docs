# Documentation
- Class name: SegsBitwiseAndMaskForEach
- Category: ImpactPack/Operation
- Output node: False
- Repo Ref: https://github.com/ltdrdata/ComfyUI-Impact-Pack.git

SegsBitwiseAndMaskForEach节点的'doit'方法对每个分割掩码和提供的掩码执行按位与操作，从而生成一组细化的分割掩码。此操作对于过滤掉分割过程中不需要的区域至关重要，确保只保留感兴趣的区域。

# Input types
## Required
- segs
    - 'segs'参数代表将由节点处理的分割对象集合。它对节点的操作至关重要，因为它决定了将与掩码进行按位与操作的输入数据。
    - Comfy dtype: SEGS
    - Python dtype: List[SEG]
- masks
    - 'masks'参数是一个张量，包含要应用于每个分割的掩码。它在节点的功能中扮演重要角色，通过定义最终分割输出中要包含或排除的区域。
    - Comfy dtype: MASK
    - Python dtype: torch.Tensor

# Output types
- output
    - 'doit'方法的输出是一个包含原始分割和一个细化分割对象列表的元组，每个对象都带有通过按位与操作更新的掩码。
    - Comfy dtype: SEGS
    - Python dtype: Tuple[SEG, List[SEG]]

# Usage tips
- Infra type: CPU

# Source code
```
class SegsBitwiseAndMaskForEach:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'segs': ('SEGS',), 'masks': ('MASK',)}}
    RETURN_TYPES = ('SEGS',)
    FUNCTION = 'doit'
    CATEGORY = 'ImpactPack/Operation'

    def doit(self, segs, masks):
        return (core.apply_mask_to_each_seg(segs, masks),)
```