---
tags:
- SigmaScheduling
---

# Get Sigma (BNK)
## Documentation
- Class name: `GetSigma`
- Category: `latent/noise`
- Output node: `False`

The GetSigma node is designed to calculate a specific sigma value based on a given model, sampler, scheduler, and step parameters. It abstracts the complexity of interacting with different samplers and schedulers to provide a straightforward way to obtain a sigma value, which is crucial for controlling the noise level in generative models.
## Input types
### Required
- **`model`**
    - The model parameter specifies the generative model to be used for sigma calculation. It is crucial for determining the appropriate noise level based on the model's characteristics and configurations.
    - Comfy dtype: `MODEL`
    - Python dtype: `comfy.model_management.Model`
- **`sampler_name`**
    - The sampler_name parameter identifies the specific sampling strategy to be employed. This choice affects how sigma values are computed and applied, tailoring the noise injection process to the selected sampler's methodology.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`scheduler`**
    - The scheduler parameter determines the scheduling algorithm for adjusting noise levels throughout the generative process. It plays a key role in fine-tuning the progression of sigma values over specified steps.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`steps`**
    - Specifies the total number of steps to consider for sigma calculation. It defines the scope within which the start and end steps are evaluated, impacting the final sigma value.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`start_at_step`**
    - The starting step from which to begin calculating sigma. This parameter allows for flexibility in determining the initial noise level, influencing the early stages of the generative process.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`end_at_step`**
    - The ending step at which to stop calculating sigma. It sets the final point for noise adjustment, affecting the outcome of the generative model's output.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`float`**
    - Comfy dtype: `FLOAT`
    - Returns the calculated sigma value, which is a measure of the noise level to be applied. This value is critical for controlling the generative process's fidelity and diversity.
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
        sampler = comfy.samplers.KSampler(model, steps=steps, device=device, sampler=sampler_name, scheduler=scheduler, denoise=1.0, model_options=model.model_options)
        sigmas = sampler.sigmas
        sigma = sigmas[start_at_step] - sigmas[end_at_step]
        sigma /= model.model.latent_format.scale_factor
        return (sigma.cpu().numpy(),)

```
