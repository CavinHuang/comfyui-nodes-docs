# Documentation
- Class name: CR_LatentBatchSize
- Category: Comfyroll/Essential/Core
- Output node: False
- Repo Ref: https://github.com/RockOfFire/ComfyUI_Comfyroll_CustomNodes

CR_LatentBatchSize节点旨在处理和管理潜在表示的批量大小。它高效地处理复制和连接潜在样本，以达到指定的批量大小，确保下游流程可以一致地运行，无论原始样本数量如何。

# Input types
## Required
- latent
    - latent参数非常关键，因为它包含了需要批量处理的潜在表示。这是节点的主要输入，直接影响节点的操作和生成的批量数据。
    - Comfy dtype: LATENT
    - Python dtype: Dict[str, torch.Tensor]
## Optional
- batch_size
    - batch_size参数决定了每个批量中的样本数。如果未提供，它是一个可选输入，默认值为2。这个参数显著影响节点的输出，因为它决定了从潜在样本创建的批量的大小。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- samples
    - samples输出是已连接的潜在表示张量，已调整以匹配所需的批量大小。这个输出对于确保与期望具有特定批量维度的后续处理步骤的兼容性至关重要。
    - Comfy dtype: LATENT
    - Python dtype: torch.Tensor

# Usage tips
- Infra type: CPU

# Source code
```
class CR_LatentBatchSize:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'latent': ('LATENT',), 'batch_size': ('INT', {'default': 2, 'min': 1, 'max': 999, 'step': 1})}}
    RETURN_TYPES = ('LATENT',)
    FUNCTION = 'batchsize'
    CATEGORY = icons.get('Comfyroll/Essential/Core')

    def batchsize(self, latent: tg.Sequence[tg.Mapping[tg.Text, torch.Tensor]], batch_size: int):
        samples = latent['samples']
        shape = samples.shape
        sample_list = [samples] + [torch.clone(samples) for _ in range(batch_size - 1)]
        show_help = 'https://github.com/Suzie1/ComfyUI_Comfyroll_CustomNodes/wiki/Core-Nodes#cr-latent-batch-size'
        return ({'samples': torch.cat(sample_list)},)
```