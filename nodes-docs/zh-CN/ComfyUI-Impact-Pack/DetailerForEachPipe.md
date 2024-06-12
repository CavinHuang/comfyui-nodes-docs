# Documentation
- Class name: DetailerForEachPipe
- Category: ImpactPack/Detailer
- Output node: False
- Repo Ref: https://github.com/ltdrdata/ComfyUI-Impact-Pack.git

DetailerForEachPipe 节点旨在通过应用一系列图像处理技术来增强图像的细节。它专注于通过高级算法提炼图像中各个部分的视觉质量，以实现更高水平的细节。在强调图像内容细节的后处理流程中，该节点扮演着关键角色。

# Input types
## Required
- image
    - 输入图像是节点将处理的主要数据。它对于节点的执行至关重要，因为它决定了细节增强的对象。图像的特性直接影响节点的操作和输出的质量。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- segs
    - 分割数据为节点提供了图像内的兴趣区域。这对于节点理解图像的哪些部分需要详细增强至关重要。分割数据指导节点的处理，确保只有相关区域经过增强。
    - Comfy dtype: SEGS
    - Python dtype: List[torch.Tensor]
- guide_size
    - 引导尺寸参数决定了应用细节增强的尺度。它是决定最终输出中可见细节水平的关键因素。必须仔细选择引导尺寸，以平衡细节和计算资源之间的权衡。
    - Comfy dtype: FLOAT
    - Python dtype: float
- max_size
    - 最大尺寸参数为处理的图像段的尺寸设置了上限。它对于控制计算负载和确保节点在可用资源内运行很重要。此参数有助于防止增强过程中的内存过度使用。
    - Comfy dtype: FLOAT
    - Python dtype: float
- seed
    - 种子参数用于初始化随机数生成器，确保节点操作的可重复性。当希望在节点的多次运行中获得一致的结果时，它尤其重要。种子为增强过程中的随机元素提供了一定程度的控制。
    - Comfy dtype: INT
    - Python dtype: int
- steps
    - 步骤参数指定增强算法将执行的迭代次数。它是最终输出质量和细节的关键决定因素。步骤数量越多，通常结果越好，但计算时间也会增加。
    - Comfy dtype: INT
    - Python dtype: int
- cfg
    - 配置参数调整增强算法的设置以微调输出。它是实现所需细节水平的关键因素，可以显著影响增强图像的视觉结果。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- image
    - 输出图像是细节增强过程的结果。它包含了原始图像，并添加了细节和提高了视觉质量。这是用户期望从节点操作中获得的主要输出。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- segs
    - 输出分割数据提供了有关图像内增强区域的信息。这对于需要了解图像分割区域的进一步处理或分析非常有用。
    - Comfy dtype: SEGS
    - Python dtype: List[torch.Tensor]
- basic_pipe
    - 基本管道输出是增强过程中使用的一些模型和参数的集合。它可以用于额外的操作，或者在图像处理工作流的不同阶段保持一致性。
    - Comfy dtype: BASIC_PIPE
    - Python dtype: Tuple[Any, ...]
- cnet_images
    - 控制网图像输出是在增强过程中由控制网处理的图像列表。这些图像可以用于审查或进一步操作。
    - Comfy dtype: COMBO[IMAGE]
    - Python dtype: List[torch.Tensor]

# Usage tips
- Infra type: GPU

# Source code
```
class DetailerForEachPipe:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'image': ('IMAGE',), 'segs': ('SEGS',), 'guide_size': ('FLOAT', {'default': 384, 'min': 64, 'max': nodes.MAX_RESOLUTION, 'step': 8}), 'guide_size_for': ('BOOLEAN', {'default': True, 'label_on': 'bbox', 'label_off': 'crop_region'}), 'max_size': ('FLOAT', {'default': 1024, 'min': 64, 'max': nodes.MAX_RESOLUTION, 'step': 8}), 'seed': ('INT', {'default': 0, 'min': 0, 'max': 18446744073709551615}), 'steps': ('INT', {'default': 20, 'min': 1, 'max': 10000}), 'cfg': ('FLOAT', {'default': 8.0, 'min': 0.0, 'max': 100.0}), 'sampler_name': (comfy.samplers.KSampler.SAMPLERS,), 'scheduler': (comfy.samplers.KSampler.SCHEDULERS,), 'denoise': ('FLOAT', {'default': 0.5, 'min': 0.0001, 'max': 1.0, 'step': 0.01}), 'feather': ('INT', {'default': 5, 'min': 0, 'max': 100, 'step': 1}), 'noise_mask': ('BOOLEAN', {'default': True, 'label_on': 'enabled', 'label_off': 'disabled'}), 'force_inpaint': ('BOOLEAN', {'default': True, 'label_on': 'enabled', 'label_off': 'disabled'}), 'basic_pipe': ('BASIC_PIPE',), 'wildcard': ('STRING', {'multiline': True, 'dynamicPrompts': False}), 'refiner_ratio': ('FLOAT', {'default': 0.2, 'min': 0.0, 'max': 1.0}), 'cycle': ('INT', {'default': 1, 'min': 1, 'max': 10, 'step': 1})}, 'optional': {'detailer_hook': ('DETAILER_HOOK',), 'refiner_basic_pipe_opt': ('BASIC_PIPE',), 'inpaint_model': ('BOOLEAN', {'default': False, 'label_on': 'enabled', 'label_off': 'disabled'}), 'noise_mask_feather': ('INT', {'default': 20, 'min': 0, 'max': 100, 'step': 1})}}
    RETURN_TYPES = ('IMAGE', 'SEGS', 'BASIC_PIPE', 'IMAGE')
    RETURN_NAMES = ('image', 'segs', 'basic_pipe', 'cnet_images')
    OUTPUT_IS_LIST = (False, False, False, True)
    FUNCTION = 'doit'
    CATEGORY = 'ImpactPack/Detailer'

    def doit(self, image, segs, guide_size, guide_size_for, max_size, seed, steps, cfg, sampler_name, scheduler, denoise, feather, noise_mask, force_inpaint, basic_pipe, wildcard, refiner_ratio=None, detailer_hook=None, refiner_basic_pipe_opt=None, cycle=1, inpaint_model=False, noise_mask_feather=0):
        if len(image) > 1:
            raise Exception('[Impact Pack] ERROR: DetailerForEach does not allow image batches.\nPlease refer to https://github.com/ltdrdata/ComfyUI-extension-tutorials/blob/Main/ComfyUI-Impact-Pack/tutorial/batching-detailer.md for more information.')
        (model, clip, vae, positive, negative) = basic_pipe
        if refiner_basic_pipe_opt is None:
            (refiner_model, refiner_clip, refiner_positive, refiner_negative) = (None, None, None, None)
        else:
            (refiner_model, refiner_clip, _, refiner_positive, refiner_negative) = refiner_basic_pipe_opt
        (enhanced_img, cropped, cropped_enhanced, cropped_enhanced_alpha, cnet_pil_list, new_segs) = DetailerForEach.do_detail(image, segs, model, clip, vae, guide_size, guide_size_for, max_size, seed, steps, cfg, sampler_name, scheduler, positive, negative, denoise, feather, noise_mask, force_inpaint, wildcard, detailer_hook, refiner_ratio=refiner_ratio, refiner_model=refiner_model, refiner_clip=refiner_clip, refiner_positive=refiner_positive, refiner_negative=refiner_negative, cycle=cycle, inpaint_model=inpaint_model, noise_mask_feather=noise_mask_feather)
        if len(cnet_pil_list) == 0:
            cnet_pil_list = [empty_pil_tensor()]
        return (enhanced_img, new_segs, basic_pipe, cnet_pil_list)
```