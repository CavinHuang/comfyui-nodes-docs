# Documentation
- Class name: UnsamplerDetailerHookProvider
- Category: ImpactPack/Detailer
- Output node: False
- Repo Ref: https://github.com/ltdrdata/ComfyUI-Impact-Pack.git

UnsamplerDetailerHookProvider节点旨在通过反采样增强采样数据的细节。它通过在采样过程中应用详细的反采样钩子来操作，允许生成更精细的输出。此节点对于需要高细节质量的任务至关重要，例如在图像或信号处理应用中。

# Input types
## Required
- model
    - 模型参数对于UnsamplerDetailerHookProvider节点至关重要，因为它定义了将用于反采样的底层模型。模型的选择可以显著影响反采样数据的质量和特性。
    - Comfy dtype: MODEL
    - Python dtype: torch.nn.Module
- steps
    - 步骤参数决定了反采样过程中要使用的步骤数。它是一个关键因素，影响操作的细节水平和计算复杂性。
    - Comfy dtype: INT
    - Python dtype: int
- start_end_at_step
    - start_end_at_step参数指定了反采样过程应该开始逐渐减少细节增强的步骤。
    - Comfy dtype: INT
    - Python dtype: int
- end_end_at_step
    - end_end_at_step参数标记了反采样过程结束的最终步骤，标志着细节增强阶段的结束。
    - Comfy dtype: INT
    - Python dtype: int
- cfg
    - cfg参数调整反采样器的配置设置，允许微调反采样过程以实现期望的结果。
    - Comfy dtype: FLOAT
    - Python dtype: float
- sampler_name
    - sampler_name参数标识了在反采样过程中要使用的特定采样器，这可以改变采样数据的性质。
    - Comfy dtype: STRING
    - Python dtype: str
- scheduler
    - scheduler参数决定了反采样步骤的调度策略，可以优化过程以提高效率或质量。
    - Comfy dtype: STRING
    - Python dtype: str
- normalize
    - normalize参数决定在反采样过程中是否应该对数据进行标准化，这可能改善结果的一致性。
    - Comfy dtype: STRING
    - Python dtype: str
- positive
    - positive参数提供正向条件信息，引导反采样过程朝着期望的结果发展。
    - Comfy dtype: CONDITIONING
    - Python dtype: Any
- negative
    - negative参数提供负向条件信息，以避免在反采样过程中出现不希望的结果。
    - Comfy dtype: CONDITIONING
    - Python dtype: Any
- schedule_for_cycle
    - schedule_for_cycle参数指定反采样过程是否应遵循循环计划，这对于迭代细化非常有用。
    - Comfy dtype: STRING
    - Python dtype: str

# Output types
- DETAILER_HOOK
    - UnsamplerDetailerHookProvider节点的输出是一个详细的反采样钩子，可以用来将额外的细节注入到采样过程中，提高最终输出的质量。
    - Comfy dtype: DETAILER_HOOK
    - Python dtype: DetailerHook

# Usage tips
- Infra type: CPU

# Source code
```
class UnsamplerDetailerHookProvider:
    schedules = ['skip_start', 'from_start']

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'model': ('MODEL',), 'steps': ('INT', {'default': 25, 'min': 1, 'max': 10000}), 'start_end_at_step': ('INT', {'default': 21, 'min': 0, 'max': 10000}), 'end_end_at_step': ('INT', {'default': 24, 'min': 0, 'max': 10000}), 'cfg': ('FLOAT', {'default': 1.0, 'min': 0.0, 'max': 100.0}), 'sampler_name': (comfy.samplers.KSampler.SAMPLERS,), 'scheduler': (comfy.samplers.KSampler.SCHEDULERS,), 'normalize': (['disable', 'enable'],), 'positive': ('CONDITIONING',), 'negative': ('CONDITIONING',), 'schedule_for_cycle': (s.schedules,)}}
    RETURN_TYPES = ('DETAILER_HOOK',)
    FUNCTION = 'doit'
    CATEGORY = 'ImpactPack/Detailer'

    def doit(self, model, steps, start_end_at_step, end_end_at_step, cfg, sampler_name, scheduler, normalize, positive, negative, schedule_for_cycle):
        try:
            hook = hooks.UnsamplerDetailerHook(model, steps, start_end_at_step, end_end_at_step, cfg, sampler_name, scheduler, normalize, positive, negative, from_start='from_start' in schedule_for_cycle)
            return (hook,)
        except Exception as e:
            print("[ERROR] UnsamplerDetailerHookProvider: 'ComfyUI Noise' custom node isn't installed. You must install 'BlenderNeko/ComfyUI Noise' extension to use this node.")
            print(f'\t{e}')
            pass
```