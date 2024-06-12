# Documentation
- Class name: InjectNoiseToLatent
- Category: KJNodes/noise
- Output node: False
- Repo Ref: https://github.com/kijai/ComfyUI-KJNodes.git

InjectNoiseToLatent节点旨在将噪声引入潜在空间表示中，从而模拟噪声对生成过程的影响。它通过向潜在样本添加指定强度的噪声来操作，可以选择性地对结果进行归一化并应用掩码以控制受噪声影响的区域。该节点对于涉及对噪声的鲁棒性实验和探索生成模型对输入扰动的敏感性至关重要。

# Input types
## Required
- latents
    - latents参数至关重要，因为它包含将要进行噪声注入的原始潜在空间表示。这是一个关键输入，它决定了节点处理的数据的基本结构。
    - Comfy dtype: LATENT
    - Python dtype: Dict[str, torch.Tensor]
- strength
    - strength参数决定了注入到潜在样本中的噪声的强度。它在确定应用于数据的扰动程度中起着重要作用，从而影响最终输出。
    - Comfy dtype: FLOAT
    - Python dtype: float
- noise
    - noise输入表示要添加到潜在空间的噪声模式。它是噪声注入过程中的一个关键组成部分，影响噪声在最终输出中的表现形式。
    - Comfy dtype: LATENT
    - Python dtype: Dict[str, torch.Tensor]
## Optional
- normalize
    - 当normalize参数设置为True时，将对噪声化的潜在样本进行归一化，确保噪声注入后分布不会过度偏斜。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool
- mask
    - 可选的mask参数可用于指定应在潜在空间的哪些区域应用噪声。它提供了一种控制噪声空间分布的手段。
    - Comfy dtype: MASK
    - Python dtype: torch.Tensor
- mix_randn_amount
    - mix_randn_amount参数允许将随机噪声与现有的噪声模式混合，提供了一种将额外变异性引入噪声的方法。
    - Comfy dtype: FLOAT
    - Python dtype: float
- seed
    - 提供的seed参数确保了噪声生成过程中的随机性是可复现的，这对于一致的实验结果非常有用。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- latents
    - 输出的latents是经过噪声注入过程修改后的潜在空间表示。它们很重要，因为它们为后续的生成步骤奠定了基础。
    - Comfy dtype: LATENT
    - Python dtype: Dict[str, torch.Tensor]

# Usage tips
- Infra type: CPU

# Source code
```
class InjectNoiseToLatent:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'latents': ('LATENT',), 'strength': ('FLOAT', {'default': 0.1, 'min': 0.0, 'max': 200.0, 'step': 0.0001}), 'noise': ('LATENT',), 'normalize': ('BOOLEAN', {'default': False}), 'average': ('BOOLEAN', {'default': False})}, 'optional': {'mask': ('MASK',), 'mix_randn_amount': ('FLOAT', {'default': 0.0, 'min': 0.0, 'max': 1000.0, 'step': 0.001}), 'seed': ('INT', {'default': 123, 'min': 0, 'max': 18446744073709551615, 'step': 1})}}
    RETURN_TYPES = ('LATENT',)
    FUNCTION = 'injectnoise'
    CATEGORY = 'KJNodes/noise'

    def injectnoise(self, latents, strength, noise, normalize, average, mix_randn_amount=0, seed=None, mask=None):
        samples = latents.copy()
        if latents['samples'].shape != noise['samples'].shape:
            raise ValueError('InjectNoiseToLatent: Latent and noise must have the same shape')
        if average:
            noised = (samples['samples'].clone() + noise['samples'].clone()) / 2
        else:
            noised = samples['samples'].clone() + noise['samples'].clone() * strength
        if normalize:
            noised = noised / noised.std()
        if mask is not None:
            mask = torch.nn.functional.interpolate(mask.reshape((-1, 1, mask.shape[-2], mask.shape[-1])), size=(noised.shape[2], noised.shape[3]), mode='bilinear')
            mask = mask.expand((-1, noised.shape[1], -1, -1))
            if mask.shape[0] < noised.shape[0]:
                mask = mask.repeat((noised.shape[0] - 1) // mask.shape[0] + 1, 1, 1, 1)[:noised.shape[0]]
            noised = mask * noised + (1 - mask) * latents['samples']
        if mix_randn_amount > 0:
            if seed is not None:
                torch.manual_seed(seed)
            rand_noise = torch.randn_like(noised)
            noised = ((1 - mix_randn_amount) * noised + mix_randn_amount * rand_noise) / (mix_randn_amount ** 2 + (1 - mix_randn_amount) ** 2) ** 0.5
        samples['samples'] = noised
        return (samples,)
```