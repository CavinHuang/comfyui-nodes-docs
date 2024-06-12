# Documentation
- Class name: SeargeSDXLImage2ImageSampler
- Category: Searge/_deprecated_/Sampling
- Output node: False
- Repo Ref: https://github.com/jobunk/SeargeSDXL.git

SeargeSDXLImage2ImageSampler节点旨在通过一个复杂的采样增强过程来提升图像质量，该过程利用多个模型和参数来精细化输出结果。它通过结合各种条件因素和细化步骤，旨在改善生成图像的质量和美观度。

# Input types
## Required
- base_model
    - 基础模型对于图像采样过程至关重要，它构成了图像生成的基础。它是用于生成初始图像数据的主要模型，这些数据将进一步被细化和调节。
    - Comfy dtype: MODEL
    - Python dtype: torch.nn.Module
- base_positive
    - 该参数作为正向调节输入，影响生成图像的风格和内容。它在引导采样过程朝着期望的美学和主题结果方面至关重要。
    - Comfy dtype: CONDITIONING
    - Python dtype: str
- base_negative
    - 负向调节输入用于排除生成图像中的某些元素或特征，确保最终输出符合预期的规范。
    - Comfy dtype: CONDITIONING
    - Python dtype: str
- refiner_model
    - 细化模型在后处理阶段扮演着关键角色，它用于微调图像，以达到更高的保真度和更好的符合期望的美学品质。
    - Comfy dtype: MODEL
    - Python dtype: torch.nn.Module
- refiner_positive
    - 该输入为细化过程提供正向指导，确保增强后的图像保留期望的属性，并对基础模型的输出进行改进。
    - Comfy dtype: CONDITIONING
    - Python dtype: str
- refiner_negative
    - 细化模型的负向调节有助于避免最终图像中不希望出现的特征，有助于实现更受控和精确的图像增强。
    - Comfy dtype: CONDITIONING
    - Python dtype: str
- image
    - 图像参数是节点将要处理和精炼的目标。它是整个采样操作的核心元素。
    - Comfy dtype: IMAGE
    - Python dtype: PIL.Image
- vae
    - VAE（变分自编码器）用于编码和解码图像数据，使节点能够操纵图像的潜在空间并生成高质量的视觉效果。
    - Comfy dtype: VAE
    - Python dtype: torch.nn.Module
- noise_seed
    - 噪声种子在采样过程中引入变化方面起着重要作用，确保输出结果的多样性，防止结果重复或可预测。
    - Comfy dtype: INT
    - Python dtype: int
- steps
    - 步骤数量决定了采样过程的复杂性和持续时间，直接影响最终图像的细节和精细程度。
    - Comfy dtype: INT
    - Python dtype: int
- cfg
    - 配置参数或'cfg'是一个浮点值，用于调整采样配置，影响节点的整体行为和性能。
    - Comfy dtype: FLOAT
    - Python dtype: float
- sampler_name
    - 采样器名称标识了要使用的特定采样方法，这对于确定生成图像的质量和特性至关重要。
    - Comfy dtype: SAMPLER_NAME
    - Python dtype: str
- scheduler
    - 调度器决定了采样过程的节奏和进度，确保细化阶段高效且有序地执行。
    - Comfy dtype: SCHEDULER_NAME
    - Python dtype: str
- base_ratio
    - 基础比例是一个浮点值，它影响分配给基础模型与细化模型的步骤比例，影响图像中粗略和精细细节的平衡。
    - Comfy dtype: FLOAT
    - Python dtype: float
- denoise
    - 去噪参数控制采样过程中应用的降噪水平，直接影响最终输出的清晰度和平滑度。
    - Comfy dtype: FLOAT
    - Python dtype: float
- softness
    - 软度调整了在合并放大和原始图像时的混合强度，有助于整体视觉和谐和细节的无缝整合。
    - Comfy dtype: FLOAT
    - Python dtype: float
## Optional
- upscale_model
    - 当提供放大模型时，它用于提高图像的分辨率，从而获得更高质量和更详细的结果。
    - Comfy dtype: UPSCALE_MODEL
    - Python dtype: torch.nn.Module
- scaled_width
    - 缩放宽度定义了放大图像的期望宽度，这对于设置细化图像输出的画布大小很重要。
    - Comfy dtype: INT
    - Python dtype: int
- scaled_height
    - 缩放高度对应于放大图像的期望高度，与缩放宽度一起工作，以确定输出图像的最终尺寸。
    - Comfy dtype: INT
    - Python dtype: int
- noise_offset
    - 噪声偏移量为噪声种子引入了一个可变的元素，为采样过程增加了额外的多样性，确保了独特的结果。
    - Comfy dtype: INT
    - Python dtype: int
- refiner_strength
    - 细化强度是一个浮点值，它调节细化过程的强度，允许控制最终图像中细节和清晰度的程度。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- output_image
    - 输出图像是采样过程的结果，代表了包含输入参数和条件的高质量、精细视觉，展示了节点的能力。
    - Comfy dtype: IMAGE
    - Python dtype: PIL.Image

# Usage tips
- Infra type: GPU

# Source code
```
class SeargeSDXLImage2ImageSampler:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'base_model': ('MODEL',), 'base_positive': ('CONDITIONING',), 'base_negative': ('CONDITIONING',), 'refiner_model': ('MODEL',), 'refiner_positive': ('CONDITIONING',), 'refiner_negative': ('CONDITIONING',), 'image': ('IMAGE',), 'vae': ('VAE',), 'noise_seed': ('INT', {'default': 0, 'min': 0, 'max': 18446744073709551600}), 'steps': ('INT', {'default': 20, 'min': 0, 'max': 200}), 'cfg': ('FLOAT', {'default': 7.0, 'min': 0.0, 'max': 30.0, 'step': 0.5}), 'sampler_name': ('SAMPLER_NAME', {'default': 'ddim'}), 'scheduler': ('SCHEDULER_NAME', {'default': 'ddim_uniform'}), 'base_ratio': ('FLOAT', {'default': 0.8, 'min': 0.0, 'max': 1.0, 'step': 0.01}), 'denoise': ('FLOAT', {'default': 0.25, 'min': 0.0, 'max': 1.0, 'step': 0.01})}, 'optional': {'upscale_model': ('UPSCALE_MODEL',), 'scaled_width': ('INT', {'default': 1536, 'min': 0, 'max': nodes.MAX_RESOLUTION, 'step': 8}), 'scaled_height': ('INT', {'default': 1536, 'min': 0, 'max': nodes.MAX_RESOLUTION, 'step': 8}), 'noise_offset': ('INT', {'default': 1, 'min': 0, 'max': 1}), 'refiner_strength': ('FLOAT', {'default': 1.0, 'min': 0.1, 'max': 1.0, 'step': 0.05}), 'softness': ('FLOAT', {'default': 0.0, 'min': 0.0, 'max': 1.0, 'step': 0.05})}}
    RETURN_TYPES = ('IMAGE',)
    FUNCTION = 'sample'
    CATEGORY = 'Searge/_deprecated_/Sampling'

    def sample(self, base_model, base_positive, base_negative, refiner_model, refiner_positive, refiner_negative, image, vae, noise_seed, steps, cfg, sampler_name, scheduler, base_ratio, denoise, softness, upscale_model=None, scaled_width=None, scaled_height=None, noise_offset=None, refiner_strength=None):
        base_steps = int(steps * (base_ratio + 0.0001))
        if noise_offset is None:
            noise_offset = 1
        if refiner_strength is None:
            refiner_strength = 1.0
        if refiner_strength < 0.01:
            refiner_strength = 0.01
        if steps < 1:
            return (image,)
        scaled_image = image
        use_upscale_model = upscale_model is not None and softness < 0.9999
        if use_upscale_model:
            upscale_result = comfy_extras.nodes_upscale_model.ImageUpscaleWithModel().upscale(upscale_model, image)
            scaled_image = upscale_result[0]
        if scaled_width is not None and scaled_height is not None:
            upscale_result = nodes.ImageScale().upscale(scaled_image, 'bicubic', scaled_width, scaled_height, 'center')
            scaled_image = upscale_result[0]
        if use_upscale_model and softness > 0.0001:
            upscale_result = nodes.ImageScale().upscale(image, 'bicubic', scaled_width, scaled_height, 'center')
            scaled_original = upscale_result[0]
            blend_result = comfy_extras.nodes_post_processing.Blend().blend_images(scaled_image, scaled_original, softness, 'normal')
            scaled_image = blend_result[0]
        if denoise < 0.01:
            return (scaled_image,)
        vae_encode_result = nodes.VAEEncode().encode(vae, scaled_image)
        input_latent = vae_encode_result[0]
        if base_steps >= steps:
            result_latent = nodes.common_ksampler(base_model, noise_seed, steps, cfg, sampler_name, scheduler, base_positive, base_negative, input_latent, denoise=denoise, disable_noise=False, start_step=0, last_step=steps, force_full_denoise=True)
        else:
            base_result = nodes.common_ksampler(base_model, noise_seed, steps, cfg, sampler_name, scheduler, base_positive, base_negative, input_latent, denoise=denoise, disable_noise=False, start_step=0, last_step=base_steps, force_full_denoise=True)
            result_latent = nodes.common_ksampler(refiner_model, noise_seed + noise_offset, steps, cfg, sampler_name, scheduler, refiner_positive, refiner_negative, base_result[0], denoise=denoise * refiner_strength, disable_noise=False, start_step=base_steps, last_step=steps, force_full_denoise=True)
        vae_decode_result = nodes.VAEDecode().decode(vae, result_latent[0])
        output_image = vae_decode_result[0]
        return (output_image,)
```