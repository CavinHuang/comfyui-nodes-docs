# Documentation
- Class name: DuplicateMasks
- Category: Video Helper Suite 🎥🅥🅗🅢/mask
- Output node: False
- Repo Ref: https://github.com/Kosinkadink/ComfyUI-VideoHelperSuite.git

DuplicateMasks节点旨在复制给定的掩码到指定数量的实例中。它的作用是放大输入掩码，创建多个副本，这些副本可用于需要多个相同掩码的视频处理任务中。

# Input types
## Required
- mask
    - 掩码参数是DuplicateMasks节点的关键输入。它表示需要复制的掩码。节点的功能围绕创建此掩码的多个实例，这对节点的操作和最终结果至关重要。
    - Comfy dtype: Tensor
    - Python dtype: torch.Tensor
## Optional
- multiply_by
    - multiply_by参数决定了输入掩码应该被复制的次数。它是一个可选输入，直接影响输出掩码的数量。默认值设置为1，意味着如果没有指定，节点将产生掩码的单个实例。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- MASK
    - MASK输出是一个包含复制掩码的张量。它是DuplicateMasks节点的主要输出，代表了复制过程的集体结果。
    - Comfy dtype: Tensor
    - Python dtype: torch.Tensor
- count
    - count输出提供了节点生成的复制掩码的总数。它是一个整数，表示MASK输出中掩码的数量，提供了对执行的复制规模的了解。
    - Comfy dtype: INT
    - Python dtype: int

# Usage tips
- Infra type: CPU

# Source code
```
class DuplicateMasks:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'mask': ('MASK',), 'multiply_by': ('INT', {'default': 1, 'min': 1, 'max': BIGMAX, 'step': 1})}}
    CATEGORY = 'Video Helper Suite 🎥🅥🅗🅢/mask'
    RETURN_TYPES = ('MASK', 'INT')
    RETURN_NAMES = ('MASK', 'count')
    FUNCTION = 'duplicate_input'

    def duplicate_input(self, mask: Tensor, multiply_by: int):
        full_masks = []
        for n in range(0, multiply_by):
            full_masks.append(mask)
        new_mask = torch.cat(full_masks, dim=0)
        return (new_mask, new_mask.size(0))
```