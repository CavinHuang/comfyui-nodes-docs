# Documentation
- Class name: SamplerLCMCycle
- Category: sampling/custom_sampling/samplers
- Output node: False
- Repo Ref: https://github.com/jojkaart/ComfyUI-sampler-lcm-alternative

该节点用于创建一个专门用于处理生成模型中复杂采样任务的采样器。它抽象了采样过程的复杂性，强调节点在通过有效导航模型的潜在空间来生成高质量样本方面的作用。节点的主要目标是为用户提供一个可靠和灵活的模型推理工具，无需深入了解底层算法。

# Input types
## Required
- euler_steps
    - 该参数决定了采样过程中采取的欧拉步数，直接影响生成样本的质量和收敛性。它对于平衡计算成本和采样精度至关重要。
    - Comfy dtype: INT
    - Python dtype: int
- lcm_steps
    - 该参数指定了最小公倍数（LCM）步数，这对于同步不同维度上的采样过程并确保步骤之间的一致过渡至关重要。
    - Comfy dtype: INT
    - Python dtype: int
- tweak_sigmas
    - 这个布尔标志决定了是否对sigma值进行调整，这可以完善采样过程并导致更细微的样本变化。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool
- ancestral
    - 祖先参数影响采样过程向较旧潜在状态的引导，这可能会影响生成样本的风格或主题特征。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- sampler
    - 输出是一个配置好的采样器，根据输入规格定制，准备在生成模型中使用，以产生符合所需特征的样本。
    - Comfy dtype: SAMPLER
    - Python dtype: comfy.samplers.KSampler

# Usage tips
- Infra type: CPU

# Source code
```
class SamplerLCMCycle:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'euler_steps': ('INT', {'default': 1, 'min': 1, 'max': 50}), 'lcm_steps': ('INT', {'default': 2, 'min': 1, 'max': 50}), 'tweak_sigmas': ('BOOLEAN', {'default': False}), 'ancestral': ('FLOAT', {'default': 0, 'min': 0, 'max': 1.0, 'step': 0.01, 'round': False})}}
    RETURN_TYPES = ('SAMPLER',)
    CATEGORY = 'sampling/custom_sampling/samplers'
    FUNCTION = 'get_sampler'

    def get_sampler(self, euler_steps, lcm_steps, tweak_sigmas, ancestral):
        sampler = comfy.samplers.KSAMPLER(sample_lcm_cycle, extra_options={'euler_steps': euler_steps, 'lcm_steps': lcm_steps, 'tweak_sigmas': tweak_sigmas, 'ancestral': ancestral})
        return (sampler,)
```