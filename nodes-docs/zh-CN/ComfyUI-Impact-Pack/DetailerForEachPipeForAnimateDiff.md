# Documentation
- Class name: DetailerForEachPipeForAnimateDiff
- Category: ImpactPack/Detailer
- Output node: False
- Repo Ref: https://github.com/ltdrdata/ComfyUI-Impact-Pack.git

DetailerForEachPipeForAnimateDiff 节点旨在通过利用分割信息增强图像帧的细节。它单独处理每个段，以提高动画差异的视觉质量，专注于由边界框或裁剪区域定义的区域。该节点利用先进的采样技术和降噪策略，在输出中实现更高水平的细节。

# Input types
## Required
- image_frames
    - image_frames 参数至关重要，因为它提供了节点将处理的原始图像数据。它是应用细节增强的基础，其质量直接影响最终输出。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- segs
    - segs 参数定义了节点用于识别图像的不同区域进行处理的分割信息。对于节点理解图像的哪些部分需要细节增强至关重要。
    - Comfy dtype: SEGS
    - Python dtype: Tuple[torch.Tensor, List[SEG]]
- guide_size
    - guide_size 参数决定了用于细节增强的引导图像的大小。它是控制添加到图像帧中细节级别的关键因素。
    - Comfy dtype: FLOAT
    - Python dtype: float
- max_size
    - max_size 参数设置了图像帧的最大尺寸，确保增强的细节不会超过某个分辨率。它在优化处理和保持细节与性能之间的平衡方面发挥作用。
    - Comfy dtype: FLOAT
    - Python dtype: float
- seed
    - seed 参数用于节点内的随机数生成，确保结果的可重复性。当希望在多次运行中获得一致的结果时，这是一个重要的方面。
    - Comfy dtype: INT
    - Python dtype: int
- steps
    - steps 参数指定节点将执行的细节增强迭代次数。更多的步骤通常会导致更高质量的输出，但可能会增加处理时间。
    - Comfy dtype: INT
    - Python dtype: int
- cfg
    - cfg 参数调整细节增强过程的配置设置。它是一个关键参数，影响节点的整体行为和增强细节的最终外观。
    - Comfy dtype: FLOAT
    - Python dtype: float
- sampler_name
    - sampler_name 参数选择在细节增强期间使用的采样方法。不同的采样方法在细节质量和处理速度方面可以产生不同的结果。
    - Comfy dtype: STRING
    - Python dtype: str
- scheduler
    - scheduler 参数确定用于细节增强过程的调度算法。它影响节点如何管理增强步骤以实现最佳结果。
    - Comfy dtype: STRING
    - Python dtype: str
- denoise
    - denoise 参数控制应用于图像帧的降噪级别。这是一个重要的设置，用于实现干净清晰的输出，同时不损害增强的细节。
    - Comfy dtype: FLOAT
    - Python dtype: float
- feather
    - feather 参数用于软化增强段的边缘，提供详细区域与图像其余部分之间的更平滑过渡。
    - Comfy dtype: INT
    - Python dtype: int
- basic_pipe
    - basic_pipe 参数提供了细节增强过程所必需的基础模型和组件。它是一个关键的输入，使节点能够执行其功能。
    - Comfy dtype: BASIC_PIPE
    - Python dtype: Tuple[Any, Any, Any, Any, Any]
- refiner_ratio
    - refiner_ratio 参数指定了细化模型对细节增强的贡献比例。它允许微调增强过程，以达到所需的细节水平。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- image
    - image 输出参数表示具有改进细节的最终增强图像帧。它是节点处理的主要结果，反映了应用的细节增强技术的有效性。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- segs
    - segs 输出参数提供了细节增强过程后的更新分割信息。它包括将增强细节集成到原始分割数据中的新段。
    - Comfy dtype: SEGS
    - Python dtype: Tuple[torch.Tensor, List[SEG]]
- basic_pipe
    - basic_pipe 输出参数返回了在细节增强期间使用的基础模型和组件。它对于进一步的处理或分析目的可能有用。
    - Comfy dtype: BASIC_PIPE
    - Python dtype: Tuple[Any, Any, Any, Any, Any]
- cnet_images
    - cnet_images 输出参数包含在细节增强过程中生成的控制网图像列表。这些图像可以提供对增强中间阶段的洞察，并有助于调试和质量评估。
    - Comfy dtype: IMAGE
    - Python dtype: List[torch.Tensor]

# Usage tips
- Infra type: GPU

# Source code
```
class DetailerForEachPipeForAnimateDiff:

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'image_frames': ('IMAGE',), 'segs': ('SEGS',), 'guide_size': ('FLOAT', {'default': 384, 'min': 64, 'max': nodes.MAX_RESOLUTION, 'step': 8}), 'guide_size_for': ('BOOLEAN', {'default': True, 'label_on': 'bbox', 'label_off': 'crop_region'}), 'max_size': ('FLOAT', {'default': 1024, 'min': 64, 'max': nodes.MAX_RESOLUTION, 'step': 8}), 'seed': ('INT', {'default': 0, 'min': 0, 'max': 18446744073709551615}), 'steps': ('INT', {'default': 20, 'min': 1, 'max': 10000}), 'cfg': ('FLOAT', {'default': 8.0, 'min': 0.0, 'max': 100.0}), 'sampler_name': (comfy.samplers.KSampler.SAMPLERS,), 'scheduler': (comfy.samplers.KSampler.SCHEDULERS,), 'denoise': ('FLOAT', {'default': 0.5, 'min': 0.0001, 'max': 1.0, 'step': 0.01}), 'feather': ('INT', {'default': 5, 'min': 0, 'max': 100, 'step': 1}), 'basic_pipe': ('BASIC_PIPE',), 'refiner_ratio': ('FLOAT', {'default': 0.2, 'min': 0.0, 'max': 1.0})}, 'optional': {'detailer_hook': ('DETAILER_HOOK',), 'refiner_basic_pipe_opt': ('BASIC_PIPE',)}}
    RETURN_TYPES = ('IMAGE', 'SEGS', 'BASIC_PIPE', 'IMAGE')
    RETURN_NAMES = ('image', 'segs', 'basic_pipe', 'cnet_images')
    OUTPUT_IS_LIST = (False, False, False, True)
    FUNCTION = 'doit'
    CATEGORY = 'ImpactPack/Detailer'

    @staticmethod
    def doit(image_frames, segs, guide_size, guide_size_for, max_size, seed, steps, cfg, sampler_name, scheduler, denoise, feather, basic_pipe, refiner_ratio=None, detailer_hook=None, refiner_basic_pipe_opt=None, inpaint_model=False, noise_mask_feather=0):
        enhanced_segs = []
        cnet_image_list = []
        for sub_seg in segs[1]:
            single_seg = (segs[0], [sub_seg])
            (enhanced_seg, cnet_images) = SEGSDetailerForAnimateDiff().do_detail(image_frames, single_seg, guide_size, guide_size_for, max_size, seed, steps, cfg, sampler_name, scheduler, denoise, basic_pipe, refiner_ratio, refiner_basic_pipe_opt, inpaint_model, noise_mask_feather)
            image_frames = SEGSPaste.doit(image_frames, enhanced_seg, feather, alpha=255)[0]
            if cnet_images is not None:
                cnet_image_list.extend(cnet_images)
            if detailer_hook is not None:
                detailer_hook.post_paste(image_frames)
            enhanced_segs += enhanced_seg[1]
        new_segs = (segs[0], enhanced_segs)
        return (image_frames, new_segs, basic_pipe, cnet_image_list)
```