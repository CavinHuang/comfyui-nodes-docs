# Documentation
- Class name: samplerSettingsAdvanced
- Category: EasyUse/PreSampling
- Output node: True
- Repo Ref: https://github.com/yolain/ComfyUI-Easy-Use.git

该节点旨在为生成模型的采样参数提供配置流程，为根据特定需求微调生成过程提供强大的框架。它强调适应性和用户对采样过程的控制，而不是深入探讨底层方法的具体细节。

# Input types
## Required
- pipe
    - ‘pipe’参数是节点的主要信息来源，包含采样过程所需的所有上下文和数据。它至关重要，因为它决定了每一步数据的流动和模型的状态。
    - Comfy dtype: PIPE_LINE
    - Python dtype: Dict
- steps
    - ‘steps’参数定义了采样过程中要执行的迭代次数。它在确定采样的粒度以及模型能力被利用的程度上至关重要。
    - Comfy dtype: INT
    - Python dtype: int
- cfg
    - ‘cfg’参数调整采样过程的配置，允许对模型行为进行微调。它在根据所需规格塑造输出方面发挥着重要作用。
    - Comfy dtype: FLOAT
    - Python dtype: float
- sampler_name
    - ‘sampler_name’参数选择要使用的特定采样方法，影响采样过程的整体策略和有效性。
    - Comfy dtype: COMBO
    - Python dtype: str
- scheduler
    - ‘scheduler’参数确定采样过程的调度策略，这对于管理资源和确保高效执行至关重要。
    - Comfy dtype: COMBO
    - Python dtype: str
- start_at_step
    - ‘start_at_step’参数设置采样过程的起点，这对于控制操作的时机和顺序很重要。
    - Comfy dtype: INT
    - Python dtype: int
- end_at_step
    - ‘end_at_step’参数定义了采样过程的终点，确保执行在期望的阶段结束。
    - Comfy dtype: INT
    - Python dtype: int
- add_noise
    - ‘add_noise’参数控制采样过程中噪声的引入，影响生成输出的多样性和质量。
    - Comfy dtype: COMBO
    - Python dtype: str
- seed
    - ‘seed’参数通过为随机数生成提供一个固定点，确保采样过程的可复现性。
    - Comfy dtype: INT
    - Python dtype: int
- return_with_leftover_noise
    - ‘return_with_leftover_noise’参数决定是否在最终输出中包含剩余噪声，这可能会影响结果的审美和风格方面。
    - Comfy dtype: COMBO
    - Python dtype: str
## Optional
- image_to_latent
    - ‘image_to_latent’参数允许将输入图像转换到潜在空间，这对于某些类型的生成任务是基本的。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- latent
    - ‘latent’参数直接提供潜在变量的输入，对于需要在潜在空间层面进行操作的任务至关重要。
    - Comfy dtype: LATENT
    - Python dtype: torch.Tensor
- prompt
    - ‘prompt’参数为生成模型引入文本指导，将输出引向特定的主题或风格。
    - Comfy dtype: PROMPT
    - Python dtype: str
- extra_pnginfo
    - ‘extra_pnginfo’参数包含与PNG图像相关的额外信息，可用于高级图像处理任务。
    - Comfy dtype: EXTRA_PNGINFO
    - Python dtype: str
- my_unique_id
    - ‘my_unique_id’参数为操作分配唯一标识符，对于跟踪和管理多个并发进程至关重要。
    - Comfy dtype: UNIQUE_ID
    - Python dtype: str

# Output types
- pipe
    - ‘pipe’输出是一个综合性结构，封装了生成模型的更新状态和采样过程的结果，为后续操作提供了基础。
    - Comfy dtype: PIPE_LINE
    - Python dtype: Dict

# Usage tips
- Infra type: CPU

# Source code
```
class samplerSettingsAdvanced:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'pipe': ('PIPE_LINE',), 'steps': ('INT', {'default': 20, 'min': 1, 'max': 10000}), 'cfg': ('FLOAT', {'default': 8.0, 'min': 0.0, 'max': 100.0}), 'sampler_name': (comfy.samplers.KSampler.SAMPLERS,), 'scheduler': (comfy.samplers.KSampler.SCHEDULERS,), 'start_at_step': ('INT', {'default': 0, 'min': 0, 'max': 10000}), 'end_at_step': ('INT', {'default': 10000, 'min': 0, 'max': 10000}), 'add_noise': (['enable', 'disable'],), 'seed': ('INT', {'default': 0, 'min': 0, 'max': MAX_SEED_NUM}), 'return_with_leftover_noise': (['disable', 'enable'],)}, 'optional': {'image_to_latent': ('IMAGE',), 'latent': ('LATENT',)}, 'hidden': {'prompt': 'PROMPT', 'extra_pnginfo': 'EXTRA_PNGINFO', 'my_unique_id': 'UNIQUE_ID'}}
    RETURN_TYPES = ('PIPE_LINE',)
    RETURN_NAMES = ('pipe',)
    OUTPUT_NODE = True
    FUNCTION = 'settings'
    CATEGORY = 'EasyUse/PreSampling'

    def settings(self, pipe, steps, cfg, sampler_name, scheduler, start_at_step, end_at_step, add_noise, seed, return_with_leftover_noise, image_to_latent=None, latent=None, prompt=None, extra_pnginfo=None, my_unique_id=None):
        vae = pipe['vae']
        batch_size = pipe['loader_settings']['batch_size'] if 'batch_size' in pipe['loader_settings'] else 1
        if image_to_latent is not None:
            samples = {'samples': vae.encode(image_to_latent[:, :, :, :3])}
            samples = RepeatLatentBatch().repeat(samples, batch_size)[0]
            images = image_to_latent
        elif latent is not None:
            samples = latent
            images = pipe['images']
        else:
            samples = pipe['samples']
            images = pipe['images']
        force_full_denoise = True
        if return_with_leftover_noise == 'enable':
            force_full_denoise = False
        new_pipe = {'model': pipe['model'], 'positive': pipe['positive'], 'negative': pipe['negative'], 'vae': pipe['vae'], 'clip': pipe['clip'], 'samples': samples, 'images': images, 'seed': seed, 'loader_settings': {**pipe['loader_settings'], 'steps': steps, 'cfg': cfg, 'sampler_name': sampler_name, 'scheduler': scheduler, 'start_step': start_at_step, 'last_step': end_at_step, 'denoise': 1.0, 'add_noise': add_noise, 'force_full_denoise': force_full_denoise}}
        del pipe
        return {'ui': {'value': [seed]}, 'result': (new_pipe,)}
```