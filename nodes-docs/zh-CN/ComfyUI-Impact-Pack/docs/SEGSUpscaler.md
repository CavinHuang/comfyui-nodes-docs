# Documentation
- Class name: SEGSUpscaler
- Category: ImpactPack/Upscale
- Output node: False
- Repo Ref: https://github.com/ltdrdata/ComfyUI-Impact-Pack.git

SEGSUpscaler节点旨在通过利用分割数据和上采样模型来增强图像的分辨率。它在保持分割区域的完整性的同时对图像进行上采样，确保在缩放过程中保留并增强这些区域内的细节。该节点特别适用于高分辨率分割至关重要的应用，例如医学成像或卫星图像分析。

# Input types
## Required
- image
    - 要上采样的输入图像是SEGSUpscaler节点的基本参数。它作为节点操作的基础数据，用于产生更高分辨率的输出。输入图像的质量和内容直接影响最终上采样的结果。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- segs
    - 分割数据或'segs'对于SEGSUpscaler节点至关重要，因为它提供了区分和处理图像内不同区域所需的信息。这些数据确保上采样图像保留了分割细节，这对于依赖准确分割的应用至关重要。
    - Comfy dtype: SEGS
    - Python dtype: List[SEG]
## Optional
- rescale_factor
    - 重新缩放因子是一个重要的参数，它决定了要应用于输入图像的上采样程度。更高的值会导致分辨率的更大幅度增加，可以增强细节，但如果不小心管理，也可能引入伪影。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- enhanced_image
    - SEGSUpscaler节点的输出是已上采样到更高分辨率的增强图像。该图像保留了具有改进细节和清晰度的分割区域，使其适合于进一步分析或以高分辨率格式显示。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor

# Usage tips
- Infra type: GPU

# Source code
```
class SEGSUpscaler:

    @classmethod
    def INPUT_TYPES(s):
        resampling_methods = ['lanczos', 'nearest', 'bilinear', 'bicubic']
        return {'required': {'image': ('IMAGE',), 'segs': ('SEGS',), 'model': ('MODEL',), 'clip': ('CLIP',), 'vae': ('VAE',), 'rescale_factor': ('FLOAT', {'default': 2, 'min': 0.01, 'max': 100.0, 'step': 0.01}), 'resampling_method': (resampling_methods,), 'supersample': (['true', 'false'],), 'rounding_modulus': ('INT', {'default': 8, 'min': 8, 'max': 1024, 'step': 8}), 'seed': ('INT', {'default': 0, 'min': 0, 'max': 18446744073709551615}), 'steps': ('INT', {'default': 20, 'min': 1, 'max': 10000}), 'cfg': ('FLOAT', {'default': 8.0, 'min': 0.0, 'max': 100.0}), 'sampler_name': (comfy.samplers.KSampler.SAMPLERS,), 'scheduler': (comfy.samplers.KSampler.SCHEDULERS,), 'positive': ('CONDITIONING',), 'negative': ('CONDITIONING',), 'denoise': ('FLOAT', {'default': 0.5, 'min': 0.0001, 'max': 1.0, 'step': 0.01}), 'feather': ('INT', {'default': 5, 'min': 0, 'max': 100, 'step': 1}), 'inpaint_model': ('BOOLEAN', {'default': False, 'label_on': 'enabled', 'label_off': 'disabled'}), 'noise_mask_feather': ('INT', {'default': 20, 'min': 0, 'max': 100, 'step': 1})}, 'optional': {'upscale_model_opt': ('UPSCALE_MODEL',), 'upscaler_hook_opt': ('UPSCALER_HOOK',)}}
    RETURN_TYPES = ('IMAGE',)
    FUNCTION = 'doit'
    CATEGORY = 'ImpactPack/Upscale'

    @staticmethod
    def doit(image, segs, model, clip, vae, rescale_factor, resampling_method, supersample, rounding_modulus, seed, steps, cfg, sampler_name, scheduler, positive, negative, denoise, feather, inpaint_model, noise_mask_feather, upscale_model_opt=None, upscaler_hook_opt=None):
        new_image = segs_upscaler.upscaler(image, upscale_model_opt, rescale_factor, resampling_method, supersample, rounding_modulus)
        segs = core.segs_scale_match(segs, new_image.shape)
        ordered_segs = segs[1]
        for (i, seg) in enumerate(ordered_segs):
            cropped_image = crop_ndarray4(new_image.numpy(), seg.crop_region)
            cropped_image = to_tensor(cropped_image)
            mask = to_tensor(seg.cropped_mask)
            mask = tensor_gaussian_blur_mask(mask, feather)
            is_mask_all_zeros = (seg.cropped_mask == 0).all().item()
            if is_mask_all_zeros:
                print(f'SEGSUpscaler: segment skip [empty mask]')
                continue
            cropped_mask = seg.cropped_mask
            seg_seed = seed + i
            enhanced_image = segs_upscaler.img2img_segs(cropped_image, model, clip, vae, seg_seed, steps, cfg, sampler_name, scheduler, positive, negative, denoise, noise_mask=cropped_mask, control_net_wrapper=seg.control_net_wrapper, inpaint_model=inpaint_model, noise_mask_feather=noise_mask_feather)
            if not enhanced_image is None:
                new_image = new_image.cpu()
                enhanced_image = enhanced_image.cpu()
                left = seg.crop_region[0]
                top = seg.crop_region[1]
                tensor_paste(new_image, enhanced_image, (left, top), mask)
                if upscaler_hook_opt is not None:
                    upscaler_hook_opt.post_paste(new_image)
        enhanced_img = tensor_convert_rgb(new_image)
        return (enhanced_img,)
```