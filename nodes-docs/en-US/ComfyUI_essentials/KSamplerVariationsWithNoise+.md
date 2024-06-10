---
tags:
- Sampling
---

# 🔧 KSampler Variations with Noise Injection
## Documentation
- Class name: `KSamplerVariationsWithNoise+`
- Category: `essentials`
- Output node: `False`

This node is designed to generate variations of a given latent image with added noise, leveraging a two-stage sampling process. The first stage applies a composition sampler to the latent image, potentially with noise addition, to create a base variation. The second stage introduces further variations by adjusting the sampling configuration based on a variation strength parameter, aiming to produce diverse and nuanced outputs.
## Input types
### Required
- **`model`**
    - The model parameter is crucial as it determines the underlying generative model used for the sampling process, affecting the quality and characteristics of the generated variations.
    - Comfy dtype: `MODEL`
    - Python dtype: `torch.nn.Module`
- **`latent_image`**
    - The latent image serves as the starting point for the variation generation process, with its manipulation through noise and sampling defining the nature of the output.
    - Comfy dtype: `LATENT`
    - Python dtype: `Dict[str, torch.Tensor]`
- **`main_seed`**
    - The main_seed parameter influences the initial randomness of the noise added to the latent image, thereby affecting the diversity of the generated variations.
    - Comfy dtype: `INT:seed`
    - Python dtype: `int`
- **`steps`**
    - This parameter specifies the number of steps in the sampling process, directly impacting the detail and quality of the variations produced.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`cfg`**
    - The cfg parameter adjusts the conditioning factor in the sampling process, influencing the adherence to the input conditions and the overall diversity of the output.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`sampler_name`**
    - The sampler_name parameter selects the specific sampling algorithm to be used, affecting the approach to generating variations.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`scheduler`**
    - The scheduler parameter determines the scheduling algorithm for the sampling process, influencing the progression and refinement of the generated variations.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`positive`**
    - This parameter provides positive conditioning to guide the sampling towards desired characteristics or themes.
    - Comfy dtype: `CONDITIONING`
    - Python dtype: `str`
- **`negative`**
    - The negative conditioning parameter guides the sampling away from certain characteristics or themes, aiding in the generation of targeted variations.
    - Comfy dtype: `CONDITIONING`
    - Python dtype: `str`
- **`variation_strength`**
    - This parameter controls the degree of variation introduced in the second stage of the sampling process, allowing for fine-tuning of the output's diversity.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`variation_seed`**
    - The variation seed parameter introduces an additional layer of randomness to the variation generation process, enhancing the diversity of the output.
    - Comfy dtype: `INT:seed`
    - Python dtype: `int`
- **`denoise`**
    - The denoise parameter affects the level of noise reduction applied during the sampling process, influencing the clarity and quality of the generated variations.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
## Output types
- **`latent`**
    - Comfy dtype: `LATENT`
    - The output is a modified version of the input latent image, enriched with variations and potentially noise, reflecting the combined effects of the two-stage sampling process.
    - Python dtype: `Dict[str, torch.Tensor]`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class KSamplerVariationsWithNoise:
    @classmethod
    def INPUT_TYPES(s):
        return {"required": {
                    "model": ("MODEL", ),
                    "latent_image": ("LATENT", ),
                    "main_seed": ("INT:seed", {"default": 0, "min": 0, "max": 0xffffffffffffffff}),
                    "steps": ("INT", {"default": 20, "min": 1, "max": 10000}),
                    "cfg": ("FLOAT", {"default": 8.0, "min": 0.0, "max": 100.0, "step":0.1, "round": 0.01}),
                    "sampler_name": (comfy.samplers.KSampler.SAMPLERS, ),
                    "scheduler": (comfy.samplers.KSampler.SCHEDULERS, ),
                    "positive": ("CONDITIONING", ),
                    "negative": ("CONDITIONING", ),
                    "variation_strength": ("FLOAT", {"default": 0.17, "min": 0.0, "max": 1.0, "step":0.01, "round": 0.01}),
                    #"start_at_step": ("INT", {"default": 0, "min": 0, "max": 10000}),
                    #"end_at_step": ("INT", {"default": 10000, "min": 0, "max": 10000}),
                    #"return_with_leftover_noise": (["disable", "enable"], ),
                    "variation_seed": ("INT:seed", {"default": 12345, "min": 0, "max": 0xffffffffffffffff}),
                    "denoise": ("FLOAT", {"default": 1.0, "min": 0.0, "max": 1.0, "step":0.01, "round": 0.01}),
                }}

    RETURN_TYPES = ("LATENT",)
    FUNCTION = "execute"
    CATEGORY = "essentials"

    def execute(self, model, latent_image, main_seed, steps, cfg, sampler_name, scheduler, positive, negative, variation_strength, variation_seed, denoise):
        if main_seed == variation_seed:
            variation_seed += 1

        end_at_step = steps #min(steps, end_at_step)
        start_at_step = round(end_at_step - end_at_step * denoise)

        force_full_denoise = True
        disable_noise = True

        device = comfy.model_management.get_torch_device()

        # Generate base noise
        batch_size, _, height, width = latent_image["samples"].shape
        generator = torch.manual_seed(main_seed)
        base_noise = torch.randn((1, 4, height, width), dtype=torch.float32, device="cpu", generator=generator).repeat(batch_size, 1, 1, 1).cpu()

        # Generate variation noise
        generator = torch.manual_seed(variation_seed)
        variation_noise = torch.randn((batch_size, 4, height, width), dtype=torch.float32, device="cpu", generator=generator).cpu()

        slerp_noise = slerp(variation_strength, base_noise, variation_noise)

        # Calculate sigma
        comfy.model_management.load_model_gpu(model)
        sampler = comfy.samplers.KSampler(model, steps=steps, device=device, sampler=sampler_name, scheduler=scheduler, denoise=1.0, model_options=model.model_options)
        sigmas = sampler.sigmas
        sigma = sigmas[start_at_step] - sigmas[end_at_step]
        sigma /= model.model.latent_format.scale_factor
        sigma = sigma.detach().cpu().item()

        work_latent = latent_image.copy()
        work_latent["samples"] = latent_image["samples"].clone() + slerp_noise * sigma

        # if there's a mask we need to expand it to avoid artifacts, 5 pixels should be enough
        if "noise_mask" in latent_image:
            noise_mask = prepare_mask(latent_image["noise_mask"], latent_image['samples'].shape)
            work_latent["samples"] = noise_mask * work_latent["samples"] + (1-noise_mask) * latent_image["samples"]
            work_latent['noise_mask'] = expand_mask(latent_image["noise_mask"].clone(), 5, True)

        return common_ksampler(model, main_seed, steps, cfg, sampler_name, scheduler, positive, negative, work_latent, denoise=1.0, disable_noise=disable_noise, start_step=start_at_step, last_step=end_at_step, force_full_denoise=force_full_denoise)

```
