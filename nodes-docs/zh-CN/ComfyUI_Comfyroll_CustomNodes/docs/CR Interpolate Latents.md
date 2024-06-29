# Documentation
- Class name: CR_InterpolateLatents
- Category: Comfyroll/Animation/Interpolate
- Output node: False
- Repo Ref: https://github.com/RockOfFire/ComfyUI_Comfyroll_CustomNodes

CR_InterpolateLatents 是一个用于在两个潜在表示之间执行插值的节点，它在状态之间提供平滑的过渡。此节点对于在给定数据空间内创建无缝动画或转换至关重要。

# Input types
## Required
- latent1
    - 用作插值过程起始点的第一个潜在表示。它对于定义动画或转换的初始状态至关重要。
    - Comfy dtype: LATENT
    - Python dtype: Dict[str, torch.Tensor]
- latent2
    - 作为插值端点的第二个潜在表示。它定义了插值旨在实现的最终状态。
    - Comfy dtype: LATENT
    - Python dtype: Dict[str, torch.Tensor]
- weight
    - 权重参数影响两个潜在状态之间插值的程度。它对于控制过渡的速度和范围至关重要。
    - Comfy dtype: FLOAT
    - Python dtype: float
- method
    - 插值方法确定用于在潜在状态之间转换的算法。它是执行的插值类型的关键因素。
    - Comfy dtype: COMBO['lerp']
    - Python dtype: str

# Output types
- LATENT
    - 由插值过程产生的输出潜在状态，代表输入潜在状态的混合。
    - Comfy dtype: LATENT
    - Python dtype: Dict[str, torch.Tensor]
- show_help
    - 一个链接到文档的URL，用于进一步协助和理解插值过程。
    - Comfy dtype: STRING
    - Python dtype: str

# Usage tips
- Infra type: CPU

# Source code
```
class CR_InterpolateLatents:

    @classmethod
    def INPUT_TYPES(cls):
        interpolation_methods = ['lerp']
        return {'required': {'latent1': ('LATENT',), 'latent2': ('LATENT',), 'weight': ('FLOAT', {'default': 0.5, 'min': 0.0, 'max': 1.0, 'step': 0.01}), 'method': (interpolation_methods,)}}
    RETURN_TYPES = ('LATENT', 'STRING')
    RETURN_NAMES = ('LATENT', 'show_help')
    FUNCTION = 'interpolate'
    CATEGORY = icons.get('Comfyroll/Animation/Interpolate')

    def interpolate(self, latent1, latent2, weight, method):
        a = latent1.copy()
        b = latent2.copy()
        c = {}
        if method == 'lerp':
            torch.lerp(a['samples'], b['samples'], weight, out=a['samples'])
        elif method == 'slerp':
            dot_products = torch.sum(latent1['samples'] * latent2['samples'], dim=(2, 3))
            dot_products = torch.clamp(dot_products, -1, 1)
            angles = torch.acos(dot_products)
            sin_angles = torch.sin(angles)
            weight1 = torch.sin((1 - weight) * angles) / sin_angles
            weight2 = torch.sin(weight * angles) / sin_angles
            weight1 = weight1.unsqueeze(-1).unsqueeze(-1)
            weight2 = weight2.unsqueeze(-1).unsqueeze(-1)
            interpolated_samples = weight1 * latent1['samples'] + weight2 * latent2['samples']
            a['samples'] = interpolated_samples
        show_help = 'https://github.com/Suzie1/ComfyUI_Comfyroll_CustomNodes/wiki/Interpolation-Nodes#cr-interpolate-latents'
        return (a, show_help)
```