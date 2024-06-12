# Documentation
- Class name: GetLatentCount
- Category: Video Helper Suite 🎥🅥🅗🅢/latent
- Output node: False
- Repo Ref: https://github.com/Kosinkadink/ComfyUI-VideoHelperSuite.git

GetLatentCount节点旨在确定给定输入中存在的潜在样本数量。它在视频处理工作流程中发挥着关键作用，通过提供可以用于进一步分析或操作视频数据的基本计数。

# Input types
## Required
- latents
    - 'latents'参数是一个包含用于视频处理的潜在样本的字典。它对节点的操作至关重要，因为它直接影响节点将返回的样本计数。
    - Comfy dtype: LATENT
    - Python dtype: Dict[str, torch.Tensor]

# Output types
- count
    - 'count'输出提供了节点处理的潜在样本的总数。这个计数很重要，因为它可以用来做出关于视频处理流水线后续步骤的决策。
    - Comfy dtype: INT
    - Python dtype: int

# Usage tips
- Infra type: CPU

# Source code
```
class GetLatentCount:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'latents': ('LATENT',)}}
    CATEGORY = 'Video Helper Suite 🎥🅥🅗🅢/latent'
    RETURN_TYPES = ('INT',)
    RETURN_NAMES = ('count',)
    FUNCTION = 'count_input'

    def count_input(self, latents: dict):
        return (latents['samples'].size(0),)
```