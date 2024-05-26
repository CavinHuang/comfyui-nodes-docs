# Documentation
- Class name: SelectEveryNthMask
- Category: Video Helper Suite 🎥🅥🅗🅢/mask
- Output node: False
- Repo Ref: https://github.com/Kosinkadink/ComfyUI-VideoHelperSuite.git

SelectEveryNthMask 节点的 `select_masks` 方法旨在通过从输入中选择每第 n 个掩码来处理一系列掩码。这对于需要对掩码子集进行进一步处理或分析的应用场景至关重要。该节点有效地筛选出所需的掩码，确保输出是指定间隔的掩码序列。

# Input types
## Required
- mask
    - 参数 `mask` 是节点将处理的掩码序列。它在节点的操作中扮演着核心角色，因为它是决定后续输出的主要输入。节点的执行和生成的掩码直接受到输入掩码序列的内容和结构的影响。
    - Comfy dtype: Tensor
    - Python dtype: torch.Tensor
- select_every_nth
    - 参数 `select_every_nth` 决定了从输入序列中选择掩码的频率。它是节点功能的一个重要组成部分，因为它决定了掩码选择的间隔。节点的输出受此参数的显著影响，因为它控制了返回掩码序列的密度。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- MASK
    - 输出 `MASK` 是基于指定间隔选择的输入掩码的子集。它代表了节点根据用户的选择标准处理过的掩码的过滤序列。这个输出对于需要减少掩码集以提高效率或特定性的下游任务来说非常重要。
    - Comfy dtype: Tensor
    - Python dtype: torch.Tensor
- count
    - 输出 `count` 提供了从输入序列中选择的掩码数量。这是一个重要的信息，它表明了选择过程的效率，并且可以用于进一步分析或通知工作流程中的后续步骤。
    - Comfy dtype: INT
    - Python dtype: int

# Usage tips
- Infra type: CPU

# Source code
```
class SelectEveryNthMask:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'mask': ('MASK',), 'select_every_nth': ('INT', {'default': 1, 'min': 1, 'max': BIGMAX, 'step': 1})}}
    CATEGORY = 'Video Helper Suite 🎥🅥🅗🅢/mask'
    RETURN_TYPES = ('MASK', 'INT')
    RETURN_NAMES = ('MASK', 'count')
    FUNCTION = 'select_masks'

    def select_masks(self, mask: Tensor, select_every_nth: int):
        sub_mask = mask[0::select_every_nth]
        return (sub_mask, sub_mask.size(0))
```