# Documentation
- Class name: samplerSettingsNoiseIn
- Category: EasyUse/PreSampling
- Output node: True
- Repo Ref: https://github.com/yolain/ComfyUI-Easy-Use.git

该节点旨在为采样过程配置和应用噪声设置，这可以增强生成样本的多样性和质量。它允许调整噪声因素和调度，有助于实现更精细和可控的生成工作流程。

# Input types
## Required
- pipe
    - ‘pipe’参数是必要的，因为它携带了正在处理的模型和样本的必要信息。它是节点操作的支柱，促进了应用噪声和后续采样步骤所需的数据流。
    - Comfy dtype: PIPE_LINE
    - Python dtype: Dict[str, Any]
- factor
    - ‘factor’参数在确定采样过程中引入的噪声程度方面至关重要。它直接影响原始噪声和变化噪声之间的平衡，从而影响最终输出的多样性和一致性。
    - Comfy dtype: FLOAT
    - Python dtype: float
- steps
    - ‘steps’参数定义了采样过程将要经历的迭代次数。它很重要，因为它决定了采样的复杂性和深度，更多的步骤可能导致更精细的结果。
    - Comfy dtype: INT
    - Python dtype: int
- cfg
    - ‘cfg’参数用于微调采样过程的配置。它在调整节点的整体行为方面发挥作用，确保采样按照期望的规格进行。
    - Comfy dtype: FLOAT
    - Python dtype: float
- sampler_name
    - ‘sampler_name’参数在选择合适的采样方法方面至关重要。它影响生成样本时采用的策略，不同的采样器提供不同的噪声应用和样本多样性方法。
    - Comfy dtype: COMBO
    - Python dtype: str
- scheduler
    - ‘scheduler’参数在管理采样步骤中噪声的应用方面很重要。它有助于控制引入噪声的速度，确保从采样过程的一个阶段平稳过渡到下一个阶段。
    - Comfy dtype: COMBO
    - Python dtype: str
- denoise
    - ‘denoise’参数负责指定要应用的去噪水平。它影响生成样本的清晰度和锐度，较高的值导致更清晰的输出。
    - Comfy dtype: FLOAT
    - Python dtype: float
- seed
    - ‘seed’参数对于确保采样过程中的可重复性至关重要。它初始化随机数生成器，允许在不同运行中使用相同设置时获得一致的结果。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- pipe
    - ‘pipe’输出是输入‘pipe’的修改版本，现在包含调整后的噪声设置和生成的样本。它是节点处理的成果，封装了增强的采样数据以供进一步使用。
    - Comfy dtype: PIPE_LINE
    - Python dtype: Dict[str, Any]

# Usage tips
- Infra type: CPU

# Source code
```
class samplerSettingsNoiseIn:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'pipe': ('PIPE_LINE',), 'factor': ('FLOAT', {'default': 0.1, 'min': 0.0, 'max': 1.0, 'step': 0.01, 'round': 0.01}), 'steps': ('INT', {'default': 20, 'min': 1, 'max': 10000}), 'cfg': ('FLOAT', {'default': 8.0, 'min': 0.0, 'max': 100.0}), 'sampler_name': (comfy.samplers.KSampler.SAMPLERS,), 'scheduler': (comfy.samplers.KSampler.SCHEDULERS,), 'denoise': ('FLOAT', {'default': 1.0, 'min': 0.0, 'max': 1.0, 'step': 0.01}), 'seed': ('INT', {'default': 0, 'min': 0, 'max': MAX_SEED_NUM})}, 'optional': {'optional_noise_seed': ('INT', {'forceInput': True}), 'optional_latent': ('LATENT',)}, 'hidden': {'prompt': 'PROMPT', 'extra_pnginfo': 'EXTRA_PNGINFO', 'my_unique_id': 'UNIQUE_ID'}}
    RETURN_TYPES = ('PIPE_LINE',)
    RETURN_NAMES = ('pipe',)
    OUTPUT_NODE = True
    FUNCTION = 'settings'
    CATEGORY = 'EasyUse/PreSampling'

    def slerp(self, val, low, high):
        dims = low.shape
        low = low.reshape(dims[0], -1)
        high = high.reshape(dims[0], -1)
        low_norm = low / torch.norm(low, dim=1, keepdim=True)
        high_norm = high / torch.norm(high, dim=1, keepdim=True)
        low_norm[low_norm != low_norm] = 0.0
        high_norm[high_norm != high_norm] = 0.0
        omega = torch.acos((low_norm * high_norm).sum(1))
        so = torch.sin(omega)
        res = (torch.sin((1.0 - val) * omega) / so).unsqueeze(1) * low + (torch.sin(val * omega) / so).unsqueeze(1) * high
        return res.reshape(dims)

    def prepare_mask(self, mask, shape):
        mask = torch.nn.functional.interpolate(mask.reshape((-1, 1, mask.shape[-2], mask.shape[-1])), size=(shape[2], shape[3]), mode='bilinear')
        mask = mask.expand((-1, shape[1], -1, -1))
        if mask.shape[0] < shape[0]:
            mask = mask.repeat((shape[0] - 1) // mask.shape[0] + 1, 1, 1, 1)[:shape[0]]
        return mask

    def expand_mask(self, mask, expand, tapered_corners):
        try:
            import numpy as np
            import scipy
            c = 0 if tapered_corners else 1
            kernel = np.array([[c, 1, c], [1, 1, 1], [c, 1, c]])
            mask = mask.reshape((-1, mask.shape[-2], mask.shape[-1]))
            out = []
            for m in mask:
                output = m.numpy()
                for _ in range(abs(expand)):
                    if expand < 0:
                        output = scipy.ndimage.grey_erosion(output, footprint=kernel)
                    else:
                        output = scipy.ndimage.grey_dilation(output, footprint=kernel)
                output = torch.from_numpy(output)
                out.append(output)
            return torch.stack(out, dim=0)
        except:
            return None

    def settings(self, pipe, factor, steps, cfg, sampler_name, scheduler, denoise, seed, optional_noise_seed=None, optional_latent=None, prompt=None, extra_pnginfo=None, my_unique_id=None):
        latent = optional_latent if optional_latent is not None else pipe['samples']
        model = pipe['model']
        (batch_size, _, height, width) = latent['samples'].shape
        generator = torch.manual_seed(seed)
        base_noise = torch.randn((1, 4, height, width), dtype=torch.float32, device='cpu', generator=generator).repeat(batch_size, 1, 1, 1).cpu()
        if optional_noise_seed is None or optional_noise_seed == seed:
            optional_noise_seed = seed + 1
        generator = torch.manual_seed(optional_noise_seed)
        variation_noise = torch.randn((batch_size, 4, height, width), dtype=torch.float32, device='cpu', generator=generator).cpu()
        slerp_noise = self.slerp(factor, base_noise, variation_noise)
        end_at_step = steps
        start_at_step = round(end_at_step - end_at_step * denoise)
        device = comfy.model_management.get_torch_device()
        comfy.model_management.load_model_gpu(model)
        model_patcher = comfy.model_patcher.ModelPatcher(model.model, load_device=device, offload_device=comfy.model_management.unet_offload_device())
        sampler = comfy.samplers.KSampler(model_patcher, steps=steps, device=device, sampler=sampler_name, scheduler=scheduler, denoise=1.0, model_options=model.model_options)
        sigmas = sampler.sigmas
        sigma = sigmas[start_at_step] - sigmas[end_at_step]
        sigma /= model.model.latent_format.scale_factor
        sigma = sigma.cpu().numpy()
        work_latent = latent.copy()
        work_latent['samples'] = latent['samples'].clone() + slerp_noise * sigma
        if 'noise_mask' in latent:
            noise_mask = self.prepare_mask(latent['noise_mask'], latent['samples'].shape)
            work_latent['samples'] = noise_mask * work_latent['samples'] + (1 - noise_mask) * latent['samples']
            work_latent['noise_mask'] = self.expand_mask(latent['noise_mask'].clone(), 5, True)
        if pipe is None:
            pipe = {}
        new_pipe = {'model': pipe['model'], 'positive': pipe['positive'], 'negative': pipe['negative'], 'vae': pipe['vae'], 'clip': pipe['clip'], 'samples': work_latent, 'images': pipe['images'], 'seed': seed, 'loader_settings': {**pipe['loader_settings'], 'steps': steps, 'cfg': cfg, 'sampler_name': sampler_name, 'scheduler': scheduler, 'denoise': denoise, 'add_noise': 'disable'}}
        return (new_pipe,)
```