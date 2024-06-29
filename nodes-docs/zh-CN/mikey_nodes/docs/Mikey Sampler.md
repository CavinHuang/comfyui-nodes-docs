# Documentation
- Class name: MikeySampler
- Category: Mikey/Sampling
- Output node: False
- Repo Ref: https://github.com/bash-j/mikey_nodes

MikeySampler节点旨在从给定的基础模型和细化模型生成高质量的样本，同时利用VAE进行潜在空间操作。它执行复杂的采样技术，并结合条件输入来优化输出。该节点还根据指定的方法和强度对生成的图像进行放大，确保最终输出满足所需的分辨率和质量标准。

# Input types
## Required
- seed
    - 种子参数对于采样过程的可重复性至关重要，确保在不同运行中生成的样本是一致的。它在采样算法的随机性控制中起着重要作用。
    - Comfy dtype: INT
    - Python dtype: int
- base_model
    - 基础模型是用于潜在空间初始采样的基础神经网络。它是一个关键组件，决定了生成样本的质量和多样性。
    - Comfy dtype: MODEL
    - Python dtype: torch.nn.Module
- refiner_model
    - 细化模型用于进一步提高基础模型生成的样本质量。它细化潜在空间表示，以实现最终输出的更高保真度。
    - Comfy dtype: MODEL
    - Python dtype: torch.nn.Module
- samples
    - 样本参数表示要从基础模型中采样的潜在向量的数量。它直接影响生成输出的多样性。
    - Comfy dtype: LATENT
    - Python dtype: torch.Tensor
## Optional
- upscale_by
    - upscale_by参数确定生成图像的缩放因子。它是控制最终输出分辨率的重要因素。
    - Comfy dtype: FLOAT
    - Python dtype: float
- hires_strength
    - hires_strength参数调整高分辨率放大过程的强度。它影响放大图像的清晰度和细节水平。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- latent
    - latent参数表示采样过程中得到的编码潜在向量。它很重要，因为它作为模型和最终放大图像之间的中间表示。
    - Comfy dtype: LATENT
    - Python dtype: torch.Tensor

# Usage tips
- Infra type: GPU

# Source code
```
class MikeySampler:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'base_model': ('MODEL',), 'refiner_model': ('MODEL',), 'samples': ('LATENT',), 'vae': ('VAE',), 'positive_cond_base': ('CONDITIONING',), 'negative_cond_base': ('CONDITIONING',), 'positive_cond_refiner': ('CONDITIONING',), 'negative_cond_refiner': ('CONDITIONING',), 'model_name': (folder_paths.get_filename_list('upscale_models'),), 'seed': ('INT', {'default': 0, 'min': 0, 'max': 18446744073709551615}), 'upscale_by': ('FLOAT', {'default': 1.0, 'min': 0.0, 'max': 10.0, 'step': 0.1}), 'hires_strength': ('FLOAT', {'default': 1.0, 'min': 0.0, 'max': 2.0, 'step': 0.1})}}
    RETURN_TYPES = ('LATENT',)
    FUNCTION = 'run'
    CATEGORY = 'Mikey/Sampling'

    def adjust_start_step(self, image_complexity, hires_strength=1.0):
        image_complexity /= 24
        if image_complexity > 1:
            image_complexity = 1
        image_complexity = min([0.55, image_complexity]) * hires_strength
        return min([16, 16 - int(round(image_complexity * 16, 0))])

    def run(self, seed, base_model, refiner_model, vae, samples, positive_cond_base, negative_cond_base, positive_cond_refiner, negative_cond_refiner, model_name, upscale_by=1.0, hires_strength=1.0, upscale_method='normal'):
        image_scaler = ImageScale()
        vaeencoder = VAEEncode()
        vaedecoder = VAEDecode()
        uml = UpscaleModelLoader()
        upscale_model = uml.load_model(model_name)[0]
        iuwm = ImageUpscaleWithModel()
        sample1 = common_ksampler(base_model, seed, 25, 6.5, 'dpmpp_2s_ancestral', 'simple', positive_cond_base, negative_cond_base, samples, start_step=0, last_step=18, force_full_denoise=False)[0]
        sample2 = common_ksampler(refiner_model, seed, 30, 3.5, 'dpmpp_2m', 'simple', positive_cond_refiner, negative_cond_refiner, sample1, disable_noise=True, start_step=21, force_full_denoise=True)
        if upscale_by == 0:
            return sample2
        else:
            sample2 = sample2[0]
        pixels = vaedecoder.decode(vae, sample2)[0]
        (org_width, org_height) = (pixels.shape[2], pixels.shape[1])
        img = iuwm.upscale(upscale_model, image=pixels)[0]
        (upscaled_width, upscaled_height) = (int(org_width * upscale_by // 8 * 8), int(org_height * upscale_by // 8 * 8))
        img = image_scaler.upscale(img, 'nearest-exact', upscaled_width, upscaled_height, 'center')[0]
        if hires_strength == 0:
            return (vaeencoder.encode(vae, img)[0],)
        image_complexity = calculate_image_complexity(img)
        start_step = self.adjust_start_step(image_complexity, hires_strength)
        latent = vaeencoder.encode(vae, img)[0]
        out = common_ksampler(base_model, seed, 16, 9.5, 'dpmpp_2m_sde', 'karras', positive_cond_base, negative_cond_base, latent, start_step=start_step, force_full_denoise=True)
        return out
```