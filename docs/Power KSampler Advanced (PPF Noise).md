# Documentation
- Class name: PPFNKSamplerAdvanced
- Category: Power Noise Suite/Sampling
- Output node: False
- Repo Ref: https://github.com/WASasquatch/PowerNoiseSuite

PPFNKSamplerAdvanced类封装了一种复杂的功率律噪声模型采样方法，提供了对生成过程的增强控制，并能够混合多种噪声类型。它旨在与现有的采样框架集成，为获取符合特定功率律分布的高质量噪声模式提供了一种多功能解决方案。

# Input types
## Required
- model
    - 模型参数至关重要，因为它定义了采样器将操作的底层功率律噪声模型。它决定了噪声分布的类型以及生成的噪声模式的整体特征。
    - Comfy dtype: MODEL
    - Python dtype: torch.nn.Module
- seed
    - 种子参数对于噪声生成过程的可重复性至关重要。它初始化随机数生成器，确保每次使用相同的种子运行采样器时产生相同的噪声模式。
    - Comfy dtype: INT
    - Python dtype: int
- steps
    - 步骤参数决定了采样过程将经历的迭代次数。它直接影响生成的噪声模式的质量和细节，通常更多的步骤会导致更精细的噪声。
    - Comfy dtype: INT
    - Python dtype: int
- cfg
    - cfg参数作为一个配置值，调整采样器的行为。它可以影响噪声生成的各个方面，如细节水平或模式的平滑度。
    - Comfy dtype: FLOAT
    - Python dtype: float
- sampler_name
    - sampler_name参数指定了采样过程中要使用的采样器类型。不同的采样器在速度、质量或与特定噪声模型的兼容性方面可能提供不同的优势。
    - Comfy dtype: COMBO
    - Python dtype: str
- positive
    - positive参数用于为采样器提供条件数据。它可以用于指导噪声生成过程，确保生成的模式符合某些期望的特征。
    - Comfy dtype: CONDITIONING
    - Python dtype: torch.Tensor
- negative
    - negative参数与positive参数类似，向采样器提供额外的条件数据。它可以帮助进一步细化噪声生成，通过排除不需要的特征或模式。
    - Comfy dtype: CONDITIONING
    - Python dtype: torch.Tensor

# Output types
- latents
    - latents输出包含在潜在空间表示中生成的噪声模式。这些可以用作进一步处理或转换到其他域的输入。
    - Comfy dtype: LATENT
    - Python dtype: torch.Tensor

# Usage tips
- Infra type: GPU

# Source code
```
class PPFNKSamplerAdvanced:

    @classmethod
    def INPUT_TYPES(s):
        noise_types = PowerLawNoise.get_noise_types()
        noise_types.append('vanilla_comfy')
        samplers = ['dpmpp_sde', 'dpmpp_sde_gpu', 'dpmpp_2m_sde', 'dpmpp_2m_sde_gpu', 'dpmpp_3m_sde', 'dpmpp_3m_sde_gpu', 'euler_ancestral', 'dpm_2_ancestral', 'dpmpp_2s_ancestral', 'dpm_fast', 'dpm_adaptive']
        return {'required': {'model': ('MODEL',), 'seed': ('INT', {'default': 0, 'min': 0, 'max': 18446744073709551615}), 'steps': ('INT', {'default': 20, 'min': 1, 'max': 10000}), 'cfg': ('FLOAT', {'default': 8.0, 'min': 0.0, 'max': 100.0}), 'sampler_name': (samplers,), 'scheduler': (comfy.samplers.KSampler.SCHEDULERS,), 'positive': ('CONDITIONING',), 'negative': ('CONDITIONING',), 'latent_image': ('LATENT',), 'start_at_step': ('INT', {'default': 0, 'min': 0, 'max': 10000}), 'end_at_step': ('INT', {'default': 10000, 'min': 0, 'max': 10000}), 'enable_denoise': (['false', 'true'],), 'denoise': ('FLOAT', {'default': 1.0, 'min': 0.0, 'max': 1.0, 'step': 0.01}), 'add_noise': (['enable', 'disable'],), 'return_with_leftover_noise': (['disable', 'enable'],)}, 'optional': {'noise_type': (noise_types,), 'noise_blending': (['bislerp', 'cosine interp', 'cuberp', 'hslerp', 'lerp', 'add', 'inject'],), 'noise_mode': (['additive', 'subtractive'],), 'scale': ('FLOAT', {'default': 1.0, 'max': sys.maxsize - 1, 'min': -(sys.maxsize - 1), 'step': 0.001}), 'alpha_exponent': ('FLOAT', {'default': 1.0, 'max': 12.0, 'min': -12.0, 'step': 0.001}), 'modulator': ('FLOAT', {'default': 1.0, 'max': 2.0, 'min': 0.1, 'step': 0.01}), 'sigma_tolerance': ('FLOAT', {'default': 0.5, 'max': 1.0, 'min': 0.0, 'step': 0.001}), 'boost_leading_sigma': (['false', 'true'],), 'tonal_guide_latent': ('LATENT',), 'ppf_settings': ('PPF_SETTINGS',), 'ch_settings': ('CH_SETTINGS',), 'guide_use_noise': (['true', 'false'],)}}
    RETURN_TYPES = ('LATENT',)
    FUNCTION = 'sample'
    CATEGORY = 'Power Noise Suite/Sampling'

    def sample(self, model, add_noise, seed, steps, cfg, sampler_name, scheduler, positive, negative, latent_image, start_at_step, end_at_step, enable_denoise, denoise, return_with_leftover_noise, noise_type='grey', noise_blending='bislerp', noise_mode='additive', scale=1.0, alpha_exponent=1.0, modulator=1.0, sigma_tolerance=1.0, boost_leading_sigma='false', ppf_settings=None, ch_settings=None, tonal_guide_latent=None, guide_use_noise='true'):

        def pns_noise_sampler(x):
            seed_base = seed
            noise_idx = [0]
            height = int(x.shape[2] * 8)
            width = int(x.shape[3] * 8)
            method = noise_type if noise_type in PowerLawNoise.get_noise_types() else PowerLawNoise.get_noise_types()[0]
            alpha_exp = alpha_exponent if not math.isnan(alpha_exponent) else 1.0
            range_scale = scale if not math.isnan(scale) else 1.0
            modu = modulator if not math.isnan(modulator) else 1.0
            sigma_tol = sigma_tolerance if not math.isnan(sigma_tolerance) else 0.5
            ppfs = ppf_settings
            chs = ch_settings
            total_steps = steps
            blending_mode = noise_blending
            blend_type = noise_mode
            boost_sigma = boost_leading_sigma == 'true'
            guide = tonal_guide_latent['samples'] if isinstance(tonal_guide_latent, dict) else None
            guide_noise = guide_use_noise == 'true'

            def pns_return_noise(seed, x, sigma, sigma_tol, boost_sigma, total_steps, method, alpha_exp, range_scale, modu, blending_modes, blending_mode, ppfs, chs, guide, guide_noise):
                seed = seed_base + noise_idx[0]
                rand_noise = torch.randn_like(x)
                if sigma_tol == 0.0:
                    return rand_noise
                sigma_min = 0
                sigma_max = 14.614643096923828
                if isinstance(sigma, torch.Tensor) and sigma.numel() == 1:
                    sigma = sigma.item()
                elif isinstance(sigma, float):
                    sigma = sigma
                else:
                    sigma = 0
                scaled_sigma = (sigma - sigma_min) / (sigma_max - sigma_min) * sigma_tol
                if boost_sigma and noise_idx[0] < total_steps // 4:
                    scaled_sigma = scaled_sigma * 1.25 if scaled_sigma * 1.25 <= 1.0 else 1.0
                if not ppfs and (not chs):
                    power_law = PowerLawNoise(device=rand_noise.device)
                    noise = power_law(1, width, height, noise_type=method, alpha=alpha_exp, scale=range_scale, modulator=modu, seed=seed).to(x.device)
                elif ppfs:
                    power_fractal = PPFNoiseNode()
                    noise = power_fractal.power_fractal_latent(1, width, height, 'nearest', ppfs['X'], ppfs['Y'], ppfs['Z'], ppfs['evolution'], ppfs['frame'], ppfs['scale'], ppfs['octaves'], ppfs['persistence'], ppfs['lacunarity'], ppfs['exponent'], ppfs['brightness'], ppfs['contrast'], 0.0, 1.0, seed, device='cuda' if torch.cuda.is_available() else 'cpu', optional_vae=None)[0]['samples'].to(device=rand_noise.device)
                elif chs:
                    ch_fractal = PPFNCrossHatchNode()
                    noise = ch_fractal.cross_hatch(1, width, height, 'nearest', chs['frequency'], chs['octaves'], chs['persistence'], chs['color_tolerance'], chs['num_colors'], chs['angle_degrees'], chs['brightness'], chs['contrast'], chs['blur'], 0.0, 1.0, seed, device='cuda' if torch.cuda.is_available() else 'cpu', optional_vae=None)[0]['samples'].to(device=rand_noise.device)
                noise = noise.permute(0, 3, 1, 2)
                noise = F.interpolate(noise, size=(x.shape[2], x.shape[3]), mode='nearest')
                noise = noise[:, :rand_noise.shape[1], :, :]
                if not ppfs and (not chs):
                    alpha = torch.ones((1, x.shape[2], x.shape[3], 1), dtype=x.dtype, device=x.device).permute(0, 3, 1, 2)
                    noise = torch.cat((noise, alpha), dim=1)
                if not isinstance(guide, torch.Tensor):
                    if blend_type == 'additive':
                        blended_noise = rand_noise + 0.25 * (blending_modes[blending_mode](rand_noise.to(device=rand_noise.device), noise.to(device=rand_noise.device), scaled_sigma) - rand_noise)
                    else:
                        blended_noise = rand_noise - 0.25 * (blending_modes[blending_mode](rand_noise.to(device=rand_noise.device), noise.to(device=rand_noise.device), scaled_sigma) - rand_noise)
                else:
                    guide = guide.to(x.device)
                    if guide.shape[2] != x.shape[2] or guide.shape[3] != x.shape[3]:
                        guide = F.interpolate(guide, size=(x.shape[2], x.shape[3]), mode='nearest')
                    if guide_noise:
                        noise_blend_ratio = max(scaled_sigma, 1.0) / 2
                        latent_blend_ratio = max(scaled_sigma * 1.5, 1.0)
                        x = blending_modes['inject'](guide.to(x.device), x, latent_blend_ratio)
                        noise = blending_modes['inject'](guide.to(x.device), noise, noise_blend_ratio)
                    else:
                        latent_blend_ratio = max(scaled_sigma * 1.5, 1.0)
                        x = blending_modes['colorize'](guide.to(x.device), x, latent_blend_ratio)
                        noise = guide
                    blended_noise = blending_modes['colorize'](blending_modes[blending_mode](rand_noise, noise, scaled_sigma / 32), guide, scaled_sigma / 128)
                noise_idx[0] += 1
                return blended_noise
            return lambda sigma, sigma_next, **kwargs: pns_return_noise(seed_base + noise_idx[0], x, sigma, sigma_tol, boost_sigma, total_steps, method, alpha_exp, range_scale, modu, blending_modes, blending_mode, ppfs, chs, guide, guide_noise)

        class PNSNoiseSampler:
            seed_base = seed
            noise_idx = [0]
            method = noise_type if noise_type in PowerLawNoise.get_noise_types() else PowerLawNoise.get_noise_types()[0]
            alpha_exp = alpha_exponent if not math.isnan(alpha_exponent) else 1.0
            range_scale = scale if not math.isnan(scale) else 1.0
            modu = modulator if not math.isnan(modulator) else 1.0
            sigma_tol = sigma_tolerance if not math.isnan(sigma_tolerance) else 0.5
            ppfs = ppf_settings
            chs = ch_settings
            total_steps = steps
            blending_mode = noise_blending
            blend_type = noise_mode
            boost_sigma = boost_leading_sigma == 'true'
            guide = tonal_guide_latent['samples'] if isinstance(tonal_guide_latent, dict) else None
            guide_noise = guide_use_noise == 'true'

            def __init__(self, x, sigma_min, sigma_max, seed=None, transform=lambda x: x, cpu=False):
                self.noise_idx = [0]
                self.x = x
                self.height = int(x.shape[2] * 8)
                self.width = int(x.shape[3] * 8)
                self.sigma_min = sigma_min
                self.sigma_max = sigma_max
                self.transform = transform
                (t0, t1) = (self.transform(torch.as_tensor(sigma_min)), self.transform(torch.as_tensor(sigma_max)))
                self.tree = comfy.k_diffusion.sampling.BatchedBrownianTree(x, t0, t1, seed, cpu=cpu)

            def __call__(self, sigma, sigma_next):
                noise = self.sample_noise(self.x, sigma, sigma_next)
                return noise

            def sample_noise(self, x, sigma, sigma_next):
                (t0, t1) = (self.transform(torch.as_tensor(sigma)), self.transform(torch.as_tensor(sigma_next)))
                tree = self.tree(t0, t1) / (t1 - t0).abs().sqrt()
                seed = self.seed_base + self.noise_idx[0]
                rand_noise = torch.randn_like(x)
                if self.sigma_tol == 0.0:
                    return tree
                sigma_min = self.sigma_min
                sigma_max = self.sigma_max
                if isinstance(sigma_min, torch.Tensor) and sigma.numel() == 1:
                    sigma_min = sigma_min.item()
                if isinstance(sigma_max, torch.Tensor) and sigma.numel() == 1:
                    sigma_max = (sigma_max / 2).item()
                if isinstance(sigma, torch.Tensor) and sigma.numel() == 1:
                    sigma = sigma.item()
                elif isinstance(sigma, float):
                    sigma = sigma
                else:
                    sigma = 0
                scaled_sigma = (sigma - sigma_min) / (sigma_max - sigma_min) * self.sigma_tol / 2
                if self.boost_sigma and self.noise_idx[0] < self.total_steps // 4:
                    scaled_sigma = scaled_sigma * 1.25 if scaled_sigma * 1.25 <= 1.0 else 1.0
                ppfs = self.ppfs
                chs = self.chs
                if not ppfs and (not chs):
                    power_law = PowerLawNoise(device=tree.device)
                    noise = power_law(1, self.width, self.height, noise_type=self.method, alpha=self.alpha_exp, scale=self.range_scale, modulator=self.modu, seed=seed).to(device=tree.device)
                elif ppfs:
                    power_fractal = PPFNoiseNode()
                    noise = power_fractal.power_fractal_latent(1, self.width, self.height, 'nearest', ppfs['X'], ppfs['Y'], ppfs['Z'], ppfs['evolution'], ppfs['frame'], ppfs['scale'], ppfs['octaves'], ppfs['persistence'], ppfs['lacunarity'], ppfs['exponent'], ppfs['brightness'], ppfs['contrast'], 0.0, 1.0, seed, device='cuda' if torch.cuda.is_available() else 'cpu', optional_vae=None)[0]['samples'].to(device=tree.device)
                elif chs:
                    ch_fractal = PPFNCrossHatchNode()
                    noise = ch_fractal.cross_hatch(1, self.width, self.height, 'nearest', chs['frequency'], chs['octaves'], chs['persistence'], chs['color_tolerance'], chs['num_colors'], chs['angle_degrees'], chs['brightness'], chs['contrast'], chs['blur'], 0.0, 1.0, seed, device='cuda' if torch.cuda.is_available() else 'cpu', optional_vae=None)[0]['samples'].to(device=tree.device).to(device=tree.device)
                noise = noise_sigma_scale(noise, self.sigma_min, self.sigma_max)
                noise = noise.permute(0, 3, 1, 2)
                noise = F.interpolate(noise, size=(x.shape[2], x.shape[3]), mode='nearest')
                noise = noise[:, :tree.shape[1], :, :]
                if not ppfs and (not chs):
                    alpha = torch.ones((1, x.shape[2], x.shape[3], 1), dtype=x.dtype, device=x.device).permute(0, 3, 1, 2)
                    noise = torch.cat((noise, alpha), dim=1)
                if not isinstance(self.guide, torch.Tensor):
                    if self.blend_type == 'additive':
                        blended_noise = tree + 0.03 * (blending_modes[self.blending_mode](tree, sharpen_latents(noise.to(device=tree.device), 0.5), scaled_sigma) - tree)
                    else:
                        blended_noise = tree - 0.03 * (blending_modes[self.blending_mode](tree, sharpen_latents(noise.to(device=tree.device), 0.5), scaled_sigma) - tree)
                else:
                    guide = self.guide.to(x.device)
                    if self.guide.shape[2] != x.shape[2] or self.guide.shape[3] != x.shape[3]:
                        guide = F.interpolate(self.guide.to(x.device), size=(x.shape[2], x.shape[3]), mode='nearest')
                    if self.guide_noise:
                        noise_blend_ratio = max(scaled_sigma, 1.0) / 2
                        noise = blending_modes['inject'](guide, noise, noise_blend_ratio)
                    else:
                        latent_blend_ratio = max(scaled_sigma * 1.5, 1.0)
                        x = blending_modes['colorize'](guide, x, latent_blend_ratio)
                        noise = guide
                    blended_noise = blending_modes['colorize'](blending_modes[self.blending_mode](tree, noise, scaled_sigma / 64), guide, scaled_sigma / 128)
                self.noise_idx[0] += 1
                return blended_noise
        dns = None
        btns = None
        if enable_denoise == 'true':
            start_at_step = None
            end_at_step = None
        else:
            denoise = 1.0
        force_full_denoise = True
        if return_with_leftover_noise == 'enable':
            force_full_denoise = False
        disable_noise = False
        if add_noise == 'disable':
            disable_noise = True
        elif noise_type != 'vanilla_comfy':
            print('Running with 🦚 PNS Noise Samplers')
            dns = comfy.k_diffusion.sampling.default_noise_sampler
            btns = comfy.k_diffusion.sampling.BrownianTreeNoiseSampler
            comfy.k_diffusion.sampling.default_noise_sampler = pns_noise_sampler
            comfy.k_diffusion.sampling.BrownianTreeNoiseSampler = PNSNoiseSampler
        try:
            result = nodes.common_ksampler(model, seed, steps, cfg, sampler_name, scheduler, positive, negative, latent_image, denoise=denoise, disable_noise=disable_noise, start_step=start_at_step, last_step=end_at_step, force_full_denoise=force_full_denoise)
        except comfy.model_management.InterruptProcessingException as e:
            if noise_type != 'vanilla_comfy':
                if dns and btns:
                    print('Restoring ComfyUI Noise Samplers.')
                    comfy.k_diffusion.sampling.default_noise_sampler = dns
                    comfy.k_diffusion.sampling.BrownianTreeNoiseSampler = btns
            raise e
        if noise_type != 'vanilla_comfy' and (not disable_noise):
            print('\nRestoring ComfyUI Noise Samplers')
            if dns:
                comfy.k_diffusion.sampling.default_noise_sampler = dns
            if btns:
                comfy.k_diffusion.sampling.BrownianTreeNoiseSampler = btns
        return result
```