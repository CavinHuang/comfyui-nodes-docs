---
tags:
- Sampling
---

# KSampler Scheduled Sequence
## Documentation
- Class name: `SaltKSamplerSequence`
- Category: `SALT/Scheduling/Sampling`
- Output node: `False`

The SaltKSamplerSequence node is designed for advanced scheduling and sequencing within audio-visual projects, focusing on the manipulation and generation of sequences based on predefined conditions and parameters. It integrates complex scheduling algorithms to optimize sequence generation for specific project needs, ensuring that sequences are generated or modified according to precise scheduling requirements.
## Input types
### Required
- **`model`**
    - Specifies the model to be used for sequence generation or manipulation, serving as the core computational resource for the node's operations.
    - Comfy dtype: `MODEL`
    - Python dtype: `str`
- **`seed_sequence`**
    - A list of seed values used to initialize the sequence generation process, ensuring variability and control over the generated sequences.
    - Comfy dtype: `LIST`
    - Python dtype: `List[int]`
- **`steps`**
    - Defines the number of steps or iterations to be executed in the sequence generation process, dictating the granularity and length of the output sequence.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`cfg`**
    - The conditioning factor used to guide the sequence generation, influencing the direction and characteristics of the generated sequence.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`sampler_name`**
    - Identifies the specific sampler algorithm to be employed in the sequence generation, affecting the quality and nature of the output.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`scheduler`**
    - Specifies the scheduling algorithm to be used, impacting how sequences are generated and modified over time.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`denoise_start`**
    - The starting value for the denoising process applied to the sequence, aiding in the refinement and clarity of the generated sequence.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`denoise_sequence`**
    - A list of denoise values applied sequentially to the generated sequence, further refining its quality and coherence.
    - Comfy dtype: `LIST`
    - Python dtype: `List[float]`
- **`positive_sequence`**
    - A list of positive conditioning factors to enhance certain aspects of the generated sequence, promoting desired characteristics.
    - Comfy dtype: `CONDITIONING`
    - Python dtype: `List[str]`
- **`negative_sequence`**
    - A list of negative conditioning factors to suppress certain aspects of the generated sequence, eliminating undesired characteristics.
    - Comfy dtype: `CONDITIONING`
    - Python dtype: `List[str]`
- **`use_latent_interpolation`**
    - A boolean indicating whether latent space interpolation is to be used, affecting the smoothness and transition between sequence elements.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
- **`latent_interpolation_mode`**
    - The mode of latent space interpolation, determining the mathematical approach to blending sequence elements.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`latent_interp_strength_sequence`**
    - A list of strengths for the latent interpolation, controlling the intensity of interpolation effects at different points in the sequence.
    - Comfy dtype: `LIST`
    - Python dtype: `List[float]`
- **`unsample_latents`**
    - A boolean indicating whether to apply unsampling to the latent representations, potentially enhancing the resolution and detail of the sequence.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
- **`inject_noise`**
    - A boolean indicating whether noise should be injected into the sequence, introducing variability and potentially enhancing creativity.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
- **`noise_strength_sequence`**
    - A list of noise strengths to be applied at different points in the sequence, controlling the amount of variability introduced.
    - Comfy dtype: `LIST`
    - Python dtype: `List[float]`
- **`latent_image`**
    - The initial latent image to be used as a starting point for the sequence generation, setting the baseline for subsequent modifications.
    - Comfy dtype: `LATENT`
    - Python dtype: `str`
## Output types
- **`latent`**
    - Comfy dtype: `LATENT`
    - The final latent representation resulting from the sequence generation and manipulation process, encapsulating the cumulative effects of all applied conditions and modifications.
    - Python dtype: `str`
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
