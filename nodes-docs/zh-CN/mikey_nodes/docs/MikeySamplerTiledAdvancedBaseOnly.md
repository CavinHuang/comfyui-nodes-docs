# Documentation
- Class name: MikeySamplerTiledAdvancedBaseOnly
- Category: Mikey/Sampling
- Output node: False
- Repo Ref: https://github.com/bash-j/mikey_nodes

MikeySamplerTiledAdvancedBaseOnly节点旨在执行高级图像采样和上采样操作。它结合了基础模型、变分自编码器（VAE）和分块技术来增强图像质量和细节。该节点的主要目标是从潜在样本生成高分辨率图像，利用复杂的算法和去噪技术以获得卓越的结果。

# Input types
## Required
- base_model
    - 基础模型参数对节点的操作至关重要，因为它定义了用于采样的底层模型。它直接影响生成的样本的质量和特性，这对于实现所需的上采样和图像增强效果至关重要。
    - Comfy dtype: MODEL
    - Python dtype: torch.nn.Module
- samples
    - 样本输入是节点功能的关键要素，提供了将被转换为高分辨率图像的潜在表示。样本的质量直接影响最终输出，使其成为实现节点目标的关键参数。
    - Comfy dtype: LATENT
    - Python dtype: torch.Tensor
- vae
    - VAE（变分自编码器）参数在节点解码和编码潜在表示的过程中扮演着重要角色。它在将采样数据转换为适合上采样和进一步处理的格式方面起着关键作用。
    - Comfy dtype: VAE
    - Python dtype: torch.nn.Module
- positive_cond_base
    - positive_cond_base参数对于引导采样过程生成具有所需属性的图像至关重要。它作为正向调节因子，影响节点产生符合特定标准图像的能力。
    - Comfy dtype: CONDITIONING
    - Python dtype: torch.Tensor
- negative_cond_base
    - negative_cond_base参数是引导采样过程避免不良结果的关键因素。它通过提供负向调节来帮助优化图像生成过程，这对于确保节点的输出与预期结果一致至关重要。
    - Comfy dtype: CONDITIONING
    - Python dtype: torch.Tensor
- model_name
    - model_name参数在确定节点将使用哪个上采样模型进行图像增强方面至关重要。它决定了特定的模型配置和能力，这对于实现所需的上采样和图像质量改进至关重要。
    - Comfy dtype: folder_paths.get_filename_list('upscale_models')
    - Python dtype: str
- seed
    - seed参数对于确保采样过程的可重复性和一致性很重要。它初始化随机数生成器，这影响样本的生成，进而影响最终的图像输出。
    - Comfy dtype: INT
    - Python dtype: int
## Optional
- denoise_image
    - denoise_image参数允许在上采样过程中控制应用于图像的去噪水平。它是一个可选设置，可以根据需要调整以实现图像细节和降噪之间的平衡。
    - Comfy dtype: FLOAT
    - Python dtype: float
- steps
    - steps参数定义了采样过程中使用的迭代次数。它是一个可选输入，可以微调以控制生成图像的复杂性和细节。
    - Comfy dtype: INT
    - Python dtype: int
- cfg
    - cfg参数，简称配置，用于调整采样过程的设置。它是一个可选参数，可以修改以影响节点的行为和生成的图像特性。
    - Comfy dtype: FLOAT
    - Python dtype: float
- sampler_name
    - sampler_name参数指定节点要使用的采样方法。它是一个可选输入，允许选择不同的采样技术，这可以显著影响节点的性能和输出图像的质量。
    - Comfy dtype: comfy.samplers.KSampler.SAMPLERS
    - Python dtype: str
- scheduler
    - scheduler参数确定采样过程的调度策略。它是一个可选设置，可以定制以优化节点的效率和生成高质量的图像。
    - Comfy dtype: comfy.samplers.KSampler.SCHEDULERS
    - Python dtype: str
- upscale_by
    - upscale_by参数设置上采样过程的缩放因子。它是一个可选输入，允许用户控制应用于图像的上采样程度，这可以影响最终的分辨率和细节。
    - Comfy dtype: FLOAT
    - Python dtype: float
- tiler_denoise
    - tiler_denoise参数用于控制平铺过程中每个小方块的去噪水平。它是一个可选参数，可以通过调整来提高最终图像的视觉质量，通过减少单个小方块中的噪声。
    - Comfy dtype: FLOAT
    - Python dtype: float
- image_optional
    - image_optional参数允许可选地输入一个图像，该图像可以被编码成潜在空间以进行进一步处理。这使得节点能够使用现有的图像工作，提供了输入数据处理的灵活性。
    - Comfy dtype: IMAGE
    - Python dtype: PIL.Image.Image

# Output types
- output_image
    - output_image参数代表了节点生成的最终、上采样和增强的图像。它是节点处理的结果，反映了应用的采样、上采样和去噪技术的组合效果。
    - Comfy dtype: IMAGE
    - Python dtype: PIL.Image.Image

# Usage tips
- Infra type: GPU

# Source code
```
class MikeySamplerTiledAdvancedBaseOnly:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'base_model': ('MODEL',), 'samples': ('LATENT',), 'vae': ('VAE',), 'positive_cond_base': ('CONDITIONING',), 'negative_cond_base': ('CONDITIONING',), 'model_name': (folder_paths.get_filename_list('upscale_models'),), 'seed': ('INT', {'default': 0, 'min': 0, 'max': 18446744073709551615}), 'denoise_image': ('FLOAT', {'default': 1.0, 'min': 0.0, 'max': 1.0, 'step': 0.01}), 'steps': ('INT', {'default': 30, 'min': 1, 'max': 1000}), 'cfg': ('FLOAT', {'default': 6.5, 'min': 0.0, 'max': 1000.0, 'step': 0.1}), 'sampler_name': (comfy.samplers.KSampler.SAMPLERS,), 'scheduler': (comfy.samplers.KSampler.SCHEDULERS,), 'upscale_by': ('FLOAT', {'default': 1.0, 'min': 0.1, 'max': 10.0, 'step': 0.1}), 'tiler_denoise': ('FLOAT', {'default': 0.25, 'min': 0.0, 'max': 1.0, 'step': 0.05})}, 'optional': {'image_optional': ('IMAGE',)}}
    RETURN_TYPES = ('IMAGE',)
    RETURN_NAMES = ('output_image',)
    FUNCTION = 'run'
    CATEGORY = 'Mikey/Sampling'

    def phase_one(self, base_model, samples, positive_cond_base, negative_cond_base, upscale_by, model_name, seed, vae, denoise_image, steps, cfg, sampler_name, scheduler):
        image_scaler = ImageScale()
        vaedecoder = VAEDecode()
        uml = UpscaleModelLoader()
        upscale_model = uml.load_model(model_name)[0]
        iuwm = ImageUpscaleWithModel()
        start_step = int(steps - steps * denoise_image)
        sample1 = common_ksampler(base_model, seed, steps, cfg, sampler_name, scheduler, positive_cond_base, negative_cond_base, samples, start_step=start_step, last_step=steps, force_full_denoise=False)[0]
        pixels = vaedecoder.decode(vae, sample1)[0]
        (org_width, org_height) = (pixels.shape[2], pixels.shape[1])
        img = iuwm.upscale(upscale_model, image=pixels)[0]
        (upscaled_width, upscaled_height) = (int(org_width * upscale_by // 8 * 8), int(org_height * upscale_by // 8 * 8))
        img = image_scaler.upscale(img, 'nearest-exact', upscaled_width, upscaled_height, 'center')[0]
        return (img, upscaled_width, upscaled_height)

    def upscale_image(self, samples, vae, upscale_by, model_name):
        image_scaler = ImageScale()
        vaedecoder = VAEDecode()
        uml = UpscaleModelLoader()
        upscale_model = uml.load_model(model_name)[0]
        iuwm = ImageUpscaleWithModel()
        pixels = vaedecoder.decode(vae, samples)[0]
        (org_width, org_height) = (pixels.shape[2], pixels.shape[1])
        img = iuwm.upscale(upscale_model, image=pixels)[0]
        (upscaled_width, upscaled_height) = (int(org_width * upscale_by // 8 * 8), int(org_height * upscale_by // 8 * 8))
        img = image_scaler.upscale(img, 'nearest-exact', upscaled_width, upscaled_height, 'center')[0]
        return (img, upscaled_width, upscaled_height)

    def run(self, seed, base_model, vae, samples, positive_cond_base, negative_cond_base, model_name, upscale_by=2.0, tiler_denoise=0.4, upscale_method='normal', denoise_image=1.0, steps=30, cfg=6.5, sampler_name='dpmpp_sde_gpu', scheduler='karras', image_optional=None):
        if image_optional is not None:
            vaeencoder = VAEEncode()
            samples = vaeencoder.encode(vae, image_optional)[0]
        if denoise_image > 0:
            (img, upscaled_width, upscaled_height) = self.phase_one(base_model, samples, positive_cond_base, negative_cond_base, upscale_by, model_name, seed, vae, denoise_image, steps, cfg, sampler_name, scheduler)
            img = tensor2pil(img)
        else:
            img = self.upscale_image(samples, vae, upscale_by, model_name)
            img = tensor2pil(img)
        tiled_image = run_tiler_for_steps(img, base_model, vae, seed, cfg, sampler_name, scheduler, positive_cond_base, negative_cond_base, steps, tiler_denoise)
        return (tiled_image,)
```