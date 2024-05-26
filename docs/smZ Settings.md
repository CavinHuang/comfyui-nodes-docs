# Documentation
- Class name: smZ_Settings
- Category: advanced
- Output node: False
- Repo Ref: https://github.com/shiimizu/ComfyUI_smZNodes.git

smZ_Settings 类是用于管理与 Stable Diffusion 模型相关的各种设置的配置节点。它允许用户调整诸如 RNG 源、采样器参数和优化等参数，以根据特定需求调整模型的行为。对于需要高级控制生成过程以实现所需结果的用户来说，此节点至关重要。

# Input types
## Optional
- Prompt word wrap length limit
    - 此参数定义了将提示文本包装成适合模型令牌限制的块的限制。这对于处理超出模型令牌容量的较长提示至关重要，确保它们在不丢失含义的情况下有效处理。
    - Comfy dtype: INT
    - Python dtype: int
- RNG
    - RNG 源确定使用的随机数生成器，这显著影响输出的可变性。选择合适的源确保在不同的硬件和软件环境中图像生成的一致性。
    - Comfy dtype: COMBO['cpu', 'gpu', 'nv']
    - Python dtype: str
- eta
    - Eta 是 k-diffusion 采样器的一个参数，作为噪声乘数。它控制采样过程中的噪声水平，这可以影响生成图像的细节和质量。
    - Comfy dtype: FLOAT
    - Python dtype: float
- Use previous prompt editing timelines
    - 此设置允许用户选择以前的提示编辑时间线版本，这对于与特定工作流程的兼容性或在图像生成中实现特定效果可能是必要的。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool

# Output types
- output
    - smZ_Settings 节点的输出通常是修改后的模型或基于用户配置更新设置的对象。它反映了将在后续图像生成过程中使用定制参数。
    - Comfy dtype: anytype
    - Python dtype: Any

# Usage tips
- Infra type: CPU

# Source code
```
class smZ_Settings:

    @classmethod
    def INPUT_TYPES(s):
        from .modules.shared import opts_default as opts
        import json
        i = 0

        def create_heading():
            nonlocal i
            return 'ㅤ' * (i := (i + 1))
        create_heading_value = lambda x: ('STRING', {'multiline': False, 'default': x, 'placeholder': x})
        optional = {create_heading(): create_heading_value('Stable Diffusion'), 'info_comma_padding_backtrack': ('STRING', {'multiline': True, 'placeholder': "Prompt word wrap length limit\nin tokens - for texts shorter than specified, if they don't fit into 75 token limit, move them to the next 75 token chunk"}), 'Prompt word wrap length limit': ('INT', {'default': opts.comma_padding_backtrack, 'min': 0, 'max': 74, 'step': 1}), 'enable_emphasis': (BOOLEAN, {'default': opts.enable_emphasis}), 'info_RNG': ('STRING', {'multiline': True, 'placeholder': 'Random number generator source.\nchanges seeds drastically; use CPU to produce the same picture across different videocard vendors; use NV to produce same picture as on NVidia videocards'}), 'RNG': (['cpu', 'gpu', 'nv'], {'default': opts.randn_source}), create_heading(): create_heading_value('Compute Settings'), 'info_disable_nan_check': ('STRING', {'multiline': True, 'placeholder': 'Disable NaN check in produced images/latent spaces. Only for CFGDenoiser.'}), 'disable_nan_check': (BOOLEAN, {'default': opts.disable_nan_check}), create_heading(): create_heading_value('Sampler parameters'), 'info_eta_ancestral': ('STRING', {'multiline': True, 'placeholder': 'Eta for k-diffusion samplers\nnoise multiplier; currently only applies to ancestral samplers (i.e. Euler a) and SDE samplers'}), 'eta': ('FLOAT', {'default': opts.eta, 'min': 0.0, 'max': 1.0, 'step': 0.01}), 'info_s_churn': ('STRING', {'multiline': True, 'placeholder': 'Sigma churn\namount of stochasticity; only applies to Euler, Heun, Heun++2, and DPM2'}), 's_churn': ('FLOAT', {'default': opts.s_churn, 'min': 0.0, 'max': 100.0, 'step': 0.01}), 'info_s_tmin': ('STRING', {'multiline': True, 'placeholder': "Sigma tmin\nenable stochasticity; start value of the sigma range; only applies to Euler, Heun, Heun++2, and DPM2'"}), 's_tmin': ('FLOAT', {'default': opts.s_tmin, 'min': 0.0, 'max': 10.0, 'step': 0.01}), 'info_s_tmax': ('STRING', {'multiline': True, 'placeholder': 'Sigma tmax\n0 = inf; end value of the sigma range; only applies to Euler, Heun, Heun++2, and DPM2'}), 's_tmax': ('FLOAT', {'default': 0.0, 'min': 0.0, 'max': 999.0, 'step': 0.01}), 'info_s_noise': ('STRING', {'multiline': True, 'placeholder': 'Sigma noise\namount of additional noise to counteract loss of detail during sampling'}), 's_noise': ('FLOAT', {'default': opts.s_noise, 'min': 0.0, 'max': 1.1, 'step': 0.001}), 'info_eta_noise_seed_delta': ('STRING', {'multiline': True, 'placeholder': 'Eta noise seed delta\ndoes not improve anything, just produces different results for ancestral samplers - only useful for reproducing images'}), 'ENSD': ('INT', {'default': opts.eta_noise_seed_delta, 'min': 0, 'max': 18446744073709551615, 'step': 1}), 'info_sgm_noise_multiplier': ('STRING', {'multiline': True, 'placeholder': 'SGM noise multiplier\nmatch initial noise to official SDXL implementation - only useful for reproducing images\nsee https://github.com/AUTOMATIC1111/stable-diffusion-webui/pull/12818'}), 'sgm_noise_multiplier': (BOOLEAN, {'default': opts.sgm_noise_multiplier}), 'info_upcast_sampling': ('STRING', {'multiline': True, 'placeholder': 'upcast sampling.\nNo effect with --force-fp32. Usually produces similar results to --force-fp32 with better performance while using less memory.'}), 'upcast_sampling': (BOOLEAN, {'default': opts.upcast_sampling}), create_heading(): create_heading_value('Optimizations'), 'info_NGMS': ('STRING', {'multiline': True, 'placeholder': 'Negative Guidance minimum sigma\nskip negative prompt for some steps when the image is almost ready; 0=disable, higher=faster. Only for CFGDenoiser.\nsee https://github.com/AUTOMATIC1111/stable-diffusion-webui/pull/9177'}), 'NGMS': ('FLOAT', {'default': opts.s_min_uncond, 'min': 0.0, 'max': 15.0, 'step': 0.01}), 'info_pad_cond_uncond': ('STRING', {'multiline': True, 'placeholder': 'Pad prompt/negative prompt to be same length\nimproves performance when prompt and negative prompt have different lengths; changes seeds. Only for CFGDenoiser.'}), 'pad_cond_uncond': (BOOLEAN, {'default': opts.pad_cond_uncond}), 'info_batch_cond_uncond': ('STRING', {'multiline': True, 'placeholder': 'Batch cond/uncond\ndo both conditional and unconditional denoising in one batch; uses a bit more VRAM during sampling, but improves speed. Only for CFGDenoiser.'}), 'batch_cond_uncond': (BOOLEAN, {'default': opts.batch_cond_uncond}), create_heading(): create_heading_value('Compatibility'), 'info_use_prev_scheduling': ('STRING', {'multiline': True, 'placeholder': "Previous prompt editing timelines\nFor [red:green:N]; previous: If N < 1, it's a fraction of steps (and hires fix uses range from 0 to 1), if N >= 1, it's an absolute number of steps; new: If N has a decimal point in it, it's a fraction of steps (and hires fix uses range from 1 to 2), othewrwise it's an absolute number of steps"}), 'Use previous prompt editing timelines': (BOOLEAN, {'default': opts.use_old_scheduling}), create_heading(): create_heading_value('Experimental'), 'info_use_CFGDenoiser': ('STRING', {'multiline': True, 'placeholder': "CFGDenoiser\nAn experimental option to use stable-diffusion-webui's denoiser. It allows you to use the 'Optimizations' settings listed here."}), 'Use CFGDenoiser': (BOOLEAN, {'default': opts.use_CFGDenoiser}), 'info_debug': ('STRING', {'multiline': True, 'placeholder': 'Debugging messages in the console.'}), 'debug': (BOOLEAN, {'default': opts.debug, 'label_on': 'on', 'label_off': 'off'})}
        return {'required': {'*': (anytype, {'forceInput': True})}, 'optional': {'extra': ('STRING', {'multiline': True, 'default': '{"show_headings":true,"show_descriptions":false,"mode":"*"}'}), **optional}}
    RETURN_TYPES = (anytype,)
    FUNCTION = 'run'
    CATEGORY = 'advanced'

    def run(self, *args, **kwargs):
        first = kwargs.pop('*', None) if '*' in kwargs else args[0]
        if not hasattr(first, 'clone') or first is None:
            return (first,)
        kwargs['s_min_uncond'] = kwargs.pop('NGMS', 0.0)
        kwargs['comma_padding_backtrack'] = kwargs.pop('Prompt word wrap length limit')
        kwargs['use_old_scheduling'] = kwargs.pop('Use previous prompt editing timelines')
        kwargs['use_CFGDenoiser'] = kwargs.pop('Use CFGDenoiser')
        kwargs['randn_source'] = kwargs.pop('RNG')
        kwargs['eta_noise_seed_delta'] = kwargs.pop('ENSD')
        kwargs['s_tmax'] = kwargs['s_tmax'] or float('inf')
        from .modules.shared import opts as opts_global
        from .modules.shared import opts_default
        for (k, v) in opts_default.__dict__.items():
            setattr(opts_global, k, v)
        opts = deepcopy(opts_default)
        [kwargs.pop(k, None) for k in [k for k in kwargs.keys() if 'info' in k or 'heading' in k or 'ㅤ' in k]]
        for (k, v) in kwargs.items():
            setattr(opts, k, v)
        first = first.clone()
        opts_key = 'smZ_opts'
        if type(first) is comfy.model_patcher.ModelPatcher:
            first.model_options.pop(opts_key, None)
            first.model_options[opts_key] = opts
            comfy.sample.prepare_noise = prepare_noise
            opts_global.debug = opts.debug
        elif type(first) is comfy.sd.CLIP:
            first.patcher.model_options.pop(opts_key, None)
            first.patcher.model_options[opts_key] = opts
            opts_global.debug = opts.debug
        return (first,)
```