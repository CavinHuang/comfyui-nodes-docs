# Documentation
- Class name: LatentFlip
- Category: latent/transform
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

LatentFlip节点旨在通过沿指定轴应用翻转操作来转换潜在空间表示。此节点在操纵潜在特征方面发挥关键作用，这对于数据增强或探索潜在空间结构等任务至关重要。

# Input types
## Required
- samples
    - “samples”参数至关重要，因为它包含节点将处理的潜在表示。它直接影响节点执行翻转操作的能力，并进而影响输出。
    - Comfy dtype: LATENT
    - Python dtype: Dict[str, torch.Tensor]
- flip_method
    - “flip_method”参数决定了潜在样本将沿哪个轴翻转。它是一个关键组件，因为它决定了应用于潜在空间的变换的性质。
    - Comfy dtype: COMBO['x-axis: vertically', 'y-axis: horizontally']
    - Python dtype: str

# Output types
- samples
    - 'samples'输出包含翻转后的潜在表示，这是节点操作的结果。这个输出很重要，因为它代表了可以用于下游任务的转换数据。
    - Comfy dtype: LATENT
    - Python dtype: Dict[str, torch.Tensor]

# Usage tips
- Infra type: GPU

# Source code
```
class LatentFlip:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'samples': ('LATENT',), 'flip_method': (['x-axis: vertically', 'y-axis: horizontally'],)}}
    RETURN_TYPES = ('LATENT',)
    FUNCTION = 'flip'
    CATEGORY = 'latent/transform'

    def flip(self, samples, flip_method):
        s = samples.copy()
        if flip_method.startswith('x'):
            s['samples'] = torch.flip(samples['samples'], dims=[2])
        elif flip_method.startswith('y'):
            s['samples'] = torch.flip(samples['samples'], dims=[3])
        return (s,)
```