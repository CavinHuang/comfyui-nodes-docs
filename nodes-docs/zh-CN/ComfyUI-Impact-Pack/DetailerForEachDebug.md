# Documentation
- Class name: DetailerForEachTest
- Category: ImpactPack/Detailer
- Output node: False
- Repo Ref: https://github.com/ltdrdata/ComfyUI-Impact-Pack.git

DetailerForEachTest节点旨在过单独处理每个图像段来增强图像细节。它利用先进的模型和技术来细化和增强图像质量，专注于图像内的感兴趣区域。该节点的目标是在不损害原始图像完整性的情况下提高视觉清晰度和细节。

# Input types
## Required
- image
    - 输入图像张量，节点将处理以增强其细节。这是一个基本参数，因为节点的所有操作都围绕这张图像展开。
    - Comfy dtype: torch.Tensor
    - Python dtype: torch.Tensor
- segs
    - 分割数据，定义了图像内的感兴趣区域。对于节点来说，确定图像的哪些部分需要集中进行细节增强至关重要。
    - Comfy dtype: List[seg]
    - Python dtype: List[Any]
- model
    - 用于细节增强的模型。它在节点根据输入参数细化和增强图像细节的能力中扮演重要角色。
    - Comfy dtype: torch.nn.Module
    - Python dtype: torch.nn.Module
- guide_size
    - 引导尺寸参数，决定了细节增强的尺度。它对于控制节点将应用于图像的细节级别至关重要。
    - Comfy dtype: int
    - Python dtype: int
- guide_size_for
    - 引导尺寸用于参数，指定细节增强过程的参考尺寸。这对于将增强与期望的输出尺寸对齐很重要。
    - Comfy dtype: int
    - Python dtype: int
- max_size
    - 最大尺寸参数，限制了增强图像的分辨率。它确保增强后的图像不会超过一定的尺寸，这对于性能或存储考虑可能很重要。
    - Comfy dtype: int
    - Python dtype: int
- seed
    - 用于初始化节点内随机过程的随机种子。它确保当节点用相同的参数运行时，结果的可重复性。
    - Comfy dtype: int
    - Python dtype: int
- steps
    - 运行增强过程的步数。它影响增强的彻底性和完成操作所需的时间。
    - Comfy dtype: int
    - Python dtype: int
- cfg
    - 控制增强过程各个方面的配置设置。这是一个关键参数，允许微调节点的行为以实现期望的结果。
    - Comfy dtype: Dict[str, Any]
    - Python dtype: Dict[str, Any]
- sampler_name
    - 在增强过程中用于选择样本的采样器名称。它影响采样策略，可能会影响增强图像的质量。
    - Comfy dtype: str
    - Python dtype: str
- scheduler
    - 在模型训练期间使用的学习率调度器。它对于随时间调整学习率以提高训练效率和模型性能很重要。
    - Comfy dtype: torch.optim.lr_scheduler
    - Python dtype: torch.optim.lr_scheduler
- positive
    - 指导增强过程朝着期望结果的正向条件及其相关细节的列表。这是一个关键参数，用于引导节点的行为。
    - Comfy dtype: List[condition_details]
    - Python dtype: List[Tuple[str, Dict[str, Any]]]
- negative
    - 在增强过程中防止不希望出现的结果的负面条件及其相关细节的列表。这对于控制节点的行为以避免不希望的结果至关重要。
    - Comfy dtype: List[condition_details]
    - Python dtype: List[Tuple[str, Dict[str, Any]]]
## Optional
- clip
    - CLIP张量，提供上下文信息以指导增强过程。这是一个可选参数，可用于影响增强图像的风格和内容。
    - Comfy dtype: torch.Tensor
    - Python dtype: torch.Tensor
- vae
    - 用于生成或细化图像细节的变分自编码器(VAE)。这是一个可选组件，可以用来引入或改进图像中的特定特征。
    - Comfy dtype: torch.nn.Module
    - Python dtype: torch.nn.Module
- denoise
    - 去噪开关，决定是否对增强后的图像应用去噪步骤。它可以通过减少噪声来提高视觉质量。
    - Comfy dtype: bool
    - Python dtype: bool
- feather
    - 羽化参数，控制增强图像边缘的平滑度。它对于在图像的增强区域和原始区域之间创建自然过渡很重要。
    - Comfy dtype: float
    - Python dtype: float
- noise_mask
    - 噪声掩码张量，定义了要应用噪声减少的图像区域。这是一个可选参数，可用于选择性地减少图像某些部分的噪声。
    - Comfy dtype: torch.Tensor
    - Python dtype: torch.Tensor
- force_inpaint
    - 强制修复开关，决定是否强制对图像执行修复操作。它可以用来填充图像中缺失或损坏的区域。
    - Comfy dtype: bool
    - Python dtype: bool
- wildcard
    - 通配符参数，允许基于某些条件动态选择增强选项。它在节点如何对图像的不同段应用增强提供了灵活性。
    - Comfy dtype: str
    - Python dtype: str
- detailer_hook
    - 一个可选的钩子函数，可用于在细节增强过程之后执行自定义操作。它允许对图像应用额外的处理。
    - Comfy dtype: Callable
    - Python dtype: Callable[..., Any]
- cycle
    - 重复增强过程的周期数。它可以用来应用多次增强迭代，以获得更精细的结果。
    - Comfy dtype: int
    - Python dtype: int
- inpaint_model
    - 一个可选的修复模型，可以在增强过程中用来填充图像中缺失或损坏的区域。
    - Comfy dtype: torch.nn.Module
    - Python dtype: torch.nn.Module
- noise_mask_feather
    - 噪声掩码的羽化值，控制噪声减少边缘的平滑度。它有助于在降噪和原始区域之间创建更平滑的过渡。
    - Comfy dtype: float
    - Python dtype: float

# Output types
- enhanced_img
    - 细节增强过程生成的增强图像张量。它代表了节点的主要输出，展示了提高的视觉清晰度和细节。
    - Comfy dtype: torch.Tensor
    - Python dtype: torch.Tensor
- cropped
    - 已处理以进行细节增强的裁剪图像张量列表。这些张量代表了图像中被专注于增强的部分。
    - Comfy dtype: List[torch.Tensor]
    - Python dtype: List[torch.Tensor]
- cropped_enhanced
    - 增强的裁剪图像张量列表。每个张量对应原始图像的一个增强部分，展示了经过改进的细节。
    - Comfy dtype: List[torch.Tensor]
    - Python dtype: List[torch.Tensor]
- cropped_enhanced_alpha
    - 带有alpha通道的增强裁剪图像张量列表。这些张量包含透明度信息，可用于进一步处理或叠加。
    - Comfy dtype: List[torch.Tensor]
    - Python dtype: List[torch.Tensor]
- cnet_images
    - 在增强过程中由控制网生成的PIL图像列表。这些图像可以提供视觉反馈或用于额外分析。
    - Comfy dtype: List[PIL.Image]
    - Python dtype: List[PIL.Image]

# Usage tips
- Infra type: GPU

# Source code
```
class DetailerForEachTest(DetailerForEach):
    RETURN_TYPES = ('IMAGE', 'IMAGE', 'IMAGE', 'IMAGE', 'IMAGE')
    RETURN_NAMES = ('image', 'cropped', 'cropped_refined', 'cropped_refined_alpha', 'cnet_images')
    OUTPUT_IS_LIST = (False, True, True, True, True)
    FUNCTION = 'doit'
    CATEGORY = 'ImpactPack/Detailer'

    def doit(self, image, segs, model, clip, vae, guide_size, guide_size_for, max_size, seed, steps, cfg, sampler_name, scheduler, positive, negative, denoise, feather, noise_mask, force_inpaint, wildcard, detailer_hook=None, cycle=1, inpaint_model=False, noise_mask_feather=0):
        if len(image) > 1:
            raise Exception('[Impact Pack] ERROR: DetailerForEach does not allow image batches.\nPlease refer to https://github.com/ltdrdata/ComfyUI-extension-tutorials/blob/Main/ComfyUI-Impact-Pack/tutorial/batching-detailer.md for more information.')
        (enhanced_img, cropped, cropped_enhanced, cropped_enhanced_alpha, cnet_pil_list, new_segs) = DetailerForEach.do_detail(image, segs, model, clip, vae, guide_size, guide_size_for, max_size, seed, steps, cfg, sampler_name, scheduler, positive, negative, denoise, feather, noise_mask, force_inpaint, wildcard, detailer_hook, cycle=cycle, inpaint_model=inpaint_model, noise_mask_feather=noise_mask_feather)
        if len(cropped) == 0:
            cropped = [empty_pil_tensor()]
        if len(cropped_enhanced) == 0:
            cropped_enhanced = [empty_pil_tensor()]
        if len(cropped_enhanced_alpha) == 0:
            cropped_enhanced_alpha = [empty_pil_tensor()]
        if len(cnet_pil_list) == 0:
            cnet_pil_list = [empty_pil_tensor()]
        return (enhanced_img, cropped, cropped_enhanced, cropped_enhanced_alpha, cnet_pil_list)
```