# Documentation
- Class name: MasksToMaskList
- Category: ImpactPack/Operation
- Output node: False
- Repo Ref: https://github.com/ltdrdata/ComfyUI-Impact-Pack.git

MasksToMaskList节点旨在处理一系列掩码图像，将其转换为适用于图像处理任务中进一步操作的3D掩码张量列表。它通过应用必要的转换，确保每个掩码都处于正确的格式，无论其初始尺寸如何。

# Input types
## Required
- masks
    - 'masks'参数是节点将处理的掩码图像集合。这对于节点的操作至关重要，因为它决定了将被转换为3D掩码张量列表的输入数据。
    - Comfy dtype: MASK
    - Python dtype: List[torch.Tensor]

# Output types
- mask_list
    - 'mask_list'输出是一系列已处理并准备好用于后续图像处理任务的3D掩码张量。列表中的每个张量对应于输入中的一个转换掩码。
    - Comfy dtype: MASK
    - Python dtype: List[torch.Tensor]

# Usage tips
- Infra type: CPU

# Source code
```
class MasksToMaskList:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'masks': ('MASK',)}}
    RETURN_TYPES = ('MASK',)
    OUTPUT_IS_LIST = (True,)
    FUNCTION = 'doit'
    CATEGORY = 'ImpactPack/Operation'

    def doit(self, masks):
        if masks is None:
            empty_mask = torch.zeros((64, 64), dtype=torch.float32, device='cpu')
            return ([empty_mask],)
        res = []
        for mask in masks:
            res.append(mask)
        print(f'mask len: {len(res)}')
        res = [make_3d_mask(x) for x in res]
        return (res,)
```