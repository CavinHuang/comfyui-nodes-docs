# Documentation
- Class name: Unsampler
- Category: sampling
- Output node: False
- Repo Ref: https://github.com/BlenderNeko/ComfyUI_Noise.git

Unsampler类通过迭代细化潜在空间来促进从给定模型生成高保真样本的过程。它旨在通过控制的采样过程改善生成图像的质量，并允许使用条件输入来指导生成。这个节点对于需要详细控制采样过程和有能力整合各种条件因素的应用至关重要。

# Input types
## Required
- model
    - 模型参数至关重要，它定义了Unsampler操作的生成基础。它是决定输出样本类型和质量的核心组件。
    - Comfy dtype: MODEL
    - Python dtype: torch.nn.Module
- steps
    - 步骤参数对于采样过程至关重要，它决定了Unsampler将执行的迭代次数，以细化潜在空间并生成最终样本。
    - Comfy dtype: INT
    - Python dtype: int
- cfg
    - cfg参数影响Unsampler的配置，在采样过程中调整模型参数以达到期望的输出特征。
    - Comfy dtype: FLOAT
    - Python dtype: float
- sampler_name
    - sampler_name参数在定义Unsampler使用的采样策略中起着关键作用。它决定了用于遍历潜在空间的方法，直接影响生成样本的多样性和质量。
    - Comfy dtype: COMBO
    - Python dtype: str
- positive
    - positive参数作为Unsampler的正向条件输入，引导生成过程朝着输出样本中期望的特征或特征发展。
    - Comfy dtype: CONDITIONING
    - Python dtype: torch.Tensor
- negative
    - negative参数作为负向条件输入，帮助Unsampler避免在生成的样本中出现不希望的特征或特征。
    - Comfy dtype: CONDITIONING
    - Python dtype: torch.Tensor
- latent_image
    - latent_image参数至关重要，因为它提供了Unsampler开始其细化过程的潜在空间中的初始点，显著影响最终输出。
    - Comfy dtype: LATENT
    - Python dtype: dict

# Output types
- samples
    - samples输出代表最终精炼的潜在空间点，是Unsampler迭代过程的结果。这些点对于生成满足期望条件的高质量图像至关重要。
    - Comfy dtype: LATENT
    - Python dtype: torch.Tensor

# Usage tips
- Infra type: GPU

# Source code
```
class Unsampler:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'model': ('MODEL',), 'steps': ('INT', {'default': 20, 'min': 1, 'max': 10000}), 'end_at_step': ('INT', {'default': 0, 'min': 0, 'max': 10000}), 'cfg': ('FLOAT', {'default': 1.0, 'min': 0.0, 'max': 100.0}), 'sampler_name': (comfy.samplers.KSampler.SAMPLERS,), 'scheduler': (comfy.samplers.KSampler.SCHEDULERS,), 'normalize': (['disable', 'enable'],), 'positive': ('CONDITIONING',), 'negative': ('CONDITIONING',), 'latent_image': ('LATENT',)}}
    RETURN_TYPES = ('LATENT',)
    FUNCTION = 'unsampler'
    CATEGORY = 'sampling'

    def unsampler(self, model, cfg, sampler_name, steps, end_at_step, scheduler, normalize, positive, negative, latent_image):
        normalize = normalize == 'enable'
        device = comfy.model_management.get_torch_device()
        latent = latent_image
        latent_image = latent['samples']
        end_at_step = min(end_at_step, steps - 1)
        end_at_step = steps - end_at_step
        noise = torch.zeros(latent_image.size(), dtype=latent_image.dtype, layout=latent_image.layout, device='cpu')
        noise_mask = None
        if 'noise_mask' in latent:
            noise_mask = comfy.sampler_helpers.prepare_mask(latent['noise_mask'], noise.shape, device)
        noise = noise.to(device)
        latent_image = latent_image.to(device)
        conds0 = {'positive': comfy.sampler_helpers.convert_cond(positive), 'negative': comfy.sampler_helpers.convert_cond(negative)}
        conds = {}
        for k in conds0:
            conds[k] = list(map(lambda a: a.copy(), conds0[k]))
        (models, inference_memory) = comfy.sampler_helpers.get_additional_models(conds, model.model_dtype())
        comfy.model_management.load_models_gpu([model] + models, model.memory_required(noise.shape) + inference_memory)
        sampler = comfy.samplers.KSampler(model, steps=steps, device=device, sampler=sampler_name, scheduler=scheduler, denoise=1.0, model_options=model.model_options)
        sigmas = sampler.sigmas.flip(0) + 0.0001
        pbar = comfy.utils.ProgressBar(steps)

        def callback(step, x0, x, total_steps):
            pbar.update_absolute(step + 1, total_steps)
        samples = sampler.sample(noise, positive, negative, cfg=cfg, latent_image=latent_image, force_full_denoise=False, denoise_mask=noise_mask, sigmas=sigmas, start_step=0, last_step=end_at_step, callback=callback)
        if normalize:
            samples -= samples.mean()
            samples /= samples.std()
        samples = samples.cpu()
        comfy.sampler_helpers.cleanup_additional_models(models)
        out = latent.copy()
        out['samples'] = samples
        return (out,)
```