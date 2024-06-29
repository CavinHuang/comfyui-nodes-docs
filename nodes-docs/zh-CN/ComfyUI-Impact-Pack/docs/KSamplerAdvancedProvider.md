# Documentation
- Class name: KSamplerAdvancedProvider
- Category: ImpactPack/Sampler
- Output node: False
- Repo Ref: https://github.com/ltdrdata/ComfyUI-Impact-Pack.git

KSamplerAdvancedProvider节点旨在为生成模型生成高级采样技术。它利用KSamplerAdvancedWrapper提供复杂的采样过程，可以通过各种参数进行微调，如配置设置、采样器名称和调度器。此节点对于在图像合成任务中实现高质量结果至关重要，因为它允许对采样过程进行精细控制。

# Input types
## Required
- cfg
    - ‘cfg’参数对于配置采样过程至关重要。它通过确定采样步骤的规模等关键方面，影响采样器的整体行为。此参数对于在图像合成中实现预期结果至关重要。
    - Comfy dtype: FLOAT
    - Python dtype: float
- sampler_name
    - ‘sampler_name’参数指定了采样过程中要使用的采样器类型。它是形成生成样本特征的关键决定因素，因此在节点的执行中扮演着重要角色。
    - Comfy dtype: SAMPLER
    - Python dtype: str
- scheduler
    - ‘scheduler’参数定义了采样步骤的调度策略。它对于控制采样进度至关重要，从而影响采样过程的最终输出。
    - Comfy dtype: SCHEDULER
    - Python dtype: str
- basic_pipe
    - ‘basic_pipe’参数封装了采样过程所需的基础组件，包括模型、配置和条件。它对于节点的运行是不可或缺的，因为它为高级采样技术提供了必要的上下文。
    - Comfy dtype: BASIC_PIPE
    - Python dtype: tuple
## Optional
- sigma_factor
    - ‘sigma_factor’参数调整采样过程中的噪声水平，允许控制每一步引入的噪声。这种微调能力对于在生成的图像中实现细节和噪声之间的平衡非常重要。
    - Comfy dtype: FLOAT
    - Python dtype: float
- sampler_opt
    - 可选的‘sampler_opt’参数提供了额外的选项，以进一步自定义采样过程。它允许高级控制，并且可以显著影响采样的结果，为用户提供更高程度的灵活性。
    - Comfy dtype: SAMPLER
    - Python dtype: dict

# Output types
- KSAMPLER_ADVANCED
    - KSamplerAdvancedProvider节点的输出是一个高级采样器对象，它封装了复杂的采样过程。它非常重要，因为它代表了节点功能的顶点，为用户提供了一个强大的工具，通过细微的采样技术生成高质量的图像。
    - Comfy dtype: KSAMPLER_ADVANCED
    - Python dtype: KSamplerAdvancedWrapper

# Usage tips
- Infra type: GPU

# Source code
```
class KSamplerAdvancedProvider:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'cfg': ('FLOAT', {'default': 8.0, 'min': 0.0, 'max': 100.0}), 'sampler_name': (comfy.samplers.KSampler.SAMPLERS,), 'scheduler': (comfy.samplers.KSampler.SCHEDULERS,), 'sigma_factor': ('FLOAT', {'default': 1.0, 'min': 0.0, 'max': 10.0, 'step': 0.01}), 'basic_pipe': ('BASIC_PIPE',)}, 'optional': {'sampler_opt': ('SAMPLER',)}}
    RETURN_TYPES = ('KSAMPLER_ADVANCED',)
    FUNCTION = 'doit'
    CATEGORY = 'ImpactPack/Sampler'

    def doit(self, cfg, sampler_name, scheduler, basic_pipe, sigma_factor=1.0, sampler_opt=None):
        (model, _, _, positive, negative) = basic_pipe
        sampler = KSamplerAdvancedWrapper(model, cfg, sampler_name, scheduler, positive, negative, sampler_opt=sampler_opt, sigma_factor=sigma_factor)
        return (sampler,)
```