# Documentation
- Class name: RandomNoise
- Category: Noise Generation
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

RandomNoise节点旨在生成随机噪声模式，这些模式可以作为各种生成模型中随机性的来源。它作为创建合成数据的基础组件，确保生成样本的多样性和不可预测性。

# Input types
## Required
- noise_seed
    - noise_seed参数对于RandomNoise节点至关重要，因为它决定了生成随机噪声的初始状态。这确保了产生的噪声模式是可复现的，这对于生成模型在不同运行中获得一致的结果至关重要。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- noise
    - RandomNoise节点的输出是一个包含生成噪声的张量。这个张量非常重要，因为它构成了生成模型中进一步处理的基础，影响最终输出的多样性和质量。
    - Comfy dtype: TENSOR
    - Python dtype: torch.Tensor

# Usage tips
- Infra type: CPU

# Source code
```
class RandomNoise(DisableNoise):

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'noise_seed': ('INT', {'default': 0, 'min': 0, 'max': 18446744073709551615})}}

    def get_noise(self, noise_seed):
        return (Noise_RandomNoise(noise_seed),)
```