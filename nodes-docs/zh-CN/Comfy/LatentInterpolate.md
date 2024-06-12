# Documentation
- Class name: LatentInterpolate
- Category: latent/advanced
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

LatentInterpolate节点旨在对两组潜在样本进行插值。它通过计算输入样本的加权和来实现这一点，权重由指定的比例确定。该节点在生成不同潜在表示之间的平滑过渡时特别有用，这在图像变形或风格迁移等应用中至关重要。

# Input types
## Required
- samples1
    - 将被插值的第一组潜在样本。这些样本作为插值过程的起点，对定义过渡的初始状态至关重要。
    - Comfy dtype: LATENT
    - Python dtype: Dict[str, torch.Tensor]
- samples2
    - 将用于插值的第二组潜在样本。这些样本代表插值的终点，对确定过渡的最终状态至关重要。
    - Comfy dtype: LATENT
    - Python dtype: Dict[str, torch.Tensor]
- ratio
    - 比例参数控制两组样本之间插值的程度。接近0的值将产生更接近samples1的输出，而接近1的值将产生更接近samples2的输出。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- latent
    - LatentInterpolate节点的输出是一组插值后的潜在样本。这些样本基于指定的比例混合输入样本，提供了两者之间的无缝过渡。
    - Comfy dtype: LATENT
    - Python dtype: Dict[str, torch.Tensor]

# Usage tips
- Infra type: CPU

# Source code
```
class LatentInterpolate:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'samples1': ('LATENT',), 'samples2': ('LATENT',), 'ratio': ('FLOAT', {'default': 1.0, 'min': 0.0, 'max': 1.0, 'step': 0.01})}}
    RETURN_TYPES = ('LATENT',)
    FUNCTION = 'op'
    CATEGORY = 'latent/advanced'

    def op(self, samples1, samples2, ratio):
        samples_out = samples1.copy()
        s1 = samples1['samples']
        s2 = samples2['samples']
        s2 = reshape_latent_to(s1.shape, s2)
        m1 = torch.linalg.vector_norm(s1, dim=1)
        m2 = torch.linalg.vector_norm(s2, dim=1)
        s1 = torch.nan_to_num(s1 / m1)
        s2 = torch.nan_to_num(s2 / m2)
        t = s1 * ratio + s2 * (1.0 - ratio)
        mt = torch.linalg.vector_norm(t, dim=1)
        st = torch.nan_to_num(t / mt)
        samples_out['samples'] = st * (m1 * ratio + m2 * (1.0 - ratio))
        return (samples_out,)
```