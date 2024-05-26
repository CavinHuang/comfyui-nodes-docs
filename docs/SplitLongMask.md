# Documentation
- Class name: SplitLongMask
- Category: ♾️Mixlab/Mask
- Output node: False
- Repo Ref: https://github.com/shadowcz007/comfyui-mixlab-nodes.git

SplitLongMask节点旨在根据指定的数量或高度，将单个大型掩码分割成多个较小的掩码。这一过程增强了掩码在各种场景中的可管理性和适用性，例如在图像分割或目标跟踪中，更倾向于使用更小、更易管理的单元。

# Input types
## Required
- long_mask
    - long_mask参数是SplitLongMask节点的主要输入。它代表了一个需要被分割的大型掩码。这个掩码的质量和尺寸直接影响输出，决定了结果中较小掩码的特性。
    - Comfy dtype: MASK
    - Python dtype: torch.Tensor
## Optional
- count
    - count参数规定了希望输出的较小掩码的数量。它在确定结果掩码的大小和数量方面起着至关重要的作用，这对于需要特定分布的掩码段的应用来说是必不可少的。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- masks
    - SplitLongMask节点的输出，masks，是从原始的long_mask派生出的一个较小掩码的列表。这些掩码对于从分段掩码输入中受益的应用至关重要，例如图像处理或涉及基于掩码操作的机器学习任务。
    - Comfy dtype: MASK
    - Python dtype: List[torch.Tensor]

# Usage tips
- Infra type: CPU

# Source code
```
class SplitLongMask:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'long_mask': ('MASK',), 'count': ('INT', {'default': 1, 'min': 1, 'max': 1024, 'step': 1})}}
    RETURN_TYPES = ('MASK',)
    FUNCTION = 'run'
    CATEGORY = '♾️Mixlab/Mask'
    OUTPUT_IS_LIST = (True,)

    def run(self, long_mask, count):
        masks = []
        nh = long_mask.shape[0] // count
        if nh * count == long_mask.shape[0]:
            masks = split_mask_by_new_height(long_mask, nh)
        else:
            masks = split_mask_by_new_height(long_mask, long_mask.shape[0])
        return (masks,)
```