# Documentation
- Class name: MikeySamplerBaseOnlyAdvanced
- Category: Mikey/Sampling
- Output node: False
- Repo Ref: https://github.com/bash-j/mikey_nodes

MikeySamplerBaseOnlyAdvanced 节点旨在为生成模型执行高级采样技术。它结合了图像缩放、模型放大和潜在空间操作等多种组件，以产生高质量的样本。该节点的功能集中在生成经过放大和去噪的样本上，利用复杂的算法来增强输出。

# Input types
## Required
- seed
    - 种子参数对于采样过程的可重复性至关重要，确保在不同运行中生成的样本是一致的。它在确定随机数生成器的初始状态中起着重要作用，进而影响整个采样过程。
    - Comfy dtype: INT
    - Python dtype: int
## Optional
- upscale_model
    - upscale_model 参数决定了用于图像放大的方法或模型。它可以是一个代表缩放方法的字符串，或者是用于更复杂模型的 PyTorch 模块。这个参数在采样过程中显著影响放大图像的质量和分辨率。
    - Comfy dtype: COMBO[str, torch.nn.Module]
    - Python dtype: Union[str, torch.nn.Module]

# Output types
- latent
    - latent 参数代表放大图像的编码版本，是采样过程的关键输出。它以压缩形式捕获图像的底层结构，允许在潜在空间中进行进一步的操作或分析。
    - Comfy dtype: LATENT
    - Python dtype: torch.Tensor

# Usage tips
- Infra type: GPU

# Source code
```
class MikeySamplerBaseOnlyAdvanced:

    @classmethod
    def INPUT_TYPES(s):
        s.image_scaler = ImageScaleBy()
        s.upscale_models = folder_paths.get_filename_list('upscale_models')
        s.all_upscale_models = s.upscale_models + s.image_scaler.upscale_methods
        try:
            default_model = 'lanczos'
            um = (s.all_upscale_models, {'default': default_model})
        except:
            um = (folder_paths.get_filename_list('upscale_models'),)
        return {'required': {'base_model': ('MODEL',), 'positive_cond_base': ('CONDITIONING',), 'negative_cond_base': ('CONDITIONING',), 'samples': ('LATENT',), 'vae': ('VAE',), 'add_noise': (['enable', 'disable'], {'default': 'enable'}), 'denoise': ('FLOAT', {'default': 1.0, 'min': 0.0, 'max': 1.0, 'step': 0.01}), 'steps': ('INT', {'default': 31, 'min': 1, 'max': 1000}), 'smooth_step': ('INT', {'default': 0, 'min': -1, 'max': 100}), 'cfg_1': ('FLOAT', {'default': 5.0, 'min': 0.1, 'max': 100.0, 'step': 0.1}), 'cfg_2': ('FLOAT', {'default': 9.5, 'min': 0.1, 'max': 100.0, 'step': 0.1}), 'sampler_name': (comfy.samplers.KSampler.SAMPLERS, {'default': 'dpmpp_3m_sde_gpu'}), 'scheduler': (comfy.samplers.KSampler.SCHEDULERS, {'default': 'exponential'}), 'upscale_model': um, 'seed': ('INT', {'default': 0, 'min': 0, 'max': 18446744073709551615}), 'upscale_by': ('FLOAT', {'default': 1.0, 'min': 0.0, 'max': 10.0, 'step': 0.1}), 'hires_denoise': ('FLOAT', {'default': 0.4, 'min': 0.0, 'max': 1.0, 'step': 0.01}), 'hires_steps': ('INT', {'default': 31, 'min': 1, 'max': 1000})}}
    RETURN_TYPES = ('LATENT',)
    FUNCTION = 'run'
    CATEGORY = 'Mikey/Sampling'

    def run(self, seed, base_model, positive_cond_base, negative_cond_base, samples, vae, add_noise, denoise, steps, cfg_1, cfg_2, sampler_name, scheduler, upscale_model, upscale_by, hires_denoise, hires_steps, smooth_step):
        image_scaler = ImageScale()
        vaeencoder = VAEEncode()
        vaedecoder = VAEDecode()
        uml = UpscaleModelLoader()
        if upscale_model in image_scaler.upscale_methods:
            upscale_model = upscale_model
        else:
            upscale_model = uml.load_model(upscale_model)[0]
        iuwm = ImageUpscaleWithModel()
        start_step = int(steps - steps * denoise)
        if start_step > steps // 2:
            last_step = steps - 1
        elif start_step % 2 == 0:
            last_step = steps // 2 - 1
        else:
            last_step = steps // 2
        sample1 = common_ksampler(base_model, seed, steps, cfg_1, sampler_name, scheduler, positive_cond_base, negative_cond_base, samples, start_step=start_step, last_step=last_step, force_full_denoise=False)[0]
        start_step = last_step + 1
        total_steps = steps + smooth_step
        sample2 = common_ksampler(base_model, seed + 1, total_steps, cfg_2, sampler_name, scheduler, positive_cond_base, negative_cond_base, sample1, disable_noise=True, start_step=start_step, force_full_denoise=True)
        if upscale_by == 0:
            return sample2
        else:
            sample2 = sample2[0]
        pixels = vaedecoder.decode(vae, sample2)[0]
        (org_width, org_height) = (pixels.shape[2], pixels.shape[1])
        if isinstance(upscale_model, str):
            img = self.image_scaler.upscale(pixels, upscale_model, upscale_by)[0]
        else:
            img = iuwm.upscale(upscale_model, image=pixels)[0]
        (upscaled_width, upscaled_height) = (int(org_width * upscale_by // 8 * 8), int(org_height * upscale_by // 8 * 8))
        img = image_scaler.upscale(img, 'nearest-exact', upscaled_width, upscaled_height, 'center')[0]
        if hires_denoise == 0:
            return (vaeencoder.encode(vae, img)[0],)
        latent = vaeencoder.encode(vae, img)[0]
        start_step = int(hires_steps - hires_steps * hires_denoise)
        out = common_ksampler(base_model, seed, hires_steps, cfg_2, sampler_name, scheduler, positive_cond_base, negative_cond_base, latent, start_step=start_step, force_full_denoise=True)
        return out
```