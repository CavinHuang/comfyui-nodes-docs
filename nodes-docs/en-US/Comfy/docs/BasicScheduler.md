---
tags:
- SigmaScheduling
---

# BasicScheduler
## Documentation
- Class name: `BasicScheduler`
- Category: `sampling/custom_sampling/schedulers`
- Output node: `False`

The BasicScheduler node is designed to calculate and adjust the sigma values for a given model and scheduler over a specified number of steps, incorporating an optional denoise parameter to refine the process. It serves as a foundational element in custom sampling strategies, enabling precise control over the diffusion process in generative models.
## Input types
### Required
- **`model`**
    - Specifies the model for which sigma values are to be calculated, playing a crucial role in determining the diffusion process's behavior.
    - Comfy dtype: `MODEL`
    - Python dtype: `comfy.model_management.Model`
- **`scheduler`**
    - Defines the scheduler to be used for calculating sigma values, directly influencing the diffusion steps and their granularity.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`steps`**
    - Determines the number of diffusion steps to be used, affecting the resolution and granularity of the sigma values.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`denoise`**
    - Optional parameter to adjust the effective number of steps based on denoising level, allowing for finer control over the diffusion process.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
## Output types
- **`sigmas`**
    - Comfy dtype: `SIGMAS`
    - The calculated sigma values for the specified model and scheduler, essential for controlling the diffusion process.
    - Python dtype: `torch.FloatTensor`
## Usage tips
- Infra type: `CPU`
- Common nodes:
    - [SamplerCustom](../../Comfy/Nodes/SamplerCustom.md)
    - [SplitSigmas](../../Comfy/Nodes/SplitSigmas.md)
    - Reroute



## Source code
```python
class BasicScheduler:
    @classmethod
    def INPUT_TYPES(s):
        return {"required":
                    {"model": ("MODEL",),
                     "scheduler": (comfy.samplers.SCHEDULER_NAMES, ),
                     "steps": ("INT", {"default": 20, "min": 1, "max": 10000}),
                     "denoise": ("FLOAT", {"default": 1.0, "min": 0.0, "max": 1.0, "step": 0.01}),
                      }
               }
    RETURN_TYPES = ("SIGMAS",)
    CATEGORY = "sampling/custom_sampling/schedulers"

    FUNCTION = "get_sigmas"

    def get_sigmas(self, model, scheduler, steps, denoise):
        total_steps = steps
        if denoise < 1.0:
            if denoise <= 0.0:
                return (torch.FloatTensor([]),)
            total_steps = int(steps/denoise)

        sigmas = comfy.samplers.calculate_sigmas(model.get_model_object("model_sampling"), scheduler, total_steps).cpu()
        sigmas = sigmas[-(steps + 1):]
        return (sigmas, )

```
