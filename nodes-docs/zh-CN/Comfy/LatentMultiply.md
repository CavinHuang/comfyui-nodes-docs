# Documentation
- Class name: LatentMultiply
- Category: latent/advanced
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

该节点旨在对潜在空间样本执行乘法运算。它接收一组潜在样本和一个乘数值，然后将乘法应用于集合中的每个样本，从而缩放潜在空间表示。在各种生成模型中，潜在向量的大小可以显著影响输出，因此此操作至关重要。

# Input types
## Required
- samples
    - 'samples' 参数代表一组要乘以给定因子的潜在向量。这对于节点的操作至关重要，因为它决定了将执行乘法操作的数据。
    - Comfy dtype: LATENT
    - Python dtype: Dict[str, torch.Tensor]
- multiplier
    - 'multiplier' 参数是一个浮点数，用于缩放潜在样本。它在节点的功能中扮演重要角色，因为它直接影响乘法操作后得到的潜在向量的大小。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- samples_out
    - 'samples_out' 参数是节点的输出，包含已乘以指定乘数的潜在样本。这个输出很重要，因为它代表了可以用于进一步处理或分析的转换后的潜在空间。
    - Comfy dtype: LATENT
    - Python dtype: Dict[str, torch.Tensor]

# Usage tips
- Infra type: CPU

# Source code
```
class LatentMultiply:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'samples': ('LATENT',), 'multiplier': ('FLOAT', {'default': 1.0, 'min': -10.0, 'max': 10.0, 'step': 0.01})}}
    RETURN_TYPES = ('LATENT',)
    FUNCTION = 'op'
    CATEGORY = 'latent/advanced'

    def op(self, samples, multiplier):
        samples_out = samples.copy()
        s1 = samples['samples']
        samples_out['samples'] = s1 * multiplier
        return (samples_out,)
```