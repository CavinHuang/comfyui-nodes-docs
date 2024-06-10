# Documentation
- Class name: SelectEveryNthLatent
- Category: Video Helper Suite 🎥🅥🅗🅢/latent
- Output node: False
- Repo Ref: https://github.com/Kosinkadink/ComfyUI-VideoHelperSuite.git

该节点用于筛选一系列潜在表示，根据用户指定的间隔保留每第n个元素。它旨在降低数据维度，同时保留关键信息，这对于视频分析或生成任务中的后续处理步骤至关重要。

# Input types
## Required
- latents
    - 输入的潜在表示代表一系列压缩的视频帧或其他视觉数据，需要进行处理。此参数至关重要，因为它构成了节点操作的基础，决定了将被过滤的数据以及随后在下游任务中使用的数据。
    - Comfy dtype: LATENT
    - Python dtype: torch.Tensor
- select_every_nth
    - 该参数决定了从输入序列中选择潜在表示的间隔。它是决定输出密度和节点计算效率的关键因素，因为它直接影响处理的元素数量。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- LATENT
    - 输出包含从输入中保留的每第n个元素的压缩潜在表示序列。这个过滤后的数据可以用于进一步分析或生成较低分辨率的视频，同时保持关键的视觉信息。
    - Comfy dtype: LATENT
    - Python dtype: torch.Tensor
- count
    - 此输出指示在选择过程后保留的潜在表示的数量。它提供了一个度量标准，用于理解数据维度的减少，并且可以用于调整后续的处理步骤。
    - Comfy dtype: INT
    - Python dtype: int

# Usage tips
- Infra type: CPU

# Source code
```
class SelectEveryNthLatent:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'latents': ('LATENT',), 'select_every_nth': ('INT', {'default': 1, 'min': 1, 'max': BIGMAX, 'step': 1})}}
    CATEGORY = 'Video Helper Suite 🎥🅥🅗🅢/latent'
    RETURN_TYPES = ('LATENT', 'INT')
    RETURN_NAMES = ('LATENT', 'count')
    FUNCTION = 'select_latents'

    def select_latents(self, latents: dict, select_every_nth: int):
        sub_latents = latents.copy()['samples'][0::select_every_nth]
        return ({'samples': sub_latents}, sub_latents.size(0))
```