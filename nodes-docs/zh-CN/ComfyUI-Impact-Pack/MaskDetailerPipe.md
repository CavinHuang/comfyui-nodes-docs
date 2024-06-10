# Documentation
- Class name: MaskDetailerPipe
- Category: ImpactPack/Detailer
- Output node: False
- Repo Ref: https://github.com/ltdrdata/ComfyUI-Impact-Pack.git

MaskDetailerPipe节点旨在根据提供的掩码处理和增强图像细节。它利用先进的模型和算法细化和增强图像中的掩蔽区域，专注于提高指定区域的视觉质量和细节。

# Input types
## Required
- image
    - 输入图像，由节点进行处理。它作为所有增强和细化操作的基础。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- mask
    - 定义图像内感兴趣区域的掩码。它用于引导增强过程，专注于图像的特定部分。
    - Comfy dtype: MASK
    - Python dtype: torch.Tensor
- basic_pipe
    - 一组预训练模型和配置，用于图像的初始处理和分析。
    - Comfy dtype: BASIC_PIPE
    - Python dtype: Tuple[torch.nn.Module, torch.nn.Module, Any, Any, Any]
## Optional
- guide_size
    - 引导尺寸参数影响细节增强的比例。它决定了节点在处理期间将关注的细节层次。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- enhanced_img_batch
    - 由处理生成的一批增强图像。它包括根据输入掩码和参数指定的细化细节。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- cropped_enhanced_list
    - 一系列裁剪和增强的图像段。每个段对应于输入掩码定义的区域，并已处理以增强细节。
    - Comfy dtype: COMBO[IMAGE]
    - Python dtype: List[torch.Tensor]

# Usage tips
- Infra type: GPU

# Source code
```
class MaskDetailerPipe:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'image': ('IMAGE',), 'mask': ('MASK',), 'basic_pipe': ('BASIC_PIPE',), 'guide_size': ('FLOAT', {'default': 384, 'min': 64, 'max': nodes.MAX_RESOLUTION, 'step': 8}), 'guide_size_for': ('BOOLEAN', {'default': True, 'label_on': 'mask bbox', 'label_off': 'crop region'}), 'max_size': ('FLOAT', {'default': 1024, 'min': 64, 'max': nodes.MAX_RESOLUTION, 'step': 8}), 'mask_mode': ('BOOLEAN', {'default': True, 'label_on': 'masked only', 'label_off': 'whole'}), 'seed': ('INT', {'default': 0, 'min': 0, 'max': 18446744073709551615}), 'steps': ('INT', {'default': 20, 'min': 1, 'max': 10000}), 'cfg': ('FLOAT', {'default': 8.0, 'min': 0.0, 'max': 100.0}), 'sampler_name': (comfy.samplers.KSampler.SAMPLERS,), 'scheduler': (comfy.samplers.KSampler.SCHEDULERS,), 'denoise': ('FLOAT', {'default': 0.5, 'min': 0.0001, 'max': 1.0, 'step': 0.01}), 'feather': ('INT', {'default': 5, 'min': 0, 'max': 100, 'step': 1}), 'crop_factor': ('FLOAT', {'default': 3.0, 'min': 1.0, 'max': 10, 'step': 0.1}), 'drop_size': ('INT', {'min': 1, 'max': MAX_RESOLUTION, 'step': 1, 'default': 10}), 'refiner_ratio': ('FLOAT', {'default': 0.2, 'min': 0.0, 'max': 1.0}), 'batch_size': ('INT', {'default': 1, 'min': 1, 'max': 100}), 'cycle': ('INT', {'default': 1, 'min': 1, 'max': 10, 'step': 1})}, 'optional': {'refiner_basic_pipe_opt': ('BASIC_PIPE',), 'detailer_hook': ('DETAILER_HOOK',), 'inpaint_model': ('BOOLEAN', {'default': False, 'label_on': 'enabled', 'label_off': 'disabled'}), 'noise_mask_feather': ('INT', {'default': 20, 'min': 0, 'max': 100, 'step': 1})}}
    RETURN_TYPES = ('IMAGE', 'IMAGE', 'IMAGE', 'BASIC_PIPE', 'BASIC_PIPE')
    RETURN_NAMES = ('image', 'cropped_refined', 'cropped_enhanced_alpha', 'basic_pipe', 'refiner_basic_pipe_opt')
    OUTPUT_IS_LIST = (False, True, True, False, False)
    FUNCTION = 'doit'
    CATEGORY = 'ImpactPack/Detailer'

    def doit(self, image, mask, basic_pipe, guide_size, guide_size_for, max_size, mask_mode, seed, steps, cfg, sampler_name, scheduler, denoise, feather, crop_factor, drop_size, refiner_ratio, batch_size, cycle=1, refiner_basic_pipe_opt=None, detailer_hook=None, inpaint_model=False, noise_mask_feather=0):
        if len(image) > 1:
            raise Exception('[Impact Pack] ERROR: MaskDetailer does not allow image batches.\nPlease refer to https://github.com/ltdrdata/ComfyUI-extension-tutorials/blob/Main/ComfyUI-Impact-Pack/tutorial/batching-detailer.md for more information.')
        (model, clip, vae, positive, negative) = basic_pipe
        if refiner_basic_pipe_opt is None:
            (refiner_model, refiner_clip, refiner_positive, refiner_negative) = (None, None, None, None)
        else:
            (refiner_model, refiner_clip, _, refiner_positive, refiner_negative) = refiner_basic_pipe_opt
        if mask is not None:
            mask = make_2d_mask(mask)
            segs = core.mask_to_segs(mask, False, crop_factor, False, drop_size)
        else:
            segs = ((image.shape[1], image.shape[2]), [])
        enhanced_img_batch = None
        cropped_enhanced_list = []
        cropped_enhanced_alpha_list = []
        for i in range(batch_size):
            if mask is not None:
                (enhanced_img, _, cropped_enhanced, cropped_enhanced_alpha, _, _) = DetailerForEach.do_detail(image, segs, model, clip, vae, guide_size, guide_size_for, max_size, seed + i, steps, cfg, sampler_name, scheduler, positive, negative, denoise, feather, mask_mode, force_inpaint=True, wildcard_opt=None, detailer_hook=detailer_hook, refiner_ratio=refiner_ratio, refiner_model=refiner_model, refiner_clip=refiner_clip, refiner_positive=refiner_positive, refiner_negative=refiner_negative, cycle=cycle, inpaint_model=inpaint_model, noise_mask_feather=noise_mask_feather)
            else:
                (enhanced_img, cropped_enhanced, cropped_enhanced_alpha) = (image, [], [])
            if enhanced_img_batch is None:
                enhanced_img_batch = enhanced_img
            else:
                enhanced_img_batch = torch.cat((enhanced_img_batch, enhanced_img), dim=0)
            cropped_enhanced_list += cropped_enhanced
            cropped_enhanced_alpha_list += cropped_enhanced_alpha
        if len(cropped_enhanced_list) == 0:
            cropped_enhanced_list = [empty_pil_tensor()]
        if len(cropped_enhanced_alpha_list) == 0:
            cropped_enhanced_alpha_list = [empty_pil_tensor()]
        return (enhanced_img_batch, cropped_enhanced_list, cropped_enhanced_alpha_list, basic_pipe, refiner_basic_pipe_opt)
```