# Documentation
- Class name: GetMaskCount
- Category: Video Helper Suite 🎥🅥🅗🅢/mask
- Output node: False
- Repo Ref: https://github.com/Kosinkadink/ComfyUI-VideoHelperSuite.git

GetMaskCount 节点旨在处理并计算给定视频帧中存在的掩码数量。它在视频分析中扮演着关键角色，通过提供一种直接的方法来确定掩码的数量，这对于视频处理领域中的各种应用（如目标检测或分割任务）至关重要。

# Input types
## Required
- mask
    - ‘mask’参数对于 GetMaskCount 节点至关重要，因为它代表了包含要计数的掩码的视频帧。其重要性在于节点的功能完全依赖于输入掩码来执行其计数操作。
    - Comfy dtype: MASK
    - Python dtype: torch.Tensor

# Output types
- count
    - ‘count’输出参数表示在输入视频帧中识别的掩码总数。它很重要，因为它直接反映了节点操作的结果，提供了掩码存在的量化度量。
    - Comfy dtype: INT
    - Python dtype: int

# Usage tips
- Infra type: CPU

# Source code
```
class GetMaskCount:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'mask': ('MASK',)}}
    CATEGORY = 'Video Helper Suite 🎥🅥🅗🅢/mask'
    RETURN_TYPES = ('INT',)
    RETURN_NAMES = ('count',)
    FUNCTION = 'count_input'

    def count_input(self, mask: Tensor):
        return (mask.size(0),)
```