---
tags:
- SigmaScheduling
---

# VPScheduler
## Documentation
- Class name: `VPScheduler`
- Category: `sampling/custom_sampling/schedulers`
- Output node: `False`

The VPScheduler node is designed to generate a sequence of noise levels (sigmas) for variational path sampling in diffusion models, based on specified scheduling parameters.
## Input types
### Required
- **`steps`**
    - Defines the total number of steps in the noise schedule, affecting the granularity and length of the generated sigma sequence.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`beta_d`**
    - Specifies the beta decay parameter, influencing the rate at which noise levels decrease throughout the schedule.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`beta_min`**
    - Sets the minimum beta value, determining the lowest noise level in the schedule.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`eps_s`**
    - Adjusts the epsilon start value, fine-tuning the initial noise level.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
## Output types
- **`sigmas`**
    - Comfy dtype: `SIGMAS`
    - A sequence of noise levels (sigmas) calculated for variational path sampling, tailored to the input scheduling parameters.
    - Python dtype: `Tuple[float]`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class VPScheduler:
    @classmethod
    def INPUT_TYPES(s):
        return {"required":
                    {"steps": ("INT", {"default": 20, "min": 1, "max": 10000}),
                     "beta_d": ("FLOAT", {"default": 19.9, "min": 0.0, "max": 5000.0, "step":0.01, "round": False}), #TODO: fix default values
                     "beta_min": ("FLOAT", {"default": 0.1, "min": 0.0, "max": 5000.0, "step":0.01, "round": False}),
                     "eps_s": ("FLOAT", {"default": 0.001, "min": 0.0, "max": 1.0, "step":0.0001, "round": False}),
                    }
               }
    RETURN_TYPES = ("SIGMAS",)
    CATEGORY = "sampling/custom_sampling/schedulers"

    FUNCTION = "get_sigmas"

    def get_sigmas(self, steps, beta_d, beta_min, eps_s):
        sigmas = k_diffusion_sampling.get_sigmas_vp(n=steps, beta_d=beta_d, beta_min=beta_min, eps_s=eps_s)
        return (sigmas, )

```
