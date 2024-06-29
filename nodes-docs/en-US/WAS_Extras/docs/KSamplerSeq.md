---
tags:
- Sampling
---

# KSampler Sequence
## Documentation
- Class name: `KSamplerSeq`
- Category: `sampling`
- Output node: `False`

The KSamplerSeq node is designed for advanced sampling in generative models, specifically focusing on the iterative refinement of latent images through a sequence of steps. It incorporates mechanisms for unsampling latents, adjusting denoise levels dynamically, and optionally looping through the sequence to enhance the quality or diversity of the generated samples.
## Input types
### Required
- **`model`**
    - Specifies the generative model to be used for sampling.
    - Comfy dtype: `MODEL`
    - Python dtype: `str`
- **`seed`**
    - Determines the initial random seed for sampling, affecting the randomness and reproducibility of the generated samples.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`seed_mode_seq`**
    - Defines the mode of seed progression throughout the sequence, allowing for incremental, decremental, random, or fixed seed values.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `List[str]`
- **`alternate_values`**
    - Enables or disables the alternation of certain parameters between iterations to introduce variability.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
- **`steps`**
    - The total number of steps to execute in the sampling process, impacting the refinement and detail of the output.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`cfg`**
    - Controls the conditioning factor, influencing the adherence of the generated samples to the specified conditions.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`sampler_name`**
    - Selects the specific sampling algorithm to be used, from a predefined set of samplers.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`scheduler`**
    - Chooses the scheduling algorithm for controlling the sampling process, affecting the progression of denoising and refinement.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`sequence_loop_count`**
    - Determines how many times the sampling sequence is looped, potentially enhancing the output through repeated refinement.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`positive_seq`**
    - Specifies the positive conditioning sequence, guiding the generative model towards desired attributes in the output.
    - Comfy dtype: `CONDITIONING_SEQ`
    - Python dtype: `List[str]`
- **`negative_seq`**
    - Specifies the negative conditioning sequence, steering the generative model away from undesired attributes in the output.
    - Comfy dtype: `CONDITIONING_SEQ`
    - Python dtype: `List[str]`
- **`use_conditioning_slerp`**
    - Enables or disables spherical linear interpolation (slerp) for blending conditioning vectors, affecting the smoothness of transitions between conditions.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
- **`cond_slerp_strength`**
    - Controls the strength of the conditioning slerp, adjusting the influence of interpolated conditions on the output.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`latent_image`**
    - Provides the initial latent image to be refined through the sampling process.
    - Comfy dtype: `LATENT`
    - Python dtype: `str`
- **`use_latent_interpolation`**
    - Enables or disables the interpolation of latent images, affecting the diversity and smoothness of transitions in the output.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
- **`latent_interpolation_mode`**
    - Selects the mode of latent image interpolation, allowing for blend, slerp, or cosine interpolation methods.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `List[str]`
- **`latent_interp_strength`**
    - Determines the strength of the latent image interpolation, influencing the degree of blending or transition between latent images.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`denoise_start`**
    - Sets the initial denoise level, affecting the clarity and detail of the generated samples at the start of the sequence.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`denoise_seq`**
    - Specifies the denoise level for subsequent iterations in the sequence, allowing for dynamic adjustment of clarity and detail.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`unsample_latents`**
    - Determines whether to perform unsampling on the latents, potentially enhancing the quality or diversity of the output.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
## Output types
- **`latent`**
    - Comfy dtype: `LATENT`
    - The latent representation of the generated samples, indicating the underlying data structure that defines the output images.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class KSamplerSeq:

    def __init__(self):
        self.previous_seed = None
        self.current_seed = None

    def initialize_seeds(self, initial_seed):
        self.previous_seed = initial_seed
        self.current_seed = initial_seed

    @classmethod
    def INPUT_TYPES(s):
        return {"required":
                    {"model": ("MODEL",),
                    "seed": ("INT", {"default": 0, "min": 0, "max": 0xffffffffffffffff}),
                    "seed_mode_seq": (["increment", "decrement", "random", "fixed"],),
                    "alternate_values": ("BOOLEAN", {"default": True}),
                    "steps": ("INT", {"default": 20, "min": 1, "max": 10000}),
                    "cfg": ("FLOAT", {"default": 8.0, "min": 0.0, "max": 100.0, "step":0.5, "round": 0.01}),
                    "sampler_name": (comfy.samplers.KSampler.SAMPLERS, ),
                    "scheduler": (comfy.samplers.KSampler.SCHEDULERS, ),
                    "sequence_loop_count": ("INT", {"default": 20, "min": 1, "max": 1024, "step": 1}),
                    "positive_seq": ("CONDITIONING_SEQ", ),
                    "negative_seq": ("CONDITIONING_SEQ", ),
                    "use_conditioning_slerp": ("BOOLEAN", {"default": False}),
                    "cond_slerp_strength": ("FLOAT", {"default": 0.5, "min": 0.0, "max": 1.0, "step": 0.001}),
                    "latent_image": ("LATENT", ),
                    "use_latent_interpolation": ("BOOLEAN", {"default": False}),
                    "latent_interpolation_mode": (["Blend", "Slerp", "Cosine Interp"],),
                    "latent_interp_strength": ("FLOAT", {"default": 0.5, "min": 0.0, "max": 1.0, "step": 0.001}),
                    "denoise_start": ("FLOAT", {"default": 1.0, "min": 0.0, "max": 1.0, "step": 0.01}),
                    "denoise_seq": ("FLOAT", {"default": 0.5, "min": 0.0, "max": 1.0, "step": 0.01}),
                    "unsample_latents": ("BOOLEAN", {"default": False})
                     }
                }

    RETURN_TYPES = ("LATENT",)
    FUNCTION = "sample"

    CATEGORY = "sampling"

    def update_seed(self, seed, seed_mode):
        if seed_mode == "increment":
            return seed + 1
        elif seed_mode == "decrement":
            return seed - 1
        elif seed_mode == "random":
            return random.randint(0, 0xffffffffffffffff)
        elif seed_mode == "fixed":
            return seed

    def hash_tensor(self, tensor):
        tensor = tensor.cpu().contiguous()
        return hashlib.sha256(tensor.numpy().tobytes()).hexdigest()

    def update_conditioning(self, conditioning_seq, loop_count, last_conditioning):
        matching_conditioning = None
        for idx, conditioning, *_ in conditioning_seq:
            if int(idx) == loop_count:
                matching_conditioning = conditioning
                break
        return matching_conditioning if matching_conditioning else (last_conditioning if last_conditioning else None)

    def update_alternate_seed(self, loop_count):
        if loop_count % 3 == 0:
            if self.previous_seed is None:
                self.previous_seed = self.current_seed
            else:
                self.previous_seed, self.current_seed = self.current_seed, self.previous_seed + 1 if loop_count // 2 % 2 == 0 else self.previous_seed - 1
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
                seq_seed = self.update_alternate_seed(seed) if seed_mode_seq != "fixed" else seed
                #denoise_seq = self.alternate_denoise(denoise_seq)
            else:
                seq_seed = seed if loop_count <= 0 else self.update_seed(seq_seed, seed_mode_seq)


            print(f"Loop count: {loop_count}, Seed: {seq_seed}")

            last_positive_conditioning = positive_conditioning[0] if positive_conditioning else None
            last_negative_conditioning = negative_conditioning[0] if negative_conditioning else None

            positive_conditioning = self.update_conditioning(positive_seq, loop_count, last_positive_conditioning)
            negative_conditioning = self.update_conditioning(negative_seq, loop_count, last_negative_conditioning)

            if use_conditioning_slerp and (last_positive_conditioning and last_negative_conditioning):
                a = last_positive_conditioning[0].clone()
                b = positive_conditioning[0].clone()
                na = last_negative_conditioning[0].clone()
                nb = negative_conditioning[0].clone()

                pa = last_positive_conditioning[1]["pooled_output"].clone()
                pb = positive_conditioning[1]["pooled_output"].clone()
                npa = last_negative_conditioning[1]["pooled_output"].clone()
                npb = negative_conditioning[1]["pooled_output"].clone()

                pos_cond = slerp(cond_slerp_strength, a, b)
                pos_pooled = slerp(cond_slerp_strength, pa, pb)
                neg_cond = slerp(cond_slerp_strength, na, nb)
                neg_pooled = slerp(cond_slerp_strength, npa, npb)
                
                positive_conditioning = [pos_cond, {"pooled_output": pos_pooled}]
                negative_conditioning = [neg_cond, {"pooled_output": neg_pooled}]

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

                if use_latent_interpolation and results and loop_count > 0:
                    if latent_interpolation_mode == "Blend":
                        sample = blend_latents(latent_interp_strength, results[-1], sample)
                    elif latent_interpolation_mode == "Slerp":
                        sample = slerp_latents(latent_interp_strength, results[-1], sample)
                    elif latent_interpolation_mode == "Cosine Interp":
                        sample = cosine_interp_latents(latent_interp_strength, results[-1], sample)
                    else:
                        sample = sample

                results.append(sample)

        results = torch.cat(results, dim=0)
        results = {'samples': results}

        return (results,)

```
