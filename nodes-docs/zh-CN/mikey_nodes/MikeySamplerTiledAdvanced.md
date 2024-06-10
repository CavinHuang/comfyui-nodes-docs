# Documentation
- Class name: MikeySamplerTiledAdvanced
- Category: Mikey/Sampling
- Output node: False
- Repo Ref: https://github.com/bash-j/mikey_nodes

MikeySamplerTiledAdvanced 节点是一个设计用于执行图像上采样的高级采样技术的复杂组件。它利用涉及基础和细化模型的两阶段过程，逐步提高采样图像的质量。该节点的主要功能是通过使用复杂的噪声建模和迭代细化策略，从潜在表示生成高分辨率图像。

# Input types
## Required
- base_model
    - 基础模型对于图像采样的初始阶段至关重要，为生成过程奠定基础。它对于节点能够以较低分辨率生成连贯且结构化的图像表示至关重要。
    - Comfy dtype: MODEL
    - Python dtype: torch.nn.Module
- refiner_model
    - 细化模型在采样过程的第二阶段中扮演着关键角色，它根据基础模型的输出细化图像细节。其效果直接影响最终图像质量。
    - Comfy dtype: MODEL
    - Python dtype: torch.nn.Module
- samples
    - 样本代表用作图像生成过程输入的潜在空间向量。它们对于节点创建多样化和独特的图像输出至关重要。
    - Comfy dtype: LATENT
    - Python dtype: torch.Tensor
- vae
    - VAE（变分自编码器）用于将潜在表示解码为像素空间。它是将采样数据转换为视觉格式的关键组件。
    - Comfy dtype: VAE
    - Python dtype: torch.nn.Module
- positive_cond_base
    - 正向条件在采样期间为基模型提供指导，确保生成的图像符合特定的特征或属性。
    - Comfy dtype: CONDITIONING
    - Python dtype: List[torch.Tensor]
- negative_cond_base
    - 负向条件用于限制基础模型的采样过程，防止在生成的图像中包含不希望的特征。
    - Comfy dtype: CONDITIONING
    - Python dtype: List[torch.Tensor]
- positive_cond_refiner
    - 细化模型的正向条件指导增强过程，专注于突出细化图像中所需的特征。
    - Comfy dtype: CONDITIONING
    - Python dtype: List[torch.Tensor]
- negative_cond_refiner
    - 细化模型的负向条件确保细化过程避免向最终图像引入不希望的元素。
    - Comfy dtype: CONDITIONING
    - Python dtype: List[torch.Tensor]
- model_name
    - 模型名称标识节点中要使用的特定上采样模型，这对于确定节点的上采样能力和性能至关重要。
    - Comfy dtype: folder_paths.get_filename_list('upscale_models')
    - Python dtype: str
- seed
    - 种子参数对于确保采样过程的可重复性至关重要，允许在不同运行中获得一致的结果。
    - Comfy dtype: INT
    - Python dtype: int
## Optional
- denoise_image
    - 去噪图像参数控制采样过程中应用的噪声减少级别，这可以显著影响最终图像的清晰度和细节。
    - Comfy dtype: FLOAT
    - Python dtype: float
- steps
    - 步数参数定义了采样过程中的迭代次数，这直接影响节点的计算复杂性和生成图像的质量。
    - Comfy dtype: INT
    - Python dtype: int
- smooth_step
    - 平滑步骤用于控制采样过程不同阶段之间的过渡，目的是在图像细节中产生更平滑、更自然的进展。
    - Comfy dtype: INT
    - Python dtype: int
- cfg
    - cfg 参数调整采样过程的配置，允许微调节点的行为以实现最佳结果。
    - Comfy dtype: FLOAT
    - Python dtype: float
- sampler_name
    - 采样器名称指定要使用的采样方法，这是决定节点生成图像样本方法的关键因素。
    - Comfy dtype: comfy.samplers.KSampler.SAMPLERS
    - Python dtype: str
- scheduler
    - 调度器确定采样过程的进展速率，这可以影响图像生成的效率和结果。
    - Comfy dtype: comfy.samplers.KSampler.SCHEDULERS
    - Python dtype: str
- upscale_by
    - “放大倍数”参数设置图像上采样过程的缩放因子，直接影响最终输出图像的分辨率。
    - Comfy dtype: FLOAT
    - Python dtype: float
- tiler_denoise
    - 平铺去噪参数调节平铺过程中应用于各个平铺块的去噪级别，这可以增强上采样图像的整体视觉一致性。
    - Comfy dtype: FLOAT
    - Python dtype: float
- tiler_model
    - 平铺模型决定平铺过程中使用哪个模型，允许选择基础模型或细化模型以在最终图像中实现不同级别的细节。
    - Comfy dtype: COMBO['base', 'refiner']
    - Python dtype: str
- use_complexity_score
    - 使用复杂度分数参数指示是否将复杂度分数纳入平铺过程，这有助于确定平铺处理的优先级顺序。
    - Comfy dtype: COMBO['true', 'false']
    - Python dtype: str
- image_optional
    - 可选图像参数允许包含一个额外的图像，它可以用来影响采样过程，并将新的视觉元素引入到生成的图像中。
    - Comfy dtype: IMAGE
    - Python dtype: PIL.Image

# Output types
- tiled_image
    - 平铺图像是节点的主要输出，代表输入图像的最终上采样和平铺版本。它展示了节点通过多阶段上采样过程增强图像细节的能力。
    - Comfy dtype: IMAGE
    - Python dtype: PIL.Image
- upscaled_image
    - 上采样图像是额外的输出，提供了平铺过程之前初始上采样阶段后图像的视图。它突出了节点在上采样过程中的中间结果。
    - Comfy dtype: IMAGE
    - Python dtype: PIL.Image

# Usage tips
- Infra type: GPU

# Source code
```
class MikeySamplerTiledAdvanced:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'base_model': ('MODEL',), 'refiner_model': ('MODEL',), 'samples': ('LATENT',), 'vae': ('VAE',), 'positive_cond_base': ('CONDITIONING',), 'negative_cond_base': ('CONDITIONING',), 'positive_cond_refiner': ('CONDITIONING',), 'negative_cond_refiner': ('CONDITIONING',), 'model_name': (folder_paths.get_filename_list('upscale_models'),), 'seed': ('INT', {'default': 0, 'min': 0, 'max': 18446744073709551615}), 'denoise_image': ('FLOAT', {'default': 1.0, 'min': 0.0, 'max': 1.0, 'step': 0.01}), 'steps': ('INT', {'default': 30, 'min': 1, 'max': 1000}), 'smooth_step': ('INT', {'default': 1, 'min': -1, 'max': 100}), 'cfg': ('FLOAT', {'default': 6.5, 'min': 0.0, 'max': 1000.0, 'step': 0.1}), 'sampler_name': (comfy.samplers.KSampler.SAMPLERS,), 'scheduler': (comfy.samplers.KSampler.SCHEDULERS,), 'upscale_by': ('FLOAT', {'default': 1.0, 'min': 0.1, 'max': 10.0, 'step': 0.1}), 'tiler_denoise': ('FLOAT', {'default': 0.25, 'min': 0.0, 'max': 1.0, 'step': 0.05}), 'tiler_model': (['base', 'refiner'], {'default': 'base'}), 'use_complexity_score': (['true', 'false'], {'default': 'true'})}, 'optional': {'image_optional': ('IMAGE',)}}
    RETURN_TYPES = ('IMAGE', 'IMAGE')
    RETURN_NAMES = ('tiled_image', 'upscaled_image')
    FUNCTION = 'run'
    CATEGORY = 'Mikey/Sampling'

    def phase_one(self, base_model, refiner_model, samples, positive_cond_base, negative_cond_base, positive_cond_refiner, negative_cond_refiner, upscale_by, model_name, seed, vae, denoise_image, steps, smooth_step, cfg, sampler_name, scheduler):
        image_scaler = ImageScale()
        vaedecoder = VAEDecode()
        uml = UpscaleModelLoader()
        upscale_model = uml.load_model(model_name)[0]
        iuwm = ImageUpscaleWithModel()
        start_step = int(steps - steps * denoise_image)
        if start_step > steps // 2:
            last_step = steps - 1
        elif start_step % 2 == 0:
            last_step = steps // 2 - 1
        else:
            last_step = steps // 2
        sample1 = common_ksampler(base_model, seed, steps, cfg, sampler_name, scheduler, positive_cond_base, negative_cond_base, samples, start_step=start_step, last_step=last_step, force_full_denoise=False)[0]
        start_step = last_step + 1
        total_steps = steps + smooth_step
        sample2 = common_ksampler(refiner_model, seed, total_steps, cfg, sampler_name, scheduler, positive_cond_refiner, negative_cond_refiner, sample1, disable_noise=True, start_step=start_step, force_full_denoise=True)[0]
        pixels = vaedecoder.decode(vae, sample2)[0]
        (org_width, org_height) = (pixels.shape[2], pixels.shape[1])
        img = iuwm.upscale(upscale_model, image=pixels)[0]
        (upscaled_width, upscaled_height) = (int(org_width * upscale_by // 8 * 8), int(org_height * upscale_by // 8 * 8))
        img = image_scaler.upscale(img, 'nearest-exact', upscaled_width, upscaled_height, 'center')[0]
        return (img, upscaled_width, upscaled_height)

    def run(self, seed, base_model, refiner_model, vae, samples, positive_cond_base, negative_cond_base, positive_cond_refiner, negative_cond_refiner, model_name, upscale_by=1.0, tiler_denoise=0.25, upscale_method='normal', tiler_model='base', denoise_image=0.25, steps=30, smooth_step=0, cfg=6.5, sampler_name='dpmpp_3m_sde_gpu', scheduler='exponential', use_complexity_score='true', image_optional=None):
        if image_optional is not None:
            vaeencoder = VAEEncode()
            samples = vaeencoder.encode(vae, image_optional)[0]
        (img, upscaled_width, upscaled_height) = self.phase_one(base_model, refiner_model, samples, positive_cond_base, negative_cond_base, positive_cond_refiner, negative_cond_refiner, upscale_by, model_name, seed, vae, denoise_image, steps, smooth_step, cfg, sampler_name, scheduler)
        img = tensor2pil(img)
        if tiler_model == 'base':
            tiled_image = run_tiler(img, base_model, vae, seed, positive_cond_base, negative_cond_base, tiler_denoise, use_complexity_score)
        else:
            tiled_image = run_tiler(img, refiner_model, vae, seed, positive_cond_refiner, negative_cond_refiner, tiler_denoise, use_complexity_score)
        return (tiled_image, img)
```