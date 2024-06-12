# Documentation
- Class name: SplitMasks
- Category: Video Helper Suite 🎥🅥🅗🅢/mask
- Output node: False
- Repo Ref: https://github.com/Kosinkadink/ComfyUI-VideoHelperSuite.git

SplitMasks节点旨在将给定的掩码张量根据指定的索引分成两个不同的组。它用于对输入数据进行分段，允许对每个组进行单独的分析或处理。此节点对于需要操作视频掩码的应用程序至关重要，例如对象跟踪或分割任务。

# Input types
## Required
- mask
    - 参数'mask'是SplitMasks节点的主要输入，代表要被分割的视频掩码。它至关重要，因为它决定了将被分段的数据。掩码的结构和内容直接影响节点的操作和分割结果。
    - Comfy dtype: MASK
    - Python dtype: torch.Tensor
## Optional
- split_index
    - 参数'split_index'定义了输入掩码将被分割的位置。它在确定分割操作中每个结果组的大小中起着关键作用。分割的有效性在很大程度上依赖于这个索引的适当选择。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- MASK_A
    - 输出'MASK_A'代表分割掩码的第一组。它很重要，因为它允许对视频掩码的初始段进行单独处理或分析。
    - Comfy dtype: MASK
    - Python dtype: torch.Tensor
- A_count
    - 输出'A_count'提供了分割掩码第一组中元素的数量，提供了对初始段大小的了解。
    - Comfy dtype: INT
    - Python dtype: int
- MASK_B
    - 输出'MASK_B'对应于分割掩码的第二组，允许对视频掩码的后续段进行不同的处理或检查。
    - Comfy dtype: MASK
    - Python dtype: torch.Tensor
- B_count
    - 输出'B_count'指示分割掩码第二组中的元素数量，突出了后一段的大小。
    - Comfy dtype: INT
    - Python dtype: int

# Usage tips
- Infra type: CPU

# Source code
```
class SplitMasks:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'mask': ('MASK',), 'split_index': ('INT', {'default': 0, 'step': 1, 'min': BIGMIN, 'max': BIGMAX})}}
    CATEGORY = 'Video Helper Suite 🎥🅥🅗🅢/mask'
    RETURN_TYPES = ('MASK', 'INT', 'MASK', 'INT')
    RETURN_NAMES = ('MASK_A', 'A_count', 'MASK_B', 'B_count')
    FUNCTION = 'split_masks'

    def split_masks(self, mask: Tensor, split_index: int):
        group_a = mask[:split_index]
        group_b = mask[split_index:]
        return (group_a, group_a.size(0), group_b, group_b.size(0))
```