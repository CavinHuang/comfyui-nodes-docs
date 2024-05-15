# Documentation
- Class name: SamplerEulerAncestral
- Category: sampling/custom_sampling/samplers
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

SamplerEulerAncestral节点旨在使用欧拉方法生成祖先采样器。它通过提供一种定制化的方法，利用欧拉方法的特性来生成符合特定噪声计划的样本，从而为采样过程做出贡献。

# Input types
## Required
- eta
    - eta参数对于控制采样过程中的噪声水平至关重要。它直接影响生成样本的质量和收敛性。
    - Comfy dtype: FLOAT
    - Python dtype: float
- s_noise
    - s_noise参数在定义采样过程中的初始噪声水平方面非常重要。它设定了噪声减少的起点，影响整体样本生成。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- sampler
    - 输出的采样器是采样过程中的关键组件，它封装了基于提供的噪声计划和参数生成样本的逻辑。
    - Comfy dtype: SAMPLER
    - Python dtype: comfy.samplers.KSampler

# Usage tips
- Infra type: CPU

# Source code
```
class SamplerEulerAncestral:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'eta': ('FLOAT', {'default': 1.0, 'min': 0.0, 'max': 100.0, 'step': 0.01, 'round': False}), 's_noise': ('FLOAT', {'default': 1.0, 'min': 0.0, 'max': 100.0, 'step': 0.01, 'round': False})}}
    RETURN_TYPES = ('SAMPLER',)
    CATEGORY = 'sampling/custom_sampling/samplers'
    FUNCTION = 'get_sampler'

    def get_sampler(self, eta, s_noise):
        sampler = comfy.samplers.ksampler('euler_ancestral', {'eta': eta, 's_noise': s_noise})
        return (sampler,)
```