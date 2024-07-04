
# Documentation
- Class name: SaltKSamplerSequence
- Category: SALT/Scheduling/Sampling
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

SaltKSamplerSequence节点是一个专为音视频项目中的高级调度和排序而设计的工具。它主要用于基于预定义条件和参数操作和生成序列。该节点集成了复杂的调度算法，以优化特定项目需求的序列生成，确保根据精确的调度要求生成或修改序列。

# Input types
## Required
- model
    - 指定用于序列生成或操作的模型，作为节点操作的核心计算资源。
    - Comfy dtype: MODEL
    - Python dtype: str
- seed_sequence
    - 用于初始化序列生成过程的种子值列表，确保生成序列的可变性和可控性。
    - Comfy dtype: LIST
    - Python dtype: List[int]
- steps
    - 定义序列生成过程中要执行的步骤或迭代次数，决定输出序列的精细度和长度。
    - Comfy dtype: INT
    - Python dtype: int
- cfg
    - 用于指导序列生成的调节因子，影响生成序列的方向和特征。
    - Comfy dtype: FLOAT
    - Python dtype: float
- sampler_name
    - 确定序列生成中使用的具体采样算法，影响输出的质量和性质。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- scheduler
    - 指定要使用的调度算法，影响序列如何随时间生成和修改。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- denoise_start
    - 应用于序列的去噪过程的起始值，有助于优化和提高生成序列的清晰度。
    - Comfy dtype: FLOAT
    - Python dtype: float
- denoise_sequence
    - 按顺序应用于生成序列的去噪值列表，进一步提高其质量和连贯性。
    - Comfy dtype: LIST
    - Python dtype: List[float]
- positive_sequence
    - 用于增强生成序列某些方面的正面调节因子列表，促进所需特征。
    - Comfy dtype: CONDITIONING
    - Python dtype: List[str]
- negative_sequence
    - 用于抑制生成序列某些方面的负面调节因子列表，消除不需要的特征。
    - Comfy dtype: CONDITIONING
    - Python dtype: List[str]
- use_latent_interpolation
    - 指示是否使用潜在空间插值的布尔值，影响序列元素之间的平滑度和过渡。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool
- latent_interpolation_mode
    - 潜在空间插值的模式，决定混合序列元素的数学方法。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- latent_interp_strength_sequence
    - 潜在插值强度列表，控制序列不同点插值效果的强度。
    - Comfy dtype: LIST
    - Python dtype: List[float]
- unsample_latents
    - 指示是否对潜在表示应用反采样的布尔值，可能增强序列的分辨率和细节。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool
- inject_noise
    - 指示是否应向序列注入噪声的布尔值，引入可变性并可能增强创造性。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool
- noise_strength_sequence
    - 在序列不同点应用的噪声强度列表，控制引入的可变性量。
    - Comfy dtype: LIST
    - Python dtype: List[float]
- latent_image
    - 用作序列生成起点的初始潜在图像，为后续修改设定基准。
    - Comfy dtype: LATENT
    - Python dtype: str

# Output types
- latent
    - 序列生成和操作过程产生的最终潜在表示，包含了所有应用条件和修改的累积效果。
    - Comfy dtype: LATENT
    - Python dtype: str


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class SaltKSamplerSequence:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "model": ("MODEL",),
                "seed_sequence": ("LIST", ),
                "steps": ("INT", {"default": 20, "min": 1, "max": 10000}),
                "cfg": ("FLOAT", {"default": 8.0, "min": 0.0, "max": 100.0, "step": 0.5, "round": 0.01}),
                "sampler_name": (comfy.samplers.KSampler.SAMPLERS, ),
                "scheduler": (comfy.samplers.KSampler.SCHEDULERS, ),
                "denoise_start": ("FLOAT", {"default": 1.0, "min": 0.0, "max": 1.0, "step": 0.01}),
                "denoise_sequence": ("LIST", ),
                "positive_sequence": ("CONDITIONING",),
                "negative_sequence": ("CONDITIONING",),
                "use_latent_interpolation": ("BOOLEAN", {"default": False}),
                "latent_interpolation_mode": (["Blend", "Slerp", "Cosine Interp"],),
                "latent_interp_strength_sequence": ("LIST", ),
                "unsample_latents": ("BOOLEAN", {"default": True}),
                "inject_noise": ("BOOLEAN", {"default": True}),
                "noise_strength_sequence": ("LIST", ),
                "latent_image": ("LATENT", ),
            }
        }

    RETURN_TYPES = ("LATENT",)

    FUNCTION = "sample"
    CATEGORY = "SALT/Scheduling/Sampling"

    def inject_noise(self, latent_image, noise_strength):
        noise = torch.randn_like(latent_image) * noise_strength
        return latent_image + noise
    
    def expand_sequence(self, sequence, target_length):
        if len(sequence) >= target_length:
            return sequence
        repeated_sequence = (sequence * (target_length // len(sequence) + 1))[:target_length]
        return repeated_sequence

    def sample(self, model, seed_sequence, steps, cfg, sampler_name, scheduler, positive_sequence, negative_sequence, latent_image, 
               use_latent_interpolation, latent_interpolation_mode, latent_interp_strength_sequence, unsample_latents, denoise_start, 
               denoise_sequence, inject_noise, noise_strength_sequence):
        
        if not isinstance(positive_sequence, list):
            positive_sequence = [positive_sequence]
        if not isinstance(negative_sequence, list):
            negative_sequence = [negative_sequence]

        sequence_loop_count = len(positive_sequence)

        if len(negative_sequence) < len(positive_sequence):
            raise ValueError(f"`negative_sequence` of size {len(negative_sequence)} does not match `positive_sequence` of size {len(positive_sequence)}. Conditioning sizes must be the same.")

        # Schedule Value Lists
        seed_sequence = [int(seed) for seed in seed_sequence]
        denoise_sequence = [float(denoise_val) for denoise_val in denoise_sequence]
        latent_interp_strength_sequence = [float(latent_strength) for latent_strength in latent_interp_strength_sequence]
        noise_strength_sequence = [float(noise_strength) for noise_strength in noise_strength_sequence]

        # Expanding all sequences if necessary
        if len(denoise_sequence) < sequence_loop_count:
            denoise_sequence = self.expand_sequence(denoise_sequence, sequence_loop_count)
        if len(latent_interp_strength_sequence) < sequence_loop_count:
            latent_interp_strength_sequence = self.expand_sequence(latent_interp_strength_sequence, sequence_loop_count)
        if len(noise_strength_sequence) < sequence_loop_count:
            noise_strength_sequence = self.expand_sequence(noise_strength_sequence, sequence_loop_count)
        if len(seed_sequence) < sequence_loop_count:
            seed_sequence = self.expand_sequence(seed_sequence, sequence_loop_count)

        results = []

        sequence_loop_count = len(positive_sequence)

        print(f"Starting loop sequence with {sequence_loop_count} frames.")

        positive_conditioning = None
        negative_conditioning = None
        latent_mask = latent_image.get("noise_mask", None)

        for loop_count in range(sequence_loop_count):

            positive_conditioning = [positive_sequence[loop_count]]
            negative_conditioning = [negative_sequence[loop_count]]

            if results and len(results) > 0:
                if len(latent_input) == 1 or latent_mask == None:
                    latent_input = {'samples': results[-1]}
                else:
                    latent_input = {'samples': latent_image["samples"][loop_count if loop_count < len(latent_image) else -1].unsqueeze(0)}
                if isinstance(latent_mask, torch.Tensor):
                    latent_input["noise_mask"] = latent_mask
                start_at_step = round((1 - denoise) * steps)
                end_at_step = steps
            else:
                latent_copy = latent_image.copy()
                if isinstance(latent_mask, torch.Tensor):
                    latent_copy["samples"] = latent_copy["samples"][0].unsqueeze(0)
                latent_input = latent_copy

            denoise = denoise_sequence[loop_count] if loop_count > 0 else denoise_start

            if inject_noise and loop_count > 0:
                print(f"Injecting noise at {noise_strength_sequence[loop_count]} strength.")
                latent_input['samples'] = self.inject_noise(latent_input['samples'], noise_strength_sequence[loop_count])

            if unsample_latents and loop_count > 0:
                force_full_denoise = not (loop_count > 0 or loop_count <= steps - 1)
                disable_noise = False
                print("Unsampling latent image.")
                unsampled_latent = unsample(model=model, seed=seed_sequence[loop_count], cfg=cfg, sampler_name=sampler_name, steps=steps+1, end_at_step=steps, scheduler=scheduler, normalize=False, positive=positive_conditioning, negative=negative_conditioning, latent_image=latent_input)[0]
                if inject_noise and loop_count > 0:
                    print(f"Injecting noise at {noise_strength_sequence[loop_count]} strength.")
                    unsampled_latent['samples'] = self.inject_noise(unsampled_latent['samples'], noise_strength_sequence[loop_count])
                print(f"Sampling Denoise: {denoise}")
                print("Sampling.")
                sample = nodes.common_ksampler(model, seed_sequence[loop_count], steps, cfg, sampler_name, scheduler, positive_conditioning, negative_conditioning, unsampled_latent, denoise=denoise, disable_noise=disable_noise, start_step=start_at_step, last_step=end_at_step, force_full_denoise=force_full_denoise)[0]['samples']
            else:

                if inject_noise and loop_count > 0:
                    print(f"Injecting noise at {noise_strength_sequence[loop_count]} strength.")
                    latent_input['samples'] = self.inject_noise(latent_input['samples'], noise_strength_sequence[loop_count])
                sample = nodes.common_ksampler(model, seed_sequence[loop_count], steps, cfg, sampler_name, scheduler, positive_conditioning, negative_conditioning, latent_input, denoise=denoise)[0]['samples']

            if use_latent_interpolation and results and loop_count > 0:
                if latent_interpolation_mode == "Blend":
                    sample = blend_latents(latent_interp_strength_sequence[loop_count], results[-1], sample)
                elif latent_interpolation_mode == "Slerp":
                    sample = slerp_latents(latent_interp_strength_sequence[loop_count], results[-1], sample)
                elif latent_interpolation_mode == "Cosine Interp":
                    sample = cosine_interp_latents(latent_interp_strength_sequence[loop_count], results[-1], sample)

            results.append(sample)

        results = torch.cat(results, dim=0)
        results = {'samples': results}
        if isinstance(latent_mask, torch.Tensor):
            results["noise_mask"] = latent_mask.repeat(len(results["samples"]), 1, 1, 1)
        
        return (results,)

```
