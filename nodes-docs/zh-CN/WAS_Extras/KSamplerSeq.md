# Documentation
- Class name: KSamplerSeq
- Category: sampling
- Output node: False
- Repo Ref: https://github.com/WASasquatch/WAS_Extras

KSamplerSeq节点旨在使用各种种子模式和条件序列执行顺序采样操作。它管理生成潜在样本，具有在正负条件序列之间交替、插值潜在样本以及控制去噪过程的能力。该节点确保了一个连贯且可控的采样工作流程，可以根据特定的创造性或分析目的进行微调。

# Input types
## Required
- model
    - 模型参数对于KSamplerSeq节点至关重要，因为它定义了将用于采样的生成模型。模型的选择显著影响生成样本的质量和风格。
    - Comfy dtype: MODEL
    - Python dtype: torch.nn.Module
- seed
    - 种子参数对于初始化随机数生成过程至关重要，确保了采样操作中的可重复性。它为生成的种子序列设定了起始点。
    - Comfy dtype: INT
    - Python dtype: int
## Optional
- seed_mode_seq
    - seed_mode_seq参数决定了采样序列中种子值是如何更新的，允许采用不同的采样策略，如增量、递减、随机选择或固定种子。
    - Comfy dtype: COMBO['increment', 'decrement', 'random', 'fixed']
    - Python dtype: str
- alternate_values
    - alternate_values参数在采样过程中启用不同种子状态之间的交替，为生成的样本增加了变化性。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool
- steps
    - steps参数指定了采样过程中的步骤数量，这直接影响生成样本的分辨率和细节。
    - Comfy dtype: INT
    - Python dtype: int
- cfg
    - cfg参数，代表配置值，用于控制采样过程的保真度，在生成样本的细节和噪声之间进行平衡。
    - Comfy dtype: FLOAT
    - Python dtype: float
- sampler_name
    - sampler_name参数从可用的采样器中选择要使用的特定采样方法，影响采样过程的整体行为和特性。
    - Comfy dtype: comfy.samplers.KSampler.SAMPLERS
    - Python dtype: str
- scheduler
    - scheduler参数定义了采样过程中的噪声减少策略，这可能会影响生成样本的平滑度和连贯性。
    - Comfy dtype: comfy.samplers.KSampler.SCHEDULERS
    - Python dtype: str
- sequence_loop_count
    - sequence_loop_count参数设置了采样序列的迭代次数，允许在单次运行中生成多个样本。
    - Comfy dtype: INT
    - Python dtype: int
- positive_seq
    - positive_seq参数提供了一系列正向条件值，引导采样过程朝着期望的结果发展。
    - Comfy dtype: CONDITIONING_SEQ
    - Python dtype: List[Tuple[int, torch.Tensor, Dict[str, torch.Tensor]]]
- negative_seq
    - negative_seq参数提供了一系列负向条件值，通过阻止不希望的结果来帮助完善采样过程。
    - Comfy dtype: CONDITIONING_SEQ
    - Python dtype: List[Tuple[int, torch.Tensor, Dict[str, torch.Tensor]]]
- use_conditioning_slerp
    - use_conditioning_slerp参数启用了球面线性插值（SLERP）来混合条件值，这可以导致样本状态之间更平滑的过渡。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool
- cond_slerp_strength
    - cond_slerp_strength参数控制混合条件值时SLERP操作的强度，影响状态间插值的范围。
    - Comfy dtype: FLOAT
    - Python dtype: float
- latent_image
    - latent_image参数表示用作采样过程起点的初始潜在状态，影响生成样本的方向和特性。
    - Comfy dtype: LATENT
    - Python dtype: Dict[str, torch.Tensor]
- use_latent_interpolation
    - use_latent_interpolation参数切换应用潜在插值在生成样本之间，这可以产生更连贯的样本序列。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool
- latent_interpolation_mode
    - latent_interpolation_mode参数选择要使用的潜在插值方法，这定义了连续样本如何混合在一起。
    - Comfy dtype: COMBO['Blend', 'Slerp', 'Cosine Interp']
    - Python dtype: str
- latent_interp_strength
    - latent_interp_strength参数调整潜在插值的影响，决定一个样本在序列中如何平滑地过渡到下一个样本。
    - Comfy dtype: FLOAT
    - Python dtype: float
- denoise_start
    - denoise_start参数设置了初始去噪强度，这影响采样过程开始时的噪声减少。
    - Comfy dtype: FLOAT
    - Python dtype: float
- denoise_seq
    - denoise_seq参数控制整个采样序列中的去噪强度，允许随时间微调噪声减少。
    - Comfy dtype: FLOAT
    - Python dtype: float
- unsample_latents
    - 当启用unsample_latents参数时，触发未采样潜在状态的生成过程，这可以引入更多的多样性到采样输出中。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool

# Output types
- samples
    - samples参数封装了采样过程中生成的潜在样本。它是代表生成图像潜在空间的张量集合。
    - Comfy dtype: LATENT
    - Python dtype: torch.Tensor

# Usage tips
- Infra type: GPU

# Source code
```
class KSamplerSeq:

    def __init__(self):
        self.previous_seed = None
        self.current_seed = None

    def initialize_seeds(self, initial_seed):
        self.previous_seed = initial_seed
        self.current_seed = initial_seed

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'model': ('MODEL',), 'seed': ('INT', {'default': 0, 'min': 0, 'max': 18446744073709551615}), 'seed_mode_seq': (['increment', 'decrement', 'random', 'fixed'],), 'alternate_values': ('BOOLEAN', {'default': True}), 'steps': ('INT', {'default': 20, 'min': 1, 'max': 10000}), 'cfg': ('FLOAT', {'default': 8.0, 'min': 0.0, 'max': 100.0, 'step': 0.5, 'round': 0.01}), 'sampler_name': (comfy.samplers.KSampler.SAMPLERS,), 'scheduler': (comfy.samplers.KSampler.SCHEDULERS,), 'sequence_loop_count': ('INT', {'default': 20, 'min': 1, 'max': 1024, 'step': 1}), 'positive_seq': ('CONDITIONING_SEQ',), 'negative_seq': ('CONDITIONING_SEQ',), 'use_conditioning_slerp': ('BOOLEAN', {'default': False}), 'cond_slerp_strength': ('FLOAT', {'default': 0.5, 'min': 0.0, 'max': 1.0, 'step': 0.001}), 'latent_image': ('LATENT',), 'use_latent_interpolation': ('BOOLEAN', {'default': False}), 'latent_interpolation_mode': (['Blend', 'Slerp', 'Cosine Interp'],), 'latent_interp_strength': ('FLOAT', {'default': 0.5, 'min': 0.0, 'max': 1.0, 'step': 0.001}), 'denoise_start': ('FLOAT', {'default': 1.0, 'min': 0.0, 'max': 1.0, 'step': 0.01}), 'denoise_seq': ('FLOAT', {'default': 0.5, 'min': 0.0, 'max': 1.0, 'step': 0.01}), 'unsample_latents': ('BOOLEAN', {'default': False})}}
    RETURN_TYPES = ('LATENT',)
    FUNCTION = 'sample'
    CATEGORY = 'sampling'

    def update_seed(self, seed, seed_mode):
        if seed_mode == 'increment':
            return seed + 1
        elif seed_mode == 'decrement':
            return seed - 1
        elif seed_mode == 'random':
            return random.randint(0, 18446744073709551615)
        elif seed_mode == 'fixed':
            return seed

    def hash_tensor(self, tensor):
        tensor = tensor.cpu().contiguous()
        return hashlib.sha256(tensor.numpy().tobytes()).hexdigest()

    def update_conditioning(self, conditioning_seq, loop_count, last_conditioning):
        matching_conditioning = None
        for (idx, conditioning, *_) in conditioning_seq:
            if int(idx) == loop_count:
                matching_conditioning = conditioning
                break
        return matching_conditioning if matching_conditioning else last_conditioning if last_conditioning else None

    def update_alternate_seed(self, loop_count):
        if loop_count % 3 == 0:
            if self.previous_seed is None:
                self.previous_seed = self.current_seed
            else:
                (self.previous_seed, self.current_seed) = (self.current_seed, self.previous_seed + 1 if loop_count // 2 % 2 == 0 else self.previous_seed - 1)
        return self.current_seed

    def alternate_denoise(self, current_denoise):
        return 0.95 if current_denoise == 0.75 else 0.75

    def sample(self, model, seed, seed_mode_seq, alternate_values, steps, cfg, sampler_name, scheduler, sequence_loop_count, positive_seq, negative_seq, cond_slerp_strength, latent_image, use_latent_interpolation, latent_interpolation_mode, latent_interp_strength, denoise_start=1.0, denoise_seq=0.5, use_conditioning_slerp=False, unsample_latents=False, alternate_mode=False):
        positive_seq = positive_seq
        negative_seq = negative_seq
        results = []
        positive_conditioning = None
        negative_conditioning = None
        self.initialize_seeds(seed)
        for loop_count in range(sequence_loop_count):
            if alternate_values and loop_count % 2 == 0:
                seq_seed = self.update_alternate_seed(seed) if seed_mode_seq != 'fixed' else seed
            else:
                seq_seed = seed if loop_count <= 0 else self.update_seed(seq_seed, seed_mode_seq)
            print(f'Loop count: {loop_count}, Seed: {seq_seed}')
            last_positive_conditioning = positive_conditioning[0] if positive_conditioning else None
            last_negative_conditioning = negative_conditioning[0] if negative_conditioning else None
            positive_conditioning = self.update_conditioning(positive_seq, loop_count, last_positive_conditioning)
            negative_conditioning = self.update_conditioning(negative_seq, loop_count, last_negative_conditioning)
            if use_conditioning_slerp and (last_positive_conditioning and last_negative_conditioning):
                a = last_positive_conditioning[0].clone()
                b = positive_conditioning[0].clone()
                na = last_negative_conditioning[0].clone()
                nb = negative_conditioning[0].clone()
                pa = last_positive_conditioning[1]['pooled_output'].clone()
                pb = positive_conditioning[1]['pooled_output'].clone()
                npa = last_negative_conditioning[1]['pooled_output'].clone()
                npb = negative_conditioning[1]['pooled_output'].clone()
                pos_cond = slerp(cond_slerp_strength, a, b)
                pos_pooled = slerp(cond_slerp_strength, pa, pb)
                neg_cond = slerp(cond_slerp_strength, na, nb)
                neg_pooled = slerp(cond_slerp_strength, npa, npb)
                positive_conditioning = [pos_cond, {'pooled_output': pos_pooled}]
                negative_conditioning = [neg_cond, {'pooled_output': neg_pooled}]
            positive_conditioning = [positive_conditioning]
            negative_conditioning = [negative_conditioning]
            if positive_conditioning is not None or negative_conditioning is not None:
                end_at_step = steps
                if results is not None and len(results) > 0:
                    latent_input = {'samples': results[-1]}
                    denoise = denoise_seq
                    start_at_step = round((1 - denoise) * steps)
                    end_at_step = steps
                else:
                    latent_input = latent_image
                    denoise = denoise_start
                if unsample_latents and loop_count > 0:
                    force_full_denoise = False if loop_count > 0 or loop_count <= steps - 1 else True
                    disable_noise = False
                    unsampled_latent = unsample(model=model, seed=seq_seed, cfg=cfg, sampler_name=sampler_name, steps=steps, end_at_step=end_at_step, scheduler=scheduler, normalize=False, positive=positive_conditioning, negative=negative_conditioning, latent_image=latent_input)[0]
                    sample = nodes.common_ksampler(model, seq_seed, steps, cfg, sampler_name, scheduler, positive_conditioning, negative_conditioning, unsampled_latent, denoise=denoise, disable_noise=disable_noise, start_step=start_at_step, last_step=end_at_step, force_full_denoise=force_full_denoise)[0]['samples']
                else:
                    sample = nodes.common_ksampler(model, seq_seed, steps, cfg, sampler_name, scheduler, positive_conditioning, negative_conditioning, latent_input, denoise=denoise)[0]['samples']
                if use_latent_interpolation and results and (loop_count > 0):
                    if latent_interpolation_mode == 'Blend':
                        sample = blend_latents(latent_interp_strength, results[-1], sample)
                    elif latent_interpolation_mode == 'Slerp':
                        sample = slerp_latents(latent_interp_strength, results[-1], sample)
                    elif latent_interpolation_mode == 'Cosine Interp':
                        sample = cosine_interp_latents(latent_interp_strength, results[-1], sample)
                    else:
                        sample = sample
                results.append(sample)
        results = torch.cat(results, dim=0)
        results = {'samples': results}
        return (results,)
```