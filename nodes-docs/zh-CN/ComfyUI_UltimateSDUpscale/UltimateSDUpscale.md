# Documentation
- Class name: UltimateSDUpscale
- Category: image/upscaling
- Output node: False
- Repo Ref: https://github.com/ssitu/ComfyUI_UltimateSDUpscale

UltimateSDUpscale节点旨在使用先进技术提升图像的分辨率。它利用稳定扩散模型的强大功能来放大图像，为用户提供高质量、细节丰富的结果。该节点的主要目标是在保持原始图像本质的同时提高视觉真实性，使其适用于从照片增强到艺术转换的各种应用。

# Input types
## Required
- image
    - 图像参数至关重要，因为它是放大处理的基础。它决定了将要增强的内容和结构，其质量直接影响最终输出。
    - Comfy dtype: IMAGE
    - Python dtype: PIL.Image or torch.Tensor
- model
    - 模型参数对节点的运行至关重要，因为它定义了用于放大过程的AI模型。模型的选择显著影响放大结果的风格和质量。
    - Comfy dtype: MODEL
    - Python dtype: str
- positive
    - 正向调节在放大过程中为AI模型提供所需强调的特征指导，确保最终图像符合用户的期望。
    - Comfy dtype: CONDITIONING
    - Python dtype: str
- negative
    - 负向调节帮助AI模型避免在放大图像中出现不需要的特征或伪影，提高整体质量并确保更准确地呈现期望的结果。
    - Comfy dtype: CONDITIONING
    - Python dtype: str
- vae
    - VAE参数对放大过程至关重要，因为它使得图像的编码和解码成为可能，既保持原始图像的本质，又提高了其分辨率。
    - Comfy dtype: VAE
    - Python dtype: str
- upscale_by
    - upscale_by参数决定了图像的放大倍数，直接影响输出的尺寸和细节水平。
    - Comfy dtype: FLOAT
    - Python dtype: float
- seed
    - seed参数在放大过程中生成可复现的结果很重要，确保多次运行的一致性。
    - Comfy dtype: INT
    - Python dtype: int
- steps
    - steps参数影响AI模型在放大过程中执行的迭代次数，这可能会影响最终图像的质量和细节。
    - Comfy dtype: INT
    - Python dtype: int
- cfg
    - cfg参数调整AI模型的配置设置，影响放大图像的整体风格和一致性。
    - Comfy dtype: FLOAT
    - Python dtype: float
- sampler_name
    - sampler_name参数决定了AI模型使用的采样方法，这可能会改变放大图像的风格特征和质量。
    - Comfy dtype: ENUM
    - Python dtype: comfy.samplers.KSampler.SAMPLERS
- scheduler
    - scheduler参数影响AI模型的学习率调度，影响收敛性和最终输出质量。
    - Comfy dtype: ENUM
    - Python dtype: comfy.samplers.KSampler.SCHEDULERS
- denoise
    - denoise参数用于控制在放大过程中应用的降噪水平，提高最终图像的清晰度和锐度。
    - Comfy dtype: FLOAT
    - Python dtype: float
- upscale_model
    - upscale_model参数指定要使用的放大模型，这对实现期望的分辨率和质量提升至关重要。
    - Comfy dtype: UPSCALE_MODEL
    - Python dtype: str
- mode_type
    - mode_type参数决定了放大的处理模式，这可能会影响最终图像的视觉特征和整体外观。
    - Comfy dtype: ENUM
    - Python dtype: list
- tile_width
    - tile_width参数设置了处理时使用的瓦片宽度，这可能会影响放大过程的效率和质量。
    - Comfy dtype: INT
    - Python dtype: int
- tile_height
    - tile_height参数定义了瓦片的高度，影响图像如何被分割处理，进而影响放大的结果。
    - Comfy dtype: INT
    - Python dtype: int
- mask_blur
    - mask_blur参数调整应用于图像遮罩的模糊程度，这可以改善放大区域与原始图像的无缝融合。
    - Comfy dtype: INT
    - Python dtype: int
- tile_padding
    - tile_padding参数指定了每个瓦片周围的填充，这对于在放大过程中保持图像结构的完整性非常重要。
    - Comfy dtype: INT
    - Python dtype: int
- seam_fix_mode
    - seam_fix_mode参数决定了用于修复瓦片之间接缝的方法，这可以提高放大图像的视觉连续性和整体质量。
    - Comfy dtype: ENUM
    - Python dtype: list
- seam_fix_denoise
    - seam_fix_denoise参数控制应用于接缝的降噪水平，有助于减少伪影并提高最终图像的平滑度。
    - Comfy dtype: FLOAT
    - Python dtype: float
- seam_fix_width
    - seam_fix_width参数设置了接缝周围用于降噪和平滑的区域宽度，影响最终图像的无缝外观。
    - Comfy dtype: INT
    - Python dtype: int
- seam_fix_mask_blur
    - seam_fix_mask_blur参数调整应用于接缝周围遮罩的模糊程度，这有助于实现放大瓦片之间更自然的过渡。
    - Comfy dtype: INT
    - Python dtype: int
- seam_fix_padding
    - seam_fix_padding参数定义了接缝周围的填充，这对于确保放大部分平滑且一致地集成到最终图像中至关重要。
    - Comfy dtype: INT
    - Python dtype: int
- force_uniform_tiles
    - force_uniform_tiles参数确保所有瓦片具有相同的大小，这可以简化处理并提高放大图像的均匀性。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool
- tiled_decode
    - tiled_decode参数指示图像是否应该按瓦片解码，这对于大型图像的放大过程可以提高效率和质量。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool

# Output types
- IMAGE
    - 输出图像是放大过程的结果，展示了更高的分辨率和增强的细节，同时保留了原始图像的本质。
    - Comfy dtype: IMAGE
    - Python dtype: PIL.Image or torch.Tensor

# Usage tips
- Infra type: GPU

# Source code
```
class UltimateSDUpscale:

    @classmethod
    def INPUT_TYPES(s):
        return prepare_inputs(USDU_base_inputs())
    RETURN_TYPES = ('IMAGE',)
    FUNCTION = 'upscale'
    CATEGORY = 'image/upscaling'

    def upscale(self, image, model, positive, negative, vae, upscale_by, seed, steps, cfg, sampler_name, scheduler, denoise, upscale_model, mode_type, tile_width, tile_height, mask_blur, tile_padding, seam_fix_mode, seam_fix_denoise, seam_fix_mask_blur, seam_fix_width, seam_fix_padding, force_uniform_tiles, tiled_decode):
        shared.sd_upscalers[0] = UpscalerData()
        shared.actual_upscaler = upscale_model
        shared.batch = [tensor_to_pil(image, i) for i in range(len(image))]
        sdprocessing = StableDiffusionProcessing(tensor_to_pil(image), model, positive, negative, vae, seed, steps, cfg, sampler_name, scheduler, denoise, upscale_by, force_uniform_tiles, tiled_decode)
        script = usdu.Script()
        processed = script.run(p=sdprocessing, _=None, tile_width=tile_width, tile_height=tile_height, mask_blur=mask_blur, padding=tile_padding, seams_fix_width=seam_fix_width, seams_fix_denoise=seam_fix_denoise, seams_fix_padding=seam_fix_padding, upscaler_index=0, save_upscaled_image=False, redraw_mode=MODES[mode_type], save_seams_fix_image=False, seams_fix_mask_blur=seam_fix_mask_blur, seams_fix_type=SEAM_FIX_MODES[seam_fix_mode], target_size_type=2, custom_width=None, custom_height=None, custom_scale=upscale_by)
        images = [pil_to_tensor(img) for img in shared.batch]
        tensor = torch.cat(images, dim=0)
        return (tensor,)
```