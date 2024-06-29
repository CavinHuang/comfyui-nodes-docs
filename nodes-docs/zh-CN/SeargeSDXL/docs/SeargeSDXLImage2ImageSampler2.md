# Documentation
- Class name: SeargeSDXLImage2ImageSampler2
- Category: Searge/_deprecated_/Sampling
- Output node: False
- Repo Ref: https://github.com/jobunk/SeargeSDXL.git

该节点促进了图像生成的高级采样过程，集成了多个模型和细化技术，以提高输出图像的质量和细节。它通过利用基础模型和细化模型的能力，以及条件输入，来产生高分辨率、风格一致的图像。

# Input types
## Required
- base_model
    - 基础模型对于建立采样过程所需的基础架构至关重要。它决定了生成图像的初始状态，并为后续的改进设定了基调。
    - Comfy dtype: MODEL
    - Python dtype: torch.nn.Module
- base_positive
    - 这个输入作为正向调节元素，影响图像生成的方向和质量。它为模型提供了关于期望美学和主题元素的重要指导。
    - Comfy dtype: CONDITIONING
    - Python dtype: Any
- base_negative
    - 负面调节入对于通过避免不需要的特征或风格来完善图像生成过程至关重要。它有助于细化输出，使其符合预期的创意愿景。
    - Comfy dtype: CONDITIONING
    - Python dtype: Any
- refiner_model
    - 细化模型在图像生成的最后阶段发挥关键作用，专注于增强细节和提升整体视觉质量。它确保输出符合更高的美学标准。
    - Comfy dtype: MODEL
    - Python dtype: torch.nn.Module
- refiner_positive
    - 这个输入在指导细化模型保留和强调图像的积极方面起着重要作用，确保最终输出符合预期的创意方向。
    - Comfy dtype: CONDITIONING
    - Python dtype: Any
- refiner_negative
    - 细化负面输入有助于识别和减轻图像中的任何不需要的元素，有助于形成一个更加精细和完美的最终产品。
    - Comfy dtype: CONDITIONING
    - Python dtype: Any
- image
    - 图像输入是采样过程的起点，提供了一个通过节点操作转换和增强的视觉上下文。对于生成一个连贯且内容丰富的输出至关重要。
    - Comfy dtype: IMAGE
    - Python dtype: PIL.Image
- vae
    - VAE组件对采样过程至关重要，它使得图像数据的编码和解码成为可能，以实现风格和美学的转变。它是节点能够产生多样化和细腻输出的关键。
    - Comfy dtype: VAE
    - Python dtype: torch.nn.Module
- noise_seed
    - 噪声种子是一个关键参数，它在采样过程中引入变异性，确保输出的多样性。它对于防止重复模式和促进创意多样性至关重要。
    - Comfy dtype: INT
    - Python dtype: int
- steps
    - 采样过程中的步骤数量决定了生成图像的复杂性和细节。它是实现计算效率和视觉质量之间平衡的关键因素。
    - Comfy dtype: INT
    - Python dtype: int
- cfg
    - 配置参数对于微调采样过程至关重要，允许在输出的细节水平和整体视觉风格上进行调整。
    - Comfy dtype: FLOAT
    - Python dtype: float
- sampler_name
    - 采样器名称是一个关键输入，它决定了节点使用的特定采样方法。它影响图像生成过程的效率和效果。
    - Comfy dtype: SAMPLER_NAME
    - Python dtype: str
- scheduler
    - 调度器决定了采样过程的节奏和进展，确保从初始状态到最终状态的平稳过渡。这对于获得一个连贯且看起来自然的输出至关重要。
    - Comfy dtype: SCHEDULER_NAME
    - Python dtype: str
- base_ratio
    - 基础比例参数在确定专用于初始采样阶段的步骤比例方面非常重要。它影响基础细节和细化阶段之间的平衡。
    - Comfy dtype: FLOAT
    - Python dtype: float
- denoise
    - 去噪参数对于控制生成图像中的噪声减少水平至关重要。它直接影响最终输出的清晰度和视觉吸引力。
    - Comfy dtype: FLOAT
    - Python dtype: float
- softness
    - 柔和参数影响放大和原始图像的混合，有助于最终输出中视觉元素的平滑度和自然过渡。
    - Comfy dtype: FLOAT
    - Python dtype: float
## Optional
- upscale_model
    - 放大模型用于提高图像的分辨率，为进一步的细化和增强提供更高质量的画布。
    - Comfy dtype: UPSCALE_MODEL
    - Python dtype: torch.nn.Module
- scaled_width
    - 图像放大的目标宽度，设定了精细图像的画布大小，并影响输出中的细节水平。
    - Comfy dtype: INT
    - Python dtype: int
- scaled_height
    - 图像放大的目标高度，与放大的宽度一起，决定了放大图像的最终尺寸。
    - Comfy dtype: INT
    - Python dtype: int
- noise_offset
    - 噪声偏移参数在采样过程中引入额外的变异性，进一步增强生成图像的样性。
    - Comfy dtype: INT
    - Python dtype: int
- refiner_strength
    - 细化强度参数调整细化过程的强度，影响最终图像的细节和清晰度程度。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- output_image
    - 输出图像是采样过程的最终成果，代表了输入图像的高分辨率、美学上经过细化的表现形式，通过节点的复杂操作得到增强。
    - Comfy dtype: IMAGE
    - Python dtype: PIL.Image

# Usage tips
- Infra type: GPU

# Source code
```
class SeargeSDXLImage2ImageSampler2:

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