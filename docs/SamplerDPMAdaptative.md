# Documentation
- Class name: SamplerDPMAdaptative
- Category: sampling/custom_sampling/samplers
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

SamplerDPMAdaptative节点旨在通过自适应采样过程生成高质量的样本。它利用k-diffusion库的能力，提供了一个灵活高效的采样机制，可以针对不同的用例进行微调。

# Input types
## Required
- order
    - “order”参数对于确定采样所使用的数值方法的阶数至关重要。它直接影响采样过程的准确性和稳定性。
    - Comfy dtype: INT
    - Python dtype: int
- rtol
    - “rtol”参数设置采样算法的相对容忍度，这对于控制采样过程的精度至关重要。
    - Comfy dtype: FLOAT
    - Python dtype: float
- atol
    - “atol”参数定义了采样过程的绝对容忍度水平，确保生成的样本达到一定的质量标准。
    - Comfy dtype: FLOAT
    - Python dtype: float
- h_init
    - “h_init”参数初始化采样算法的步长，对采样操作的效率和性能起着关键作用。
    - Comfy dtype: FLOAT
    - Python dtype: float
- pcoeff
    - “pcoeff”参数影响自适应采样过程的预测部分，影响生成样本的整体质量和收敛性。
    - Comfy dtype: FLOAT
    - Python dtype: float
- icoeff
    - “icoeff”参数控制自适应采样中的积分部分，这对于保持采样结果的完整性至关重要。
    - Comfy dtype: FLOAT
    - Python dtype: float
- dcoeff
    - “dcoeff”参数调整自适应采样过程中的阻尼因子，确保生成样本的稳定性和平滑性。
    - Comfy dtype: FLOAT
    - Python dtype: float
- accept_safety
    - “accept_safety”参数定义了自适应采样过程中接受新样本的安全阈值，这对采样结果的可靠性很重要。
    - Comfy dtype: FLOAT
    - Python dtype: float
- eta
    - “eta”参数是自适应采样过程中的一个关键因素，影响关于接受新样本的决策。
    - Comfy dtype: FLOAT
    - Python dtype: float
- s_noise
    - “s_noise”参数设置采样过程中引入的噪声水平，这可以影响生成样本的多样性和随机性。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- SAMPLER
    - 输出的SAMPLER是配置好的采样算法实例，准备根据提供的参数用于生成样本。
    - Comfy dtype: SAMPLER
    - Python dtype: KSAMPLER

# Usage tips
- Infra type: GPU

# Source code
```
class SamplerDPMAdaptative:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'order': ('INT', {'default': 3, 'min': 2, 'max': 3}), 'rtol': ('FLOAT', {'default': 0.05, 'min': 0.0, 'max': 100.0, 'step': 0.01, 'round': False}), 'atol': ('FLOAT', {'default': 0.0078, 'min': 0.0, 'max': 100.0, 'step': 0.01, 'round': False}), 'h_init': ('FLOAT', {'default': 0.05, 'min': 0.0, 'max': 100.0, 'step': 0.01, 'round': False}), 'pcoeff': ('FLOAT', {'default': 0.0, 'min': 0.0, 'max': 100.0, 'step': 0.01, 'round': False}), 'icoeff': ('FLOAT', {'default': 1.0, 'min': 0.0, 'max': 100.0, 'step': 0.01, 'round': False}), 'dcoeff': ('FLOAT', {'default': 0.0, 'min': 0.0, 'max': 100.0, 'step': 0.01, 'round': False}), 'accept_safety': ('FLOAT', {'default': 0.81, 'min': 0.0, 'max': 100.0, 'step': 0.01, 'round': False}), 'eta': ('FLOAT', {'default': 0.0, 'min': 0.0, 'max': 100.0, 'step': 0.01, 'round': False}), 's_noise': ('FLOAT', {'default': 1.0, 'min': 0.0, 'max': 100.0, 'step': 0.01, 'round': False})}}
    RETURN_TYPES = ('SAMPLER',)
    CATEGORY = 'sampling/custom_sampling/samplers'
    FUNCTION = 'get_sampler'

    def get_sampler(self, order, rtol, atol, h_init, pcoeff, icoeff, dcoeff, accept_safety, eta, s_noise):
        sampler = comfy.samplers.ksampler('dpm_adaptive', {'order': order, 'rtol': rtol, 'atol': atol, 'h_init': h_init, 'pcoeff': pcoeff, 'icoeff': icoeff, 'dcoeff': dcoeff, 'accept_safety': accept_safety, 'eta': eta, 's_noise': s_noise})
        return (sampler,)
```