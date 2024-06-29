# Documentation
- Class name: LatentBatch
- Category: latent/batch
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

LatentBatch类的`batch`方法旨在高效地将两组潜在样本合并为一个批次。在连接之前，它确保来自两组的样本维度是兼容的，并相应地追加批次索引。该方法在机器学习工作流程中准备数据以进行进一步处理时至关重要。

# Input types
## Required
- samples1
    - 参数'samples1'代表要进行批处理的第一组潜在样本。它在确定组合批次的最终形状和结构时起着关键作用，尤其是在潜在空间的维度方面。
    - Comfy dtype: LATENT
    - Python dtype: Dict[str, torch.Tensor]
- samples2
    - 参数'samples2'表示用于批处理的第二组潜在样本。它对于该方法比较和匹配'samples1'的维度以创建一个连贯的数据批次至关重要。
    - Comfy dtype: LATENT
    - Python dtype: Dict[str, torch.Tensor]

# Output types
- samples_out
    - 参数'samples_out'是批处理过程的输出，包含来自'samples1'和'samples2'的组合潜在样本。它很重要，因为它代表了准备好用于下游任务的数据。
    - Comfy dtype: LATENT
    - Python dtype: Dict[str, torch.Tensor]

# Usage tips
- Infra type: CPU

# Source code
```
class LatentBatch:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'samples1': ('LATENT',), 'samples2': ('LATENT',)}}
    RETURN_TYPES = ('LATENT',)
    FUNCTION = 'batch'
    CATEGORY = 'latent/batch'

    def batch(self, samples1, samples2):
        samples_out = samples1.copy()
        s1 = samples1['samples']
        s2 = samples2['samples']
        if s1.shape[1:] != s2.shape[1:]:
            s2 = comfy.utils.common_upscale(s2, s1.shape[3], s1.shape[2], 'bilinear', 'center')
        s = torch.cat((s1, s2), dim=0)
        samples_out['samples'] = s
        samples_out['batch_index'] = samples1.get('batch_index', [x for x in range(0, s1.shape[0])]) + samples2.get('batch_index', [x for x in range(0, s2.shape[0])])
        return (samples_out,)
```