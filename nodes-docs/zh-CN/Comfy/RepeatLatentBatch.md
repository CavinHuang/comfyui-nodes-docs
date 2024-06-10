# Documentation
- Class name: RepeatLatentBatch
- Category: latent/batch
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

RepeatLatentBatch节点的'repeat'方法旨在复制潜在空间样本。它接受一批潜在样本和一个整数，该整数指定重复次数，然后返回一个新的批次，其中样本重复了指定的次数。这种功能在机器学习应用中扩展数据集或增强训练数据至关重要。

# Input types
## Required
- samples
    - 对于RepeatLatentBatch节点来说，'samples'参数是一个关键输入，因为它包含了需要重复的潜在表示。该方法在复制这些表示方面的有效性直接与输入样本的质量和结构相关。
    - Comfy dtype: LATENT
    - Python dtype: Dict[str, torch.Tensor]
- amount
    - 'amount'参数决定了'samples'输入中的每个样本将被重复多少次。它是控制输出批次大小和数据增强程度的一个基本因素。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- repeated_samples
    - 'repeated_samples'输出是根据指定的'amount'重复的潜在表示批次。它作为工作流程后续阶段进一步处理或分析的主要输出。
    - Comfy dtype: LATENT
    - Python dtype: Dict[str, torch.Tensor]

# Usage tips
- Infra type: CPU

# Source code
```
class RepeatLatentBatch:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'samples': ('LATENT',), 'amount': ('INT', {'default': 1, 'min': 1, 'max': 64})}}
    RETURN_TYPES = ('LATENT',)
    FUNCTION = 'repeat'
    CATEGORY = 'latent/batch'

    def repeat(self, samples, amount):
        s = samples.copy()
        s_in = samples['samples']
        s['samples'] = s_in.repeat((amount, 1, 1, 1))
        if 'noise_mask' in samples and samples['noise_mask'].shape[0] > 1:
            masks = samples['noise_mask']
            if masks.shape[0] < s_in.shape[0]:
                masks = masks.repeat(math.ceil(s_in.shape[0] / masks.shape[0]), 1, 1, 1)[:s_in.shape[0]]
            s['noise_mask'] = samples['noise_mask'].repeat((amount, 1, 1, 1))
        if 'batch_index' in s:
            offset = max(s['batch_index']) - min(s['batch_index']) + 1
            s['batch_index'] = s['batch_index'] + [x + i * offset for i in range(1, amount) for x in s['batch_index']]
        return (s,)
```