# Documentation
- Class name: MikeySamplerTiled
- Category: Mikey/Sampling
- Output node: False
- Repo Ref: https://github.com/bash-j/mikey_nodes

MikeySamplerTiled节点旨在执行一个复杂的采样过程，包括生成和细化潜在样本，然后对图像进行放大和平铺。它利用各种模型和条件来产生高质量、放大的图像，这些图像既详细又连贯。

# Input types
## Required
- base_model
    - 基础模型对于初始采样过程至关重要，为生成的图像提供基础结构。其选择显著影响最终输出的风格和质量。
    - Comfy dtype: MODEL
    - Python dtype: torch.nn.Module
- refiner_model
    - 细化模型用于通过应用进一步的细化步骤来提高采样图像的质量。它在实现放大图像的更高细节和清晰度方面起着关键作用。
    - Comfy dtype: MODEL
    - Python dtype: torch.nn.Module
- samples
    - 样本表示用作图像生成过程输入的潜在空间向量。这些样本的多样性和质量直接影响生成图像的多样性和保真度。
    - Comfy dtype: LATENT
    - Python dtype: torch.Tensor
- vae
    - VAE（变分自编码器）对于将潜在样本解码到像素空间至关重要，将其转换为可以进一步处理和放大的有形图像。
    - Comfy dtype: VAE
    - Python dtype: torch.nn.Module
- positive_cond_base
    - 正向调节在采样期间为基模型提供指导，确保生成的图像与所需的特征和属性一致。
    - Comfy dtype: CONDITIONING
    - Python dtype: Dict[str, torch.Tensor]
- negative_cond_base
    - 负向调节用于抑制生成图像中的某些特征或属性，允许对最终图像的外观进行更严格的控制。
    - Comfy dtype: CONDITIONING
    - Python dtype: Dict[str, torch.Tensor]
- positive_cond_refiner
    - 细化模型的正向调节指导细化过程，专注于增强放大图像中的特定特征和细节。
    - Comfy dtype: CONDITIONING
    - Python dtype: Dict[str, torch.Tensor]
- negative_cond_refiner
    - 细化模型的负向调节有助于在细化过程中抑制不需要的元素，保持所需图像方面的完整性。
    - Comfy dtype: CONDITIONING
    - Python dtype: Dict[str, torch.Tensor]
- model_name
    - 模型名称用于识别用于图像放大过程的特定放大模型。它是确定缩放技术及生成图像质量的关键因素。
    - Comfy dtype: folder_paths.get_filename_list('upscale_models')
    - Python dtype: str
## Optional
- seed
    - 种子为采样过程提供了一定程度的可重复性，确保如果使用相同的种子值重复过程，可以得到相同的结果。
    - Comfy dtype: INT
    - Python dtype: int
- upscale_by
    - 放大因子决定了应用于原始图像的放大程度。它直接影响放大图像的分辨率和细节。
    - Comfy dtype: FLOAT
    - Python dtype: float
- tiler_denoise
    - 去噪级别是一个控制平铺过程中应用的降噪量参数。它影响平铺图像的清晰度和平滑度。
    - Comfy dtype: FLOAT
    - Python dtype: float
- tiler_model
    - 平铺模型指定用于平铺操作的模型。它可以是基础模型或细化模型，影响平铺图像的最终外观。
    - Comfy dtype: COMBO['base', 'refiner']
    - Python dtype: str

# Output types
- tiled_image
    - 平铺图像是节点的主要输出，代表输入图像的放大和平铺版本。它展示了节点产生详细和结构化最终图像的能力。
    - Comfy dtype: IMAGE
    - Python dtype: PIL.Image
- upscaled_image
    - 放大图像是额外的输出，提供了非平铺版本的放大图像。它对于比较和进一步处理非常有用。
    - Comfy dtype: IMAGE
    - Python dtype: PIL.Image

# Usage tips
- Infra type: GPU

# Source code
```
class MikeySamplerTiled:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'base_model': ('MODEL',), 'refiner_model': ('MODEL',), 'samples': ('LATENT',), 'vae': ('VAE',), 'positive_cond_base': ('CONDITIONING',), 'negative_cond_base': ('CONDITIONING',), 'positive_cond_refiner': ('CONDITIONING',), 'negative_cond_refiner': ('CONDITIONING',), 'model_name': (folder_paths.get_filename_list('upscale_models'),), 'seed': ('INT', {'default': 0, 'min': 0, 'max': 18446744073709551615}), 'upscale_by': ('FLOAT', {'default': 1.0, 'min': 0.1, 'max': 10.0, 'step': 0.1}), 'tiler_denoise': ('FLOAT', {'default': 0.25, 'min': 0.0, 'max': 1.0, 'step': 0.05}), 'tiler_model': (['base', 'refiner'], {'default': 'base'})}}
    RETURN_TYPES = ('IMAGE', 'IMAGE')
    RETURN_NAMES = ('tiled_image', 'upscaled_image')
    FUNCTION = 'run'
    CATEGORY = 'Mikey/Sampling'

    def phase_one(self, base_model, refiner_model, samples, positive_cond_base, negative_cond_base, positive_cond_refiner, negative_cond_refiner, upscale_by, model_name, seed, vae):
        image_scaler = ImageScale()
        vaedecoder = VAEDecode()
        uml = UpscaleModelLoader()
        upscale_model = uml.load_model(model_name)[0]
        iuwm = ImageUpscaleWithModel()
        sample1 = common_ksampler(base_model, seed, 30, 6.5, 'dpmpp_3m_sde_gpu', 'exponential', positive_cond_base, negative_cond_base, samples, start_step=0, last_step=14, force_full_denoise=False)[0]
        sample2 = common_ksampler(refiner_model, seed, 32, 3.5, 'dpmpp_3m_sde_gpu', 'exponential', positive_cond_refiner, negative_cond_refiner, sample1, disable_noise=True, start_step=15, force_full_denoise=True)[0]
        pixels = vaedecoder.decode(vae, sample2)[0]
        (org_width, org_height) = (pixels.shape[2], pixels.shape[1])
        img = iuwm.upscale(upscale_model, image=pixels)[0]
        (upscaled_width, upscaled_height) = (int(org_width * upscale_by // 8 * 8), int(org_height * upscale_by // 8 * 8))
        img = image_scaler.upscale(img, 'nearest-exact', upscaled_width, upscaled_height, 'center')[0]
        return (img, upscaled_width, upscaled_height)

    def run(self, seed, base_model, refiner_model, vae, samples, positive_cond_base, negative_cond_base, positive_cond_refiner, negative_cond_refiner, model_name, upscale_by=1.0, tiler_denoise=0.25, upscale_method='normal', tiler_model='base'):
        (img, upscaled_width, upscaled_height) = self.phase_one(base_model, refiner_model, samples, positive_cond_base, negative_cond_base, positive_cond_refiner, negative_cond_refiner, upscale_by, model_name, seed, vae)
        img = tensor2pil(img)
        if tiler_model == 'base':
            tiled_image = run_tiler(img, base_model, vae, seed, positive_cond_base, negative_cond_base, tiler_denoise)
        else:
            tiled_image = run_tiler(img, refiner_model, vae, seed, positive_cond_refiner, negative_cond_refiner, tiler_denoise)
        return (tiled_image, img)
```