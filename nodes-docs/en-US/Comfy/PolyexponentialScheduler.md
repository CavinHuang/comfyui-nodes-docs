---
tags:
- SigmaScheduling
---

# PolyexponentialScheduler
## Documentation
- Class name: `PolyexponentialScheduler`
- Category: `sampling/custom_sampling/schedulers`
- Output node: `False`

The PolyexponentialScheduler node is designed to generate a sequence of sigma values based on a polyexponential function. These sigma values are used to control the noise level at each step of a diffusion process, allowing for fine-tuned adjustments to the sampling behavior.
## Input types
### Required
- **`steps`**
    - Specifies the number of steps for which sigma values are to be generated, affecting the granularity of the diffusion process.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`sigma_max`**
    - The maximum sigma value, setting the upper limit of noise to be introduced in the early stages of the diffusion process.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`sigma_min`**
    - The minimum sigma value, determining the lower limit of noise for the final stages, ensuring the process gradually refines the generated output.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`rho`**
    - A parameter influencing the shape of the polyexponential curve, thereby affecting the distribution of sigma values across the steps.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
## Output types
- **`sigmas`**
    - Comfy dtype: `SIGMAS`
    - A sequence of sigma values calculated based on the polyexponential function, tailored for each step of the diffusion process.
    - Python dtype: `tuple`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class PolyexponentialScheduler:
    @classmethod
    def INPUT_TYPES(s):
        return {"required":
                    {"steps": ("INT", {"default": 20, "min": 1, "max": 10000}),
                     "sigma_max": ("FLOAT", {"default": 14.614642, "min": 0.0, "max": 5000.0, "step":0.01, "round": False}),
                     "sigma_min": ("FLOAT", {"default": 0.0291675, "min": 0.0, "max": 5000.0, "step":0.01, "round": False}),
                     "rho": ("FLOAT", {"default": 1.0, "min": 0.0, "max": 100.0, "step":0.01, "round": False}),
                    }
               }
    RETURN_TYPES = ("SIGMAS",)
    CATEGORY = "sampling/custom_sampling/schedulers"

    FUNCTION = "get_sigmas"

    def get_sigmas(self, steps, sigma_max, sigma_min, rho):
        sigmas = k_diffusion_sampling.get_sigmas_polyexponential(n=steps, sigma_min=sigma_min, sigma_max=sigma_max, rho=rho)
        return (sigmas, )

```
