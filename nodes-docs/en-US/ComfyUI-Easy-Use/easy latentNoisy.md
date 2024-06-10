---
tags:
- LatentNoise
- Noise
---

# LatentNoisy
## Documentation
- Class name: `easy latentNoisy`
- Category: `EasyUse/Latent`
- Output node: `False`

The `easyLatentNoisy` node is designed to inject noise into latent representations, enhancing the diversity and richness of generated content. It supports various noise types and levels, allowing for fine-tuned control over the noise injection process.
## Input types
### Required
- **`sampler_name`**
    - Specifies the sampler to be used in the noise injection process, affecting the method and characteristics of noise generation.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`scheduler`**
    - Determines the scheduling algorithm for noise injection, influencing the timing and sequence of noise application.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`steps`**
    - Defines the number of steps in the noise injection process, allowing for control over the duration and granularity of noise application.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`start_at_step`**
    - Indicates the starting step for noise injection, enabling targeted application of noise at specific stages.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`end_at_step`**
    - Specifies the ending step for noise injection, defining the conclusion of the noise application process.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`source`**
    - The original source of the latent representation, serving as the basis for noise injection.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `Dict[str, torch.Tensor]`
- **`seed`**
    - Sets the seed for random noise generation, ensuring reproducibility of the noise characteristics.
    - Comfy dtype: `INT`
    - Python dtype: `int`
### Optional
- **`pipe`**
    - The processing pipeline context in which the noise injection occurs, integrating the node's functionality within a broader workflow.
    - Comfy dtype: `PIPE_LINE`
    - Python dtype: `Dict[str, Any]`
- **`optional_model`**
    - An optional model parameter that, if provided, can influence the noise generation process based on the model's characteristics.
    - Comfy dtype: `MODEL`
    - Python dtype: `Any`
- **`optional_latent`**
    - An optional latent parameter that can be used to specify an alternative latent representation for noise injection.
    - Comfy dtype: `LATENT`
    - Python dtype: `Dict[str, torch.Tensor]`
## Output types
- **`pipe`**
    - Comfy dtype: `PIPE_LINE`
    - The updated processing pipeline after noise injection, reflecting the integration of the noisy latent within the workflow.
    - Python dtype: `Dict[str, Any]`
- **`latent`**
    - Comfy dtype: `LATENT`
    - The modified latent representation after noise injection, showcasing the effects of the added noise.
    - Python dtype: `Dict[str, torch.Tensor]`
- **`sigma`**
    - Comfy dtype: `FLOAT`
    - The level of noise applied to the latent representation, quantifying the intensity of the noise injection.
    - Python dtype: `float`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class latentNoisy:
    @classmethod
    def INPUT_TYPES(s):
        return {"required": {
            "sampler_name": (comfy.samplers.KSampler.SAMPLERS,),
            "scheduler": (comfy.samplers.KSampler.SCHEDULERS,),
            "steps": ("INT", {"default": 10000, "min": 0, "max": 10000}),
            "start_at_step": ("INT", {"default": 0, "min": 0, "max": 10000}),
            "end_at_step": ("INT", {"default": 10000, "min": 1, "max": 10000}),
            "source": (["CPU", "GPU"],),
            "seed": ("INT", {"default": 0, "min": 0, "max": 0xffffffffffffffff}),
        },
        "optional": {
            "pipe": ("PIPE_LINE",),
            "optional_model": ("MODEL",),
            "optional_latent": ("LATENT",)
        }}

    RETURN_TYPES = ("PIPE_LINE", "LATENT", "FLOAT",)
    RETURN_NAMES = ("pipe", "latent", "sigma",)
    FUNCTION = "run"

    CATEGORY = "EasyUse/Latent"

    def run(self, sampler_name, scheduler, steps, start_at_step, end_at_step, source, seed, pipe=None, optional_model=None, optional_latent=None):
        model = optional_model if optional_model is not None else pipe["model"]
        batch_size = pipe["loader_settings"]["batch_size"]
        empty_latent_height = pipe["loader_settings"]["empty_latent_height"]
        empty_latent_width = pipe["loader_settings"]["empty_latent_width"]

        if optional_latent is not None:
            samples = optional_latent
        else:
            torch.manual_seed(seed)
            if source == "CPU":
                device = "cpu"
            else:
                device = comfy.model_management.get_torch_device()
            noise = torch.randn((batch_size, 4, empty_latent_height // 8, empty_latent_width // 8), dtype=torch.float32,
                                device=device).cpu()

            samples = {"samples": noise}

        device = comfy.model_management.get_torch_device()
        end_at_step = min(steps, end_at_step)
        start_at_step = min(start_at_step, end_at_step)
        comfy.model_management.load_model_gpu(model)
        model_patcher = comfy.model_patcher.ModelPatcher(model.model, load_device=device, offload_device=comfy.model_management.unet_offload_device())
        sampler = comfy.samplers.KSampler(model_patcher, steps=steps, device=device, sampler=sampler_name,
                                          scheduler=scheduler, denoise=1.0, model_options=model.model_options)
        sigmas = sampler.sigmas
        sigma = sigmas[start_at_step] - sigmas[end_at_step]
        sigma /= model.model.latent_format.scale_factor
        sigma = sigma.cpu().numpy()

        samples_out = samples.copy()

        s1 = samples["samples"]
        samples_out["samples"] = s1 * sigma

        if pipe is None:
            pipe = {}
        new_pipe = {
            **pipe,
            "samples": samples_out
        }
        del pipe

        return (new_pipe, samples_out, sigma)

```
