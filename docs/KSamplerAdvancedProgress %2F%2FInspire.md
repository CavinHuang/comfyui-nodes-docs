# Documentation
- Class name: KSamplerAdvanced_progress
- Category: InspirePack/analysis
- Output node: False
- Repo Ref: https://github.com/ltdrdata/ComfyUI-Inspire-Pack.git

KSamplerAdvanced_progress节点旨在模型内促进高级采样程序，加入噪声和调度机制来完善生成过程。它旨在通过逐步调整采样参数来提高输出质量和多样性。

# Input types
## Required
- model
    - 模型参数至关重要，因为它定义了节点将用于采样过程的基础架构和学习成果。它是节点操作的基础，决定了生成输出的潜在范围和性质。
    - Comfy dtype: MODEL
    - Python dtype: torch.nn.Module
- add_noise
    - add_noise参数至关重要，它决定了在采样过程中是否会引入噪声。这可能导致结果更加多样化，甚至更具创造性，为输出增加了随机性。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool
- noise_seed
    - noise_seed参数很重要，因为它为噪声生成中的随机性提供了基础。它确保噪声模式是可复现的，这对于一致的实验和结果比较非常重要。
    - Comfy dtype: INT
    - Python dtype: int
- steps
    - steps参数规定了采样过程将经历的迭代次数。它直接影响生成输出的复杂性和细节，更多的步骤可能导致更精细的结果。
    - Comfy dtype: INT
    - Python dtype: int
- cfg
    - cfg参数是一个配置值，用于调整采样过程的行为。它是控制输出生成中探索和利用之间平衡的关键因素。
    - Comfy dtype: FLOAT
    - Python dtype: float
- sampler_name
    - sampler_name参数指定了要使用的采样方法。它影响了生成输出所采用的策略，这可以显著改变结果的特征和分布。
    - Comfy dtype: SAMPLER
    - Python dtype: str
- scheduler
    - scheduler参数定义了随时间调整采样过程的调度策略。它在实现生成中不同方面（如噪声水平和采样频率）之间的动态平衡方面起着重要作用。
    - Comfy dtype: SCHEDULER
    - Python dtype: str
- positive
    - positive参数提供了正向调节数据，引导采样过程朝着期望的结果发展。它对于引导生成朝着特定方向发展至关重要，确保结果符合某些标准或期望。
    - Comfy dtype: CONDITIONING
    - Python dtype: Any
- negative
    - negative参数提供了负向调节数据，帮助采样过程避免不希望的结果。它在通过防止生成某些模式或特征来精炼输出方面发挥着关键作用。
    - Comfy dtype: CONDITIONING
    - Python dtype: Any
- latent_image
    - latent_image参数是采样过程的基础潜在表示。它是一个关键元素，因为它直接影响生成输出的初始状态和潜在轨迹。
    - Comfy dtype: LATENT
    - Python dtype: Dict[str, torch.Tensor]
- start_at_step
    - start_at_step参数指定了采样过程的起点。它对于定义将要执行的迭代范围很重要，从而影响生成的整体进展和时机。
    - Comfy dtype: INT
    - Python dtype: int
- end_at_step
    - end_at_step参数标记了采样过程的终点。它与start_at_step一起，决定了过程将覆盖的总步数，这直接影响结果的全面性。
    - Comfy dtype: INT
    - Python dtype: int
- noise_mode
    - noise_mode参数规定了噪声生成和处理的计算模式。这是一个关键的选择，它影响节点的性能和效率，GPU更适合密集型计算，而CPU适用于资源消耗较少的任务。
    - Comfy dtype: GPU(=A1111),CPU
    - Python dtype: str
- return_with_leftover_noise
    - return_with_leftover_noise参数决定节点是否将剩余噪声与潜在样本一起返回。这对于进一步的分析或额外的处理阶段可能有用。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool
- interval
    - interval参数设置了节点在采样过程中保存中间潜在样本的频率。它影响输出的粒度，并允许捕捉生成的进展。
    - Comfy dtype: INT
    - Python dtype: int
- omit_start_latent
    - omit_start_latent参数决定是否从输出中省略初始潜在样本。这在某些工作流程中很有用，比如起始点不感兴趣或为了减少结果中的冗余。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool
## Optional
- prev_progress_latent_opt
    - prev_progress_latent_opt参数允许继续之前的采样过程，提供了一种将新结果附加到现有潜在样本的方法。这有助于创建扩展的或迭代的输出。
    - Comfy dtype: LATENT
    - Python dtype: Dict[str, torch.Tensor]

# Output types
- latent
    - latent输出代表节点生成的最终潜在样本，包含了采样过程的最终成果。它是关键组成部分，因为它为进一步分析或下游处理提供了基础。
    - Comfy dtype: LATENT
    - Python dtype: torch.Tensor
- progress_latent
    - progress_latent输出提供了在采样过程中特定间隔捕获的中间潜在样本数组。这个特性对于监控生成的演变和理解模型行为的动态非常有价值。
    - Comfy dtype: LATENT
    - Python dtype: List[torch.Tensor]

# Usage tips
- Infra type: GPU

# Source code
```
class KSamplerAdvanced_progress(a1111_compat.KSamplerAdvanced_inspire):

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'model': ('MODEL',), 'add_noise': ('BOOLEAN', {'default': True, 'label_on': 'enable', 'label_off': 'disable'}), 'noise_seed': ('INT', {'default': 0, 'min': 0, 'max': 18446744073709551615}), 'steps': ('INT', {'default': 20, 'min': 1, 'max': 10000}), 'cfg': ('FLOAT', {'default': 8.0, 'min': 0.0, 'max': 100.0, 'step': 0.5, 'round': 0.01}), 'sampler_name': (comfy.samplers.KSampler.SAMPLERS,), 'scheduler': (comfy.samplers.KSampler.SCHEDULERS,), 'positive': ('CONDITIONING',), 'negative': ('CONDITIONING',), 'latent_image': ('LATENT',), 'start_at_step': ('INT', {'default': 0, 'min': 0, 'max': 10000}), 'end_at_step': ('INT', {'default': 10000, 'min': 0, 'max': 10000}), 'noise_mode': (['GPU(=A1111)', 'CPU'],), 'return_with_leftover_noise': ('BOOLEAN', {'default': False, 'label_on': 'enable', 'label_off': 'disable'}), 'interval': ('INT', {'default': 1, 'min': 1, 'max': 10000}), 'omit_start_latent': ('BOOLEAN', {'default': False, 'label_on': 'True', 'label_off': 'False'})}, 'optional': {'prev_progress_latent_opt': ('LATENT',)}}
    FUNCTION = 'sample'
    CATEGORY = 'InspirePack/analysis'
    RETURN_TYPES = ('LATENT', 'LATENT')
    RETURN_NAMES = ('latent', 'progress_latent')

    def sample(self, model, add_noise, noise_seed, steps, cfg, sampler_name, scheduler, positive, negative, latent_image, start_at_step, end_at_step, noise_mode, return_with_leftover_noise, interval, omit_start_latent, prev_progress_latent_opt=None):
        sampler = a1111_compat.KSamplerAdvanced_inspire()
        if omit_start_latent:
            result = []
        else:
            result = [latent_image['samples']]
        for i in range(start_at_step, end_at_step + 1):
            cur_add_noise = i == start_at_step and add_noise
            cur_return_with_leftover_noise = i != steps or return_with_leftover_noise
            latent_image = sampler.sample(model, cur_add_noise, noise_seed, steps, cfg, sampler_name, scheduler, positive, negative, latent_image, i, i + 1, noise_mode, cur_return_with_leftover_noise)[0]
            print(f'{i}, {i + 1}')
            if i % interval == 0 or i == steps:
                result.append(latent_image['samples'])
        if len(result) > 0:
            result = torch.cat(result)
            result = {'samples': result}
        else:
            result = latent_image
        if prev_progress_latent_opt is not None:
            result['samples'] = torch.cat((prev_progress_latent_opt['samples'], result['samples']), dim=0)
        return (latent_image, result)
```