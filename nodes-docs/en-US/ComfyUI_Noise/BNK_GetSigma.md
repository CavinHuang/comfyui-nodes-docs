---
tags:
- SigmaScheduling
---

# Get Sigma
## Documentation
- Class name: `BNK_GetSigma`
- Category: `latent/noise`
- Output node: `False`

The `BNK_GetSigma` node is designed to calculate a specific sigma value based on the provided model, sampler name, scheduler, and step parameters. It focuses on determining the noise level for a given step in the sampling process, adjusting the noise level according to the model's latent space scale factor.
## Input types
### Required
- **`model`**
    - The model parameter specifies the generative model for which the sigma value is being calculated. It is crucial for determining the appropriate noise level in the context of the model's latent space.
    - Comfy dtype: `MODEL`
    - Python dtype: `comfy.model_management.Model`
- **`sampler_name`**
    - The sampler_name parameter identifies the specific sampling strategy to be used. It influences the calculation of sigma by determining the noise distribution and progression over steps.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`scheduler`**
    - The scheduler parameter defines the scheduling strategy for noise level adjustment over the sampling steps. It plays a key role in how the sigma value is calculated, affecting the noise transition.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`steps`**
    - The steps parameter indicates the total number of steps in the sampling process. It sets the upper limit for the start and end step parameters, affecting the range of sigma calculation.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`start_at_step`**
    - This parameter specifies the starting step for sigma calculation, allowing for the adjustment of the noise level from a specific point in the sampling process.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`end_at_step`**
    - The end_at_step parameter determines the ending step for sigma calculation, marking the point up to which the noise level is adjusted.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`float`**
    - Comfy dtype: `FLOAT`
    - This output represents the calculated sigma value, adjusted for the model's latent space scale factor, indicating the noise level at a specific step in the sampling process.
    - Python dtype: `float`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class GetSigma:
    @classmethod
    def INPUT_TYPES(s):
        return {"required": {
            "model": ("MODEL",),
            "sampler_name": (comfy.samplers.KSampler.SAMPLERS, ),
            "scheduler": (comfy.samplers.KSampler.SCHEDULERS, ),
            "steps": ("INT", {"default": 10000, "min": 0, "max": 10000}),
            "start_at_step": ("INT", {"default": 0, "min": 0, "max": 10000}),
            "end_at_step": ("INT", {"default": 10000, "min": 1, "max": 10000}),
            }}
    
    RETURN_TYPES = ("FLOAT",)
    FUNCTION = "calc_sigma"

    CATEGORY = "latent/noise"
        
    def calc_sigma(self, model, sampler_name, scheduler, steps, start_at_step, end_at_step):
        device = comfy.model_management.get_torch_device()
        end_at_step = min(steps, end_at_step)
        start_at_step = min(start_at_step, end_at_step)
        real_model = None
        comfy.model_management.load_model_gpu(model)
        real_model = model.model
        sampler = comfy.samplers.KSampler(real_model, steps=steps, device=device, sampler=sampler_name, scheduler=scheduler, denoise=1.0, model_options=model.model_options)
        sigmas = sampler.sigmas
        sigma = sigmas[start_at_step] - sigmas[end_at_step]
        sigma /= model.model.latent_format.scale_factor
        return (sigma.cpu().numpy(),)

```
