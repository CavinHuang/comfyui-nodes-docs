# Documentation
- Class name: RegionalSamplerAdvanced
- Category: ImpactPack/Regional
- Output node: False
- Repo Ref: https://github.com/ltdrdata/ComfyUI-Impact-Pack.git

RegionalSamplerAdvanced 节点旨在对潜在图像的特定区域执行高级采样操作。它允许自定义采样步骤、噪声添加和恢复定义区域内的潜在状态，为局部图像生成的采样过程提供了高度的控制能力。

# Input types
## Required
- add_noise
    - 'add_noise' 参数决定在采样过程中是否向潜在图像添加噪声。这可以影响生成图像的质量和随机性，是实现所需视觉效果的关键因素。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool
- noise_seed
    - 'noise_seed' 参数用于初始化添加噪声的随机数生成器，确保采样过程的可重复性。它的值直接影响引入潜在图像中的噪声模式。
    - Comfy dtype: INT
    - Python dtype: int
- steps
    - 'steps' 参数指定要执行的采样步骤数。它是最终图像细节和分辨率的关键决定因素，更多的步骤通常会导致更精细的结果。
    - Comfy dtype: INT
    - Python dtype: int
- start_at_step
    - 'start_at_step' 参数定义了采样过程开始的步骤，允许自定义采样时间线，并使用户能够控制图像生成的进展。
    - Comfy dtype: INT
    - Python dtype: int
- end_at_step
    - 'end_at_step' 参数设置了采样过程结束的步骤。它与 'start_at_step' 配合使用，定义了执行采样的步骤范围，影响采样过程的总持续时间。
    - Comfy dtype: INT
    - Python dtype: int
- overlap_factor
    - 'overlap_factor' 参数控制采样过程中区域掩模之间的重叠程度。它对于确保采样区域的无缝集成至关重要，在图像的最终构图中扮演着重要角色。
    - Comfy dtype: INT
    - Python dtype: int
- restore_latent
    - 'restore_latent' 参数指示在每个区域采样后是否应恢复潜在状态。这有助于在多个采样操作重叠的区域中保持图像的完整性。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool
- return_with_leftover_noise
    - 'return_with_leftover_noise' 参数决定采样过程后最终潜在图像是否保留任何残余噪声。这对于进一步处理或分析噪声特性非常有用。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool
- latent_image
    - 'latent_image' 参数表示要采样的图像的初始潜在状态。它是采样过程的起点，对生成最终图像至关重要。
    - Comfy dtype: LATENT
    - Python dtype: Dict[str, torch.Tensor]
- base_sampler
    - 'base_sampler' 参数定义了要用于潜在图像的基本采样方法。它是确定图像生成算法方法的关键组成部分，并影响输出的整体风格和质量。
    - Comfy dtype: KSAMPLER_ADVANCED
    - Python dtype: KSamplerAdvancedWrapper
- regional_prompts
    - 'regional_prompts' 参数包含定义采样感兴趣区域的提示集合。每个提示都可以影响其指定区域内的采样过程，允许对局部图像特征进行详细控制。
    - Comfy dtype: REGIONAL_PROMPTS
    - Python dtype: List[Any]
- additional_mode
    - 'additional_mode' 参数指定了采样过程中要应用的恢复模式。它决定了额外采样如何与基本采样集成，影响最终图像的连贯性和细节。
    - Comfy dtype: COMBO['DISABLE', 'ratio additional', 'ratio between']
    - Python dtype: str
- additional_sampler
    - 'additional_sampler' 参数选择用于额外采样任务的采样器类型。在采样过程中恢复和细化图像细节的重要因素。
    - Comfy dtype: COMBO['AUTO', 'euler', 'heun', 'heunpp2', 'dpm_2', 'dpm_fast', 'dpmpp_2m', 'ddpm']
    - Python dtype: str
- additional_sigma_ratio
    - 'additional_sigma_ratio' 参数调整用于额外采样的 sigma 比例，允许微调噪声水平及其对图像生成过程的影响。
    - Comfy dtype: FLOAT
    - Python dtype: float
## Optional
- unique_id
    - 'unique_id' 参数在执行过程中用于内部唯一标识节点。它在跟踪和管理节点状态中起着关键作用，确保系统内准确报告和协调。
    - Comfy dtype: UNIQUE_ID
    - Python dtype: str

# Output types
- latent_image
    - 'latent_image' 输出代表应用 RegionalSamplerAdvanced 节点操作后最终采样的潜在图像。它封装了高级采样过程的结果，反映了执行期间进行的定制噪声、步骤和区域调整。
    - Comfy dtype: LATENT
    - Python dtype: Dict[str, torch.Tensor]

# Usage tips
- Infra type: GPU

# Source code
```
class RegionalSamplerAdvanced:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'add_noise': ('BOOLEAN', {'default': True, 'label_on': 'enabled', 'label_off': 'disabled'}), 'noise_seed': ('INT', {'default': 0, 'min': 0, 'max': 18446744073709551615}), 'steps': ('INT', {'default': 20, 'min': 1, 'max': 10000}), 'start_at_step': ('INT', {'default': 0, 'min': 0, 'max': 10000}), 'end_at_step': ('INT', {'default': 10000, 'min': 0, 'max': 10000}), 'overlap_factor': ('INT', {'default': 10, 'min': 0, 'max': 10000}), 'restore_latent': ('BOOLEAN', {'default': True, 'label_on': 'enabled', 'label_off': 'disabled'}), 'return_with_leftover_noise': ('BOOLEAN', {'default': False, 'label_on': 'enabled', 'label_off': 'disabled'}), 'latent_image': ('LATENT',), 'base_sampler': ('KSAMPLER_ADVANCED',), 'regional_prompts': ('REGIONAL_PROMPTS',), 'additional_mode': (['DISABLE', 'ratio additional', 'ratio between'], {'default': 'ratio between'}), 'additional_sampler': (['AUTO', 'euler', 'heun', 'heunpp2', 'dpm_2', 'dpm_fast', 'dpmpp_2m', 'ddpm'],), 'additional_sigma_ratio': ('FLOAT', {'default': 0.3, 'min': 0.0, 'max': 1.0, 'step': 0.01})}, 'hidden': {'unique_id': 'UNIQUE_ID'}}
    RETURN_TYPES = ('LATENT',)
    FUNCTION = 'doit'
    CATEGORY = 'ImpactPack/Regional'

    def doit(self, add_noise, noise_seed, steps, start_at_step, end_at_step, overlap_factor, restore_latent, return_with_leftover_noise, latent_image, base_sampler, regional_prompts, additional_mode, additional_sampler, additional_sigma_ratio, unique_id):
        if restore_latent:
            latent_compositor = nodes.NODE_CLASS_MAPPINGS['LatentCompositeMasked']()
        else:
            latent_compositor = None
        masks = [regional_prompt.mask.numpy() for regional_prompt in regional_prompts]
        masks = [np.ceil(mask).astype(np.int32) for mask in masks]
        combined_mask = torch.from_numpy(np.bitwise_or.reduce(masks))
        inv_mask = torch.where(combined_mask == 0, torch.tensor(1.0), torch.tensor(0.0))
        region_len = len(regional_prompts)
        end_at_step = min(steps, end_at_step)
        total = (end_at_step - start_at_step) * region_len
        new_latent_image = latent_image.copy()
        base_latent_image = None
        region_masks = {}
        for i in range(start_at_step, end_at_step - 1):
            core.update_node_status(unique_id, f'{start_at_step + i}/{end_at_step} steps  |         ', (i - start_at_step) * region_len / total)
            cur_add_noise = True if i == start_at_step and add_noise else False
            new_latent_image['noise_mask'] = inv_mask
            new_latent_image = base_sampler.sample_advanced(cur_add_noise, noise_seed, steps, new_latent_image, i, i + 1, True, recovery_mode=additional_mode, recovery_sampler=additional_sampler, recovery_sigma_ratio=additional_sigma_ratio)
            if restore_latent:
                del new_latent_image['noise_mask']
                base_latent_image = new_latent_image.copy()
            j = 1
            for regional_prompt in regional_prompts:
                if restore_latent:
                    new_latent_image = base_latent_image.copy()
                core.update_node_status(unique_id, f'{start_at_step + i}/{end_at_step} steps  |  {j}/{region_len}', ((i - start_at_step) * region_len + j) / total)
                if j not in region_masks:
                    region_mask = regional_prompt.get_mask_erosion(overlap_factor).squeeze(0).squeeze(0)
                    region_masks[j] = region_mask
                else:
                    region_mask = region_masks[j]
                new_latent_image['noise_mask'] = region_mask
                new_latent_image = regional_prompt.sampler.sample_advanced(False, noise_seed, steps, new_latent_image, i, i + 1, True, recovery_mode=additional_mode, recovery_sampler=additional_sampler, recovery_sigma_ratio=additional_sigma_ratio)
                if restore_latent:
                    del new_latent_image['noise_mask']
                    base_latent_image = latent_compositor.composite(base_latent_image, new_latent_image, 0, 0, False, region_mask)[0]
                    new_latent_image = base_latent_image
                j += 1
        core.update_node_status(unique_id, f'finalize')
        if base_latent_image is not None:
            new_latent_image = base_latent_image
        else:
            base_latent_image = new_latent_image
        new_latent_image['noise_mask'] = inv_mask
        new_latent_image = base_sampler.sample_advanced(False, noise_seed, steps, new_latent_image, end_at_step - 1, end_at_step, return_with_leftover_noise, recovery_mode=additional_mode, recovery_sampler=additional_sampler, recovery_sigma_ratio=additional_sigma_ratio)
        core.update_node_status(unique_id, f'{end_at_step}/{end_at_step} steps', total)
        core.update_node_status(unique_id, '', None)
        if restore_latent:
            new_latent_image = base_latent_image
        if 'noise_mask' in new_latent_image:
            del new_latent_image['noise_mask']
        return (new_latent_image,)
```