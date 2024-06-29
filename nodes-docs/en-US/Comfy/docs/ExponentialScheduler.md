---
tags:
- SigmaScheduling
---

# ExponentialScheduler
## Documentation
- Class name: `ExponentialScheduler`
- Category: `sampling/custom_sampling/schedulers`
- Output node: `False`

The ExponentialScheduler node is designed to generate a sequence of sigma values following an exponential schedule for diffusion processes. It calculates these values based on the number of steps and the specified minimum and maximum sigma values, providing a foundational mechanism for controlling the noise level across the diffusion steps.
## Input types
### Required
- **`steps`**
    - Specifies the total number of steps for the diffusion process, directly influencing the length of the generated sigma sequence.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`sigma_max`**
    - Defines the maximum sigma value, setting the upper limit of noise to be introduced at the beginning of the diffusion process.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`sigma_min`**
    - Determines the minimum sigma value, establishing the lower noise limit towards the end of the diffusion process.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
## Output types
- **`sigmas`**
    - Comfy dtype: `SIGMAS`
    - A sequence of sigma values calculated based on an exponential schedule, used to control the noise level in each step of the diffusion process.
    - Python dtype: `Tuple[float]`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class ExponentialScheduler:
    @classmethod
    def INPUT_TYPES(s):
        return {"required":
                    {"steps": ("INT", {"default": 20, "min": 1, "max": 10000}),
                     "sigma_max": ("FLOAT", {"default": 14.614642, "min": 0.0, "max": 5000.0, "step":0.01, "round": False}),
                     "sigma_min": ("FLOAT", {"default": 0.0291675, "min": 0.0, "max": 5000.0, "step":0.01, "round": False}),
                    }
               }
    RETURN_TYPES = ("SIGMAS",)
    CATEGORY = "sampling/custom_sampling/schedulers"

    FUNCTION = "get_sigmas"

    def get_sigmas(self, steps, sigma_max, sigma_min):
        sigmas = k_diffusion_sampling.get_sigmas_exponential(n=steps, sigma_min=sigma_min, sigma_max=sigma_max)
        return (sigmas, )

```
