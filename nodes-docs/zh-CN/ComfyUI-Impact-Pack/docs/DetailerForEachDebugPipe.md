# Documentation
- Class name: DetailerForEachTestPipe
- Category: ImpactPack/Detailer
- Output node: False
- Repo Ref: https://github.com/ltdrdata/ComfyUI-Impact-Pack.git

DetailerForEachTestPipe类的'doit'方法旨在对单个图像输入执行详细的图像处理任务。它通过利用各种模型和参数增强图像，并输出包括原始图像、裁剪和增强版本的多种类型的处理过的图像。该方法是图像增强流水线的核心部分，专注于提高输入图像的视觉质量和细节。

# Input types
## Required
- image
    - 'image'参数是节点的主要输入，代表将要处理的图像。它对节点的执行至关重要，因为它决定了增强的对象。图像的质量和内容显著影响节点的输出结果。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- segs
    - 'segs'参数提供图像的分割信息，这对于特定区域内的目标增强和处理至关重要。它影响节点如何处理和细化图像的不同部分。
    - Comfy dtype: SEGS
    - Python dtype: List[Segmentation]
- guide_size
    - 'guide_size'参数指定增强过程中的引导大小。它在确定节点在图像增强期间将关注的细节层次的规模上起着重要作用。
    - Comfy dtype: INT
    - Python dtype: int
- max_size
    - 'max_size'参数设置图像处理操作的最大尺寸。它对于控制节点执行的分辨率和计算负载很重要。
    - Comfy dtype: INT
    - Python dtype: int
- seed
    - 'seed'参数用于初始化随机数生成器，确保节点的随机过程的可重复性。
    - Comfy dtype: INT
    - Python dtype: int
- steps
    - 'steps'参数定义了在增强过程中要采取的迭代次数或步骤数。它直接影响增强的彻底性。
    - Comfy dtype: INT
    - Python dtype: int
- cfg
    - 'cfg'参数包含应用于节点处理的配置设置。它对于定制节点的行为以满足特定的增强要求至关重要。
    - Comfy dtype: CONFIG
    - Python dtype: Configuration
- sampler_name
    - 'sampler_name'参数标识节点在增强期间要使用的采样策略。它对于确定处理图像细节的方法很重要。
    - Comfy dtype: STRING
    - Python dtype: str
- scheduler
    - 'scheduler'参数负责控制执行增强步骤的速度或节奏。它影响节点操作的效率和结果。
    - Comfy dtype: SCHEDULER
    - Python dtype: Scheduler
- denoise
    - 'denoise'参数指示是否应该对图像应用去噪操作。它对于提高图像清晰度和减少噪声伪影很重要。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool
- feather
    - 'feather'参数控制处理图像中边缘的柔和度。它对于实现图像不同区域之间的自然过渡很重要。
    - Comfy dtype: FLOAT
    - Python dtype: float
- noise_mask
    - 'noise_mask'参数确定在增强期间是否应用噪声掩码。对于需要噪声管理的某些增强技术来说，这可能很重要。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool
- force_inpaint
    - 'force_inpaint'参数决定是否强制对图像应用修复操作。对于填充图像中缺失或损坏的区域来说，这可能是关键的。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool
- basic_pipe
    - 'basic_pipe'参数封装了用于图像的基本处理流水线，包括模型和其他组件。它对于图像增强的初始阶段至关重要。
    - Comfy dtype: BASIC_PIPE
    - Python dtype: Tuple[torch.nn.Module, Any, Any, Any]
## Optional
- wildcard
    - 'wildcard'参数通过提供通配符选项，允许在处理中增加额外的灵活性。它可以用于将可变性或特殊条件引入节点的操作中。
    - Comfy dtype: STRING
    - Python dtype: str

# Output types
- enhanced_img
    - 'enhanced_img'输出是图像增强过程的结果，展示了提高的视觉质量和细节。这是一个关键的输出，因为它代表了节点功能的主要目标。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- new_segs
    - 'new_segs'输出包含增强过程后的更新分割信息。对于需要了解图像增强后分段区域的应用来说，这是重要的。
    - Comfy dtype: SEGS
    - Python dtype: List[Segmentation]
- basic_pipe
    - 'basic_pipe'输出反映了使用的基本处理流水线，它可能在图像处理工作流的后续阶段的进一步处理或分析中有用。
    - Comfy dtype: BASIC_PIPE
    - Python dtype: Tuple[torch.nn.Module, Any, Any, Any]
- cropped
    - 'cropped'输出由从原始输入派生的裁剪图像列表组成。这些图像可以用于特定区域的集中增强或分析。
    - Comfy dtype: LIST[IMAGE]
    - Python dtype: List[torch.Tensor]
- cropped_enhanced
    - 'cropped_enhanced'输出提供了增强的裁剪图像列表，突出了对每个分段所做的详细改进。
    - Comfy dtype: LIST[IMAGE]
    - Python dtype: List[torch.Tensor]
- cropped_enhanced_alpha
    - 'cropped_enhanced_alpha'输出包括具有alpha通道的图像，该通道代表增强区域的透明度，适用于进一步图像处理中的层叠或合成。
    - Comfy dtype: LIST[IMAGE]
    - Python dtype: List[torch.Tensor]
- cnet_images
    - 'cnet_images'输出是由控制网处理的图像列表，对于涉及基于神经网络的图像控制的应用来说，这可能很重要。
    - Comfy dtype: LIST[IMAGE]
    - Python dtype: List[torch.Tensor]

# Usage tips
- Infra type: GPU

# Source code
```
class DetailerForEachTestPipe(DetailerForEachPipe):
    RETURN_TYPES = ('IMAGE', 'SEGS', 'BASIC_PIPE', 'IMAGE', 'IMAGE', 'IMAGE', 'IMAGE')
    RETURN_NAMES = ('image', 'segs', 'basic_pipe', 'cropped', 'cropped_refined', 'cropped_refined_alpha', 'cnet_images')
    OUTPUT_IS_LIST = (False, False, False, True, True, True, True)
    FUNCTION = 'doit'
    CATEGORY = 'ImpactPack/Detailer'

    def doit(self, image, segs, guide_size, guide_size_for, max_size, seed, steps, cfg, sampler_name, scheduler, denoise, feather, noise_mask, force_inpaint, basic_pipe, wildcard, cycle=1, refiner_ratio=None, detailer_hook=None, refiner_basic_pipe_opt=None, inpaint_model=False, noise_mask_feather=0):
        if len(image) > 1:
            raise Exception('[Impact Pack] ERROR: DetailerForEach does not allow image batches.\nPlease refer to https://github.com/ltdrdata/ComfyUI-extension-tutorials/blob/Main/ComfyUI-Impact-Pack/tutorial/batching-detailer.md for more information.')
        (model, clip, vae, positive, negative) = basic_pipe
        if refiner_basic_pipe_opt is None:
            (refiner_model, refiner_clip, refiner_positive, refiner_negative) = (None, None, None, None)
        else:
            (refiner_model, refiner_clip, _, refiner_positive, refiner_negative) = refiner_basic_pipe_opt
        (enhanced_img, cropped, cropped_enhanced, cropped_enhanced_alpha, cnet_pil_list, new_segs) = DetailerForEach.do_detail(image, segs, model, clip, vae, guide_size, guide_size_for, max_size, seed, steps, cfg, sampler_name, scheduler, positive, negative, denoise, feather, noise_mask, force_inpaint, wildcard, detailer_hook, refiner_ratio=refiner_ratio, refiner_model=refiner_model, refiner_clip=refiner_clip, refiner_positive=refiner_positive, refiner_negative=refiner_negative, cycle=cycle, inpaint_model=inpaint_model, noise_mask_feather=noise_mask_feather)
        if len(cropped) == 0:
            cropped = [empty_pil_tensor()]
        if len(cropped_enhanced) == 0:
            cropped_enhanced = [empty_pil_tensor()]
        if len(cropped_enhanced_alpha) == 0:
            cropped_enhanced_alpha = [empty_pil_tensor()]
        if len(cnet_pil_list) == 0:
            cnet_pil_list = [empty_pil_tensor()]
        return (enhanced_img, new_segs, basic_pipe, cropped, cropped_enhanced, cropped_enhanced_alpha, cnet_pil_list)
```