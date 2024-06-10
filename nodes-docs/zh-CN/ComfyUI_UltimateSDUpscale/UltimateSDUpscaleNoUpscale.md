# Documentation
- Class name: UltimateSDUpscaleNoUpscale
- Category: image/upscaling
- Output node: False
- Repo Ref: https://github.com/ssitu/ComfyUI_UltimateSDUpscale

该节点类旨在通过使用复杂的图像放大算法来提高图像质量，该算法利用了稳定扩散处理的强大功能。它的目的是在保持图像原始内容和细节的同时提高视觉保真度。节点的主要功能是对图像进行放大，为用户提供清晰且视觉上吸引人的高分辨率输出。

# Input types
## Required
- upscaled_image
    - 已放大的图像参数至关重要，因为它是节点放大过程的基础。这是已经被放大的图像，将由节点进一步优化，以提高其质量和分辨率。
    - Comfy dtype: IMAGE
    - Python dtype: PIL.Image
- model
    - 模型参数对节点至关重要，它决定了用于放大过程的底层AI模型。它确保利用AI模型的能力来实现期望的放大结果。
    - Comfy dtype: MODEL
    - Python dtype: torch.nn.Module
- positive
    - 正面参数在指导放大过程中起着重要作用，通过提供正面的条件数据。这些数据帮助AI模型理解期望的结果，并改善最终输出。
    - Comfy dtype: CONDITIONING
    - Python dtype: str
- negative
    - 负面参数至关重要，因为它提供了负面的条件数据，帮助AI模型在放大过程中避免不希望的结果。它有助于提高图像质量。
    - Comfy dtype: CONDITIONING
    - Python dtype: str
- vae
    - vae参数很重要，因为它代表了在放大过程中使用的变分自编码器。它通过编码和解码视觉信息来帮助生成更高质量的图像。
    - Comfy dtype: VAE
    - Python dtype: torch.nn.Module
- seed
    - 种子参数对节点至关重要，因为它初始化随机数生成器，确保结果在不同运行中是可复现和一致的。
    - Comfy dtype: INT
    - Python dtype: int
- steps
    - 步骤参数定义了AI模型在放大过程中将执行的迭代次数。它直接影响计算时间和最终输出的质量。
    - Comfy dtype: INT
    - Python dtype: int
- cfg
    - cfg参数是一个浮点值，它在放大过程中影响AI模型的配置。它有助于微调模型的行为，以获得最佳结果。
    - Comfy dtype: FLOAT
    - Python dtype: float
- sampler_name
    - sampler_name参数对于在放大过程中选择适当的采样方法至关重要。它影响AI模型生成放大图像的方式，有助于整体质量和外观。
    - Comfy dtype: ENUM
    - Python dtype: Enum
- scheduler
    - 调度器参数对于在放大过程中管理AI模型的学习率至关重要。它有助于控制训练动态，并实现更好的放大结果。
    - Comfy dtype: ENUM
    - Python dtype: Enum
- denoise
    - 去噪参数是一个浮点值，它控制放大过程中应用的降噪水平。对于提高放大图像的清晰度和锐度很重要。
    - Comfy dtype: FLOAT
    - Python dtype: float
- tile_width
    - tile_width参数指定用于平铺放大图像的瓦片的宽度。它影响放大过程的粒度，可以影响最终图像的质量。
    - Comfy dtype: INT
    - Python dtype: int
- tile_height
    - tile_height参数定义了用于平铺放大图像的瓦片的高度。它与tile_width一起工作，以确定平铺策略及其对图像质量的影响。
    - Comfy dtype: INT
    - Python dtype: int
- mask_blur
    - mask_blur参数控制放大过程中应用于图像遮罩的模糊程度。对于平滑边缘和提高放大图像的视觉一致性很重要。
    - Comfy dtype: INT
    - Python dtype: int
- tile_padding
    - tile_padding参数指定应用于每个瓦片边缘的填充量。它对于确保最终放大图像中瓦片之间的接缝不可见至关重要。
    - Comfy dtype: INT
    - Python dtype: int
- seam_fix_mode
    - seam_fix_mode参数确定用于修复放大图像中接缝的方法。它对于通过最小化瓦片边界的可见性，确保最终输出的无缝和视觉愉悦至关重要。
    - Comfy dtype: ENUM
    - Python dtype: Enum
- seam_fix_denoise
    - seam_fix_denoise参数调整应用于放大图像接缝的降噪水平。它有助于减少伪影，并在最终输出中实现更平滑、更自然的外观。
    - Comfy dtype: FLOAT
    - Python dtype: float
- seam_fix_width
    - seam_fix_width参数设置将要处理的接缝周围区域的宽度。它影响接缝修复过程的有效性，并有助于提高放大图像的整体视觉质量。
    - Comfy dtype: INT
    - Python dtype: int
- seam_fix_mask_blur
    - seam_fix_mask_blur参数控制应用于接缝修复的遮罩的模糊程度。对于实现瓦片之间的平滑过渡和增强放大图像的视觉连续性很重要。
    - Comfy dtype: INT
    - Python dtype: int
- seam_fix_padding
    - seam_fix_padding参数指定在接缝修复过程中应用于图像边缘的填充量。它对于确保放大图像的边缘清晰且无伪影至关重要。
    - Comfy dtype: INT
    - Python dtype: int
- force_uniform_tiles
    - force_uniform_tiles参数确保在放大过程中所有瓦片的大小相同。这有助于最终放大图像的一致和统一的外观。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool
- tiled_decode
    - tiled_decode参数指示是否应该以瓦片方式解码放大的图像。这可以在放大过程中提高处理效率并管理内存使用。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool

# Output types
- IMAGE
    - 输出图像是放大过程的结果，展示了提高的分辨率和质量。它代表节点的主要输出，为用户提供了输入图像的视觉改进版本。
    - Comfy dtype: IMAGE
    - Python dtype: PIL.Image

# Usage tips
- Infra type: GPU

# Source code
```
class UltimateSDUpscaleNoUpscale:

    @classmethod
    def INPUT_TYPES(s):
        required = USDU_base_inputs()
        remove_input(required, 'upscale_model')
        remove_input(required, 'upscale_by')
        rename_input(required, 'image', 'upscaled_image')
        return prepare_inputs(required)
    RETURN_TYPES = ('IMAGE',)
    FUNCTION = 'upscale'
    CATEGORY = 'image/upscaling'

    def upscale(self, upscaled_image, model, positive, negative, vae, seed, steps, cfg, sampler_name, scheduler, denoise, mode_type, tile_width, tile_height, mask_blur, tile_padding, seam_fix_mode, seam_fix_denoise, seam_fix_mask_blur, seam_fix_width, seam_fix_padding, force_uniform_tiles, tiled_decode):
        shared.sd_upscalers[0] = UpscalerData()
        shared.actual_upscaler = None
        shared.batch = [tensor_to_pil(upscaled_image, i) for i in range(len(upscaled_image))]
        sdprocessing = StableDiffusionProcessing(tensor_to_pil(upscaled_image), model, positive, negative, vae, seed, steps, cfg, sampler_name, scheduler, denoise, 1, force_uniform_tiles, tiled_decode)
        script = usdu.Script()
        processed = script.run(p=sdprocessing, _=None, tile_width=tile_width, tile_height=tile_height, mask_blur=mask_blur, padding=tile_padding, seams_fix_width=seam_fix_width, seams_fix_denoise=seam_fix_denoise, seams_fix_padding=seam_fix_padding, upscaler_index=0, save_upscaled_image=False, redraw_mode=MODES[mode_type], save_seams_fix_image=False, seams_fix_mask_blur=seam_fix_mask_blur, seams_fix_type=SEAM_FIX_MODES[seam_fix_mode], target_size_type=2, custom_width=None, custom_height=None, custom_scale=1)
        images = [pil_to_tensor(img) for img in shared.batch]
        tensor = torch.cat(images, dim=0)
        return (tensor,)
```