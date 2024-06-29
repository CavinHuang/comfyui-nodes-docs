# Documentation
- Class name: SamplerLMS
- Category: sampling/custom_sampling/samplers
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

SamplerLMS节点旨在为特定的采样策略生成定制的采样器。它封装了使用'ksampler'函数创建和配置采样器的功能，该函数针对不同的采样方法如'dpm_fast'或'dpm_adaptive'进行了优化。这个节点在采样过程中至关重要，确保为手头的任务使用适当的采样器。

# Input types
## Required
- order
    - ‘order’参数对于确定SamplerLMS节点使用的采样方法的顺序至关重要。它直接影响采样器的配置，进而影响采样过程的质量和特性。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- sampler
    - SamplerLMS节点的输出'sampler'代表配置好的采样器对象。它很重要，因为它用于采样过程的后续步骤，直接影响采样任务的结果。
    - Comfy dtype: SAMPLER
    - Python dtype: KSAMPLER

# Usage tips
- Infra type: CPU

# Source code
```
class SamplerLMS:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'order': ('INT', {'default': 4, 'min': 1, 'max': 100})}}
    RETURN_TYPES = ('SAMPLER',)
    CATEGORY = 'sampling/custom_sampling/samplers'
    FUNCTION = 'get_sampler'

    def get_sampler(self, order):
        sampler = comfy.samplers.ksampler('lms', {'order': order})
        return (sampler,)
```