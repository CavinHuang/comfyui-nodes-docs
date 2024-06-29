# Documentation
- Class name: samplerSettings
- Category: EasyUse/PreSampling
- Output node: True
- Repo Ref: https://github.com/yolain/ComfyUI-Easy-Use.git

samplerSettings类封装了采样流水线的配置过程，提供了一种定义影响采样过程的参数的结构化方式。它的设计旨在简化复杂采样任务的设置，确保正确应用必要的设置以实现期望的结果。

# Input types
## Required
- pipe
    - pipe参数是必需的，因为它包含了采样过程中所需的核心数据和设置。它包括模型、图像以及其他samplerSettings类用来配置采样环境的相关信息。
    - Comfy dtype: PIPE_LINE
    - Python dtype: Dict[str, Any]
- steps
    - steps参数规定了采样过程中要执行的迭代次数。它对控制采样的持续时间和粒度至关重要，直接影响结果的质量和多样性。
    - Comfy dtype: INT
    - Python dtype: int
- cfg
    - cfg参数是一个浮点值，用于调整采样过程的配置。它在微调采样器的行为以获得最佳结果方面发挥着重要作用。
    - Comfy dtype: FLOAT
    - Python dtype: float
- sampler_name
    - sampler_name参数指定了采样过程中要使用的采样器类型。它在确定samplerSettings类用于生成样本的方法和策略方面至关重要。
    - Comfy dtype: COMBO
    - Python dtype: str
- scheduler
    - scheduler参数定义了采样过程的调度策略。它对于管理采样的动态非常重要，确保过程随时间适应和演变，以产生最佳可能的结果。
    - Comfy dtype: COMBO
    - Python dtype: str
- denoise
    - denoise参数用于控制在采样过程中应用的降噪水平。它显著影响生成样本的清晰度和质量。
    - Comfy dtype: FLOAT
    - Python dtype: float
- seed
    - seed参数对于确保采样过程的可重复性至关重要。它初始化随机数生成器，允许在不同运行中获得一致的结果。
    - Comfy dtype: INT
    - Python dtype: int
## Optional
- image_to_latent
    - image_to_latent参数提供了一种将图像转换为潜在表示的方法。它是一个可选输入，使用时，会改变采样过程的重点，以便根据图像数据生成样本。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- latent
    - latent参数允许在采样过程中直接操作潜在空间。它是一个可选输入，提供时，可以从特定的潜在状态生成样本。
    - Comfy dtype: LATENT
    - Python dtype: torch.Tensor
- prompt
    - prompt参数将文本指导引入采样过程，影响生成样本的方向和风格。它是一个可选输入，为输出增加了额外的控制层。
    - Comfy dtype: PROMPT
    - Python dtype: str
- extra_pnginfo
    - extra_pnginfo参数包含与PNG图像相关的额外信息，可用于完善采样过程。它是一个可选输入，为生成样本提供更多上下文。
    - Comfy dtype: EXTRA_PNGINFO
    - Python dtype: str
- my_unique_id
    - my_unique_id参数用于跟踪和识别独特的采样会话。它是一个可选输入，有助于维护采样过程的完整性和可追溯性。
    - Comfy dtype: UNIQUE_ID
    - Python dtype: str

# Output types
- pipe
    - 输出pipe是一个包含更新设置和数据的综合结构，这些设置和数据是采样过程后续阶段所需的。它是至关重要的输出，因为它为生成高质量样本铺平了道路。
    - Comfy dtype: PIPE_LINE
    - Python dtype: Dict[str, Any]

# Usage tips
- Infra type: CPU

# Source code
```
class samplerSettings:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'pipe': ('PIPE_LINE',), 'steps': ('INT', {'default': 20, 'min': 1, 'max': 10000}), 'cfg': ('FLOAT', {'default': 8.0, 'min': 0.0, 'max': 100.0}), 'sampler_name': (comfy.samplers.KSampler.SAMPLERS,), 'scheduler': (comfy.samplers.KSampler.SCHEDULERS,), 'denoise': ('FLOAT', {'default': 1.0, 'min': 0.0, 'max': 1.0, 'step': 0.01}), 'seed': ('INT', {'default': 0, 'min': 0, 'max': MAX_SEED_NUM})}, 'optional': {'image_to_latent': ('IMAGE',), 'latent': ('LATENT',)}, 'hidden': {'prompt': 'PROMPT', 'extra_pnginfo': 'EXTRA_PNGINFO', 'my_unique_id': 'UNIQUE_ID'}}
    RETURN_TYPES = ('PIPE_LINE',)
    RETURN_NAMES = ('pipe',)
    OUTPUT_NODE = True
    FUNCTION = 'settings'
    CATEGORY = 'EasyUse/PreSampling'

    def settings(self, pipe, steps, cfg, sampler_name, scheduler, denoise, seed, image_to_latent=None, latent=None, prompt=None, extra_pnginfo=None, my_unique_id=None):
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
        new_pipe = {'model': pipe['model'], 'positive': pipe['positive'], 'negative': pipe['negative'], 'vae': pipe['vae'], 'clip': pipe['clip'], 'samples': samples, 'images': images, 'seed': seed, 'loader_settings': {**pipe['loader_settings'], 'steps': steps, 'cfg': cfg, 'sampler_name': sampler_name, 'scheduler': scheduler, 'denoise': denoise, 'add_noise': 'enabled'}}
        del pipe
        return {'ui': {'value': [seed]}, 'result': (new_pipe,)}
```