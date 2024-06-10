# Documentation
- Class name: LatentSubtract
- Category: latent/advanced
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

LatentSubtract节点旨在对两组潜在样本执行减法操作。它接收两个潜在表示作为输入，并输出它们的差异，这对于特征提取或潜在空间内的异常检测等各种应用都非常有用。

# Input types
## Required
- samples1
    - 用于减法操作的第一组潜在样本。这些样本至关重要，因为它们构成了操作的基础，它们的质量直接影响节点执行的结果。
    - Comfy dtype: LATENT
    - Python dtype: torch.Tensor
- samples2
    - 将从第一组中减去的第二组潜在样本。这些样本与第一组的对齐和兼容性对于减法操作有意义至关重要。
    - Comfy dtype: LATENT
    - Python dtype: torch.Tensor

# Output types
- samples_out
    - 减法操作的输出，是一组代表输入集之间差异的潜在样本。这个输出可以用于进一步分析，或作为后续处理流程中节点的输入。
    - Comfy dtype: LATENT
    - Python dtype: torch.Tensor

# Usage tips
- Infra type: CPU

# Source code
```
class LatentSubtract:

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
        samples_out['samples'] = s1 - s2
        return (samples_out,)
```