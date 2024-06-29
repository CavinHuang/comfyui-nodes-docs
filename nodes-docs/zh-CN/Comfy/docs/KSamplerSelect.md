# Documentation
- Class name: KSamplerSelect
- Category: sampling/custom_sampling/samplers
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

KSamplerSelect节点旨在为扩散过程中的不同采样方法提供选择机制。它抽象了选择和初始化各种采样器的复杂性，使用户能够专注于采样的高级任务，而不必深入每个采样器的初始化过程的具体细节。

# Input types
## Required
- sampler_name
    - sampler_name参数对于确定将使用哪种采样方法至关重要。它指导节点根据提供的名称选择适当的采样器，这对于采样过程的执行和结果至关重要。
    - Comfy dtype: str
    - Python dtype: str

# Output types
- SAMPLER
    - SAMPLER输出代表所选择的采样方法。它封装了所选采样器的功能，这对于进行采样过程和实现所需结果具有重要意义。
    - Comfy dtype: sampler
    - Python dtype: comfy.samplers.KSampler

# Usage tips
- Infra type: CPU

# Source code
```
class KSamplerSelect:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'sampler_name': (comfy.samplers.SAMPLER_NAMES,)}}
    RETURN_TYPES = ('SAMPLER',)
    CATEGORY = 'sampling/custom_sampling/samplers'
    FUNCTION = 'get_sampler'

    def get_sampler(self, sampler_name):
        sampler = comfy.samplers.sampler_object(sampler_name)
        return (sampler,)
```