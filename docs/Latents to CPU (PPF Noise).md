# Documentation
- Class name: PPFNLatentToCPU
- Category: Power Noise Suite/Latent/Util
- Output node: False
- Repo Ref: https://github.com/WASasquatch/PowerNoiseSuite

该节点促进了将潜在数据转移到CPU环境，确保可以直接访问CPU的计算可以高效执行。它对于管理计算资源和系统内部的数据流是至关重要的。

# Input types
## Required
- latents
    - latents参数至关重要，因为它保存了需要转移到CPU的数据。它直接影响节点的操作和依赖于基于CPU的计算的后续处理。
    - Comfy dtype: LATENT
    - Python dtype: Dict[str, torch.Tensor]

# Output types
- latents
    - 输出的latents代表了现在可在CPU上使用的数据，准备在需要CPU处理能力的多种计算任务中使用。
    - Comfy dtype: LATENT
    - Python dtype: Dict[str, torch.Tensor]

# Usage tips
- Infra type: CPU

# Source code
```
class PPFNLatentToCPU:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'latents': ('LATENT',)}}
    RETURN_TYPES = ('LATENT',)
    RETURN_NAMES = ('latents',)
    FUNCTION = 'latent_to_cpu'
    CATEGORY = 'Power Noise Suite/Latent/Util'

    def latent_to_cpu(self, latents):
        return ({'samples': latents['samples'].to(device='cpu')},)
```