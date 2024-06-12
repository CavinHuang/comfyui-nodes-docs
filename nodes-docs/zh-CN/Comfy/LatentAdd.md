# Documentation
- Class name: LatentAdd
- Category: latent/advanced
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

“LatentAdd”节点旨在对两组潜在样本执行逐元素加法。它确保在加法之前将样本适当地重塑以匹配维度，从而允许以无缝的方式结合来自不同来源或不同尺度的潜在表示。

# Input types
## Required
- samples1
    - “samples1”参数表示要相加的第一组潜在样本。它在节点的操作中起着关键作用，因为它提供了加法操作数之一。这些样本的质量和格式直接影响节点执行的结果。
    - Comfy dtype: LATENT
    - Python dtype: Dict[str, torch.Tensor]
- samples2
    - “samples2”参数保存要加到“samples1”的第二组潜在样本。它与“samples1”在形状和类型上的兼容性对于节点功能的成功执行至关重要。
    - Comfy dtype: LATENT
    - Python dtype: Dict[str, torch.Tensor]

# Output types
- samples_out
    - “samples_out”参数是节点执行的加法操作的结果。它包含相加后的潜在样本，这些样本非常重要，因为它们代表了节点主要功能的输出。
    - Comfy dtype: LATENT
    - Python dtype: Dict[str, torch.Tensor]

# Usage tips
- Infra type: CPU

# Source code
```
class LatentAdd:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'samples1': ('LATENT',), 'samples2': ('LATENT',)}}
    RETURN_TYPES = ('LATENT',)
    FUNCTION = 'op'
    CATEGORY = 'latent/advanced'

    def op(self, samples1, samples2):
        samples_out = samples1.copy()
        s1 = samples1['samples']
        s2 = samples2['samples']
        s2 = reshape_latent_to(s1.shape, s2)
        samples_out['samples'] = s1 + s2
        return (samples_out,)
```