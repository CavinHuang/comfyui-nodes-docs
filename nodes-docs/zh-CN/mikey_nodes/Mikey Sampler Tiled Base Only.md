# Documentation
- Class name: MikeySamplerTiledBaseOnly
- Category: Sampling
- Output node: False
- Repo Ref: https://github.com/bash-j/mikey_nodes

MikeySamplerTiledBaseOnly 节点旨在通过两阶段采样过程从基础模型生成高质量的图像。它利用了多种技术，如潜在空间采样、去噪和上采样，以产生细节丰富和精细的图像。该节点的功能集中在通过模型基础和算法方法的复杂组合来增强图像质量和分辨率。

# Input types
## Required
- base_model
    - base_model 参数对节点的操作至关重要，因为它定义了图像生成过程开始的基础模型。它是采样和上采样序列的起点，对最终输出的质量和特性有重大影响。
    - Comfy dtype: MODEL
    - Python dtype: torch.nn.Module
- samples
    - samples 参数对节点至关重要，因为它表示从潜在空间中采样图像的点。它在决定生成图像的多样性和随机性方面起着关键作用，影响采样过程的总体结果。
    - Comfy dtype: LATENT
    - Python dtype: torch.Tensor
- positive_cond_base
    - positive_cond_base 参数是一个条件输入，对采样过程产生积极影响。它有助于引导图像生成朝向期望的特性，增强节点产生目标输出的能力。
    - Comfy dtype: CONDITIONING
    - Python dtype: torch.Tensor
- negative_cond_base
    - negative_cond_base 参数作为一个条件输入，对采样过程产生负面影响。它有助于从生成的图像中排除不需要的特征，完善节点的输出以符合指定的要求。
    - Comfy dtype: CONDITIONING
    - Python dtype: torch.Tensor
- vae
    - vae 参数对节点至关重要，因为它表示用于将潜在表示解码成像素空间的变分自编码器。在将采样数据转换为视觉格式的过程中，它是一个关键组件。
    - Comfy dtype: VAE
    - Python dtype: torch.nn.Module
- model_name
    - model_name 参数指定用于图像上采样过程的上采样模型。它是选择模型架构及其相应能力的决定性因素，直接影响上采样质量。
    - Comfy dtype: folder_paths.get_filename_list('upscale_models')
    - Python dtype: str
## Optional
- seed
    - seed 参数用于初始化随机数生成器，确保采样过程的可重复性。当需要在多次执行中获得一致的结果时，这是一个重要方面。
    - Comfy dtype: INT
    - Python dtype: int
- upscale_by
    - upscale_by 参数确定原始图像尺寸要增加的倍数。它直接影响上采样图像的分辨率和细节，在最终输出的外观中起着重要作用。
    - Comfy dtype: FLOAT
    - Python dtype: float
- tiler_denoise
    - tiler_denoise 参数控制平铺过程中应用的去噪水平。它是一个重要的调整参数，可以通过减少噪声伪影来提高上采样图像的视觉质量。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- image
    - MikeySamplerTiledBaseOnly 节点的 image 输出代表最终上采样和精细处理后的图像。它是节点处理的结果，体现了节点旨在产生的高分辨率和详细视觉输出。
    - Comfy dtype: IMAGE
    - Python dtype: PIL.Image

# Usage tips
- Infra type: GPU

# Source code
```
class MikeySamplerTiledBaseOnly(MikeySamplerTiled):

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'base_model': ('MODEL',), 'samples': ('LATENT',), 'positive_cond_base': ('CONDITIONING',), 'negative_cond_base': ('CONDITIONING',), 'vae': ('VAE',), 'model_name': (folder_paths.get_filename_list('upscale_models'),), 'seed': ('INT', {'default': 0, 'min': 0, 'max': 18446744073709551615}), 'upscale_by': ('FLOAT', {'default': 1.0, 'min': 0.1, 'max': 10.0, 'step': 0.1}), 'tiler_denoise': ('FLOAT', {'default': 0.25, 'min': 0.0, 'max': 1.0, 'step': 0.05})}}
    RETURN_TYPES = ('IMAGE',)
    RETURN_NAMES = ('image',)

    def phase_one(self, base_model, samples, positive_cond_base, negative_cond_base, upscale_by, model_name, seed, vae):
        image_scaler = ImageScale()
        vaedecoder = VAEDecode()
        uml = UpscaleModelLoader()
        upscale_model = uml.load_model(model_name)[0]
        iuwm = ImageUpscaleWithModel()
        sample1 = common_ksampler(base_model, seed, 30, 5, 'dpmpp_3m_sde_gpu', 'exponential', positive_cond_base, negative_cond_base, samples, start_step=0, last_step=14, force_full_denoise=False)[0]
        sample2 = common_ksampler(base_model, seed + 1, 32, 9.5, 'dpmpp_3m_sde_gpu', 'exponential', positive_cond_base, negative_cond_base, sample1, disable_noise=True, start_step=15, force_full_denoise=True)[0]
        pixels = vaedecoder.decode(vae, sample2)[0]
        (org_width, org_height) = (pixels.shape[2], pixels.shape[1])
        img = iuwm.upscale(upscale_model, image=pixels)[0]
        (upscaled_width, upscaled_height) = (int(org_width * upscale_by // 8 * 8), int(org_height * upscale_by // 8 * 8))
        img = image_scaler.upscale(img, 'nearest-exact', upscaled_width, upscaled_height, 'center')[0]
        return (img, upscaled_width, upscaled_height)

    def adjust_start_step(self, image_complexity, hires_strength=1.0):
        image_complexity /= 24
        if image_complexity > 1:
            image_complexity = 1
        image_complexity = min([0.55, image_complexity]) * hires_strength
        return min([32, 32 - int(round(image_complexity * 32, 0))])

    def run(self, seed, base_model, vae, samples, positive_cond_base, negative_cond_base, model_name, upscale_by=1.0, tiler_denoise=0.25, upscale_method='normal'):
        (img, upscaled_width, upscaled_height) = self.phase_one(base_model, samples, positive_cond_base, negative_cond_base, upscale_by, model_name, seed, vae)
        img = tensor2pil(img)
        tiled_image = run_tiler(img, base_model, vae, seed, positive_cond_base, negative_cond_base, tiler_denoise)
        return (tiled_image,)
```