# Documentation
- Class name: BatchUnsampler
- Category: tests
- Output node: False
- Repo Ref: https://github.com/deroberon/demofusion-comfyui

BatchUnsampler节点旨在从给定的潜在图像开始，生成一系列逆序的潜在表示。它使用模型的噪声计划逐步添加噪声，模拟原始论文中描述的潜在扩散的逆过程。该节点对于测试和分析在各种噪声条件和采样策略下扩散模型的行为至关重要。

# Input types
## Required
- model
    - 模型参数对于BatchUnsampler节点至关重要，因为它提供了节点将用来生成潜在表示的基础扩散模型。模型的噪声计划对于模拟逆向扩散过程特别重要。
    - Comfy dtype: MODEL
    - Python dtype: torch.nn.Module
- steps
    - 步骤参数决定了将生成的中间潜在表示的数量。它是控制逆向扩散过程的粒度和生成的潜在序列的详细程度的关键因素。
    - Comfy dtype: INT
    - Python dtype: int
- sampler_name
    - sampler_name参数指定BatchUnsampler节点使用的采样器类型。这种选择影响添加到潜在表示中的噪声方法，从而影响生成序列的特征。
    - Comfy dtype: STRING
    - Python dtype: str
- latent_image
    - latent_image参数是BatchUnsampler节点的关键输入，因为它代表了将生成噪声潜在序列的源潜在图像。这张图像是逆向扩散过程的起点。
    - Comfy dtype: LATENT
    - Python dtype: Dict[str, torch.Tensor]

# Output types
- latent_batch
    - BatchUnsampler节点的latent_batch输出包含通过逆向扩散过程生成的一批潜在表示。这些潜在表示对于进一步分析或作为扩散模型管道中其他节点的输入非常重要。
    - Comfy dtype: LATENT
    - Python dtype: Dict[str, torch.Tensor]

# Usage tips
- Infra type: GPU

# Source code
```
class BatchUnsampler:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'model': ('MODEL',), 'steps': ('INT', {'default': 20, 'min': 1, 'max': 10000}), 'end_at_step': ('INT', {'default': 0, 'min': 0, 'max': 10000}), 'step_increment': ('INT', {'default': 1, 'min': 1, 'max': 10000}), 'cfg': ('FLOAT', {'default': 1.0, 'min': 0.0, 'max': 100.0}), 'sampler_name': (comfy.samplers.KSampler.SAMPLERS,), 'scheduler': (comfy.samplers.KSampler.SCHEDULERS,), 'normalize': (['disable', 'enable'],), 'positive': ('CONDITIONING',), 'negative': ('CONDITIONING',), 'latent_image': ('LATENT',)}}
    RETURN_TYPES = ('LATENT',)
    RETURN_NAMES = ('latent_batch',)
    FUNCTION = 'unsampler'
    CATEGORY = 'tests'

    def unsampler(self, model, cfg, sampler_name, steps, end_at_step, step_increment, scheduler, normalize, positive, negative, latent_image):
        """
        Generate a batch of latents representing each z[i] in the
        progressively noised sequence of latents stemming from the
        source latent_image, using the model's noising schedule (sigma)
        in reverse and applying normal noise at each step in the manner
        prescribed by the original latent diffusion paper.
        """
        normalize = normalize == 'enable'
        device = comfy.model_management.get_torch_device()
        latent = latent_image
        latent_image = latent['samples']
        batch_of_latents = []
        end_at_step = min(end_at_step, steps - 1)
        end_at_step = steps - end_at_step
        noise = torch.zeros(latent_image.size(), dtype=latent_image.dtype, layout=latent_image.layout, device='cpu')
        noise_mask = None
        if 'noise_mask' in latent:
            noise_mask = comfy.sampler_helpers.prepare_mask(latent['noise_mask'], noise, device)
        real_model = model.model
        noise = noise.to(device)
        latent_image = latent_image.to(device)
        positive = comfy.sampler_helpers.convert_cond(positive)
        negative = comfy.sampler_helpers.convert_cond(negative)
        (models, inference_memory) = comfy.sampler_helpers.get_additional_models({'positive': positive, 'negative': negative}, model.model_dtype())
        comfy.model_management.load_models_gpu([model] + models, model.memory_required(noise.shape) + inference_memory)
        sampler = comfy.samplers.KSampler(real_model, steps=steps, device=device, sampler=sampler_name, scheduler=scheduler, denoise=1.0, model_options=model.model_options)
        sigmas = sampler.sigmas.flip(0)
        z = generate_noised_latents(latent_image, sigmas)
        logger.warning(f'latent_image.shape={latent_image.shape}')
        logger.warning(f'z.shape={z.shape}')
        out = {'samples': z}
        comfy.sampler_helpers.cleanup_additional_models(models)
        return (out,)
```