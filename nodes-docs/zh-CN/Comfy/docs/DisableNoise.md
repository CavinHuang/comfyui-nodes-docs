# Documentation
- Class name: DisableNoise
- Category: sampling/custom_sampling/noise
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

DisableNoise节点旨在采样过程中抑制噪声，确保输出不包含任何随机元素。在需要确定性结果的场景中，它作为一个关键组件，提供了生成潜在表示的无噪声路径。

# Input types
## Optional
- seed
    - seed参数用于初始化噪声生成过程。尽管它不是必需的，但在确保结果的可重复性方面起着关键作用，允许在不同运行中获得一致的结果。
    - Comfy dtype: int
    - Python dtype: int

# Output types
- NOISE
    - DisableNoise节点的输出是Noise_EmptyNoise类的一个实例，它代表了一个无噪声状态。它标志着生成的潜在图像中没有任何噪声，符合节点提供确定性输出的目的。
    - Comfy dtype: Noise_EmptyNoise
    - Python dtype: comfy.k_diffusion.sampling.DisableNoise.Noise_EmptyNoise

# Usage tips
- Infra type: CPU

# Source code
```
class DisableNoise:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {}}
    RETURN_TYPES = ('NOISE',)
    FUNCTION = 'get_noise'
    CATEGORY = 'sampling/custom_sampling/noise'

    def get_noise(self):
        return (Noise_EmptyNoise(),)
```