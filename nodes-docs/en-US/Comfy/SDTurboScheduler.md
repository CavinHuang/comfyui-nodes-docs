---
tags:
- SigmaScheduling
---

# SDTurboScheduler
## Documentation
- Class name: `SDTurboScheduler`
- Category: `sampling/custom_sampling/schedulers`
- Output node: `False`

SDTurboScheduler is designed to generate a sequence of sigma values for image sampling, adjusting the sequence based on the denoise level and the number of steps specified. It leverages a specific model's sampling capabilities to produce these sigma values, which are crucial for controlling the denoising process during image generation.
## Input types
### Required
- **`model`**
    - The model parameter specifies the generative model to be used for sigma value generation. It is crucial for determining the specific sampling behavior and capabilities of the scheduler.
    - Comfy dtype: `MODEL`
    - Python dtype: `torch.nn.Module`
- **`steps`**
    - The steps parameter determines the length of the sigma sequence to be generated, directly influencing the granularity of the denoising process.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`denoise`**
    - The denoise parameter adjusts the starting point of the sigma sequence, allowing for finer control over the denoising level applied during image generation.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
## Output types
- **`sigmas`**
    - Comfy dtype: `SIGMAS`
    - A sequence of sigma values generated based on the specified model, steps, and denoise level. These values are essential for controlling the denoising process in image generation.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `GPU`
- Common nodes:
    - [SamplerCustom](../../Comfy/Nodes/SamplerCustom.md)
    - [SplitSigmas](../../Comfy/Nodes/SplitSigmas.md)



## Source code
```python
class SDTurboScheduler:
    @classmethod
    def INPUT_TYPES(s):
        return {"required":
                    {"model": ("MODEL",),
                     "steps": ("INT", {"default": 1, "min": 1, "max": 10}),
                     "denoise": ("FLOAT", {"default": 1.0, "min": 0, "max": 1.0, "step": 0.01}),
                      }
               }
    RETURN_TYPES = ("SIGMAS",)
    CATEGORY = "sampling/custom_sampling/schedulers"

    FUNCTION = "get_sigmas"

    def get_sigmas(self, model, steps, denoise):
        start_step = 10 - int(10 * denoise)
        timesteps = torch.flip(torch.arange(1, 11) * 100 - 1, (0,))[start_step:start_step + steps]
        comfy.model_management.load_models_gpu([model])
        sigmas = model.model.model_sampling.sigma(timesteps)
        sigmas = torch.cat([sigmas, sigmas.new_zeros([1])])
        return (sigmas, )

```
