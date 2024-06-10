# Documentation
- Class name: TwoAdvancedSamplersForMask
- Category: ImpactPack/Sampler
- Output node: False
- Repo Ref: https://github.com/ltdrdata/ComfyUI-Impact-Pack.git

TwoAdvancedSamplersForMask节点旨在使用两个不同的高级采样器对潜在图像执行高级采样操作。它应用掩膜腐蚀技术来细化掩膜，并使用两个独立的高级采样器处理图像的掩膜和未掩膜区域。该节点旨在通过利用两个采样器的优势来提高生成图像的质量。

# Input types
## Required
- seed
    - 种子参数对于随机数生成过程至关重要，确保了采样的可重复性。它影响采样算法的初始状态，从而影响生成的潜在图像。
    - Comfy dtype: INT
    - Python dtype: int
- steps
    - 步数参数定义了采样过程将经历的迭代次数。它是确定细节水平和最终图像质量的关键因素。
    - Comfy dtype: INT
    - Python dtype: int
- denoise
    - 去噪参数控制采样过程中应用的噪声减少级别。它在生成图像的清晰度和锐度方面起着重要作用。
    - Comfy dtype: FLOAT
    - Python dtype: float
- samples
    - 样本参数保存将由采样器处理的初始潜在图像数据。它是输入的重要部分，因为它作为采样操作的起点。
    - Comfy dtype: LATENT
    - Python dtype: torch.Tensor
- base_sampler
    - 基础采样器参数指定将用于处理图像未掩膜区域的高级采样器。它是实现所需采样结果的关键组件。
    - Comfy dtype: KSAMPLER_ADVANCED
    - Python dtype: KSamplerAdvancedWrapper
- mask_sampler
    - 掩膜采样器参数标识专用于处理图像掩膜区域的高级采样器。它对于将特定的采样技术应用于掩膜区域至关重要。
    - Comfy dtype: KSAMPLER_ADVANCED
    - Python dtype: KSamplerAdvancedWrapper
- mask
    - 掩膜参数提供了将应用于潜在图像以区分掩膜和未掩膜区域的掩膜。它对于指导采样过程很重要。
    - Comfy dtype: MASK
    - Python dtype: torch.Tensor
## Optional
- overlap_factor
    - 重叠因子参数确定掩膜腐蚀的范围，用于在掩膜和未掩膜区域之间创建缓冲区。它有助于最终图像中过渡的平滑度。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- latent_image
    - 潜在图像输出包含应用高级采样技术后处理的潜在图像。它代表了采样操作的最终结果。
    - Comfy dtype: LATENT
    - Python dtype: torch.Tensor

# Usage tips
- Infra type: GPU

# Source code
```
class TwoAdvancedSamplersForMask:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'seed': ('INT', {'default': 0, 'min': 0, 'max': 18446744073709551615}), 'steps': ('INT', {'default': 20, 'min': 1, 'max': 10000}), 'denoise': ('FLOAT', {'default': 1.0, 'min': 0.0, 'max': 1.0, 'step': 0.01}), 'samples': ('LATENT',), 'base_sampler': ('KSAMPLER_ADVANCED',), 'mask_sampler': ('KSAMPLER_ADVANCED',), 'mask': ('MASK',), 'overlap_factor': ('INT', {'default': 10, 'min': 0, 'max': 10000})}}
    RETURN_TYPES = ('LATENT',)
    FUNCTION = 'doit'
    CATEGORY = 'ImpactPack/Sampler'

    @staticmethod
    def mask_erosion(samples, mask, grow_mask_by):
        mask = mask.clone()
        w = samples['samples'].shape[3]
        h = samples['samples'].shape[2]
        mask2 = torch.nn.functional.interpolate(mask.reshape((-1, 1, mask.shape[-2], mask.shape[-1])), size=(w, h), mode='bilinear')
        if grow_mask_by == 0:
            mask_erosion = mask2
        else:
            kernel_tensor = torch.ones((1, 1, grow_mask_by, grow_mask_by))
            padding = math.ceil((grow_mask_by - 1) / 2)
            mask_erosion = torch.clamp(torch.nn.functional.conv2d(mask2.round(), kernel_tensor, padding=padding), 0, 1)
        return mask_erosion[:, :, :w, :h].round()

    def doit(self, seed, steps, denoise, samples, base_sampler, mask_sampler, mask, overlap_factor):
        inv_mask = torch.where(mask != 1.0, torch.tensor(1.0), torch.tensor(0.0))
        adv_steps = int(steps / denoise)
        start_at_step = adv_steps - steps
        new_latent_image = samples.copy()
        mask_erosion = TwoAdvancedSamplersForMask.mask_erosion(samples, mask, overlap_factor)
        for i in range(start_at_step, adv_steps):
            add_noise = 'enable' if i == start_at_step else 'disable'
            return_with_leftover_noise = 'enable' if i + 1 != adv_steps else 'disable'
            new_latent_image['noise_mask'] = inv_mask
            new_latent_image = base_sampler.sample_advanced(add_noise, seed, adv_steps, new_latent_image, i, i + 1, 'enable', recovery_mode='ratio additional')
            new_latent_image['noise_mask'] = mask_erosion
            new_latent_image = mask_sampler.sample_advanced('disable', seed, adv_steps, new_latent_image, i, i + 1, return_with_leftover_noise, recovery_mode='ratio additional')
        del new_latent_image['noise_mask']
        return (new_latent_image,)
```