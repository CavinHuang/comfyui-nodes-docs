# Documentation
- Class name: UnsamplerHookProvider
- Category: ImpactPack/Upscale
- Output node: False
- Repo Ref: https://github.com/ltdrdata/ComfyUI-Impact-Pack.git

UnsamplerHookProvider节点旨在通过在图像生成过程中应用去采样器钩子来增强放大过程。它根据放大过程中的当前步骤动态调整采样策略，允许对图像质量进行微调。该节点在图像增强工作流程中扮演着关键角色，通过利用动态采样技术的力量，确保最终输出的图像质量最高。

# Input types
## Required
- model
    - 模型参数对于UnsamplerHookProvider节点至关重要，因为它定义了将用于图像放大的模型。模型的选择显著影响节点的执行和生成图像的质量。
    - Comfy dtype: MODEL
    - Python dtype: torch.nn.Module
## Optional
- steps
    - 步骤参数决定了放大过程中采取的步骤数。它是控制细节水平和节点总执行时间的关键因素。
    - Comfy dtype: INT
    - Python dtype: int
- start_end_at_step
    - start_end_at_step参数指定了去采样器钩子操作的起始步骤。它对于定义去采样器钩子开始影响放大过程的初始条件很重要。
    - Comfy dtype: INT
    - Python dtype: int
- end_end_at_step
    - end_end_at_step参数标记了去采样器钩子停止操作的最终步骤。它是设置去采样器钩子对放大过程影响的终点的关键参数。
    - Comfy dtype: INT
    - Python dtype: int
- cfg
    - cfg参数用于配置去采样器钩子的设置。它在定制放大过程以满足特定质量要求方面起着重要作用。
    - Comfy dtype: FLOAT
    - Python dtype: float
- sampler_name
    - sampler_name参数标识了去采样器钩子要使用的采样方法。它是确定放大过程中采样策略的关键组成部分。
    - Comfy dtype: STRING
    - Python dtype: str
- scheduler
    - scheduler参数决定去采样器钩子操作的调度策略。它对于管理放大过程中采样步骤的时机和顺序至关重要。
    - Comfy dtype: STRING
    - Python dtype: str
- normalize
    - normalize参数指示在处理之前是否应将输入数据标准化。它通过可能改变输入值的缩放来影响节点的执行。
    - Comfy dtype: STRING
    - Python dtype: str
- positive
    - positive参数为去采样器钩子提供正向调节数据，影响放大过程朝着期望结果的方向发展。
    - Comfy dtype: CONDITIONING
    - Python dtype: Any
- negative
    - negative参数为去采样器钩子提供负向调节数据，引导放大过程远离不希望的结果。
    - Comfy dtype: CONDITIONING
    - Python dtype: Any
- schedule_for_iteration
    - schedule_for_iteration参数指定当前放大过程迭代中使用哪种调度策略。对于迭代不同的策略以实现最佳结果至关重要。
    - Comfy dtype: STRING
    - Python dtype: str

# Output types
- hook
    - hook输出提供了根据输入参数配置的去采样器钩子对象。它很重要，因为它代表了节点的核心功能，使得能够操作放大过程。
    - Comfy dtype: PK_HOOK
    - Python dtype: PixelKSampleHook

# Usage tips
- Infra type: CPU

# Source code
```
class UnsamplerHookProvider:
    schedules = ['simple']

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'model': ('MODEL',), 'steps': ('INT', {'default': 25, 'min': 1, 'max': 10000}), 'start_end_at_step': ('INT', {'default': 21, 'min': 0, 'max': 10000}), 'end_end_at_step': ('INT', {'default': 24, 'min': 0, 'max': 10000}), 'cfg': ('FLOAT', {'default': 1.0, 'min': 0.0, 'max': 100.0}), 'sampler_name': (comfy.samplers.KSampler.SAMPLERS,), 'scheduler': (comfy.samplers.KSampler.SCHEDULERS,), 'normalize': (['disable', 'enable'],), 'positive': ('CONDITIONING',), 'negative': ('CONDITIONING',), 'schedule_for_iteration': (s.schedules,)}}
    RETURN_TYPES = ('PK_HOOK',)
    FUNCTION = 'doit'
    CATEGORY = 'ImpactPack/Upscale'

    def doit(self, model, steps, start_end_at_step, end_end_at_step, cfg, sampler_name, scheduler, normalize, positive, negative, schedule_for_iteration):
        try:
            hook = None
            if schedule_for_iteration == 'simple':
                hook = hooks.UnsamplerHook(model, steps, start_end_at_step, end_end_at_step, cfg, sampler_name, scheduler, normalize, positive, negative)
            return (hook,)
        except Exception as e:
            print("[ERROR] UnsamplerHookProvider: 'ComfyUI Noise' custom node isn't installed. You must install 'BlenderNeko/ComfyUI Noise' extension to use this node.")
            print(f'\t{e}')
            pass
```