# Documentation
- Class name: WAS_Latent_Upscale
- Category: WAS Suite/Latent/Transform
- Output node: False
- Repo Ref: https://github.com/WASasquatch/was-node-suite-comfyui

`latent_upscale` 方法旨在通过应用指定的插值模式和缩放因子来增强潜在表示的分辨率。它在 WAS 套件的转换过程中扮演着关键角色，确保潜在特征被准确高效地放大，从而有助于提高生成输出的整体质量。

# Input types
## Required
- samples
    - “samples”参数至关重要，因为它保存了要放大的潜在表示。它直接影响节点的操作，通过确定要进行放大的输入数据。
    - Comfy dtype: LATENT
    - Python dtype: torch.Tensor
- mode
    - “mode”参数定义了用于放大的插值方法。它至关重要，因为它决定了提高分辨率的算法方法，从而影响最终输出的质量。
    - Comfy dtype: COMBO[str]
    - Python dtype: str
- factor
    - “factor”参数指定了放大操作的缩放因子。它是转换过程中的关键决定因素，因为它控制了应用于潜在样本的放大程度。
    - Comfy dtype: FLOAT
    - Python dtype: float
- align
    - “align”参数很重要，因为它决定是否使用角对齐缩放。这个选择可以对最终放大的表示产生微妙但可观察的效果。
    - Comfy dtype: COMBO[bool]
    - Python dtype: bool

# Output types
- upscaled_samples
    - “upscaled_samples”输出包含由转换产生的放大的潜在表示。它很重要，因为它代表了节点操作的直接结果，包含了放大后的特征。
    - Comfy dtype: LATENT
    - Python dtype: torch.Tensor

# Usage tips
- Infra type: GPU

# Source code
```
class WAS_Latent_Upscale:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'samples': ('LATENT',), 'mode': (['area', 'bicubic', 'bilinear', 'nearest'],), 'factor': ('FLOAT', {'default': 2.0, 'min': 0.1, 'max': 8.0, 'step': 0.01}), 'align': (['true', 'false'],)}}
    RETURN_TYPES = ('LATENT',)
    FUNCTION = 'latent_upscale'
    CATEGORY = 'WAS Suite/Latent/Transform'

    def latent_upscale(self, samples, mode, factor, align):
        valid_modes = ['area', 'bicubic', 'bilinear', 'nearest']
        if mode not in valid_modes:
            cstr(f"Invalid interpolation mode `{mode}` selected. Valid modes are: {', '.join(valid_modes)}").error.print()
            return (s,)
        align = True if align == 'true' else False
        if not isinstance(factor, float) or factor <= 0:
            cstr(f'The input `factor` is `{factor}`, but should be a positive or negative float.').error.print()
            return (s,)
        s = samples.copy()
        shape = s['samples'].shape
        size = tuple((int(round(dim * factor)) for dim in shape[-2:]))
        if mode in ['linear', 'bilinear', 'bicubic', 'trilinear']:
            s['samples'] = torch.nn.functional.interpolate(s['samples'], size=size, mode=mode, align_corners=align)
        else:
            s['samples'] = torch.nn.functional.interpolate(s['samples'], size=size, mode=mode)
        return (s,)
```