# Documentation
- Class name: MikeySamplerBaseOnly
- Category: Mikey/Sampling
- Output node: False
- Repo Ref: https://github.com/bash-j/mikey_nodes

MikeySamplerBaseOnly节点旨在对基础模型执行高级采样操作，利用各种条件和VAE模型生成潜在表示。它能够根据图像复杂性调整采样过程，并将结果进行上采样以提高分辨率和细节。

# Input types
## Required
- base_model
    - 基础模型参数对节点的操作至关重要，因为它定义了用于采样的基础模型。它直接影响生成的潜在表示的质量和特性。
    - Comfy dtype: MODEL
    - Python dtype: torch.nn.Module
- samples
    - 样本参数决定了节点要生成的潜在表示的数量。它的值对输出的多样性和数量有显著影响。
    - Comfy dtype: LATENT
    - Python dtype: int
- positive_cond_base
    - 正向条件是输入的一个关键部分，它为采样过程提供指导，确保生成的样本符合某些期望的属性。
    - Comfy dtype: CONDITIONING
    - Python dtype: torch.Tensor
- negative_cond_base
    - 负向条件通过指定生成样本中要避免的不希望的特性，来约束采样过程。
    - Comfy dtype: CONDITIONING
    - Python dtype: torch.Tensor
- vae
    - VAE参数对节点的功能至关重要，因为它使得潜在表示的编码和解码成为可能，这是采样过程中的关键步骤。
    - Comfy dtype: VAE
    - Python dtype: torch.nn.Module
- model_name
    - 模型名称参数指定用于提高生成样本分辨率的上采样模型。它在最终输出质量中起着关键作用。
    - Comfy dtype: folder_paths.get_filename_list('upscale_models')
    - Python dtype: str
## Optional
- seed
    - 种子参数用于初始化随机数生成器，确保采样过程的可重复性。
    - Comfy dtype: INT
    - Python dtype: int
- upscale_by
    - upscale_by参数决定了生成样本的缩放因子。它是控制输出分辨率的关键因素。
    - Comfy dtype: FLOAT
    - Python dtype: float
- hires_strength
    - hires_strength参数调整高分辨率细节增强的强度，影响上采样输出的清晰度和锐度。
    - Comfy dtype: FLOAT
    - Python dtype: float
- smooth_step
    - smooth_step参数控制采样过程不同阶段之间的过渡平滑度，影响生成样本的整体一致性。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- latent_representation
    - 输出的潜在表示是节点操作的关键结果，以压缩形式封装了生成的样本，可以进一步处理或分析。
    - Comfy dtype: LATENT
    - Python dtype: torch.Tensor

# Usage tips
- Infra type: GPU

# Source code
```
class MikeySamplerBaseOnly:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'base_model': ('MODEL',), 'samples': ('LATENT',), 'positive_cond_base': ('CONDITIONING',), 'negative_cond_base': ('CONDITIONING',), 'vae': ('VAE',), 'model_name': (folder_paths.get_filename_list('upscale_models'),), 'seed': ('INT', {'default': 0, 'min': 0, 'max': 18446744073709551615}), 'upscale_by': ('FLOAT', {'default': 1.0, 'min': 0.0, 'max': 10.0, 'step': 0.1}), 'hires_strength': ('FLOAT', {'default': 1.0, 'min': 0.0, 'max': 2.0, 'step': 0.1}), 'smooth_step': ('INT', {'default': 0, 'min': -1, 'max': 100})}}
    RETURN_TYPES = ('LATENT',)
    FUNCTION = 'run'
    CATEGORY = 'Mikey/Sampling'

    def adjust_start_step(self, image_complexity, hires_strength=1.0):
        image_complexity /= 24
        if image_complexity > 1:
            image_complexity = 1
        image_complexity = min([0.55, image_complexity]) * hires_strength
        return min([31, 31 - int(round(image_complexity * 31, 0))])

    def run(self, seed, base_model, vae, samples, positive_cond_base, negative_cond_base, model_name, upscale_by=1.0, hires_strength=1.0, upscale_method='normal', smooth_step=0):
        image_scaler = ImageScale()
        vaeencoder = VAEEncode()
        vaedecoder = VAEDecode()
        uml = UpscaleModelLoader()
        upscale_model = uml.load_model(model_name)[0]
        iuwm = ImageUpscaleWithModel()
        sample1 = common_ksampler(base_model, seed, 30, 5, 'dpmpp_3m_sde_gpu', 'exponential', positive_cond_base, negative_cond_base, samples, start_step=0, last_step=14, force_full_denoise=False)[0]
        sample2 = common_ksampler(base_model, seed + 1, 31 + smooth_step, 9.5, 'dpmpp_3m_sde_gpu', 'exponential', positive_cond_base, negative_cond_base, sample1, disable_noise=True, start_step=15, force_full_denoise=True)
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
        out = common_ksampler(base_model, seed, 31, 9.5, 'dpmpp_3m_sde_gpu', 'exponential', positive_cond_base, negative_cond_base, latent, start_step=start_step, force_full_denoise=True)
        return out
```