# Documentation
- Class name: WAS_Mask_Batch
- Category: WAS Suite/Image/Masking
- Output node: False
- Repo Ref: https://github.com/WASasquatch/was-node-suite-comfyui

WAS_Mask_Batch节点旨在高效处理和批量处理多个掩码输入。它确保所有输入掩码符合统一的尺寸，并将它们堆叠成单个批次以供进一步处理。该节点在准备下游任务所需的一致掩码尺寸的数据中发挥着关键作用。

# Input types
## Optional
- masks_a
    - 'masks_a'参数是一个可选输入，允许用户为处理提供一组掩码。它对节点的操作至关重要，因为它直接影响将被批量处理和处理的数据。
    - Comfy dtype: MASK
    - Python dtype: Union[torch.Tensor, None]
- masks_b
    - 'masks_b'参数与'masks_a'类似，提供另一个可选的掩码集合，以包含在批量处理中。
    - Comfy dtype: MASK
    - Python dtype: Union[torch.Tensor, None]
- masks_c
    - 'masks_c'参数是另一个可选输入，用于额外的掩码，进一步提高了节点在处理各种掩码输入方面的灵活性。
    - Comfy dtype: MASK
    - Python dtype: Union[torch.Tensor, None]
- masks_d
    - 'masks_d'参数为节点提供了一组额外的掩码以供处理，确保节点能够适应广泛的掩码输入。
    - Comfy dtype: MASK
    - Python dtype: Union[torch.Tensor, None]

# Output types
- masks
    - 'masks'输出是一个包含所有输入处理过的掩码的批量张量。它很重要，因为它代表了节点的主要输出，准备用于后续操作。
    - Comfy dtype: MASK
    - Python dtype: torch.Tensor

# Usage tips
- Infra type: CPU

# Source code
```
class WAS_Mask_Batch:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {'optional': {'masks_a': ('MASK',), 'masks_b': ('MASK',), 'masks_c': ('MASK',), 'masks_d': ('MASK',)}}
    RETURN_TYPES = ('MASK',)
    RETURN_NAMES = ('masks',)
    FUNCTION = 'mask_batch'
    CATEGORY = 'WAS Suite/Image/Masking'

    def _check_mask_dimensions(self, tensors, names):
        dimensions = [tensor.shape[1:] for tensor in tensors]
        if len(set(dimensions)) > 1:
            mismatched_indices = [i for (i, dim) in enumerate(dimensions) if dim != dimensions[0]]
            mismatched_masks = [names[i] for i in mismatched_indices]
            raise ValueError(f'WAS Mask Batch Warning: Input mask dimensions do not match for masks: {mismatched_masks}')

    def mask_batch(self, **kwargs):
        batched_tensors = [kwargs[key] for key in kwargs if kwargs[key] is not None]
        mask_names = [key for key in kwargs if kwargs[key] is not None]
        if not batched_tensors:
            raise ValueError('At least one input mask must be provided.')
        self._check_mask_dimensions(batched_tensors, mask_names)
        batched_tensors = torch.stack(batched_tensors, dim=0)
        batched_tensors = batched_tensors.unsqueeze(1)
        return (batched_tensors,)
```