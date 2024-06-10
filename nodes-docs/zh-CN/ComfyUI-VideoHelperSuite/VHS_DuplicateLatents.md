# Documentation
- Class name: DuplicateLatents
- Category: Video Helper Suite 🎥🅥🅗🅢/latent
- Output node: False
- Repo Ref: https://github.com/Kosinkadink/ComfyUI-VideoHelperSuite.git

DuplicateLatents节点旨在复制输入的潜在表示，通过指定的因子有效地增加它们的计数。它的作用是在不改变原始数据完整性的情况下扩大潜在空间操作的数据集大小，从而增强潜在表示在各种应用中的实用性，如训练或数据增强。

# Input types
## Required
- latents
    - ‘latents’参数是一个包含Tensor对象的字典，代表潜在空间数据。它是节点操作的关键，因为它是将要复制的主要输入。复制过程依赖于此输入的质量和结构，这直接影响节点的输出及其在下游任务中的后续使用。
    - Comfy dtype: LATENT
    - Python dtype: Dict[str, torch.Tensor]
## Optional
- multiply_by
    - ‘multiply_by’参数决定了潜在表示将被复制的倍数。它在节点的执行中起着重要作用，因为它直接影响输出数据的数量。此参数允许微调数据集的大小，这对于需要特定数量潜在样本的应用来说是必要的。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- LATENT
    - 输出'LATENT'是一个包含复制的潜在空间数据的字典。它很重要，因为它代表了根据指定的乘法因子放大的处理后的数据。这个输出已经准备好用于进一步分析或作为需要增加潜在样本数量的其他节点的输入。
    - Comfy dtype: LATENT
    - Python dtype: Dict[str, torch.Tensor]
- count
    - ‘count’输出表示复制过程后的潜在样本总数。这是一个重要的信息，它表明了数据放大的程度。这个计数可以用来做出关于数据处理或模型训练工作流程中后续步骤的明智决策。
    - Comfy dtype: INT
    - Python dtype: int

# Usage tips
- Infra type: CPU

# Source code
```
class DuplicateLatents:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'latents': ('LATENT',), 'multiply_by': ('INT', {'default': 1, 'min': 1, 'max': BIGMAX, 'step': 1})}}
    CATEGORY = 'Video Helper Suite 🎥🅥🅗🅢/latent'
    RETURN_TYPES = ('LATENT', 'INT')
    RETURN_NAMES = ('LATENT', 'count')
    FUNCTION = 'duplicate_input'

    def duplicate_input(self, latents: dict[str, Tensor], multiply_by: int):
        new_latents = latents.copy()
        full_latents = []
        for n in range(0, multiply_by):
            full_latents.append(new_latents['samples'])
        new_latents['samples'] = torch.cat(full_latents, dim=0)
        return (new_latents, new_latents['samples'].size(0))
```