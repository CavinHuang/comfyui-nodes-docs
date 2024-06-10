# Documentation
- Class name: LatentUpscaleBy
- Category: latent
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

‘LatentUpscaleBy’节点旨在通过使用各种上采样方法来提高潜在表示的分辨率。它在预处理流程中扮演着关键角色，特别是对于需要更高保真度潜在向量的应用。该节点的目标是在不改变潜在数据的内在特性的情况下提高潜在数据的质量。

# Input types
## Required
- samples
    - ‘samples’参数至关重要，因为它包含了需要上采样的潜在表示。它显著影响节点的操作和最终输出，决定了执行上采样的基础数据。
    - Comfy dtype: LATENT
    - Python dtype: torch.Tensor
- upscale_method
    - ‘upscale_method’参数决定了用于上采样潜在样本的算法。它是决定上采样输出质量和样式的关键因素，提供了多种选项以满足不同需求。
    - Comfy dtype: STRING
    - Python dtype: str
- scale_by
    - ‘scale_by’参数指定了上采样过程中的缩放因子。它对于控制应用于潜在样本的上采样程度至关重要，因此直接影响最终输出的分辨率。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- upscaled_samples
    - ‘upscaled_samples’输出代表了上采样过程后的潜在表示。它很重要，因为它包含了节点的主要功能，提供了准备好进行进一步处理或分析的增强潜在向量。
    - Comfy dtype: LATENT
    - Python dtype: torch.Tensor

# Usage tips
- Infra type: CPU

# Source code
```
class LatentUpscaleBy:
    upscale_methods = ['nearest-exact', 'bilinear', 'area', 'bicubic', 'bislerp']

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'samples': ('LATENT',), 'upscale_method': (s.upscale_methods,), 'scale_by': ('FLOAT', {'default': 1.5, 'min': 0.01, 'max': 8.0, 'step': 0.01})}}
    RETURN_TYPES = ('LATENT',)
    FUNCTION = 'upscale'
    CATEGORY = 'latent'

    def upscale(self, samples, upscale_method, scale_by):
        s = samples.copy()
        width = round(samples['samples'].shape[3] * scale_by)
        height = round(samples['samples'].shape[2] * scale_by)
        s['samples'] = comfy.utils.common_upscale(samples['samples'], width, height, upscale_method, 'disabled')
        return (s,)
```