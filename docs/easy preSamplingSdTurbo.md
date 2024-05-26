# Documentation
- Class name: sdTurboSettings
- Category: EasyUse/PreSampling
- Output node: True
- Repo Ref: https://github.com/yolain/ComfyUI-Easy-Use.git

sdTurboSettings节点通过配置一系列增强样本质量和可控性的参数来简化采样过程。它旨在与采样流水线无缝集成，提供满足不同创意需求和计算限制的广泛选项。

# Input types
## Required
- pipe
    - pipe参数是节点的主干，封装了整个采样流水线及其相关数据。它对节点的正确运行和采样过程的完整性至关重要。
    - Comfy dtype: PIPE_LINE
    - Python dtype: Dict[str, Any]
- steps
    - steps参数决定了采样过程将经历的迭代次数，直接影响生成样本的深度和多样性。这是实现预期结果的关键因素。
    - Comfy dtype: INT
    - Python dtype: int
- cfg
    - cfg参数调整模型的配置，微调采样过程以产生符合用户期望的样本。它在输出的整体质量中起着关键作用。
    - Comfy dtype: FLOAT
    - Python dtype: float
- sampler_name
    - sampler_name参数从预定义的选项中选择采样方法，每种方法都提供独特的特性和优势。它在塑造节点的创意方向和计算效率方面至关重要。
    - Comfy dtype: COMBO
    - Python dtype: str
- eta
    - eta参数影响采样过程中的噪声水平，影响生成图像的清晰度和细节。它是实现质量和计算效率之间平衡的关键控制。
    - Comfy dtype: FLOAT
    - Python dtype: float
- s_noise
    - s_noise参数调整信噪比，这对于确保生成样本的保真度至关重要。它有助于保持高标准的输出质量。
    - Comfy dtype: FLOAT
    - Python dtype: float
- upscale_ratio
    - upscale_ratio参数决定了生成图像的缩放因子，这对于实现期望的分辨率和视觉冲击力至关重要。它显著影响样本的最终呈现。
    - Comfy dtype: FLOAT
    - Python dtype: float
- start_step
    - start_step参数设置了采样过程开始的初始点，影响样本的进展和发展。它对于控制整体采样轨迹非常重要。
    - Comfy dtype: INT
    - Python dtype: int
- end_step
    - end_step参数定义了采样过程结束的最终点，影响样本的持续时间和完整性。它对于管理采样时间线至关重要。
    - Comfy dtype: INT
    - Python dtype: int
- upscale_n_step
    - upscale_n_step参数指定了图像放大的步数，这对于在不损害质量的情况下实现高分辨率结果至关重要。它在最终输出的提升中起着关键作用。
    - Comfy dtype: INT
    - Python dtype: int
- unsharp_kernel_size
    - unsharp_kernel_size参数调整锐化遮罩的核大小，这对于增强图像的锐度和清晰度至关重要。它显著提升了输出的视觉质量。
    - Comfy dtype: INT
    - Python dtype: int
- unsharp_sigma
    - unsharp_sigma参数控制锐化遮罩的sigma值，影响锐度增强的程度。它是实现预期视觉效果的重要因素。
    - Comfy dtype: FLOAT
    - Python dtype: float
- unsharp_strength
    - unsharp_strength参数决定了锐化遮罩效果的强度，影响图像的整体锐度和细节。它对于微调样本的视觉吸引力至关重要。
    - Comfy dtype: FLOAT
    - Python dtype: float
- seed
    - seed参数通过为随机数生成提供固定点来确保采样过程的可重复性。它对于在不同运行中获得一致的结果至关重要。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- pipe
    - 输出pipe是输入pipe的更新版本，现在配备了配置的设置，并准备好进入采样过程的下一阶段。它对于流水线的连续性和进展至关重要。
    - Comfy dtype: PIPE_LINE
    - Python dtype: Dict[str, Any]

# Usage tips
- Infra type: CPU

# Source code
```
class sdTurboSettings:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'pipe': ('PIPE_LINE',), 'steps': ('INT', {'default': 1, 'min': 1, 'max': 10}), 'cfg': ('FLOAT', {'default': 1.0, 'min': 0.0, 'max': 100.0}), 'sampler_name': (comfy.samplers.SAMPLER_NAMES,), 'eta': ('FLOAT', {'default': 1.0, 'min': 0.0, 'max': 10.0, 'step': 0.01, 'round': False}), 's_noise': ('FLOAT', {'default': 1.0, 'min': 0.0, 'max': 10.0, 'step': 0.01, 'round': False}), 'upscale_ratio': ('FLOAT', {'default': 2.0, 'min': 0.0, 'max': 16.0, 'step': 0.01, 'round': False}), 'start_step': ('INT', {'default': 5, 'min': 0, 'max': 1000, 'step': 1}), 'end_step': ('INT', {'default': 15, 'min': 0, 'max': 1000, 'step': 1}), 'upscale_n_step': ('INT', {'default': 3, 'min': 0, 'max': 1000, 'step': 1}), 'unsharp_kernel_size': ('INT', {'default': 3, 'min': 1, 'max': 21, 'step': 1}), 'unsharp_sigma': ('FLOAT', {'default': 0.5, 'min': 0.0, 'max': 10.0, 'step': 0.01, 'round': False}), 'unsharp_strength': ('FLOAT', {'default': 0.0, 'min': 0.0, 'max': 10.0, 'step': 0.01, 'round': False}), 'seed': ('INT', {'default': 0, 'min': 0, 'max': MAX_SEED_NUM})}, 'hidden': {'prompt': 'PROMPT', 'extra_pnginfo': 'EXTRA_PNGINFO', 'my_unique_id': 'UNIQUE_ID'}}
    RETURN_TYPES = ('PIPE_LINE',)
    RETURN_NAMES = ('pipe',)
    OUTPUT_NODE = True
    FUNCTION = 'settings'
    CATEGORY = 'EasyUse/PreSampling'

    def settings(self, pipe, steps, cfg, sampler_name, eta, s_noise, upscale_ratio, start_step, end_step, upscale_n_step, unsharp_kernel_size, unsharp_sigma, unsharp_strength, seed, prompt=None, extra_pnginfo=None, my_unique_id=None):
        model = pipe['model']
        timesteps = torch.flip(torch.arange(1, 11) * 100 - 1, (0,))[:steps]
        sigmas = model.model.model_sampling.sigma(timesteps)
        sigmas = torch.cat([sigmas, sigmas.new_zeros([1])])
        sample_function = None
        extra_options = {'eta': eta, 's_noise': s_noise, 'upscale_ratio': upscale_ratio, 'start_step': start_step, 'end_step': end_step, 'upscale_n_step': upscale_n_step, 'unsharp_kernel_size': unsharp_kernel_size, 'unsharp_sigma': unsharp_sigma, 'unsharp_strength': unsharp_strength}
        if sampler_name == 'euler_ancestral':
            sample_function = sample_euler_ancestral
        elif sampler_name == 'dpmpp_2s_ancestral':
            sample_function = sample_dpmpp_2s_ancestral
        elif sampler_name == 'dpmpp_2m_sde':
            sample_function = sample_dpmpp_2m_sde
        elif sampler_name == 'lcm':
            sample_function = sample_lcm
        if sample_function is not None:
            unsharp_kernel_size = unsharp_kernel_size if unsharp_kernel_size % 2 == 1 else unsharp_kernel_size + 1
            extra_options['unsharp_kernel_size'] = unsharp_kernel_size
            _sampler = comfy.samplers.KSAMPLER(sample_function, extra_options)
        else:
            _sampler = comfy.samplers.sampler_object(sampler_name)
            extra_options = None
        new_pipe = {'model': pipe['model'], 'positive': pipe['positive'], 'negative': pipe['negative'], 'vae': pipe['vae'], 'clip': pipe['clip'], 'samples': pipe['samples'], 'images': pipe['images'], 'seed': seed, 'loader_settings': {**pipe['loader_settings'], 'extra_options': extra_options, 'sampler': _sampler, 'sigmas': sigmas, 'steps': steps, 'cfg': cfg, 'add_noise': 'enabled'}}
        del pipe
        return {'ui': {'value': [seed]}, 'result': (new_pipe,)}
```