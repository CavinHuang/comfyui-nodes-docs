# Documentation
- Class name: MaskListToMaskBatch
- Category: ImpactPack/Operation
- Output node: False
- Repo Ref: https://github.com/ltdrdata/ComfyUI-Impact-Pack.git

MaskListToMaskBatch节点旨在将一系列掩码图像整合成一个单一的批次张量。它处理列表中的每个掩码，确保它们处于适合批量处理的3D格式，有效处理单个和多个掩码。该节点在准备下游机器学习模型所需的批量输入数据方面发挥着关键作用。

# Input types
## Required
- mask
    - ‘mask’参数是节点处理的掩码图像列表。它对节点的操作至关重要，因为它直接影响输出的批次张量。节点通过将每个掩码转换为3D格式（如果需要），然后将它们组合成一个用于批量处理的单个张量来处理此列表。
    - Comfy dtype: MASK
    - Python dtype: List[torch.Tensor]

# Output types
- mask_batch
    - MaskListToMaskBatch节点的输出是一个代表掩码批次的单个张量。这个张量被格式化为与期望批量输入数据的机器学习模型兼容，对于模型训练或推理的后续阶段非常重要。
    - Comfy dtype: MASK
    - Python dtype: torch.Tensor

# Usage tips
- Infra type: CPU

# Source code
```
class MaskListToMaskBatch:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'mask': ('MASK',)}}
    INPUT_IS_LIST = True
    RETURN_TYPES = ('MASK',)
    FUNCTION = 'doit'
    CATEGORY = 'ImpactPack/Operation'

    def doit(self, mask):
        if len(mask) == 1:
            mask = make_3d_mask(mask[0])
            return (mask,)
        elif len(mask) > 1:
            mask1 = make_3d_mask(mask[0])
            for mask2 in mask[1:]:
                mask2 = make_3d_mask(mask2)
                if mask1.shape[1:] != mask2.shape[1:]:
                    mask2 = comfy.utils.common_upscale(mask2.movedim(-1, 1), mask1.shape[2], mask1.shape[1], 'lanczos', 'center').movedim(1, -1)
                mask1 = torch.cat((mask1, mask2), dim=0)
            return (mask1,)
        else:
            empty_mask = torch.zeros((1, 64, 64), dtype=torch.float32, device='cpu').unsqueeze(0)
            return (empty_mask,)
```