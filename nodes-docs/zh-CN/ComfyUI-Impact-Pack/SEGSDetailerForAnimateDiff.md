# Documentation
- Class name: SEGSDetailerForAnimateDiff
- Category: ImpactPack/Detailer
- Output node: False
- Repo Ref: https://github.com/ltdrdata/ComfyUI-Impact-Pack.git

SEGSDetailerForAnimateDiff节点旨在增强图像帧中的分割细节，特别适用于提高动画差异的质量。它通过缩放和处理图像的各个部分来提高它们的清晰度和细节水平，利用先进的模型和采样技术。

# Input types
## Required
- image_frames
    - image_frames参数是必需的，因为它提供了节点将处理的原始图像数据。它直接影响输出质量以及节点增强帧内细节的能力。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- segs
    - segs参数定义了节点将关注的image_frames内的分割，对于节点识别和处理图像数据中的特定感兴趣区域至关重要。
    - Comfy dtype: SEGS
    - Python dtype: List[SEG]
- guide_size
    - guide_size参数设置细节增强过程的缩放因子。它很重要，因为它决定了将引入到图像段中的细节水平。
    - Comfy dtype: FLOAT
    - Python dtype: float
- guide_size_for
    - guide_size_for参数指示guide_size应用于边框还是裁剪区域。这个选择影响细节增强在图像内的聚焦方式。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool
- max_size
    - max_size参数为放大的图像帧设定了最大尺寸。它确保增强的图像不会超过一定的分辨率，保持性能和内存效率。
    - Comfy dtype: FLOAT
    - Python dtype: float
- seed
    - seed参数用于采样过程中的随机数生成。它确保了当使用相同的种子值运行节点时结果的可复现性。
    - Comfy dtype: INT
    - Python dtype: int
- steps
    - steps参数决定了采样过程中使用的迭代次数。更多的步骤可以导致更精细的结果，但可能会增加处理时间。
    - Comfy dtype: INT
    - Python dtype: int
- cfg
    - cfg参数调整采样过程的配置，允许微调细节增强算法的行为。
    - Comfy dtype: FLOAT
    - Python dtype: float
- sampler_name
    - sampler_name参数指定节点使用的采样方法。不同的采样器在细节和噪声特性方面可以提供不同的结果。
    - Comfy dtype: STRING
    - Python dtype: str
- scheduler
    - scheduler参数定义了采样步骤的调度策略。它影响采样过程在迭代过程中的演变方式。
    - Comfy dtype: STRING
    - Python dtype: str
- denoise
    - denoise参数控制应用于增强图像的降噪水平。它是实现最终输出中细节和噪声平衡的重要因素。
    - Comfy dtype: FLOAT
    - Python dtype: float
- basic_pipe
    - basic_pipe参数封装了细节增强过程所需的核心组件，包括模型、clip和vae。它是节点功能的基础。
    - Comfy dtype: BASIC_PIPE
    - Python dtype: Tuple[Any, ...]
## Optional
- refiner_ratio
    - refiner_ratio参数在提供时，决定了可选的refiner模型对细节增强的影响。它允许对最终输出进行进一步的微调。
    - Comfy dtype: FLOAT
    - Python dtype: Optional[float]
- refiner_basic_pipe_opt
    - 可选的refiner_basic_pipe_opt参数通过提供一组额外的组件用于次级细化过程，扩展了节点的能力。
    - Comfy dtype: BASIC_PIPE
    - Python dtype: Optional[Tuple[Any, ...]]

# Output types
- segs
    - segs输出包含输入图像帧的增强分割细节。它标志着节点处理的完成，并代表了细节增强操作的主要结果。
    - Comfy dtype: SEGS
    - Python dtype: Tuple[Tuple[int, int], List[SEG]]
- cnet_images
    - cnet_images输出提供了控制网对细节增强过程影响的视觉表示。这些图像可以用于进一步分析，或作为节点有效性的参考。
    - Comfy dtype: IMAGE
    - Python dtype: List[torch.Tensor]

# Usage tips
- Infra type: GPU

# Source code
```
class SEGSDetailerForAnimateDiff:

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'image_frames': ('IMAGE',), 'segs': ('SEGS',), 'guide_size': ('FLOAT', {'default': 256, 'min': 64, 'max': MAX_RESOLUTION, 'step': 8}), 'guide_size_for': ('BOOLEAN', {'default': True, 'label_on': 'bbox', 'label_off': 'crop_region'}), 'max_size': ('FLOAT', {'default': 768, 'min': 64, 'max': MAX_RESOLUTION, 'step': 8}), 'seed': ('INT', {'default': 0, 'min': 0, 'max': 18446744073709551615}), 'steps': ('INT', {'default': 20, 'min': 1, 'max': 10000}), 'cfg': ('FLOAT', {'default': 8.0, 'min': 0.0, 'max': 100.0}), 'sampler_name': (comfy.samplers.KSampler.SAMPLERS,), 'scheduler': (comfy.samplers.KSampler.SCHEDULERS,), 'denoise': ('FLOAT', {'default': 0.5, 'min': 0.0001, 'max': 1.0, 'step': 0.01}), 'basic_pipe': ('BASIC_PIPE',), 'refiner_ratio': ('FLOAT', {'default': 0.2, 'min': 0.0, 'max': 1.0})}, 'optional': {'refiner_basic_pipe_opt': ('BASIC_PIPE',)}}
    RETURN_TYPES = ('SEGS', 'IMAGE')
    RETURN_NAMES = ('segs', 'cnet_images')
    OUTPUT_IS_LIST = (False, True)
    FUNCTION = 'doit'
    CATEGORY = 'ImpactPack/Detailer'

    @staticmethod
    def do_detail(image_frames, segs, guide_size, guide_size_for, max_size, seed, steps, cfg, sampler_name, scheduler, denoise, basic_pipe, refiner_ratio=None, refiner_basic_pipe_opt=None, inpaint_model=False, noise_mask_feather=0):
        (model, clip, vae, positive, negative) = basic_pipe
        if refiner_basic_pipe_opt is None:
            (refiner_model, refiner_clip, refiner_positive, refiner_negative) = (None, None, None, None)
        else:
            (refiner_model, refiner_clip, _, refiner_positive, refiner_negative) = refiner_basic_pipe_opt
        segs = core.segs_scale_match(segs, image_frames.shape)
        new_segs = []
        cnet_image_list = []
        for seg in segs[1]:
            cropped_image_frames = None
            for image in image_frames:
                image = image.unsqueeze(0)
                cropped_image = seg.cropped_image if seg.cropped_image is not None else crop_tensor4(image, seg.crop_region)
                cropped_image = to_tensor(cropped_image)
                if cropped_image_frames is None:
                    cropped_image_frames = cropped_image
                else:
                    cropped_image_frames = torch.concat((cropped_image_frames, cropped_image), dim=0)
            cropped_image_frames = cropped_image_frames.cpu().numpy()
            cropped_positive = [[condition, {k: core.crop_condition_mask(v, cropped_image_frames, seg.crop_region) if k == 'mask' else v for (k, v) in details.items()}] for (condition, details) in positive]
            cropped_negative = [[condition, {k: core.crop_condition_mask(v, cropped_image_frames, seg.crop_region) if k == 'mask' else v for (k, v) in details.items()}] for (condition, details) in negative]
            (enhanced_image_tensor, cnet_images) = core.enhance_detail_for_animatediff(cropped_image_frames, model, clip, vae, guide_size, guide_size_for, max_size, seg.bbox, seed, steps, cfg, sampler_name, scheduler, cropped_positive, cropped_negative, denoise, seg.cropped_mask, refiner_ratio=refiner_ratio, refiner_model=refiner_model, refiner_clip=refiner_clip, refiner_positive=refiner_positive, refiner_negative=refiner_negative, control_net_wrapper=seg.control_net_wrapper, inpaint_model=inpaint_model, noise_mask_feather=noise_mask_feather)
            if cnet_images is not None:
                cnet_image_list.extend(cnet_images)
            if enhanced_image_tensor is None:
                new_cropped_image = cropped_image_frames
            else:
                new_cropped_image = enhanced_image_tensor.cpu().numpy()
            new_seg = SEG(new_cropped_image, seg.cropped_mask, seg.confidence, seg.crop_region, seg.bbox, seg.label, None)
            new_segs.append(new_seg)
        return ((segs[0], new_segs), cnet_image_list)

    def doit(self, image_frames, segs, guide_size, guide_size_for, max_size, seed, steps, cfg, sampler_name, scheduler, denoise, basic_pipe, refiner_ratio=None, refiner_basic_pipe_opt=None, inpaint_model=False, noise_mask_feather=0):
        (segs, cnet_images) = SEGSDetailerForAnimateDiff.do_detail(image_frames, segs, guide_size, guide_size_for, max_size, seed, steps, cfg, sampler_name, scheduler, denoise, basic_pipe, refiner_ratio, refiner_basic_pipe_opt, inpaint_model=inpaint_model, noise_mask_feather=noise_mask_feather)
        if len(cnet_images) == 0:
            cnet_images = [empty_pil_tensor()]
        return (segs, cnet_images)
```