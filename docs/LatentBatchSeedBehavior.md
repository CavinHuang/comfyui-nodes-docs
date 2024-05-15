# Documentation
- Class name: LatentBatchSeedBehavior
- Category: latent/advanced
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

LatentBatchSeedBehavior节点旨在操作一批潜在样本的种子行为。它允许将种子设置为'随机'或'固定'，这对于需要一致或变化的潜在空间探索的某些类型的模型训练或分析至关重要。

# Input types
## Required
- samples
    - 'samples'参数是必需的，因为它包含了节点将处理的潜在表示。它对于节点执行其操作至关重要，并且直接影响结果，因为它决定了抽取样本的潜在空间。
    - Comfy dtype: LATENT
    - Python dtype: Dict[str, torch.Tensor]
- seed_behavior
    - 'seed_behavior'参数指示节点将如何处理潜在样本的种子。它对于潜在空间的可重复性或可变性是关键因素的应用至关重要。默认设置为'固定'，除非明确设置为'随机'，否则确保结果一致。
    - Comfy dtype: COMBO['random', 'fixed']
    - Python dtype: Literal['random', 'fixed']

# Output types
- samples_out
    - 'samples_out'参数表示应用了种子行为的已处理潜在样本批次。它很重要，因为它携带了节点操作的结果，反映了种子行为对潜在空间探索的影响。
    - Comfy dtype: LATENT
    - Python dtype: Tuple[Dict[str, torch.Tensor]]

# Usage tips
- Infra type: CPU

# Source code
```
class LatentBatchSeedBehavior:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'samples': ('LATENT',), 'seed_behavior': (['random', 'fixed'], {'default': 'fixed'})}}
    RETURN_TYPES = ('LATENT',)
    FUNCTION = 'op'
    CATEGORY = 'latent/advanced'

    def op(self, samples, seed_behavior):
        samples_out = samples.copy()
        latent = samples['samples']
        if seed_behavior == 'random':
            if 'batch_index' in samples_out:
                samples_out.pop('batch_index')
        elif seed_behavior == 'fixed':
            batch_number = samples_out.get('batch_index', [0])[0]
            samples_out['batch_index'] = [batch_number] * latent.shape[0]
        return (samples_out,)
```