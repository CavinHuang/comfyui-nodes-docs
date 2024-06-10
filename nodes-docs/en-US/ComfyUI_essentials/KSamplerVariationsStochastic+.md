---
tags:
- Sampling
---

# 🔧 KSampler Stochastic Variations
## Documentation
- Class name: `KSamplerVariationsStochastic+`
- Category: `essentials`
- Output node: `False`

This node is designed to introduce stochastic variations into the sampling process, leveraging randomness to enhance the diversity and quality of generated samples. It focuses on applying stochastic methods to modify or influence the sampling behavior, aiming to produce varied outcomes that might not be achievable through deterministic approaches alone.
## Input types
### Required
- **`model`**
    - Specifies the model to be used for the sampling process, playing a crucial role in determining the characteristics and quality of the generated samples.
    - Comfy dtype: `MODEL`
    - Python dtype: `torch.nn.Module`
- **`latent_image`**
    - Introduces a latent image as the starting point for the sampling process, serving as a foundation for the stochastic variations to build upon.
    - Comfy dtype: `LATENT`
    - Python dtype: `torch.Tensor`
- **`noise_seed`**
    - Sets the seed for random number generation, ensuring reproducibility of the stochastic variations introduced during the sampling process.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`steps`**
    - Defines the number of steps to be taken in the sampling process, affecting the depth and detail of the exploration within the sample space.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`cfg`**
    - Controls the conditioning free guidance scale, influencing the direction and intensity of the sampling process towards desired outcomes.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`sampler`**
    - Determines the specific stochastic sampling method to be applied, directly impacting the nature of variations introduced.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`scheduler`**
    - Selects the scheduling strategy for the sampling process, which can affect the progression and adaptation of sampling parameters over time.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`positive`**
    - Provides positive conditioning to guide the sampling process towards favorable outcomes, enhancing the relevance and quality of generated samples.
    - Comfy dtype: `CONDITIONING`
    - Python dtype: `str`
- **`negative`**
    - Supplies negative conditioning to steer the sampling away from undesirable outcomes, refining the focus and quality of the samples produced.
    - Comfy dtype: `CONDITIONING`
    - Python dtype: `str`
- **`variation_seed`**
    - Introduces an additional seed to control the variation in the sampling process, offering another layer of stochastic influence.
    - Comfy dtype: `INT:seed`
    - Python dtype: `int`
- **`variation_strength`**
    - Determines the strength of the variations introduced, affecting the degree of change and diversity in the sampling outcomes.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`cfg_scale`**
    - Adjusts the scale of the conditioning free guidance, further influencing the sampling process and its alignment with desired outcomes.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
## Output types
- **`latent`**
    - Comfy dtype: `LATENT`
    - Produces a modified latent representation, enriched with stochastic variations through the sampling process.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class KSamplerVariationsStochastic:
    @classmethod
    def INPUT_TYPES(s):
        return {"required":{
                    "model": ("MODEL",),
                    "latent_image": ("LATENT", ),
                    "noise_seed": ("INT", {"default": 0, "min": 0, "max": 0xffffffffffffffff}),
                    "steps": ("INT", {"default": 25, "min": 1, "max": 10000}),
                    "cfg": ("FLOAT", {"default": 7.0, "min": 0.0, "max": 100.0, "step":0.1, "round": 0.01}),
                    "sampler": (comfy.samplers.KSampler.SAMPLERS, ),
                    "scheduler": (comfy.samplers.KSampler.SCHEDULERS, ),
                    "positive": ("CONDITIONING", ),
                    "negative": ("CONDITIONING", ),
                    "variation_seed": ("INT:seed", {"default": 0, "min": 0, "max": 0xffffffffffffffff}),
                    "variation_strength": ("FLOAT", {"default": 0.2, "min": 0.0, "max": 1.0, "step":0.05, "round": 0.01}),
                    #"variation_sampler": (comfy.samplers.KSampler.SAMPLERS, ),
                    "cfg_scale": ("FLOAT", {"default": 1.0, "min": 0.0, "max": 1.0, "step":0.05, "round": 0.01}),
                }}

    RETURN_TYPES = ("LATENT", )
    FUNCTION = "execute"
    CATEGORY = "essentials"

    def execute(self, model, latent_image, noise_seed, steps, cfg, sampler, scheduler, positive, negative, variation_seed, variation_strength, cfg_scale, variation_sampler="dpmpp_2m_sde"):
        # Stage 1: composition sampler
        force_full_denoise = False # return with leftover noise = "enable"
        disable_noise = False # add noise = "enable"

        end_at_step = max(int(steps * (1-variation_strength)), 1)
        start_at_step = 0

        work_latent = latent_image.copy()
        batch_size = work_latent["samples"].shape[0]
        work_latent["samples"] = work_latent["samples"][0].unsqueeze(0)

        stage1 = common_ksampler(model, noise_seed, steps, cfg, sampler, scheduler, positive, negative, work_latent, denoise=1.0, disable_noise=disable_noise, start_step=start_at_step, last_step=end_at_step, force_full_denoise=force_full_denoise)[0]

        if batch_size > 1:
            stage1["samples"] = stage1["samples"].clone().repeat(batch_size, 1, 1, 1)

        # Stage 2: variation sampler
        force_full_denoise = True
        disable_noise = True
        cfg = max(cfg * cfg_scale, 1.0)
        start_at_step = end_at_step
        end_at_step = steps

        return common_ksampler(model, variation_seed, steps, cfg, variation_sampler, scheduler, positive, negative, stage1, denoise=1.0, disable_noise=disable_noise, start_step=start_at_step, last_step=end_at_step, force_full_denoise=force_full_denoise)

```
