# Documentation
- Class name: SEGSDetailer
- Category: ImpactPack/Detailer
- Output node: False
- Repo Ref: https://github.com/ltdrdata/ComfyUI-Impact-Pack.git

SEGSDetailer节点旨在根据分割信息增强图像的细节。它通过缩放和处理图像的片段来提高其视觉质量，特别适用于需要精细细节的应用场景。该节点利用先进的深度学习模型实现这种增强，从而得到更精细和详细的输出图像。

# Input types
## Required
- image
    - 输入图像，将由SEGSDetailer节点处理。它作为细节增强过程的主要数据源，对于实现期望的结果至关重要。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- segs
    - 提供图像结构信息的分割数据。此输入对于节点了解图像的哪些部分需要专注于细节增强至关重要。
    - Comfy dtype: SEGS
    - Python dtype: List[SEG]
## Optional
- guide_size
    - 引导尺寸参数决定了细节增强过程的缩放因子。它影响图像片段在增强前被放大的程度，从而影响最终输出的细节水平。
    - Comfy dtype: FLOAT
    - Python dtype: float
- steps
    - 在细节增强过程中要执行的步骤数量。更多的步骤通常会导致更精细的输出，但也可能增加计算时间。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- segs
    - 基于输入图像和分割信息增强细节后的输出分割数据。
    - Comfy dtype: SEGS
    - Python dtype: List[SEG]
- cnet_images
    - 在细节增强过程中生成的控制网图像列表，可用于进一步分析或可视化。
    - Comfy dtype: IMAGE
    - Python dtype: List[torch.Tensor]

# Usage tips
- Infra type: GPU

# Source code
```
class SEGSDetailer:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'image': ('IMAGE',), 'segs': ('SEGS',), 'guide_size': ('FLOAT', {'default': 256, 'min': 64, 'max': MAX_RESOLUTION, 'step': 8}), 'guide_size_for': ('BOOLEAN', {'default': True, 'label_on': 'bbox', 'label_off': 'crop_region'}), 'max_size': ('FLOAT', {'default': 768, 'min': 64, 'max': MAX_RESOLUTION, 'step': 8}), 'seed': ('INT', {'default': 0, 'min': 0, 'max': 18446744073709551615}), 'steps': ('INT', {'default': 20, 'min': 1, 'max': 10000}), 'cfg': ('FLOAT', {'default': 8.0, 'min': 0.0, 'max': 100.0}), 'sampler_name': (comfy.samplers.KSampler.SAMPLERS,), 'scheduler': (comfy.samplers.KSampler.SCHEDULERS,), 'denoise': ('FLOAT', {'default': 0.5, 'min': 0.0001, 'max': 1.0, 'step': 0.01}), 'noise_mask': ('BOOLEAN', {'default': True, 'label_on': 'enabled', 'label_off': 'disabled'}), 'force_inpaint': ('BOOLEAN', {'default': False, 'label_on': 'enabled', 'label_off': 'disabled'}), 'basic_pipe': ('BASIC_PIPE',), 'refiner_ratio': ('FLOAT', {'default': 0.2, 'min': 0.0, 'max': 1.0}), 'batch_size': ('INT', {'default': 1, 'min': 1, 'max': 100}), 'cycle': ('INT', {'default': 1, 'min': 1, 'max': 10, 'step': 1})}, 'optional': {'refiner_basic_pipe_opt': ('BASIC_PIPE',), 'inpaint_model': ('BOOLEAN', {'default': False, 'label_on': 'enabled', 'label_off': 'disabled'}), 'noise_mask_feather': ('INT', {'default': 20, 'min': 0, 'max': 100, 'step': 1})}}
    RETURN_TYPES = ('SEGS', 'IMAGE')
    RETURN_NAMES = ('segs', 'cnet_images')
    OUTPUT_IS_LIST = (False, True)
    FUNCTION = 'doit'
    CATEGORY = 'ImpactPack/Detailer'

    @staticmethod
    def do_detail(image, segs, guide_size, guide_size_for, max_size, seed, steps, cfg, sampler_name, scheduler, denoise, noise_mask, force_inpaint, basic_pipe, refiner_ratio=None, batch_size=1, cycle=1, refiner_basic_pipe_opt=None, inpaint_model=False, noise_mask_feather=0):
        (model, clip, vae, positive, negative) = basic_pipe
        if refiner_basic_pipe_opt is None:
            (refiner_model, refiner_clip, refiner_positive, refiner_negative) = (None, None, None, None)
        else:
            (refiner_model, refiner_clip, _, refiner_positive, refiner_negative) = refiner_basic_pipe_opt
        segs = core.segs_scale_match(segs, image.shape)
        new_segs = []
        cnet_pil_list = []
        for i in range(batch_size):
            seed += 1
            for seg in segs[1]:
                cropped_image = seg.cropped_image if seg.cropped_image is not None else crop_ndarray4(image.numpy(), seg.crop_region)
                cropped_image = to_tensor(cropped_image)
                is_mask_all_zeros = (seg.cropped_mask == 0).all().item()
                if is_mask_all_zeros:
                    print(f'Detailer: segment skip [empty mask]')
                    new_segs.append(seg)
                    continue
                if noise_mask:
                    cropped_mask = seg.cropped_mask
                else:
                    cropped_mask = None
                cropped_positive = [[condition, {k: core.crop_condition_mask(v, image, seg.crop_region) if k == 'mask' else v for (k, v) in details.items()}] for (condition, details) in positive]
                cropped_negative = [[condition, {k: core.crop_condition_mask(v, image, seg.crop_region) if k == 'mask' else v for (k, v) in details.items()}] for (condition, details) in negative]
                (enhanced_image, cnet_pils) = core.enhance_detail(cropped_image, model, clip, vae, guide_size, guide_size_for, max_size, seg.bbox, seed, steps, cfg, sampler_name, scheduler, cropped_positive, cropped_negative, denoise, cropped_mask, force_inpaint, refiner_ratio=refiner_ratio, refiner_model=refiner_model, refiner_clip=refiner_clip, refiner_positive=refiner_positive, refiner_negative=refiner_negative, control_net_wrapper=seg.control_net_wrapper, cycle=cycle, inpaint_model=inpaint_model, noise_mask_feather=noise_mask_feather)
                if cnet_pils is not None:
                    cnet_pil_list.extend(cnet_pils)
                if enhanced_image is None:
                    new_cropped_image = cropped_image
                else:
                    new_cropped_image = enhanced_image
                new_seg = SEG(to_numpy(new_cropped_image), seg.cropped_mask, seg.confidence, seg.crop_region, seg.bbox, seg.label, None)
                new_segs.append(new_seg)
        return ((segs[0], new_segs), cnet_pil_list)

    def doit(self, image, segs, guide_size, guide_size_for, max_size, seed, steps, cfg, sampler_name, scheduler, denoise, noise_mask, force_inpaint, basic_pipe, refiner_ratio=None, batch_size=1, cycle=1, refiner_basic_pipe_opt=None, inpaint_model=False, noise_mask_feather=0):
        if len(image) > 1:
            raise Exception('[Impact Pack] ERROR: SEGSDetailer does not allow image batches.\nPlease refer to https://github.com/ltdrdata/ComfyUI-extension-tutorials/blob/Main/ComfyUI-Impact-Pack/tutorial/batching-detailer.md for more information.')
        (segs, cnet_pil_list) = SEGSDetailer.do_detail(image, segs, guide_size, guide_size_for, max_size, seed, steps, cfg, sampler_name, scheduler, denoise, noise_mask, force_inpaint, basic_pipe, refiner_ratio, batch_size, cycle=cycle, refiner_basic_pipe_opt=refiner_basic_pipe_opt, inpaint_model=inpaint_model, noise_mask_feather=noise_mask_feather)
        if len(cnet_pil_list) == 0:
            cnet_pil_list = [empty_pil_tensor()]
        return (segs, cnet_pil_list)
```