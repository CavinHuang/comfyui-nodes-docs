# Documentation
- Class name: latentNoisy
- Category: EasyUse/Latent
- Output node: False
- Repo Ref: https://github.com/yolain/ComfyUI-Easy-Use.git

latentNoisy类便于生成噪声潜在样本，这对于各种生成模型至关重要。它管理创建噪声并将其应用于模型的潜在空间的过程，允许操纵输出的随机性。这个类旨在与现有管道无缝集成，增强生成过程的整体灵活性和控制力。

# Input types
## Required
- sampler_name
    - sampler_name参数对于定义在潜在空间采样过程中使用的采样器类型至关重要。它决定了算法方法和行为，从而影响生成样本的质量和特性。
    - Comfy dtype: COMBO[comfy.samplers.KSampler.SAMPLERS]
    - Python dtype: str
- scheduler
    - scheduler参数对于在采样过程中控制学习率或其他超参数至关重要。它有助于微调模型的性能并取得更好的结果。
    - Comfy dtype: COMBO[comfy.samplers.KSampler.SCHEDULERS]
    - Python dtype: str
- steps
    - steps参数定义了采样过程的迭代次数或持续时间。它是决定生成样本的收敛性和稳定性的关键因素。
    - Comfy dtype: INT
    - Python dtype: int
- start_at_step
    - start_at_step参数指定了采样过程的起始点。它对于控制流水线内操作的时机和顺序非常重要。
    - Comfy dtype: INT
    - Python dtype: int
- end_at_step
    - end_at_step参数标记了采样过程的结束。它与start_at_step参数共同作用，确定了采样的步骤范围。
    - Comfy dtype: INT
    - Python dtype: int
- source
    - source参数决定计算应该在CPU还是GPU上执行。它显著影响采样过程的性能和效率。
    - Comfy dtype: COMBO[['CPU', 'GPU']]
    - Python dtype: str
- seed
    - seed参数对于确保采样过程的可重复性和一致性至关重要。它初始化随机数生成器，影响噪声的生成。
    - Comfy dtype: INT
    - Python dtype: int
## Optional
- pipe
    - pipe参数是一个可选输入，为采样过程提供额外的上下文和设置。它可以包括有关模型、加载器设置和其他特定于流水线的详细信息。
    - Comfy dtype: PIPE_LINE
    - Python dtype: dict
- optional_model
    - optional_model参数允许指定在采样过程中使用的模型。当需要将自定义模型集成到流水线中时，它特别有用。
    - Comfy dtype: MODEL
    - Python dtype: torch.nn.Module
- optional_latent
    - optional_latent参数提供了一种供应预先生成的潜在样本的方式。这对于进一步处理或分析非常有益处，无需从头开始重新生成样本。
    - Comfy dtype: LATENT
    - Python dtype: dict

# Output types
- pipe
    - pipe输出包含更新后的流水线信息，包括生成的噪声样本。它是整个过程的关键部分，因为它允许根据结果继续或终止流水线。
    - Comfy dtype: PIPE_LINE
    - Python dtype: dict
- latent
    - latent输出包含已生成的噪声潜在样本。这些样本对于生成模型工作流中的进一步处理或分析至关重要。
    - Comfy dtype: LATENT
    - Python dtype: dict
- sigma
    - sigma输出表示采样过程开始和结束步骤之间噪声水平的差异。这是一个重要的值，可用于调整后续操作中的噪声水平。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Usage tips
- Infra type: GPU

# Source code
```
class latentNoisy:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'sampler_name': (comfy.samplers.KSampler.SAMPLERS,), 'scheduler': (comfy.samplers.KSampler.SCHEDULERS,), 'steps': ('INT', {'default': 10000, 'min': 0, 'max': 10000}), 'start_at_step': ('INT', {'default': 0, 'min': 0, 'max': 10000}), 'end_at_step': ('INT', {'default': 10000, 'min': 1, 'max': 10000}), 'source': (['CPU', 'GPU'],), 'seed': ('INT', {'default': 0, 'min': 0, 'max': 18446744073709551615})}, 'optional': {'pipe': ('PIPE_LINE',), 'optional_model': ('MODEL',), 'optional_latent': ('LATENT',)}}
    RETURN_TYPES = ('PIPE_LINE', 'LATENT', 'FLOAT')
    RETURN_NAMES = ('pipe', 'latent', 'sigma')
    FUNCTION = 'run'
    CATEGORY = 'EasyUse/Latent'

    def run(self, sampler_name, scheduler, steps, start_at_step, end_at_step, source, seed, pipe=None, optional_model=None, optional_latent=None):
        model = optional_model if optional_model is not None else pipe['model']
        batch_size = pipe['loader_settings']['batch_size']
        empty_latent_height = pipe['loader_settings']['empty_latent_height']
        empty_latent_width = pipe['loader_settings']['empty_latent_width']
        if optional_latent is not None:
            samples = optional_latent
        else:
            torch.manual_seed(seed)
            if source == 'CPU':
                device = 'cpu'
            else:
                device = comfy.model_management.get_torch_device()
            noise = torch.randn((batch_size, 4, empty_latent_height // 8, empty_latent_width // 8), dtype=torch.float32, device=device).cpu()
            samples = {'samples': noise}
        device = comfy.model_management.get_torch_device()
        end_at_step = min(steps, end_at_step)
        start_at_step = min(start_at_step, end_at_step)
        comfy.model_management.load_model_gpu(model)
        model_patcher = comfy.model_patcher.ModelPatcher(model.model, load_device=device, offload_device=comfy.model_management.unet_offload_device())
        sampler = comfy.samplers.KSampler(model_patcher, steps=steps, device=device, sampler=sampler_name, scheduler=scheduler, denoise=1.0, model_options=model.model_options)
        sigmas = sampler.sigmas
        sigma = sigmas[start_at_step] - sigmas[end_at_step]
        sigma /= model.model.latent_format.scale_factor
        sigma = sigma.cpu().numpy()
        samples_out = samples.copy()
        s1 = samples['samples']
        samples_out['samples'] = s1 * sigma
        if pipe is None:
            pipe = {}
        new_pipe = {**pipe, 'samples': samples_out}
        del pipe
        return (new_pipe, samples_out, sigma)
```