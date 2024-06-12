# Documentation
- Class name: KSamplerProvider
- Category: ImpactPack/Sampler
- Output node: False
- Repo Ref: https://github.com/ltdrdata/ComfyUI-Impact-Pack.git

KSamplerProvider节点旨在方便创建和配置KSampler，这是生成模型中使用的一种采样方法。它封装了使用各种参数（如种子、步骤和配置）初始化采样器的过程，从而允许从模型生成高质量的样本。

# Input types
## Required
- seed
    - 种子参数对于采样过程的可重复性至关重要。它确保相同的种子始终产生相同的样本，是控制采样随机性的关键要素。
    - Comfy dtype: INT
    - Python dtype: int
- steps
    - 步骤参数定义了采样过程将经历的迭代次数。更多的步骤可以产生更高质量的样本，但也可能增加计算时间。
    - Comfy dtype: INT
    - Python dtype: int
- cfg
    - cfg参数，代表配置，用于调整采样过程的设置。它可以影响生成样本的质量和特性。
    - Comfy dtype: FLOAT
    - Python dtype: float
- sampler_name
    - sampler_name参数指定了采样过程中要使用的采样器类型。不同的采样器可以产生不同的结果，因此这个参数对于实现期望的结果至关重要。
    - Comfy dtype: STRING
    - Python dtype: str
- scheduler
    - 调度器参数决定了采样过程中将应用的调度算法。它在采样的效率和效果中起着重要作用。
    - Comfy dtype: STRING
    - Python dtype: str
- denoise
    - 去噪参数控制采样过程中应用的噪声降低水平。它是实现样本质量和噪声之间平衡的重要因素。
    - Comfy dtype: FLOAT
    - Python dtype: float
- basic_pipe
    - basic_pipe参数是一个包含模型和采样过程所需额外数据的复杂结构。它对KSamplerProvider节点的功能至关重要。
    - Comfy dtype: BASIC_PIPE
    - Python dtype: Tuple[torch.nn.Module, Any, Any, Any, Any]

# Output types
- KSAMPLER
    - KSamplerProvider节点的输出是一个KSampler对象，用于模型生成样本。它代表了已配置的采样器，准备用于采样过程。
    - Comfy dtype: KSAMPLER
    - Python dtype: KSamplerWrapper

# Usage tips
- Infra type: GPU

# Source code
```
class KSamplerProvider:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'seed': ('INT', {'default': 0, 'min': 0, 'max': 18446744073709551615}), 'steps': ('INT', {'default': 20, 'min': 1, 'max': 10000}), 'cfg': ('FLOAT', {'default': 8.0, 'min': 0.0, 'max': 100.0}), 'sampler_name': (comfy.samplers.KSampler.SAMPLERS,), 'scheduler': (comfy.samplers.KSampler.SCHEDULERS,), 'denoise': ('FLOAT', {'default': 1.0, 'min': 0.0, 'max': 1.0, 'step': 0.01}), 'basic_pipe': ('BASIC_PIPE',)}}
    RETURN_TYPES = ('KSAMPLER',)
    FUNCTION = 'doit'
    CATEGORY = 'ImpactPack/Sampler'

    def doit(self, seed, steps, cfg, sampler_name, scheduler, denoise, basic_pipe):
        (model, _, _, positive, negative) = basic_pipe
        sampler = KSamplerWrapper(model, seed, steps, cfg, sampler_name, scheduler, positive, negative, denoise)
        return (sampler,)
```