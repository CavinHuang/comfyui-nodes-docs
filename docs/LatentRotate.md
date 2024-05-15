# Documentation
- Class name: LatentRotate
- Category: latent/transform
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

LatentRotate节点旨在对潜在样本执行旋转操作。它能够处理各种旋转角度，例如90、180或270度，相应地转换潜在空间数据。该节点在潜在空间操作的预处理阶段扮演着关键角色，使得可以生成数据的旋转版本，以便进行进一步的分析或模型训练。

# Input types
## Required
- samples
    - 'samples'参数对于节点的操作至关重要，因为它代表了需要旋转的潜在空间数据。节点在转换数据方面的有效性直接与输入样本的质量和格式相关。
    - Comfy dtype: LATENT
    - Python dtype: Dict[str, torch.Tensor]
- rotation
    - 'rotation'参数指定要应用于潜在样本的旋转角度。它是一个关键的输入，决定了旋转数据的方向，影响节点的输出。
    - Comfy dtype: COMBO[none, 90 degrees, 180 degrees, 270 degrees]
    - Python dtype: str

# Output types
- rotated_samples
    - 'rotated_samples'输出参数代表旋转后的潜在空间数据。它很重要，因为它是节点操作的直接结果，包含了准备好用于下游任务的转换数据。
    - Comfy dtype: LATENT
    - Python dtype: Dict[str, torch.Tensor]

# Usage tips
- Infra type: CPU

# Source code
```
class LatentRotate:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'samples': ('LATENT',), 'rotation': (['none', '90 degrees', '180 degrees', '270 degrees'],)}}
    RETURN_TYPES = ('LATENT',)
    FUNCTION = 'rotate'
    CATEGORY = 'latent/transform'

    def rotate(self, samples, rotation):
        s = samples.copy()
        rotate_by = 0
        if rotation.startswith('90'):
            rotate_by = 1
        elif rotation.startswith('180'):
            rotate_by = 2
        elif rotation.startswith('270'):
            rotate_by = 3
        s['samples'] = torch.rot90(samples['samples'], k=rotate_by, dims=[3, 2])
        return (s,)
```