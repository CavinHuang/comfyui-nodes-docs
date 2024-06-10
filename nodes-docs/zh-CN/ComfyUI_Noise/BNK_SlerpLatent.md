# Documentation
- Class name: LatentSlerp
- Category: latent
- Output node: False
- Repo Ref: https://github.com/BlenderNeko/ComfyUI_Noise.git

该节点在两组潜在向量之间执行球面线性插值（slerp），能够在不同的潜在状态之间提供平滑的过渡。这对于在连续潜在空间中生成中间表示特别有用。

# Input types
## Required
- latents1
    - 第一组潜在向量，作为插值的起始点。
    - Comfy dtype: LATENT
    - Python dtype: torch.Tensor
- factor
    - 插值因子，决定了在两组潜在集之间路径上的位置。
    - Comfy dtype: FLOAT
    - Python dtype: float
## Optional
- latents2
    - 第二组潜在向量，代表插值的终点。
    - Comfy dtype: LATENT
    - Python dtype: torch.Tensor
- mask
    - 一个可选的掩码，可以用来选择性地将插值应用于潜在向量的某些元素。
    - Comfy dtype: MASK
    - Python dtype: torch.Tensor

# Output types
- slerped_latents
    - 插值后的潜在向量结果，代表输入潜在集之间的平滑过渡。
    - Comfy dtype: LATENT
    - Python dtype: torch.Tensor

# Usage tips
- Infra type: GPU

# Source code
```
class LatentSlerp:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'latents1': ('LATENT',), 'factor': ('FLOAT', {'default': 0.5, 'min': 0.0, 'max': 1.0, 'step': 0.01})}, 'optional': {'latents2': ('LATENT',), 'mask': ('MASK',)}}
    RETURN_TYPES = ('LATENT',)
    FUNCTION = 'slerp_latents'
    CATEGORY = 'latent'

    def slerp_latents(self, latents1, factor, latents2=None, mask=None):
        s = latents1.copy()
        if latents2 is None:
            return (s,)
        if latents1['samples'].shape != latents2['samples'].shape:
            print('warning, shapes in LatentSlerp not the same, ignoring')
            return (s,)
        slerped = slerp(factor, latents1['samples'].clone(), latents2['samples'].clone())
        if mask is not None:
            mask = prepare_mask(mask, slerped.shape)
            slerped = mask * slerped + (1 - mask) * latents1['samples']
        s['samples'] = slerped
        return (s,)
```