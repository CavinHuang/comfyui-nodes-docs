# Documentation
- Class name: LatentFromBatch
- Category: latent/batch
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

LatentFromBatch节点的'frombatch'方法旨在从给定的批次中提取特定长度的潜在样本，从特定的批次索引开始。它确保提取的样本和掩码（如果存在）被正确索引和克隆，以保持它们的完整性。

# Input types
## Required
- samples
    - 'samples'参数至关重要，因为它保存了要从中提取批次的潜在表示。它通过确定潜在数据的来源直接影响节点的输出。
    - Comfy dtype: LATENT
    - Python dtype: Dict[str, torch.Tensor]
## Optional
- batch_index
    - 'batch_index'参数定义了从样本中提取潜在数据的起始点。它很重要，因为它决定了在后续操作中将使用批次的特定段。
    - Comfy dtype: INT
    - Python dtype: int
- length
    - 'length'参数指定要从批次中提取的样本数量。它在确定输出大小和要处理的潜在数据范围方面起着重要作用。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- latent_samples
    - 'latent_samples'输出包含基于提供的批次索引和长度参数提取的潜在表示。它很重要，因为它代表了工作流程中进一步使用的核心数据。
    - Comfy dtype: LATENT
    - Python dtype: torch.Tensor

# Usage tips
- Infra type: CPU

# Source code
```
class LatentFromBatch:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'samples': ('LATENT',), 'batch_index': ('INT', {'default': 0, 'min': 0, 'max': 63}), 'length': ('INT', {'default': 1, 'min': 1, 'max': 64})}}
    RETURN_TYPES = ('LATENT',)
    FUNCTION = 'frombatch'
    CATEGORY = 'latent/batch'

    def frombatch(self, samples, batch_index, length):
        s = samples.copy()
        s_in = samples['samples']
        batch_index = min(s_in.shape[0] - 1, batch_index)
        length = min(s_in.shape[0] - batch_index, length)
        s['samples'] = s_in[batch_index:batch_index + length].clone()
        if 'noise_mask' in samples:
            masks = samples['noise_mask']
            if masks.shape[0] == 1:
                s['noise_mask'] = masks.clone()
            else:
                if masks.shape[0] < s_in.shape[0]:
                    masks = masks.repeat(math.ceil(s_in.shape[0] / masks.shape[0]), 1, 1, 1)[:s_in.shape[0]]
                s['noise_mask'] = masks[batch_index:batch_index + length].clone()
        if 'batch_index' not in s:
            s['batch_index'] = [x for x in range(batch_index, batch_index + length)]
        else:
            s['batch_index'] = samples['batch_index'][batch_index:batch_index + length]
        return (s,)
```