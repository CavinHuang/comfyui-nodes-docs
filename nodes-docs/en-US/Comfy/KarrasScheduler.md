---
tags:
- SigmaScheduling
---

# KarrasScheduler
## Documentation
- Class name: `KarrasScheduler`
- Category: `sampling/custom_sampling/schedulers`
- Output node: `False`

The KarrasScheduler node is designed to generate a sequence of noise levels (sigmas) based on the Karras et al. (2022) noise schedule. It calculates these levels using specific parameters to control the noise intensity over a given number of steps, facilitating controlled diffusion processes in generative models.
## Input types
### Required
- **`steps`**
    - Specifies the number of noise levels to generate, controlling the granularity of the diffusion process.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`sigma_max`**
    - Sets the maximum noise level, defining the upper bound of noise intensity.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`sigma_min`**
    - Determines the minimum noise level, establishing the lower bound of noise intensity.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`rho`**
    - A parameter influencing the shape of the noise schedule, affecting how noise levels progress from sigma_min to sigma_max.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
## Output types
- **`sigmas`**
    - Comfy dtype: `SIGMAS`
    - A sequence of calculated noise levels (sigmas) according to the Karras et al. (2022) noise schedule.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class KarrasScheduler:
    @classmethod
    def INPUT_TYPES(s):
        return {"required":
                    {"steps": ("INT", {"default": 20, "min": 1, "max": 10000}),
                     "sigma_max": ("FLOAT", {"default": 14.614642, "min": 0.0, "max": 5000.0, "step":0.01, "round": False}),
                     "sigma_min": ("FLOAT", {"default": 0.0291675, "min": 0.0, "max": 5000.0, "step":0.01, "round": False}),
                     "rho": ("FLOAT", {"default": 7.0, "min": 0.0, "max": 100.0, "step":0.01, "round": False}),
                    }
               }
    RETURN_TYPES = ("SIGMAS",)
    CATEGORY = "sampling/custom_sampling/schedulers"

    FUNCTION = "get_sigmas"

    def get_sigmas(self, steps, sigma_max, sigma_min, rho):
        sigmas = k_diffusion_sampling.get_sigmas_karras(n=steps, sigma_min=sigma_min, sigma_max=sigma_max, rho=rho)
        return (sigmas, )

```
