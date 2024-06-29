# Documentation
- Class name: dynamicCFGSettings
- Category: EasyUse/PreSampling
- Output node: True
- Repo Ref: https://github.com/yolain/ComfyUI-Easy-Use.git

dynamicCFGSettings节点旨在为给定的管道动态调整配置设置，根据指定的参数优化采样过程。它允许通过输入如steps、cfg和denoise等微调采样程序，这些输入共同影响输出管道的生成。

# Input types
## Required
- pipe
    - pipe参数代表要配置的管道，对于节点的操作至关重要，因为它决定了设置将被应用的上下文。
    - Comfy dtype: PIPE_LINE
    - Python dtype: Dict[str, Any]
- steps
    - steps参数定义了采样过程中要采取的步骤数量，它直接影响采样的粒度和持续时间。
    - Comfy dtype: INT
    - Python dtype: int
- cfg
    - cfg参数是一个浮点值，用于调整采样过程的配置，影响整个过程的行为和输出质量。
    - Comfy dtype: FLOAT
    - Python dtype: float
- cfg_mode
    - cfg_mode参数决定了配置缩放的模式，这对于控制采样设置的动态调整至关重要。
    - Comfy dtype: Enum
    - Python dtype: Enum
- cfg_scale_min
    - cfg_scale_min参数设置了配置的最小缩放值，确保动态调整不会低于指定的阈值。
    - Comfy dtype: FLOAT
    - Python dtype: float
- sampler_name
    - sampler_name参数选择要使用的采样方法，这是塑造采样过程输出的关键决定因素。
    - Comfy dtype: Enum
    - Python dtype: Enum
- scheduler
    - scheduler参数决定了采样过程的调度策略，影响随着时间的推移步骤的管理方式。
    - Comfy dtype: Enum
    - Python dtype: Enum
- denoise
    - denoise参数控制采样过程中应用的降噪水平，可以提高结果的清晰度和质量。
    - Comfy dtype: FLOAT
    - Python dtype: float
- seed
    - seed参数用于初始化随机数生成器，确保采样过程的可重复性。
    - Comfy dtype: INT
    - Python dtype: int
- image_to_latent
    - 当提供image_to_latent参数时，它被用来将图像转换为潜在表示，以便在采样管道中进行进一步处理。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- latent
    - 如果指定了latent参数，则表示在采样过程中将使用潜在空间数据而不是从图像派生它。
    - Comfy dtype: LATENT
    - Python dtype: torch.Tensor
- prompt
    - prompt参数是可选的文本输入，可用于指导采样过程，以生成与某些文本描述相符的输出。
    - Comfy dtype: PROMPT
    - Python dtype: str
- extra_pnginfo
    - 如果存在extra_pnginfo参数，则包含与采样过程相关的额外信息，增强了对输入数据的上下文理解。
    - Comfy dtype: EXTRA_PNGINFO
    - Python dtype: str
- my_unique_id
    - my_unique_id参数是可选的标识符，可用于跟踪或标记采样过程的特定实例。
    - Comfy dtype: UNIQUE_ID
    - Python dtype: str

# Output types
- pipe
    - 输出的pipe是应用了新设置的修改后的管道，准备用于后续的采样操作。
    - Comfy dtype: PIPE_LINE
    - Python dtype: Dict[str, Any]

# Usage tips
- Infra type: CPU

# Source code
```
class dynamicCFGSettings:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'pipe': ('PIPE_LINE',), 'steps': ('INT', {'default': 20, 'min': 1, 'max': 10000}), 'cfg': ('FLOAT', {'default': 8.0, 'min': 0.0, 'max': 100.0}), 'cfg_mode': (DynThresh.Modes,), 'cfg_scale_min': ('FLOAT', {'default': 3.5, 'min': 0.0, 'max': 100.0, 'step': 0.5}), 'sampler_name': (comfy.samplers.KSampler.SAMPLERS,), 'scheduler': (comfy.samplers.KSampler.SCHEDULERS,), 'denoise': ('FLOAT', {'default': 1.0, 'min': 0.0, 'max': 1.0, 'step': 0.01}), 'seed': ('INT', {'default': 0, 'min': 0, 'max': MAX_SEED_NUM})}, 'optional': {'image_to_latent': ('IMAGE',), 'latent': ('LATENT',)}, 'hidden': {'prompt': 'PROMPT', 'extra_pnginfo': 'EXTRA_PNGINFO', 'my_unique_id': 'UNIQUE_ID'}}
    RETURN_TYPES = ('PIPE_LINE',)
    RETURN_NAMES = ('pipe',)
    OUTPUT_NODE = True
    FUNCTION = 'settings'
    CATEGORY = 'EasyUse/PreSampling'

    def settings(self, pipe, steps, cfg, cfg_mode, cfg_scale_min, sampler_name, scheduler, denoise, seed, image_to_latent=None, latent=None, prompt=None, extra_pnginfo=None, my_unique_id=None):
        dynamic_thresh = DynThresh(7.0, 1.0, 'CONSTANT', 0, cfg_mode, cfg_scale_min, 0, 0, 999, False, 'MEAN', 'AD', 1)

        def sampler_dyn_thresh(args):
            input = args['input']
            cond = input - args['cond']
            uncond = input - args['uncond']
            cond_scale = args['cond_scale']
            time_step = args['timestep']
            dynamic_thresh.step = 999 - time_step[0]
            return input - dynamic_thresh.dynthresh(cond, uncond, cond_scale, None)
        model = pipe['model']
        m = model.clone()
        m.set_model_sampler_cfg_function(sampler_dyn_thresh)
        vae = pipe['vae']
        batch_size = pipe['loader_settings']['batch_size'] if 'batch_size' in pipe['loader_settings'] else 1
        if image_to_latent is not None:
            samples = {'samples': vae.encode(image_to_latent[:, :, :, :3])}
            samples = RepeatLatentBatch().repeat(samples, batch_size)[0]
            images = image_to_latent
        elif latent is not None:
            samples = RepeatLatentBatch().repeat(latent, batch_size)[0]
            images = pipe['images']
        else:
            samples = pipe['samples']
            images = pipe['images']
        new_pipe = {'model': m, 'positive': pipe['positive'], 'negative': pipe['negative'], 'vae': pipe['vae'], 'clip': pipe['clip'], 'samples': samples, 'images': images, 'seed': seed, 'loader_settings': {**pipe['loader_settings'], 'steps': steps, 'cfg': cfg, 'sampler_name': sampler_name, 'scheduler': scheduler, 'denoise': denoise}}
        del pipe
        return {'ui': {'value': [seed]}, 'result': (new_pipe,)}
```