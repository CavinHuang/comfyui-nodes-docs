# Documentation
- Class name: SamplerLCMAlternative
- Category: sampling/custom_sampling/samplers
- Output node: False
- Repo Ref: https://github.com/jojkaart/ComfyUI-sampler-lcm-alternative

SamplerLCMAlternative节点旨在为生成模型提供自定义采样方法。它利用先进技术来增强采样过程，确保输出更加细腻，可能具有更高的质量。当传统的采样方法可能不足够时，此节点特别有用，为用户提供了一种定制化的采样方法。

# Input types
## Required
- euler_steps
    - euler_steps参数对于确定数值积分中使用的欧拉方法的步数至关重要，这可以显著影响采样过程的准确性和稳定性。它允许用户微调采样方法，以实现性能和精度之间的期望平衡。
    - Comfy dtype: INT
    - Python dtype: int
- ancestral
    - ancestral参数控制祖先采样的水平，这影响生成样本的多样性。它允许在采样过程中在探索和利用之间进行权衡，使用户能够控制模型探索新可能性的程度与坚持已知解决方案的程度。
    - Comfy dtype: FLOAT
    - Python dtype: float
- noise_mult
    - noise_mult参数调整添加到采样过程中的噪声大小，这可以影响生成样本的可变性和随机性。对于希望在采样中引入受控噪声水平，可能增强输出的创造性或多样性的用户来说，此参数至关重要。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- sampler
    - 输出的sampler是一个自定义采样对象，它封装了指定的参数和采样逻辑。它作为用户从生成模型生成新样本的工具，提供了一种符合其特定需求和偏好的定制化方法。
    - Comfy dtype: SAMPLER
    - Python dtype: comfy.samplers.KSAMPLER

# Usage tips
- Infra type: CPU

# Source code
```
class SamplerLCMAlternative:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'euler_steps': ('INT', {'default': 0, 'min': -10000, 'max': 10000}), 'ancestral': ('FLOAT', {'default': 0, 'min': 0, 'max': 1.0, 'step': 0.01, 'round': False}), 'noise_mult': ('FLOAT', {'default': 1.0, 'min': 0.0, 'max': 2.0, 'step': 0.001, 'round': False})}}
    RETURN_TYPES = ('SAMPLER',)
    CATEGORY = 'sampling/custom_sampling/samplers'
    FUNCTION = 'get_sampler'

    def get_sampler(self, euler_steps, ancestral, noise_mult):
        sampler = comfy.samplers.KSAMPLER(sample_lcm_alt, extra_options={'euler_steps': euler_steps, 'noise_mult': noise_mult, 'ancestral': ancestral})
        return (sampler,)
```