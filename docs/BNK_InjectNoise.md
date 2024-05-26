# Documentation
- Class name: InjectNoise
- Category: latent/noise
- Output node: False
- Repo Ref: https://github.com/BlenderNeko/ComfyUI_Noise.git

InjectNoise节点旨在向一组潜在表示中引入噪声，从而模拟噪声对生成过程的影响。它的作用是通过控制的变异性增强数据，这可以提高生成输出的鲁棒性和多样性。

# Input types
## Required
- latents
    - latents参数至关重要，因为它包含将要进行噪声注入的原始潜在表示。它直接影响噪声增强过程的结果。
    - Comfy dtype: LATENT
    - Python dtype: Dict[str, torch.Tensor]
- strength
    - strength参数决定了要注入到latents中的噪声的强度。它对于控制引入数据的变异程度至关重要。
    - Comfy dtype: FLOAT
    - Python dtype: float
- noise
    - 可选的noise参数提供了要应用于latents的噪声源。它很重要，因为它允许定制噪声特性。
    - Comfy dtype: LATENT
    - Python dtype: Dict[str, torch.Tensor]
- mask
    - 当提供mask参数时，它指定latents的哪些区域应该受到噪声的影响。这对于针对性的噪声应用很重要。
    - Comfy dtype: MASK
    - Python dtype: torch.Tensor

# Output types
- latents
    - 输出的latents是已经注入了噪声的修改后的潜在表示，准备进行进一步的处理或生成。
    - Comfy dtype: LATENT
    - Python dtype: Dict[str, torch.Tensor]

# Usage tips
- Infra type: CPU

# Source code
```
class InjectNoise:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'latents': ('LATENT',), 'strength': ('FLOAT', {'default': 1.0, 'min': 0.0, 'max': 200.0, 'step': 0.01})}, 'optional': {'noise': ('LATENT',), 'mask': ('MASK',)}}
    RETURN_TYPES = ('LATENT',)
    FUNCTION = 'inject_noise'
    CATEGORY = 'latent/noise'

    def inject_noise(self, latents, strength, noise=None, mask=None):
        s = latents.copy()
        if noise is None:
            return (s,)
        if latents['samples'].shape != noise['samples'].shape:
            print('warning, shapes in InjectNoise not the same, ignoring')
            return (s,)
        noised = s['samples'].clone() + noise['samples'].clone() * strength
        if mask is not None:
            mask = prepare_mask(mask, noised.shape)
            noised = mask * noised + (1 - mask) * latents['samples']
        s['samples'] = noised
        return (s,)
```