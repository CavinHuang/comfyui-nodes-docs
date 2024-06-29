# Documentation
- Class name: unsampler
- Category: EasyUse/Sampler
- Output node: False
- Repo Ref: https://github.com/yolain/ComfyUI-Easy-Use.git

unsampler类通过采样过程从潜在向量生成高质量图像。它旨在用户友好和高效，允许定制各种参数以实现期望的结果。

# Input types
## Required
- steps
    - 步数决定了采样过程的进展，更多的步数通常会导致图像质量的提高。这是一个关键参数，因为它直接影响输出结果。
    - Comfy dtype: INT
    - Python dtype: int
- end_at_step
    - 该参数指定采样过程应在哪个步骤终止。它对于控制采样过程的持续时间和计算成本很重要。
    - Comfy dtype: INT
    - Python dtype: int
- cfg
    - 配置参数'cfg'影响采样过程的行为，如生成图像中的细节程度和降噪水平。
    - Comfy dtype: FLOAT
    - Python dtype: float
- sampler_name
    - sampler_name参数决定了使用的采样方法，这可以显著改变生成图像的特性。
    - Comfy dtype: COMBO
    - Python dtype: str
- scheduler
    - scheduler参数定义了随时间调整采样策略，影响最终输出的质量和一致性。
    - Comfy dtype: COMBO
    - Python dtype: str
- normalize
    - 归一化是一个预处理步骤，通过确保输入数据标准化，可以提高采样过程的稳定性和性能。
    - Comfy dtype: COMBO
    - Python dtype: str
## Optional
- pipe
    - “pipe”参数是一个可选输入，提供时包含采样过程所需的额外上下文和资源。
    - Comfy dtype: PIPE_LINE
    - Python dtype: dict
- optional_model
    - “optional_model”参数允许用户指定采样过程的自定义模型，从而生成具有独特特性的图像。
    - Comfy dtype: MODEL
    - Python dtype: torch.nn.Module
- optional_positive
    - “optional_positive”参数提供正向调节数据，可以引导采样过程朝着期望的结果发展。
    - Comfy dtype: CONDITIONING
    - Python dtype: torch.Tensor
- optional_negative
    - “optional_negative”参数提供负向调节数据，有助于避免生成图像中不希望出现的特征。
    - Comfy dtype: CONDITIONING
    - Python dtype: torch.Tensor
- optional_latent
    - “optional_latent”参数用于提供初始潜在向量，这些向量可以在采样过程中得到改进。
    - Comfy dtype: LATENT
    - Python dtype: dict

# Output types
- pipe
    - “pipe”输出包含采样过程的结果，包括生成的图像以及在此过程中使用的任何额外上下文或资源。
    - Comfy dtype: PIPE_LINE
    - Python dtype: dict
- latent
    - “latent”输出提供代表生成图像的最终潜在向量，可以进一步分析或用作其他过程的输入。
    - Comfy dtype: LATENT
    - Python dtype: dict

# Usage tips
- Infra type: GPU

# Source code
```
class unsampler:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'steps': ('INT', {'default': 20, 'min': 1, 'max': 10000}), 'end_at_step': ('INT', {'default': 0, 'min': 0, 'max': 10000}), 'cfg': ('FLOAT', {'default': 1.0, 'min': 0.0, 'max': 100.0}), 'sampler_name': (comfy.samplers.KSampler.SAMPLERS,), 'scheduler': (comfy.samplers.KSampler.SCHEDULERS,), 'normalize': (['disable', 'enable'],)}, 'optional': {'pipe': ('PIPE_LINE',), 'optional_model': ('MODEL',), 'optional_positive': ('CONDITIONING',), 'optional_negative': ('CONDITIONING',), 'optional_latent': ('LATENT',)}}
    RETURN_TYPES = ('PIPE_LINE', 'LATENT')
    RETURN_NAMES = ('pipe', 'latent')
    FUNCTION = 'unsampler'
    CATEGORY = 'EasyUse/Sampler'

    def unsampler(self, cfg, sampler_name, steps, end_at_step, scheduler, normalize, pipe=None, optional_model=None, optional_positive=None, optional_negative=None, optional_latent=None):
        model = optional_model if optional_model is not None else pipe['model']
        positive = optional_positive if optional_positive is not None else pipe['positive']
        negative = optional_negative if optional_negative is not None else pipe['negative']
        latent_image = optional_latent if optional_latent is not None else pipe['samples']
        normalize = normalize == 'enable'
        device = comfy.model_management.get_torch_device()
        latent = latent_image
        latent_image = latent['samples']
        end_at_step = min(end_at_step, steps - 1)
        end_at_step = steps - end_at_step
        noise = torch.zeros(latent_image.size(), dtype=latent_image.dtype, layout=latent_image.layout, device='cpu')
        noise_mask = None
        if 'noise_mask' in latent:
            noise_mask = comfy.sample.prepare_mask(latent['noise_mask'], noise.shape, device)
        noise = noise.to(device)
        latent_image = latent_image.to(device)
        _positive = comfy.sampler_helpers.convert_cond(positive)
        _negative = comfy.sampler_helpers.convert_cond(negative)
        (models, inference_memory) = comfy.sampler_helpers.get_additional_models({'positive': _positive, 'negative': _negative}, model.model_dtype())
        comfy.model_management.load_models_gpu([model] + models, model.memory_required(noise.shape) + inference_memory)
        model_patcher = comfy.model_patcher.ModelPatcher(model.model, load_device=device, offload_device=comfy.model_management.unet_offload_device())
        sampler = comfy.samplers.KSampler(model_patcher, steps=steps, device=device, sampler=sampler_name, scheduler=scheduler, denoise=1.0, model_options=model.model_options)
        sigmas = sampler.sigmas.flip(0) + 0.0001
        pbar = comfy.utils.ProgressBar(steps)

        def callback(step, x0, x, total_steps):
            pbar.update_absolute(step + 1, total_steps)
        samples = sampler.sample(noise, positive, negative, cfg=cfg, latent_image=latent_image, force_full_denoise=False, denoise_mask=noise_mask, sigmas=sigmas, start_step=0, last_step=end_at_step, callback=callback)
        if normalize:
            samples -= samples.mean()
            samples /= samples.std()
        samples = samples.cpu()
        comfy.sample.cleanup_additional_models(models)
        out = latent.copy()
        out['samples'] = samples
        if pipe is None:
            pipe = {}
        new_pipe = {**pipe, 'samples': out}
        return (new_pipe, out)
```