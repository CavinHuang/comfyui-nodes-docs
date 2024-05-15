# Documentation
- Class name: LatentBlend
- Category: _for_testing
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

LatentBlend节点旨在将两组潜在样本通过指定的混合因子无缝融合和混合。它通过调整每个样本集的贡献来操作，允许创建可以用于进一步处理或可视化的复合表示。

# Input types
## Required
- samples1
    - 将与另一组混合的第一组潜在样本。它在确定混合输出的初始状态中起着至关重要的作用。
    - Comfy dtype: LATENT
    - Python dtype: torch.Tensor
- samples2
    - 将与第一组混合的第二组潜在样本。它在影响最终混合结果中同样重要。
    - Comfy dtype: LATENT
    - Python dtype: torch.Tensor
- blend_factor
    - 一个浮点数，它决定了第二组样本与第一组样本混合的程度。它对于控制输出中两组样本之间的平衡至关重要。
    - Comfy dtype: FLOAT
    - Python dtype: float
## Optional
- blend_mode
    - 指定组合样本时使用的混合模式。目前唯一支持的选项是'normal'。
    - Comfy dtype: str
    - Python dtype: str

# Output types
- samples_out
    - 输出是一组混合的潜在样本，由输入样本与指定的混合因子结合而成。
    - Comfy dtype: LATENT
    - Python dtype: Dict[str, torch.Tensor]

# Usage tips
- Infra type: CPU

# Source code
```
class LatentBlend:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'samples1': ('LATENT',), 'samples2': ('LATENT',), 'blend_factor': ('FLOAT', {'default': 0.5, 'min': 0, 'max': 1, 'step': 0.01})}}
    RETURN_TYPES = ('LATENT',)
    FUNCTION = 'blend'
    CATEGORY = '_for_testing'

    def blend(self, samples1, samples2, blend_factor: float, blend_mode: str='normal'):
        samples_out = samples1.copy()
        samples1 = samples1['samples']
        samples2 = samples2['samples']
        if samples1.shape != samples2.shape:
            samples2.permute(0, 3, 1, 2)
            samples2 = comfy.utils.common_upscale(samples2, samples1.shape[3], samples1.shape[2], 'bicubic', crop='center')
            samples2.permute(0, 2, 3, 1)
        samples_blended = self.blend_mode(samples1, samples2, blend_mode)
        samples_blended = samples1 * blend_factor + samples_blended * (1 - blend_factor)
        samples_out['samples'] = samples_blended
        return (samples_out,)

    def blend_mode(self, img1, img2, mode):
        if mode == 'normal':
            return img2
        else:
            raise ValueError(f'Unsupported blend mode: {mode}')
```