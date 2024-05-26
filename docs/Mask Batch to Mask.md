# Documentation
- Class name: WAS_Mask_Batch_to_Single_Mask
- Category: WAS Suite/Image/Masking
- Output node: False
- Repo Ref: https://github.com/WASasquatch/was-node-suite-comfyui

‘mask_batch_to_mask’方法旨在处理一批掩码张量，并根据指定的批次号提取单个掩码张量。在需要从集合中获取特定掩码的场景中至关重要，促进了从批量到单实例操作的过渡。

# Input types
## Required
- masks
    - ‘masks’参数是节点将处理的掩码张量集合。它至关重要，因为它构成了节点操作的基础，决定了将考虑提取的掩码。
    - Comfy dtype: MASK
    - Python dtype: List[Tuple[torch.Tensor, ...]]
## Optional
- batch_number
    - ‘batch_number’参数指定从批次中提取哪个掩码张量。它很重要，因为它决定了节点内的选择过程，确保根据批次索引返回正确的掩码。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- single_mask
    - ‘single_mask’输出代表了从批次中提取的单个掩码张量。它很重要，因为它是节点操作的主要结果，为用户提供了他们请求的特定掩码。
    - Comfy dtype: MASK
    - Python dtype: torch.Tensor

# Usage tips
- Infra type: CPU

# Source code
```
class WAS_Mask_Batch_to_Single_Mask:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'masks': ('MASK',), 'batch_number': ('INT', {'default': 0, 'min': 0, 'max': 64, 'step': 1})}}
    RETURN_TYPES = ('MASK',)
    FUNCTION = 'mask_batch_to_mask'
    CATEGORY = 'WAS Suite/Image/Masking'

    def mask_batch_to_mask(self, masks=[], batch_number=0):
        count = 0
        for _ in masks:
            if batch_number == count:
                tensor = masks[batch_number][0]
                return (tensor,)
            count += 1
        cstr(f'Batch number `{batch_number}` is not defined, returning last image').error.print()
        last_tensor = masks[-1][0]
        return (last_tensor,)
```